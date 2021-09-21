"use strict";

// Elements
const labelWelcome = document.querySelector(".welcome");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const btnLogin = document.querySelector(".login__btn");
const containerApp = document.querySelector(".main-page");
const userPrompt = document.querySelector(".user_prompt");
const signUpPrompt = document.querySelector(".signup_prompt");
const loginPrompt = document.querySelector(".login_prompt");
const logoutPrompt = document.querySelector(".logout_prompt");
const btnSignUp = document.querySelector(".signup_btn");
const newUserName = document.querySelector(".signup_name");
const newUserEmail = document.querySelector(".signup_email");
const newUserUsername = document.querySelector(".signup_username");
const newUserPin = document.querySelector(".signup_pin");
const overlay = document.querySelector(".overlay");
const signUpForm = document.querySelector(".signup_form");
const loginForm = document.querySelector(".login_form");
const userProfilePrompt = document.querySelector(".user_profile_prompt");
const userProfile = document.querySelector(".user_profile_summary");
const userName = document.querySelector(".user_name");
const userEmail = document.querySelector(".user_email");
const userUsername = document.querySelector(".user_username");
const userPin = document.querySelector(".user_pin");
const userTime = document.querySelector(".user_time");
const timerGift = document.querySelector(".timer_gift");
const timerHold = document.querySelector(".timer_Hold");

logoutPrompt.classList.add("hidden");
// signUpForm.classList.add("hidden");
// loginForm.classList.add("hidden");

/* --- User Login --- */
//Login
loginPrompt.addEventListener("click", function () {
  // document.querySelector('.login').style.display = "flex";
  // document.querySelector('.login').style.visibility = "visible";
  document.querySelector(".login_form").style.display = "inline-block";
  // loginPrompt.classList.add("hidden");
  // signUpPrompt.classList.add("hidden");
  overlay.classList.remove("hidden");
  // logInPrompt.style.display = "none";
  // signUpPrompt.style.display = "none";
  // logInPrompt.style.visibility = "hidden";
  // signUpPrompt.style.visibility = "hidden";
});

/* --- Accounts --- */

const account0 = {
  name: "Thomas Anderson",
  email: "neo@gmail.com",
  username: "neo",
  pin: 1,
  time: 0,
};

const account1 = {
  name: "Samuel Jackson",
  email: "sj@gmail.com",
  username: "sj",
  pin: 2,
  time: 0,
};

const accounts = [account0, account1];

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
      currentAccount.name.split(" ")[0]
    }.`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Return user account controls
    logoutPrompt.classList.remove("hidden");
    loginForm.style.display = "none";
    userProfilePrompt.style.display = "inline-block";
    loginPrompt.classList.add("hidden");
    signUpPrompt.classList.add("hidden");

    // Reveal timer

    document.querySelector(".timer").style.visibility = "visible"; // Does not seem to like the "classList.add("hidden")" way"

    //Remove overlay
    overlay.classList.add("hidden");
  } else {
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});

// --- SIGN UP --- //
signUpPrompt.addEventListener("click", function () {
  document.querySelector(".signup_form").style.display = "inline-block";
  loginPrompt.classList.remove("hidden");
  signUpPrompt.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

let accountNumber = 1;
btnSignUp.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();
  ++accountNumber;
  if (
    newUserName.value != "" &&
    newUserEmail.value != "" &&
    newUserUsername.value != "" &&
    newUserPin.value != ""
  ) {
    const newAccount = {
      name: `${newUserName.value}`,
      email: `${newUserEmail.value}`,
      username: `${newUserUsername.value}`
        .toLowerCase()
        .trim()
        .replace(" ", ""),
      pin: Number(`${newUserPin.value}`),
      time: 0,
    };
    console.log(newAccount);
    accounts.push(newAccount);
    document.querySelector(".signup_form").style.display = "none";
    loginPrompt.style.visibility = "visible";
    signUpPrompt.style.visibility = "visible";
    overlay.classList.add("hidden");
  }
});

/* --- Click overlay to exit --- */
overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  // loginPrompt.classList.remove("hidden");
  // signUpPrompt.classList.remove("hidden");
  signUpForm.style.display = "none";
  loginForm.style.display = "none";
  userProfile.style.display = "none";
  // signupForm.classList.add("hidden");
  // loginForm.classList.add("hidden");
});

/* --- User profile --- */

userProfilePrompt.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  userProfile.style.display = "inline-block";
  document.querySelector(".user_profile_welcome").textContent = `Hello, ${
    currentAccount.name.split(" ")[0]
  }.`;
  userName.textContent = `Full name: ${currentAccount.name}`;
  userEmail.textContent = `Email: ${currentAccount.email}`;
  userUsername.textContent = `Username: ${currentAccount.username}`;
  userPin.textContent = `Pin: ${currentAccount.pin}`;
  userTime.textContent = `Time: ${currentAccount.time} seconds`;
});

/* --- Sign out --- */
logoutPrompt.addEventListener("click", function () {
  currentAccount = null;
  loginPrompt.classList.remove("hidden");
  signUpPrompt.classList.remove("hidden");
  logoutPrompt.classList.add("hidden");
  labelWelcome.textContent = 'Login to get started';
  document.querySelector(".timer").style.visibility = "hidden"; 
  userProfilePrompt.style.display = "none";
});

/* --- Timer --- */
const btnStart = document.querySelector(".timer_start");
const btnEnd = document.querySelector(".timer_end");
let hoursLabel = document.querySelector(".hours");
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let totalSeconds = 0;
let acc;

// Start timer functionality

btnStart.addEventListener("click", function () {
  acc = setInterval(setTime, 1000);
});

// Stop timer functionality
btnEnd.addEventListener("click", function () {
  clearInterval(acc);
});

for(const firstName of accounts){
  console.log(firstName.username.split(" ")[0]);
}

// Gift time functionality

timerGift.addEventListener('click', function(){
  

});

// Confirm gift
// timerGift.addEventListener('click', function(){
//   totalSeconds = 0;
//   secondsLabel.innerHTML = "00";
//   minutesLabel.innerHTML = "00";
//   hoursLabel.innerHTML = "00";

// });


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
