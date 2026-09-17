import { useState } from "react";
import { Link } from "react-router";
import { LoaderIcon, MailIcon, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ForgotPasswordPage() {
  const { forgotPassword, isSendingResetLink } = useAuthStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    await forgotPassword(email.trim());
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`We've sent a password reset link to ${email}`}
        footer={
          <Link to="/login" className="flex items-center justify-center gap-2 font-medium text-lagoon-400 hover:text-lagoon-300">
            <ArrowLeft className="size-4" /> Back to sign in
          </Link>
        }
      >
        <div className="text-center text-sm text-ink-300">
          <p>Didn't receive the email? Check your spam folder or try again.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-lagoon-400 hover:text-lagoon-300 font-medium"
          >
            Try another email
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="flex items-center justify-center gap-2 font-medium text-lagoon-400 hover:text-lagoon-300">
          <ArrowLeft className="size-4" /> Back to sign in
        </Link>
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
          disabled={isSendingResetLink}
        />
        <button type="submit" className="btn-primary w-full" disabled={isSendingResetLink} aria-busy={isSendingResetLink}>
          {isSendingResetLink ? (
            <>
              <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
              Sending link
            </>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
