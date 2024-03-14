/* Transition Between App Sections */
// selectors
const nav_ul = document.querySelector(".app-header nav ul");
const backBtn = document.querySelector(".back-btn");
const dashboardSection = document.querySelector(".dashboard");
const leaderboardSection = document.querySelector(".leaderboard");
// set overflow after intro animation
setTimeout(() => {
    dashboardSection.style.overflow = "hidden";
}, 1000);
// open section functions
function openSection(sec) {
    let sectionSelector = document.querySelector(`.${sec}`);
    if (!sectionSelector)
        return console.error(
            `Client Side Error: DOM section element .${sec} not found`
        );
    let currentOpened = document.querySelector(".section-opened");
    currentOpened.classList.remove("section-opened");
    sectionSelector.classList.add("section-opened");
    sectionSelector.style.height = "auto";
    setTimeout(() => {
        currentOpened.style.height = "0";
    }, 300);
    if (sec == "dashboard") {
        nav_ul.style.display = "block";
        backBtn.style.display = "none";
    } else {
        nav_ul.style.display = "none";
        backBtn.style.display = "block";
    }
}

/* Transition Between Settings Divs */
// open section function
function openSettings(div) {
    let divSelector = document.querySelector(`.${div}-settings`);
    if (!divSelector)
        return console.error(
            `Client Side Error" DOM div element .${div}-settings not found`
        );
    document
        .querySelector(".settings-opened")
        .classList.remove("settings-opened");
    divSelector.classList.add("settings-opened");
    document
        .querySelectorAll(".settings .current-option")
        .forEach((el) => el.classList.remove("current-option"));
    document
        .querySelectorAll(`[data-btn-name='${div}']`)
        .forEach((el) => el.classList.add("current-option"));
}

/* Logout Script */
function logout() {
    fetch("/logout", {
        method: "POST",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) location.href = "/";
        })
        .catch((err) => console.log(err));
}

/* Open Edit Divs */
// selectors
const darken = document.querySelector(".darken");
const allEditFields = document.querySelectorAll(".popup input");
const allEditErrorFields = document.querySelectorAll(".edit-error-field");

// open div
function openDiv(popup) {
    let popupSelector = document.querySelector(`.edit-${popup}`);
    popupSelector.classList.add("opened-div");
    darken.classList.add("darken-active");
    clearEditPopups();
}

// close divs
darken.addEventListener("click", () => {
    document.querySelector(".opened-div").classList.remove("opened-div");
    darken.classList.remove("darken-active");
});

// Clear Edit Error Fields
function clearEditPopups() {
    allEditFields.forEach((field) => (field.value = ""));
    allEditErrorFields.forEach((field) => {
        field.innerText = "";
        field.style.color = "var(--error-color)";
        field.style.display = "none";
    });
}

// Set Success Edit Messages
let editError = null;
function successEditMessage() {
    editError.style.display = "block";
    editError.style.color = "lime";
    editError.innerText = "All good! one sec";
}

/* Send Edit User Account Request */
function editAccount(selfId, edit) {
    let self = document.querySelector(`#${selfId}`);
    let username = (password = confirmPassword = newPassword = null);
    let refreshPage = (activateDarken = false);
    switch (edit) {
        case "username":
            username = self.parentElement.children[1].value;
            password = self.parentElement.children[2].value;
            editError = document.querySelector(
                ".edit-username .edit-error-field"
            );
            refreshPage = true;
            break;
        case "password":
            password = self.parentElement.children[1].value;
            newPassword = self.parentElement.children[2].value;
            confirmPassword = self.parentElement.children[3].value;
            editError = document.querySelector(
                ".edit-password .edit-error-field"
            );
            activateDarken = true;
            break;
        case "delete":
            username = self.parentElement.children[1].value;
            password = self.parentElement.children[2].value;
            editError = document.querySelector(
                ".edit-delete .edit-error-field"
            );
            break;
    }
    fetch("/edit", {
        method: "POST",
        body: JSON.stringify({
            edit,
            username,
            password,
            newPassword,
            confirmPassword,
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                editError.style.display = "block";
                return (editError.innerText = data.editError);
            } else {
                if (edit == "delete") {
                    openAlert(
                        "Are you sure you want to delete your account?",
                        deleteAccount
                    );
                } else {
                    successEditMessage();
                }
                setTimeout(() => {
                    if (refreshPage) location.reload();
                    if (activateDarken) darken.click();
                }, 800);
            }
        })
        .catch((err) => console.log(err));
}

/* Send Delete Account Request */
function deleteAccount() {
    fetch("/deleteaccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                successEditMessage();
                setTimeout(() => {
                    logout();
                }, 800);
            }
        });
}

/* Send Add Item Request */
const userCoinsField = document.querySelector(".stat-coins .stat-content");
const userBalanceField = document.querySelector(
    ".user-balance .balance-content span"
);
function addItem(prevEl) {
    let weight = prevEl.value;
    fetch("/additem", {
        method: "POST",
        body: JSON.stringify({ weight }),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            let editError = document.querySelector(
                ".edit-items .edit-error-field"
            );
            if (!data.success) {
                editError.style.display = "block";
                editError.style.color = "var(--error-color)";
                editError.innerText = data.editError;
            } else {
                editError.style.display = "block";
                editError.style.color = "lime";
                editError.innerText = "All good! item added";
                setTimeout(clearEditPopups, 1000);
                insertItem(weight, data.dateInserted);
                userCoinsField.innerText = numberFormatter(
                    data.userCoins,
                    userCoinsField.getAttribute("data-format")
                );
                userBalanceField.innerText = numberFormatter(
                    data.userBalance,
                    userBalanceField.getAttribute("data-format")
                );
            }
        })
        .catch((err) => console.log(err));
}

/* Insert New Items */
const itemsTable = document.querySelector(".my-items .table");
const itemsNumber = document.querySelector(
    ".user-statistics .stat-items .stat-content"
);
const noItemMsg = document.querySelector(".no-items-msg");
function insertItem(weight, dateInserted) {
    if (noItemMsg) noItemMsg.remove();
    itemsNumber.innerText = parseInt(itemsNumber.innerText) + 1;
    weight = parseFloat(weight);
    for (let i = 0; i < itemsTable.childElementCount; i++) {
        let nth = itemsTable.children[i].children[0];
        if (!nth) continue;
        nth.innerText = parseInt(nth.innerText) + 1;
    }
    itemsTable.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="table-element special-element">
            <div class="item-number">
                1
            </div>
            <div class="item-weight" data-item-weight="${weight}">
                ${numberFormatter(weight, "weight")}
            </div>
            <div class="item-date" data-item-date="${dateInserted}">
                ${numberFormatter(dateInserted, "date")}
            </div>
        </div>
    `
    );
}
