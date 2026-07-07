let eventName = localStorage.getItem("event-name");
document.getElementById("eventTitle").innerHTML = eventName;

let events_registration = JSON.parse(localStorage.getItem("registration")) || {};
console.log(events_registration);
if (!events_registration[eventName]) {events_registration[eventName] = {}};

let name = document.getElementsByName("name-box")[0];
let number = document.getElementsByName("number-box")[0];
let mail = document.getElementsByName("mail-box")[0];
let gender = document.getElementById("gender");
let age = document.getElementById("age");
document.getElementById("save").addEventListener("click", function() {
    if (name.value.trim().length == 0 || number.value.trim().length == 0 || mail.value.trim().length == 0 || age.value.trim() == "--Select Your Age--" || gender.value == "--Select Your Gender--") {
        document.getElementById("errorMsg").innerHTML = "❗Above fields cannot be empty"; 
        document.getElementById("errorMsg").style.color = "red";
    }
    else if (number.value.trim().length != 10 || isNaN(number.value.trim())) {
        document.getElementById("errorMsg").innerHTML = "❗Phone Number invalid"; 
        document.getElementById("errorMsg").style.color = "red";
    }
    else if (!mail.value.trim().includes("@gmail.com")) {
        document.getElementById("errorMsg").innerHTML = "❗E-mail invalid";
        document.getElementById("errorMsg").style.color = "red";
    }
    else {
        document.getElementById("errorMsg").innerHTML = ""; 
        if (!events_registration[eventName][number.value]) {events_registration[eventName][number.value] = {}}
        events_registration[eventName][number.value]["name"] = `${name.value.trim()}`;
        events_registration[eventName][number.value]["phone-number"] = `${number.value.trim()}`;
        events_registration[eventName][number.value]["age"] = `${age.value}`;
        events_registration[eventName][number.value]["gender"] = `${gender.value}`;
        events_registration[eventName][number.value]["mail"] = `${mail.value.trim()}`;
        localStorage.setItem("registration", JSON.stringify(events_registration));
        window.location.href = "./index.html";
    }
})
document.getElementById("clear").addEventListener("click", function() {
    name.value = "";
    age.value = "--Select Your Age--";
    mail.value = "";
    number.value = "";
    gender.value = "--Select Your Gender--";
})
document.getElementById("cancel").addEventListener("click", function() {
    window.location.href = "./index.html" ;
})