let eventName = localStorage.getItem("event-name");
document.getElementById("eventTitle").innerHTML = eventName;
console.log(eventName.replace(" ", "a").split("").filter(letter => letter.toUpperCase() == letter).join(""))

let seatCount = JSON.parse(localStorage.getItem("seat-number"))
let events_registration = JSON.parse(localStorage.getItem("registration")) || {};
console.log(events_registration);

if (!events_registration[eventName]) {events_registration[eventName] = {}};
document.getElementById("save").addEventListener("click", function() {
let name = document.getElementsByName("name-box")[0];
let number = document.getElementsByName("number-box")[0];
let mail = document.getElementsByName("mail-box")[0];
let gender = document.getElementById("gender");
let age = document.getElementById("age");

    let missingFields = [];

    if (name.value.trim().length === 0) {
        missingFields.push("Name");
    }
    if (number.value.trim().length === 0) {
        missingFields.push("Phone Number");
    }
    if (mail.value.trim().length === 0) {
        missingFields.push("Email");
    }
    if (age.value === "--Select Your Age--") {
        missingFields.push("Age");
    }
    if (gender.value === "--Select Your Gender--") {
        missingFields.push("Gender");
    }

    // 3. Handle the error display based on the array
    if (missingFields.length > 0) {
        // Join the missing fields with a comma (e.g., "Name, Email")
        let fieldsList = missingFields.join(", ");
        
        // Display the specific message in your box
        document.getElementById("errorMsg").innerHTML = `❗ ${fieldsList} cannot be empty`; 
        document.getElementById("errorMsg").classList.add("error-box");
        }
    else if (number.value.trim().length != 10 || isNaN(number.value.trim())) {
        document.getElementById("errorMsg").innerHTML = "❗Phone Number invalid"; 
        document.getElementById("errorMsg").classList.add("error-box");
    }
    else if (events_registration[eventName][number.value]) {
        document.getElementById("errorMsg").innerHTML = "❗Phone Number already exists"; 
        document.getElementById("errorMsg").classList.add("error-box");
    }
    else if (!mail.value.trim().includes("@gmail.com")) {
        document.getElementById("errorMsg").innerHTML = "❗E-mail invalid";
        document.getElementById("errorMsg").classList.add("error-box");
    }
    else {
        document.getElementById("errorMsg").innerHTML = ""; 
        document.getElementById("errorMsg").classList.remove("error-box");
        if (!events_registration[eventName][number.value]) {events_registration[eventName][number.value] = {}}
        events_registration[eventName][number.value]["name"] = `${name.value.trim()}`;
        events_registration[eventName][number.value]["phone-number"] = `${number.value.trim()}`;
        events_registration[eventName][number.value]["age"] = `${age.value}`;
        events_registration[eventName][number.value]["gender"] = `${gender.value}`;
        events_registration[eventName][number.value]["mail"] = `${mail.value.trim()}`;
        seatCount[eventName] += 1
        let eventKey = eventName.replace(" ", "a").split("").filter(letter => letter == letter.toUpperCase()).join("")
        events_registration[eventName][number.value]["uniqueID"] = `${eventKey}-${number.value.slice(-4)}-${seatCount[eventName]}`;
        localStorage.setItem("seat-number", JSON.stringify(seatCount));
        localStorage.setItem("registration", JSON.stringify(events_registration));

        let successBox = document.getElementById("successBox");
        document.getElementById("unique").innerHTML = `Your UniqueID: #${events_registration[eventName][number.value]["uniqueID"]}`;
        successBox.showModal()
    }
});


document.getElementById("clear").addEventListener("click", function() {
    name.value = "";
    age.value = "--Select Your Age--";
    mail.value = "";
    number.value = "";
    gender.value = "--Select Your Gender--";
});

document.getElementById("home").addEventListener("click", function() {
    window.location.href = "./index.html";
});

document.getElementById("cancel").addEventListener("click", function() {
    window.location.href = "./index.html" ;
})
