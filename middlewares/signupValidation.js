function signupValidation(data) {
    // Errors Object
    let errors = {
        userNameError: "",
        userPasswordError: "",
        userPasswordConfirmationError: "",
        userGenderError: ""
    };

    // Username Errors
    if (data.userName.length > 20) errors.userNameError = "Ough! Too long, max 20 characters";
    if (data.userName.includes(" ")) errors.userNameError = "Nope, no spaces allowed";
    if (data.userName == "") errors.userNameError = "Don't you need a username?";

    // Password Errors
    if (data.userPassword.length > 100) errors.userPasswordError = "Ough! Too long, max 100 characters";
    if (data.userPassword.length < 6) errors.userPasswordError = "Too short, min 6 characters";
    if (data.userPassword.includes(" ")) errors.userPasswordError = "Nope, no spaces allowed";
    if (data.userPassword == "") errors.userPasswordError = "Don't you need a password?";

    // Password Confirmation Errors
    if (data.userPassword !== data.userPasswordConfirmation) errors.userPasswordConfirmationError = "Can't you do it right?";

    // Gender Errors
    if (data.userGender !== "male" && data.userGender !== "female") errors.userGenderError = "You can't be genderless -.-?";

    return errors;
}

module.exports = signupValidation;