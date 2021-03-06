const mainElement = document.querySelector("#app");
let audio = new Audio("./audio/Deathmusic.mp3");
let audioAfrican = new Audio("./audio/African-Coffin.mp3");
let currentCustomer;
let currentVictim;
showStartPage();
enterTheSystem();
addCustomerHandler();
