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

export { capitalize, areAllPropertiesTruthy };
