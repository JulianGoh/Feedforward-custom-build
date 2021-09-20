"use strict";

// Elements
const labelWelcome = document.querySelector(".welcome");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const btnLogin = document.querySelector(".login__btn");
const containerApp = document.querySelector(".main-page");
const signUpPrompt = document.querySelector(".signup_prompt");
const logInPrompt = document.querySelector(".login_prompt");
const userPrompt = document.querySelector(".user_prompt");
const btnSignUp = document.querySelector(".signup_btn");
const newUserEmail = document.querySelector(".signup_email");
const newUserUsername = document.querySelector(".signup_username");
const newUserPin = document.querySelector(".signup_pin");
const overlay = document.querySelector(".overlay");

/* --- User Login --- */
//Login
logInPrompt.addEventListener("click", function () {
  // document.querySelector('.login').style.display = "flex";
  // document.querySelector('.login').style.visibility = "visible";
  document.querySelector(".login_form").style.display = "inline-block";
  logInPrompt.style.visibility = "hidden";
  signUpPrompt.style.visibility = "hidden";
  overlay.classList.remove('hidden');
  // logInPrompt.style.display = "none";
  // signUpPrompt.style.display = "none";
  // logInPrompt.style.visibility = "hidden";
  // signUpPrompt.style.visibility = "hidden";
});

/* --- Accounts --- */

const account0 = {
  owner: "Thomas Anderson",
  username: "neo",
  pin: 1,
};

const accounts = [account0];

// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // containerApp.style.opacity = 100;
    document.querySelector(".timer").style.visibility = "visible";

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  } else {
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});

//Sign up
signUpPrompt.addEventListener("click", function () {
  document.querySelector(".signup_form").style.display = "inline-block";
  logInPrompt.style.visibility = "hidden";
  signUpPrompt.style.visibility = "hidden";
  overlay.classList.remove('hidden');
});

let accountNumber = 1;
btnSignUp.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();
  ++accountNumber;
  if (
    newUserEmail.value != "" &&
    newUserUsername.value != "" &&
    newUserPin.value != ""
  ) {
    const newAccount = {
      owner: `${newUserEmail.value}`,
      username: `${newUserUsername.value}`,
      pin: `${newUserPin.value}`,
    };
    console.log(newAccount);
    accounts.push(newAccount);
    document.querySelector(".signup_form").style.display = "none";
    logInPrompt.style.visibility = "visible";
    signUpPrompt.style.visibility = "visible";
  }
});


/* --- Click overlay to exit --- */
overlay.addEventListener("click", function () {
  overlay.classList.add('hidden');
  logInPrompt.style.visibility = "visible";
  signUpPrompt.style.visibility = "visible";
  document.querySelector(".signup_form").style.display = "none";
  document.querySelector(".login_form").style.display = "none";
});

/* --- Timer --- */
const btnStart = document.querySelector(".timer-start");
const btnEnd = document.querySelector(".timer-end");
let hoursLabel = document.querySelector(".hours");
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let totalSeconds = 0;
let acc;
btnStart.addEventListener("click", function () {
  acc = setInterval(setTime, 1000);
});
btnEnd.addEventListener("click", function () {
  clearInterval(acc);
});

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60) % 60);
  hoursLabel.innerHTML = pad(parseInt(totalSeconds / 3600));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
