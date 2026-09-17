import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { LoaderIcon, LockIcon, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = useAuthStore();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!formData.password || formData.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    
    const success = await resetPassword(token, formData.password);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Your new password must be different from previous used passwords."
      footer={
        <Link to="/login" className="flex items-center justify-center gap-2 font-medium text-lagoon-400 hover:text-lagoon-300">
          <ArrowLeft className="size-4" /> Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="New Password"
          icon={LockIcon}
          type="password"
          name="password"
          placeholder="New password"
          value={formData.password}
          onChange={update("password")}
          error={errors.password}
          disabled={isResettingPassword}
        />
        <FormField
          label="Confirm New Password"
          icon={LockIcon}
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={update("confirmPassword")}
          error={errors.confirmPassword}
          disabled={isResettingPassword}
        />
        <button type="submit" className="btn-primary w-full" disabled={isResettingPassword} aria-busy={isResettingPassword}>
          {isResettingPassword ? (
            <>
              <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
              Resetting password
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
