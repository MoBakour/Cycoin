function signupValidation(data) {
    // REGEX
    let username_allowed_chars = /^[a-zA-Z0-9_]*$/;
    let username_blacklisted_words = [
        "arse",
        "ass",
        "bastard",
        "bitch",
        "crap",
        "cunt",
        "cock",
        "damn",
        "dick",
        "fuck",
        "fag",
        "nigga",
        "nigger",
        "penis",
        "pussy",
        "shit",
        "suck",
        "slut",
        "tits",
        "whore",
        "hoe",
        "gay",
        "lesbian",
        "gahba",
        "sharmot",
        "manyak",
    ];

    // Errors Object
    let errors = {
        userNameError: "",
        userPasswordError: "",
        userPasswordConfirmationError: "",
        userGenderError: "",
    };

    // Username Errors
    if (data.hasOwnProperty("userName")) {
        if (data.userName.length > 20)
            errors.userNameError = "Ough! Too long, max 20 characters";
        if (data.userName == "")
            errors.userNameError = "Don't you need a username?";
        if (!username_allowed_chars.test(data.userName))
            errors.userNameError =
                "Please use letters, numbers, and underscores only";
        if (
            username_blacklisted_words.some((word) =>
                data.userName.includes(word)
            )
        )
            errors.userNameError = "You dirty! get a proper nickname >:(";
        if (data.userName.includes(" "))
            errors.userNameError = "Nope, no spaces allowed";
    }

    // Password Errors
    if (data.hasOwnProperty("userPassword")) {
        if (data.userPassword.length > 100)
            errors.userPasswordError = "Ough! Too long, max 100 characters";
        if (data.userPassword.length < 6)
            errors.userPasswordError = "Too short, min 6 characters";
        if (data.userPassword.includes(" "))
            errors.userPasswordError = "Nope, no spaces allowed";
        if (data.userPassword == "")
            errors.userPasswordError = "Don't you need a password?";
        // Password Confirmation Errors
        if (data.userPassword !== data.userPasswordConfirmation)
            errors.userPasswordConfirmationError =
                "Can't confirm your password properly?";
    }

    // Gender Errors
    if (data.hasOwnProperty("userGender")) {
        if (data.userGender !== "male" && data.userGender !== "female")
            errors.userGenderError = "You can't be genderless -.-?";
    }

    return errors;
}

module.exports = signupValidation;
