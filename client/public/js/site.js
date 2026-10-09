/* Virtus editorial modernism: instant document behavior, accessible form states, and no decorative motion. */
(function () {
  "use strict";

  const page = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.setAttribute("aria-current", "page");
    }
  });

  const teamRoot = document.querySelector("[data-team]");
  if (teamRoot) {
    fetch("/data/team.json")
      .then((response) => {
        if (!response.ok) throw new Error("Team data could not be loaded.");
        return response.json();
      })
      .then((entries) => {
        teamRoot.textContent = "";
        entries.forEach((entry) => {
          const article = document.createElement("article");
          article.className = "team-entry";

          const heading = document.createElement("h2");
          heading.textContent = entry.name;
          article.appendChild(heading);

          const role = document.createElement("p");
          role.className = "team-role";
          role.textContent = entry.role;
          article.appendChild(role);

          if (entry.bio) {
            const bio = document.createElement("p");
            bio.textContent = entry.bio;
            article.appendChild(bio);
          }

          if (entry.email) {
            const contact = document.createElement("p");
            contact.className = "team-contact";

            const email = document.createElement("a");
            email.href = `mailto:${entry.email}`;
            email.textContent = entry.email;
            contact.appendChild(email);
            article.appendChild(contact);
          }

          teamRoot.appendChild(article);
        });
      })
      .catch(() => {
        teamRoot.innerHTML = '<p class="loading-note">Team information is temporarily unavailable.</p>';
      });
  }

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');

  function clearErrors() {
    form.querySelectorAll("[data-error-for]").forEach((node) => {
      node.textContent = "";
    });
    form.querySelectorAll("[aria-invalid]").forEach((field) => {
      field.removeAttribute("aria-invalid");
    });
  }

  function setError(field, message) {
    field.setAttribute("aria-invalid", "true");
    const error = form.querySelector(`[data-error-for="${field.name}"]`);
    if (error) error.textContent = message;
  }

  function validate() {
    clearErrors();
    let valid = true;
    const required = form.querySelectorAll("[required]");

    required.forEach((field) => {
      const value = field.value.trim();
      if (!value) {
        setError(field, "Please complete this field.");
        valid = false;
      } else if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        setError(field, "Please enter a valid email address.");
        valid = false;
      }
    });

    return valid;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.dataset.state = "";

    if (!validate()) {
      status.textContent = "Please correct the marked fields and try again.";
      status.dataset.state = "error";
      form.querySelector("[aria-invalid]")?.focus();
      return;
    }

    const key = form.querySelector('input[name="access_key"]').value;
    if (key === "WEB3FORMS_KEY") {
      status.textContent = "The form is ready, but its Web3Forms access key must be replaced before launch.";
      status.dataset.state = "error";
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");

      form.reset();
      status.textContent = "Thank you. Your note has been received.";
      status.dataset.state = "success";
    } catch {
      status.textContent = "The note could not be sent. Please use the email address shown above.";
      status.dataset.state = "error";
    } finally {
      submit.disabled = false;
      submit.textContent = "Send note";
    }
  });
})();
