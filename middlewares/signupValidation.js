function signupValidation(data) {
    // REGEX
    let username_regex = /^[a-zA-Z0-9_]*$/;

    // Errors Object
    let errors = {
        userNameError: "",
        userPasswordError: "",
        userPasswordConfirmationError: "",
        userGenderError: ""
    };

    // Username Errors
    if (data.hasOwnProperty("userName")) {
        if (data.userName.length > 20) errors.userNameError = "Ough! Too long, max 20 characters";
        if (data.userName == "") errors.userNameError = "Don't you need a username?";
        if (!username_regex.test(data.userName)) errors.userNameError = "Please use letters, numbers, and underscores only";
        if (data.userName.includes(" ")) errors.userNameError = "Nope, no spaces allowed";
    }

    // Password Errors
    if (data.hasOwnProperty("userPassword")) {
        if (data.userPassword.length > 100) errors.userPasswordError = "Ough! Too long, max 100 characters";
        if (data.userPassword.length < 6) errors.userPasswordError = "Too short, min 6 characters";
        if (data.userPassword.includes(" ")) errors.userPasswordError = "Nope, no spaces allowed";
        if (data.userPassword == "") errors.userPasswordError = "Don't you need a password?";
        // Password Confirmation Errors
        if (data.userPassword !== data.userPasswordConfirmation) errors.userPasswordConfirmationError = "Can't confirm your password properly?";   
    }

    // Gender Errors
    if (data.hasOwnProperty("userGender")) {
        if (data.userGender !== "male" && data.userGender !== "female") errors.userGenderError = "You can't be genderless -.-?";
    }

    return errors;
}

module.exports = signupValidation;