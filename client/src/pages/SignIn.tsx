import {
  AuthLayout,
  fieldClass,
  linkClass,
  submitClass,
} from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { useState, type FormEvent } from "react";
import { Link, Redirect, useLocation, useSearch } from "wouter";

/** Only allow same-site relative redirects. */
export function safeNext(search: string) {
  const next = new URLSearchParams(search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/account";
}

export default function SignIn() {
  const { user, signIn } = useAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Redirect to={safeNext(search)} />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      setLocation(safeNext(search));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Sign in" subtitle="Welcome back to Virtus Ventures.">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={fieldClass}
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" disabled={submitting} className={submitClass}>
          {submitting ? <Spinner /> : "Sign in"}
        </Button>
      </form>
      <p className="mt-8 text-sm text-center text-[oklch(0.6_0.01_60)] font-light">
        New here?{" "}
        <Link
          href={`/signup${search ? `?${search}` : ""}`}
          className={linkClass}
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
