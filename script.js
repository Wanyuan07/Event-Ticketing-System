let button = document.getElementsByClassName("btn")
let eventName = document.getElementsByClassName("eventName")
console.log(eventName)
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function() {
        localStorage.setItem("event-name", `${eventName[i].innerText}`);
        window.location.href = "./registration.html";     
    })
}  

let totalSeats = document.getElementsByClassName("totalSeats")
let seats = JSON.parse(localStorage.getItem("seat-number")) || {};
for (let i = 0; i<eventName.length; i++) {
    if(!seats[eventName[i].innerText]) {seats[eventName[i].innerText] = 0};
}
localStorage.setItem("seat-number", JSON.stringify(seats));
console.log(seats)
let seatsRemaining = document.getElementsByClassName("seats-remaining");
for (let i = 0; i<seatsRemaining.length; i++) {
    seatsRemaining[i].innerHTML = `Seats filled: ${seats[eventName[i].innerText]}
                                   (${totalSeats[i].innerHTML.split(" ")[3] - seats[eventName[i].innerText]} left)`;
}
