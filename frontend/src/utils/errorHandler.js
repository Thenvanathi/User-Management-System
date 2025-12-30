export const handleApiError = (error) => {
  console.error("API Error:", error);

  let message = "Something went wrong. Please try again.";

  if (error.response) {
    message =
      error.response.data?.message || `Server error: ${error.response.status}`;
    switch (error.response.status) {
      case 401:
        message = "Session expired. Please login again.";
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        break;
      case 403:
        message = "You do not have permission to perform this action.";
        break;
      case 404:
        message = "Resource not found.";
        break;
      case 422:
        message = "Validation error. Please check your input.";
        break;
      case 500:
        message = "Internal server error. Please try again later.";
        break;
    }
  } else if (error.request) {
    message = "Network error. Please check your connection.";
  }

  return message;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      minLength: !minLength ? "Must be at least 8 characters" : null,
      hasUpperCase: !hasUpperCase ? "Must contain uppercase letter" : null,
      hasLowerCase: !hasLowerCase ? "Must contain lowercase letter" : null,
      hasNumbers: !hasNumbers ? "Must contain number" : null,
    },
  };
};
