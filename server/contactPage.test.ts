import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it, vi } from "vitest";

const contact = fs.readFileSync(
  path.resolve(import.meta.dirname, "../client/contact.html"),
  "utf8"
);

function createContactDom(response: { success: boolean; message?: string }) {
  const fetchMock = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue(response),
  });
  const dom = new JSDOM(contact, {
    url: "https://virtusventures.org/contact.html",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    beforeParse(window) {
      Object.defineProperty(window, "fetch", {
        configurable: true,
        value: fetchMock,
      });
    },
  });

  return { dom, fetchMock };
}

function fillRequiredFields(document: Document) {
  (document.getElementById("f-name") as HTMLInputElement).value = "Integration Test";
  (document.getElementById("f-email") as HTMLInputElement).value = "forms-test@example.com";
  (document.getElementById("f-msg") as HTMLTextAreaElement).value =
    "This is a controlled contact form regression test.";
}

describe("contact page intake", () => {
  it("uses the supplied Web3Forms key and submits JSON without navigation", () => {
    expect(contact).toContain('value="6b8db0a9-1d83-4556-a575-c7683f2f1ede"');
    expect(contact).toContain('fetch("https://api.web3forms.com/submit"');
    expect(contact).toContain('"Content-Type": "application/json"');
    expect(contact).toContain("body: JSON.stringify(data)");
    expect(contact).toContain("event.preventDefault()");
    expect(contact).not.toContain("WEB3FORMS_KEY");
    expect(contact).not.toMatch(/window\.location|location\.href|response\.redirected/);
  });

  it("contains the required fields and inaccessible honeypot", () => {
    expect(contact).toContain('name="name"');
    expect(contact).toContain('name="email"');
    expect(contact).toContain('name="organization"');
    expect(contact).toContain('name="audience"');
    expect(contact).toContain('name="message"');
    expect(contact).toContain('name="botcheck" class="hp" tabindex="-1"');
    expect(contact).toContain('aria-hidden="true"');
  });

  it("updates the message prompt and subject for all three audiences", () => {
    expect(contact).toContain("What are you building, and what has capital access looked like so far");
    expect(contact).toContain("What profile have you been unable to source");
    expect(contact).toContain("What would you like to discuss");
    expect(contact).toContain('subject.value = "Virtus enquiry: "');
    expect(contact).toContain('audience.addEventListener("change", updateAudience)');
  });

  it("uses inline errors, an adjacent CEO email action, and plain success and failure copy", () => {
    expect(contact).toContain('class="err" id="f-name-error"');
    expect(contact).toContain('class="err" id="f-email-error"');
    expect(contact).toContain('class="err" id="f-aud-error"');
    expect(contact).toContain('class="err" id="f-msg-error"');
    expect(contact).toContain("Your note has been received. Everything sent here is read by Yuri Andrews directly.");
    expect(contact).toContain("You can expect a reply within two business days.");
    expect(contact).toContain('id="contact-actions"');
    expect(contact).toContain('href="mailto:yuri.andrews@virtusventures.org"');
    expect(contact).toContain('aria-label="Email Yuri Andrews directly">Email me</a>');
    expect(contact).not.toContain('class="contact-line"');
    expect(contact).toContain("That did not send. Please use Email me to contact Yuri directly.");
    expect(contact).not.toMatch(/alert\(|toast|modal/i);
  });

  it("validates inline and updates the message label and subject", () => {
    const { dom, fetchMock } = createContactDom({ success: true });
    const { document, Event } = dom.window;
    const form = document.getElementById("intake") as HTMLFormElement;
    const audience = document.getElementById("f-aud") as HTMLSelectElement;

    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    expect(document.getElementById("f-name-error")?.textContent).toBe(
      "Please enter your name."
    );
    expect(document.getElementById("f-email-error")?.textContent).toBe(
      "Please enter an email address we can reply to."
    );
    expect(document.getElementById("f-msg-error")?.textContent).toBe(
      "A sentence or two is enough, but we need something to go on."
    );
    expect(fetchMock).not.toHaveBeenCalled();

    audience.value = "Investor";
    audience.dispatchEvent(new Event("change", { bubbles: true }));
    expect(document.getElementById("msglabel")?.textContent).toBe(
      "What profile have you been unable to source"
    );
    expect((document.getElementById("subj") as HTMLInputElement).value).toBe(
      "Virtus enquiry: I am investing"
    );

    const honeypot = form.elements.namedItem("botcheck") as HTMLInputElement;
    expect(honeypot.tabIndex).toBe(-1);
    expect(honeypot.getAttribute("aria-hidden")).toBe("true");
    expect(dom.window.getComputedStyle(honeypot).position).toBe("absolute");
    dom.window.close();
  });

  it("submits JSON, stays on the page, and replaces the form on success", async () => {
    const { dom, fetchMock } = createContactDom({ success: true });
    const { document, Event } = dom.window;
    const form = document.getElementById("intake") as HTMLFormElement;
    const audience = document.getElementById("f-aud") as HTMLSelectElement;
    const startingUrl = dom.window.location.href;

    fillRequiredFields(document);
    audience.value = "Other";
    audience.dispatchEvent(new Event("change", { bubbles: true }));
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(options.body as string) as Record<string, string>;
    expect(payload.subject).toBe("Virtus enquiry: Something else");
    expect(payload.audience).toBe("Other");
    expect(dom.window.location.href).toBe(startingUrl);
    expect(form.hidden).toBe(true);
    expect((document.getElementById("done") as HTMLDivElement).hidden).toBe(false);
    dom.window.close();
  });

  it("keeps the form and shows the plain email fallback on failure", async () => {
    const { dom } = createContactDom({ success: false, message: "failed" });
    const { document, Event } = dom.window;
    const form = document.getElementById("intake") as HTMLFormElement;
    const button = document.getElementById("send") as HTMLButtonElement;

    fillRequiredFields(document);
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(form.hidden).toBe(false);
    expect(button.disabled).toBe(false);
    expect(button.textContent).toBe("Send");
    expect(document.getElementById("formerr")?.textContent).toBe(
      "That did not send. Please use Email me to contact Yuri directly."
    );
    dom.window.close();
  });
});
