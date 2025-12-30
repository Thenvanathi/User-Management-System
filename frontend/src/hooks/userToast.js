import toast from "react-hot-toast";

const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
    });
  };

  const showError = (message) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
    });
  };

  const showLoading = (message) => {
    return toast.loading(message, {
      position: "top-right",
    });
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showLoading,
    dismissToast,
  };
};

export default useToast;
