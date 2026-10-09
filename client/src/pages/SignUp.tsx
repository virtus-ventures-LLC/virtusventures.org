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
import { safeNext } from "@/pages/SignIn";
import { useState, type FormEvent } from "react";
import { Link, Redirect, useLocation, useSearch } from "wouter";

export default function SignUp() {
  const { user, signUp } = useAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Redirect to={safeNext(search)} />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setSubmitting(true);
    try {
      await signUp(name, email, password);
      setLocation(safeNext(search));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Create an account" subtitle="Join Virtus Ventures.">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className={fieldClass}
          />
        </div>
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
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={fieldClass}
          />
          <p className="text-xs text-[oklch(0.5_0.01_60)]">
            At least 8 characters.
          </p>
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" disabled={submitting} className={submitClass}>
          {submitting ? <Spinner /> : "Create account"}
        </Button>
      </form>
      <p className="mt-8 text-sm text-center text-[oklch(0.6_0.01_60)] font-light">
        Already have an account?{" "}
        <Link
          href={`/signin${search ? `?${search}` : ""}`}
          className={linkClass}
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
