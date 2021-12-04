// Console Messages
let red = Math.floor(Math.random() * 256);
let green = Math.floor(Math.random() * 256);
let blue = Math.floor(Math.random() * 256);
console.log("%cWARNING: if you are an admin, please refrain from using the admin commands on public or foreign devices or computers", "color:crimson;font-size:30px;");
console.log("%cWARNING: this console is intended for developers use only, if you are not the developer or a cycoin admin, please do not use any command here", "color:yellow;font-size:30px;");
console.log("%cتحذير: وحدة التحكم هذه موجهة لاستخدام المطورين فقط، إن لم تكن المطور أو أحد مشرفي سايكوين، يرجى عدم استخدامك لأي أمر هنا", "color:yellow;font-size:30px;");
console.log("%cCycoin, is an economy subject project done by AWPS senior students of grade 12B1, 2021/2022", `color:rgb(${red},${green},${blue});font-size:30px;`);

// Sending Admin Commands To The Server
function admin_command(command, username, password) {
    if (arguments.length == 2) {
        password = username;
        username = null;
    };
    fetch("/admin-command", {
        method: "POST",
        body: JSON.stringify({ command, username, password }),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log("%cSuccess", "color:lime;");
        } else {
            console.log("%cFailure", "color:crimson;");
        }
        if (data.returns) console.table(data.returns);
    })
    .catch(err => console.log(err));
}

// Confirmation Alert
const confAlert = document.querySelector(".conf-alert");
const confAlertTxt = document.querySelector(".conf-alert-txt");
const confDarken = document.querySelector(".darken");
let doFunc = null;
function openAlert(txt, funcToDo) {
    confAlertTxt.innerText = txt;
    confAlert.classList.add("conf-alert-opened");
    confDarken.classList.add("darken-active");
    doFunc = funcToDo;
}
function alertCancel() {
    confAlert.classList.remove("conf-alert-opened");
    confDarken.classList.remove("darken-active");
    doFunc = null;
}
function alertConfirm() { doFunc() }