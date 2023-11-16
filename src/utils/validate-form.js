import { validate as validateEmail } from 'email-validator';

const validateForm = {
  // Returns the error message to display for a required field
  required(inputName) {
    if (!inputName) return 'This field is required';

    const formattedInputName =
      inputName[0].toUpperCase() + inputName.slice(1).toLowerCase();
    return `${formattedInputName} is required`;
  },

  /** react-hook-form (RHF) validate methods:
   * valid --> if true is returned
   * invalid --> if false or string error message is returned
   
   * When invalid, RHF returns an error for the corresponding input
   * Then we can use the errors to render error messages per input in the UI 
   */
  email(email, message = 'Incorrect email format') {
    return validateEmail(email) || message;
  },

  registerPassword(pw) {
    // Validate length is between 8-16 (inclusive)
    if (pw.length < 8) return 'Must contain at least 8 characters';
    if (pw.length > 16) return 'Must not exceed length of 16 characters';

    // Contains correct chars, one of each: uppercase, lowercase, number, special
    const hasUppercaseLetter = /[A-Z]/g.test(pw);
    const hasLowercaseLetter = /[a-z]/g.test(pw);
    const hasNumber = /[0-9]/g.test(pw);
    const hasSpecialCharacter = /[^A-Za-z0-9\s]/g.test(pw);

    // Accumulate amendments required to fulfil valid password criteria
    let amendmentsRequired = [];

    if (!hasUppercaseLetter) amendmentsRequired.push('an uppercase letter');
    if (!hasLowercaseLetter) amendmentsRequired.push('a lowercase letter');
    if (!hasNumber) amendmentsRequired.push('a number');
    if (!hasSpecialCharacter)
      amendmentsRequired.push(
        'a special character: ()`~!@#$%^&*-+=|{}[]:;"\'<>,.?/_'
      );

    // Valid password, no amendments required
    if (amendmentsRequired.length === 0) return true;

    // Invalid password, return prompt to help user create strong password
    return (
      `Missing required character${
        amendmentsRequired.length > 1 ? 's' : ''
      }: ` + amendmentsRequired.join(', ')
    );
  },

  confirmPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword || "Passwords don't match";
  },
};

export default validateForm;
