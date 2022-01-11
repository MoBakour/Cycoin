// selectors
const themeSwitch = document.querySelector(".dark-theme-switch");
const themeSwitchStatus = document.querySelector(".appearance-settings p");
const themeElement = document.querySelector(".theme-element");

// themes
let lightTheme = {
    bg_color: "#9CDFAB",
    color_one: "black",
    color_two: "white",
    error_color: "crimson",
    success_color: "lime",
    special_element: "#ffdddd",
    white: "white",
    black: "black",
    blue: "#9CCFDF",
    green: "#9CDFAB",
    green_two: "#A1FFB6",
};
let darkTheme = {
    bg_color: "#004F45",
    color_one: "white",
    color_two: "black",
    error_color: "crimson",
    success_color: "lime",
    special_element: "#ffdddd",
    white: "white",
    black: "black",
    blue: "#9CCFDF",
    green: "#9CDFAB",
    green_two: "#03675B",
};

// set themes default theme
let currentTheme = localStorage.getItem("theme") || "dark";

if (currentTheme == "light") setTheme(lightTheme);
if (currentTheme == "dark") setTheme(darkTheme);

// theme switch
if (themeSwitch) {
    if (currentTheme == "dark") {
        themeSwitch.classList.add("dark-theme-on");
        themeSwitchStatus.innerText = "On";
    }
    themeSwitch.addEventListener("click", () => {
        if (currentTheme == "light") {
            currentTheme = "dark";
            setTheme(darkTheme);
            themeSwitch.classList.add("dark-theme-on");
            themeSwitchStatus.innerText = "On";
        } else {
            currentTheme = "light";
            setTheme(lightTheme);
            themeSwitch.classList.remove("dark-theme-on");
            themeSwitchStatus.innerText = "Off";
        }
        localStorage.setItem("theme", currentTheme);
    });
}

// setTheme() function
function setTheme(theme) {
    themeElement.innerHTML = `
        :root {
            --bg-color: ${theme.bg_color};
            --color-one: ${theme.color_one};
            --color-two: ${theme.color_two};
            --error-color: ${theme.error_color};
            --success-color: ${theme.success_color};
            --special-element: ${theme.special_element};
            --white: ${theme.white};
            --black: ${theme.black};
            --blue: ${theme.blue};
            --green: ${theme.green};
            --green-two: ${theme.green_two};
        }
    `;
}
