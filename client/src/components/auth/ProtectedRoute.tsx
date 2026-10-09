import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import type { ComponentType } from "react";
import { Redirect, useLocation } from "wouter";

/** Renders `component` only for signed-in users; others go to /signin. */
export function ProtectedRoute({
  component: Component,
}: {
  component: ComponentType;
}) {
  const { user, loading } = useAuth();
  const [location] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.08_0_0)]">
        <Spinner className="text-[oklch(0.75_0.12_75)]" />
      </div>
    );
  }
  if (!user) {
    return <Redirect to={`/signin?next=${encodeURIComponent(location)}`} />;
  }
  return <Component />;
}
