function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function areAllPropertiesTruthy(obj: { [key: string]: any }): boolean {
  // Iterate over each property in the object
  for (let key in obj) {
    // Check if the property is directly on the object (not inherited)
    if (obj.hasOwnProperty(key)) {
      // If any property is falsy, return false
      if (!obj[key]) {
        return false;
      }
    }
  }
  // If all properties are truthy, return true
  return true;
}

const getApiURL = () => {
  if (import.meta.env.VITE_ENVIRONMENT === "development") {
    return "http://localhost:8080/api/tasks";
  } else if (import.meta.env.VITE_ENVIRONMENT === "production") {
    return "/api/tasks";
  } else {
    return "";
  }
};
const getSignupURL = () => {
  if (import.meta.env.VITE_ENVIRONMENT === "development") {
    return "http://localhost:8080/api/signup";
  } else if (import.meta.env.VITE_ENVIRONMENT === "production") {
    return "/api/signup";
  } else {
    return "";
  }
};
const getLoginURL = () => {
  if (import.meta.env.VITE_ENVIRONMENT === "development") {
    return "http://localhost:8080/api/login";
  } else if (import.meta.env.VITE_ENVIRONMENT === "production") {
    return "/api/login";
  } else {
    return "";
  }
};
export {
  capitalize,
  areAllPropertiesTruthy,
  getApiURL,
  getSignupURL,
  getLoginURL,
};
