import toast from "react-hot-toast";

const toastStyles = {
  success: {
    icon: "✅",
    style: {
      background: "#10B981",
      color: "white",
      fontWeight: "500",
    },
  },
  error: {
    icon: "❌",
    style: {
      background: "#EF4444",
      color: "white",
      fontWeight: "500",
    },
  },
  warning: {
    icon: "⚠️",
    style: {
      background: "#F59E0B",
      color: "white",
      fontWeight: "500",
    },
  },
  info: {
    icon: "ℹ️",
    style: {
      background: "#3B82F6",
      color: "white",
      fontWeight: "500",
    },
  },
};

// Toast functions
export const showToast = {
  success: (message, duration = 3000) => {
    toast.success(message, {
      duration,
      style: toastStyles.success.style,
      icon: toastStyles.success.icon,
    });
  },

  error: (message, duration = 4000) => {
    toast.error(message, {
      duration,
      style: toastStyles.error.style,
      icon: toastStyles.error.icon,
    });
  },

  warning: (message, duration = 3000) => {
    toast(message, {
      duration,
      style: toastStyles.warning.style,
      icon: toastStyles.warning.icon,
    });
  },

  info: (message, duration = 3000) => {
    toast(message, {
      duration,
      style: toastStyles.info.style,
      icon: toastStyles.info.icon,
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      style: {
        background: "#6B7280",
        color: "white",
        fontWeight: "500",
      },
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  promise: (promise, messages) => {
    return toast.promise(promise, messages);
  },
};

// Toast container wrapper
export const ToastContainer = () => {
  return (
    <div className="toast-container">
      {/* react-hot-toast will inject toasts here */}
    </div>
  );
};

export default showToast;
