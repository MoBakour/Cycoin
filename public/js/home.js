/* Basic Scripts */
// Selectors
const homeSection = document.querySelector(".home-section");
const loginSection = document.querySelector(".login-section");
const signupSection = document.querySelector(".signup-section");
const backBtn = document.querySelector(".back-btn");
const cornerLogo = document.querySelector(".home-corner-logo");
// Password Selectors
const loginPassword = document.querySelector(".login-form .password-field");
const loginPasswordEye = document.querySelector(
    ".login-form .password-input i"
);
const signupPassword = document.querySelector(".signup-form .password-field");
const signupPasswordConfirm = document.querySelector(
    ".signup-form .password-confirm-field"
);
const signupPasswordEye = document.querySelector(
    ".signup-form .password-input i"
);
// All Input & Error Fields
const starInputs = document.querySelectorAll("input");
const starErrors = document.querySelectorAll(".form-error-format");
const starRadios = document.querySelectorAll("input[type='radio']");

// Open Login
function openLogin() {
    homeSection.style.transform = "translateX(100%)";
    loginSection.style.transform = "translateX(0)";
    signupSection.style.transform = "translateX(100%)";
    backBtn.style.display = "block";
    setTimeout(() => {
        backBtn.style.opacity = "1";
        cornerLogo.style.opacity = "1";
    }, 1);
}

// Open Signup
function openSingup() {
    homeSection.style.transform = "translateX(-100%)";
    loginSection.style.transform = "translateX(-100%)";
    signupSection.style.transform = "translateX(0)";
    backBtn.style.display = "block";
    setTimeout(() => {
        backBtn.style.opacity = "1";
        cornerLogo.style.opacity = "1";
    }, 1);
}

// Back Button
function backHome() {
    homeSection.style.transform = "translateX(0)";
    loginSection.style.transform = "translateX(-100%)";
    signupSection.style.transform = "translateX(100%)";
    backBtn.style.opacity = "0";
    cornerLogo.style.opacity = "0";
    setTimeout(() => {
        backBtn.style.display = "none";
        starInputs.forEach((input) => (input.value = ""));
        starErrors.forEach((error) => (error.innerText = ""));
        starRadios.forEach((radio) => (radio.checked = false));
    }, 300);
}

// Show/Hide Password
function showPassword(x) {
    switch (x) {
        case 0:
            loginPassword.type = "text";
            loginPasswordEye.setAttribute("onclick", "hidePassword(0)");
            loginPasswordEye.classList.remove("fa-eye");
            loginPasswordEye.classList.add("fa-eye-slash");
            break;
        case 1:
            signupPassword.type = "text";
            signupPasswordConfirm.type = "text";
            signupPasswordEye.setAttribute("onclick", "hidePassword(1)");
            signupPasswordEye.classList.remove("fa-eye");
            signupPasswordEye.classList.add("fa-eye-slash");
            break;
    }
}
function hidePassword(x) {
    switch (x) {
        case 0:
            loginPassword.type = "password";
            loginPasswordEye.setAttribute("onclick", "showPassword(0)");
            loginPasswordEye.classList.remove("fa-eye-slash");
            loginPasswordEye.classList.add("fa-eye");
            break;
        case 1:
            signupPassword.type = "password";
            signupPasswordConfirm.type = "password";
            signupPasswordEye.setAttribute("onclick", "showPassword(1)");
            signupPasswordEye.classList.remove("fa-eye-slash");
            signupPasswordEye.classList.add("fa-eye");
            break;
    }
}

/* Sending Signup Request */
// Selectors
const signupBtn = document.querySelector(".signup-submit-btn");
const usernameField = document.querySelector(".signup-username-input");
const passwordField = document.querySelector(".signup-password-input");
const passwordConfirmField = document.querySelector(
    ".signup-password-confirm-input"
);
const genderRadios = document.querySelectorAll(
    ".signup-form input[name='gender']"
);
const su_successIndicator = document.querySelector(".su-success");

// Error Fields Selectors
const su_usernameError = document.querySelector(".signup-username-error");
const su_passwordError = document.querySelector(".signup-password-error");
const su_passwordConfirmationError = document.querySelector(
    ".signup-password-confirmation-error"
);
const su_genderError = document.querySelector(".signup-gender-error");
const allSuErrorFields = document.querySelectorAll(
    ".signup-form .form-error-format"
);

// Send Request
signupBtn.addEventListener("click", () => {
    // Get Checked Gender
    let checkedGender = "";
    genderRadios.forEach((input) => {
        if (input.checked) {
            checkedGender = input.id;
        }
    });
    // Clear Error Fields
    allSuErrorFields.forEach((field) => {
        field.innerText = "";
    });
    // Send Signup Request
    fetch("/signup", {
        method: "POST",
        body: JSON.stringify({
            userName: usernameField.value,
            userPassword: passwordField.value,
            userPasswordConfirmation: passwordConfirmField.value,
            userGender: checkedGender,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                su_successIndicator.classList.add("form-success-active");
                setTimeout(() => {
                    location.href = "/";
                }, 1000);
            } else if (data.errorsObject) {
                su_usernameError.innerText = data.errorsObject.userNameError;
                su_passwordError.innerText =
                    data.errorsObject.userPasswordError;
                su_passwordConfirmationError.innerText =
                    data.errorsObject.userPasswordConfirmationError;
                su_genderError.innerText = data.errorsObject.userGenderError;
            }
        })
        .catch((err) => console.log(err));
});

/* Send Login Request */
// Selectors
const loginBtn = document.querySelector(".login-submit-btn");
const l_username = document.querySelector(".login-username-input");
const l_password = document.querySelector(".login-password-input");
const l_usernameError = document.querySelector(".login-username-error");
const l_passwordError = document.querySelector(".login-password-error");
const l_allErrorFields = document.querySelectorAll(
    ".login-form .form-error.format"
);
const li_successIndicator = document.querySelector(".li-success");

// Send Request
loginBtn.addEventListener("click", () => {
    // Clear Error Fields
    l_allErrorFields.forEach((field) => {
        field.innerText = "";
    });
    // Send Login Request
    fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            userName: l_username.value,
            userPassword: l_password.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                li_successIndicator.classList.add("form-success-active");
                setTimeout(() => {
                    location.href = "/";
                }, 1000);
            } else {
                l_usernameError.innerText = data.loginErrors.usernameError;
                l_passwordError.innerText = data.loginErrors.passwordError;
                if (data.loginErrors.serverError != "")
                    alert(data.loginErrors.serverError);
            }
        })
        .catch((err) => console.log(err));
});

/* Send Login/Signup Requests By Enter Key */
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
loginForm.addEventListener("keydown", (e) => {
    if (e.key == "Enter") loginBtn.click();
});
signupForm.addEventListener("keydown", (e) => {
    if (e.key == "Enter") signupBtn.click();
});
