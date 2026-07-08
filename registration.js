let eventName = localStorage.getItem("event-name");
document.getElementById("eventTitle").innerHTML = eventName;
// 1. Initialize an empty array to hold the names of missing fields
let events_registration = JSON.parse(localStorage.getItem("registration")) || {};
console.log(events_registration);

if (!events_registration[eventName]) {events_registration[eventName] = {}};

let name = document.getElementsByName("name-box")[0];
let number = document.getElementsByName("number-box")[0];
let mail = document.getElementsByName("mail-box")[0];
let gender = document.getElementById("gender");
let age = document.getElementById("age");
document.getElementById("save").addEventListener("click", function() {
    let missingFields = [];



// 2. Check each field individually and push its name to the array if empty
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
        localStorage.setItem("registration", JSON.stringify(events_registration));
        let currentRegisteredCount = Object.keys(events_registration[eventName]).length;
        let uniqueId = currentRegisteredCount + 1;

        // Save this ID inside their registration object
        events_registration[eventName][number.value]["id"] = uniqueId;
        localStorage.setItem("registration", JSON.stringify(events_registration));


        let successBox = document.getElementById("successBox");
    successBox.innerHTML = `
        <h2>🎉 Thank You!</h2>
        <p>Your Registration ID is: <strong>#${uniqueId}</strong></p>
        <p>You have successfully registered for the event!</p>
        <p>Will keep you posted on further updates on your email and phone number.</p>
        <div class="social-links">
            <strong>Follow us:</strong>
            <a href="https://instagram.com" target="_blank">Instagram</a> | 
            <a href="https://twitter.com" target="_blank">Twitter</a> | 
            <a href="https://facebook.com" target="_blank">Facebook</a>
        </div>
    `;
    successBox.classList.add("success-message-box");

    
   
}
 
    }
)
document.getElementById("clear").addEventListener("click", function() {
    name.value = "";
    age.value = "--Select Your Age--";
    mail.value = "";
    number.value = "";
    gender.value = "--Select Your Gender--";

    let successBox = document.getElementById("successBox");
    successBox.innerHTML = ""; // This wipes out the Thank You text
    successBox.classList.remove("success-message-box"); // This removes the green styling box
});
    document.getElementById("cancel").addEventListener("click", function() {
    window.location.href = "./index.html" ;
})