// formValidation.js
export const validateForm = (formData) => {
    const { name, email, number, country } = formData;
    let errors = {};
    let isValid = true;
  
    if (name.trim() === "") {
      errors.name = "Please enter a valid name";
      isValid = false;
    }
  
    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }
  
    if (number.trim() === "" || isNaN(number)) {
      errors.number = "Please enter a valid number";
      isValid = false;
    }
  
    if (country.trim() === "") {
      errors.country = "Please enter a valid country";
      isValid = false;
    }
    return { isValid, errors };
  };
  