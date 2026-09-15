// Turns an Axios/network error into something a person can act on. The raw
// error is still logged by the caller so developers keep the details.
export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (!error) return fallback;

  if (error.code === "ERR_NETWORK" || (error.request && !error.response)) {
    return "Can't reach the server. Check your connection and try again.";
  }

  const status = error.response?.status;
  const serverMessage = error.response?.data?.message;

  if (status === 429) return "You're doing that a lot. Give it a moment and try again.";
  if (status === 403 && /bot/i.test(serverMessage || "")) return "Request blocked. Refresh and try again.";
  if (status >= 500) return "Something went wrong on our end. Please try again.";

  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage.charAt(0).toUpperCase() + serverMessage.slice(1);
  }

  return fallback;
};
