let button = document.getElementsByClassName("btn")
let eventName = document.getElementsByClassName("eventName")
console.log(eventName)
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function() {
        localStorage.setItem("event-name", `${eventName[i].innerText}`);
        window.location.href = "./registration.html";     
    })
}  

