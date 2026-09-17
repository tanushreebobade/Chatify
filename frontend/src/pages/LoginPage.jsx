import { useState } from "react";
import { Link } from "react-router";
import { LoaderIcon, LockIcon, MailIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function LoginPage() {
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(formData.email.trim())) next.email = "Enter a valid email address.";
    if (!formData.password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;
    login({ email: formData.email.trim(), password: formData.password });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to pick up your conversations."
      footer={
        <>
          New to Chatify?{" "}
          <Link to="/signup" className="focus-ring rounded font-semibold text-lagoon-400 hover:text-lagoon-300">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="Email"
          icon={MailIcon}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={update("email")}
          error={errors.email}
          disabled={isLoggingIn}
        />
        <FormField
          label="Password"
          icon={LockIcon}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={formData.password}
          onChange={update("password")}
          error={errors.password}
          disabled={isLoggingIn}
        />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-lagoon-400 hover:text-lagoon-300">
            Forgot Password?
          </Link>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={isLoggingIn} aria-busy={isLoggingIn}>
          {isLoggingIn ? (
            <>
              <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
              Signing in
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
