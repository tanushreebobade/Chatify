import { useState } from "react";
import { Link } from "react-router";
import { LoaderIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function SignupPage() {
  const { signUp, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!formData.fullName.trim()) next.fullName = "Enter your name.";
    if (!EMAIL_RE.test(formData.email.trim())) next.email = "Enter a valid email address.";
    if (formData.password.length < 6) next.password = "Use at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    signUp({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="focus-ring rounded font-semibold text-lagoon-400 hover:text-lagoon-300">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="Full name"
          icon={UserIcon}
          name="fullName"
          autoComplete="name"
          placeholder="Your name"
          value={formData.fullName}
          onChange={update("fullName")}
          error={errors.fullName}
          disabled={isSigningUp}
        />
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
          disabled={isSigningUp}
        />
        <FormField
          label="Password"
          icon={LockIcon}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={update("password")}
          error={errors.password}
          hint={!errors.password ? "Use at least 6 characters." : undefined}
          disabled={isSigningUp}
        />
        <button type="submit" className="btn-primary w-full" disabled={isSigningUp} aria-busy={isSigningUp}>
          {isSigningUp ? (
            <>
              <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
              Creating account
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
