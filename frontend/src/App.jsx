import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PageLoader from "./components/PageLoader.jsx";
import { useAuthStore } from "./store/useAuthStore";

const toastOptions = {
  duration: 3500,
  style: {
    background: "#1A2B3D",
    color: "#EAF1F7",
    border: "1px solid #2F4B66",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "12px",
    boxShadow: "0 12px 40px -12px rgb(0 0 0 / 0.7)",
  },
  success: { iconTheme: { primary: "#3DD68C", secondary: "#0E1822" } },
  error: { iconTheme: { primary: "#F5716F", secondary: "#0E1822" } },
};

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" toastOptions={toastOptions} />
    </>
  );
}

export default App;
