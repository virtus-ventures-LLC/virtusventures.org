import { AuthLayout, submitClass } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

/** Members-only page. Placeholder for whatever signed-in users get next. */
export default function Account() {
  const { user, signOut } = useAuth();
  const [, setLocation] = useLocation();
  if (!user) return null;

  async function onSignOut() {
    await signOut();
    setLocation("/");
  }

  return (
    <AuthLayout
      title={`Welcome, ${user.name}`}
      subtitle="You're signed in to Virtus Ventures."
    >
      <dl className="space-y-4 text-sm mb-8">
        <div>
          <dt className="uppercase tracking-[0.2em] text-xs text-[oklch(0.5_0.01_60)] mb-1">
            Email
          </dt>
          <dd className="text-white">{user.email}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.2em] text-xs text-[oklch(0.5_0.01_60)] mb-1">
            Member since
          </dt>
          <dd className="text-white">
            {new Date(user.createdAt).toLocaleDateString()}
          </dd>
        </div>
      </dl>
      <Button onClick={onSignOut} className={submitClass}>
        Sign out
      </Button>
    </AuthLayout>
  );
}
