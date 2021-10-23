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
const btnSignUp = document.querySelector(".signup__btn");
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
const timerHold = document.querySelector(".timer_hold");
const giftMenu = document.querySelector(".gift_menu");
const giftUserTime = document.querySelector(".gift_user_time");
const giftConfirm = document.querySelector(".gift_confirm_btn");
const giftRecipient = document.querySelector(".gift_recipient");
const timeGift = document.querySelector(".time_gift");
const usersOther = document.querySelector(".users_other");
const usersOtherName = document.querySelector(".users_other_name");
const closeAccount = document.querySelector(".close_acc");
const closeAccountPin = document.querySelector(".close_acc_pin");

logoutPrompt.classList.add("hidden");

// Receive from API

// const request = new XMLHttpRequest();
// request.open("GET", "https://feedforward-api.herokuapp.com/accounts");
// request.send();

// request.addEventListener("load", function () {
//   const accountsAPI = JSON.parse(this.responseText);
//   console.log(accountsAPI);

// const newAcc = {
//   name: "John Wick",
//   email: "jw@gmail.com",
//   username: "jw",
//   pin: 3,
//   time: 0,
// };

// accountsAPI.push(newAcc);
// console.log(accountsAPI);

// (async () => {
//     const upload = await fetch('https://feedforward-api.herokuapp.com/accounts',
//     {
//     method: "POST",
//     body: JSON.stringify(accountsAPI),
//     });
//   const content = await upload.json();
//   console.log(content);

// })();

//

// });

// const newAcc = {
//   name: "John Wick",
//   email: "jw@gmail.com",
//   username: "jw",
//   pin: 3,
//   time: 0,
// };

//   fetch('https://feedforward-api.herokuapp.com/accounts', {
//   method: 'POST',
//   body: JSON.stringify(newAcc),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
//   })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// const accountsAPI_2 = fetch("https://feedforward-api.herokuapp.com/accounts")
//   .then((resp) => resp.json())
//   .then(function (data) {
//     console.log(data);
//     return data;
//   });

let userAccountsAPI;

const fetchAccounts = async function () {
  try{
  userAccountsAPI = await fetch("https://rocky-forest-33104.herokuapp.com/https://feedforward-api-2.herokuapp.com/accounts", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
    // mode: 'cors', //23/10/21 - Return back to 'cors' 
    // cache: 'default'
  });
  console.log(userAccountsAPI);
  } catch (err){
    console.log(err);
  }
};

fetchAccounts().then(accs => console.log(accs));

/* --- User Login --- */
//Login
loginPrompt.addEventListener("click", function () {
  document.querySelector(".login_form").style.display = "inline-block";
  overlay.classList.remove("hidden");
});

/* --- Accounts --- */

const account0 = {
  name: "Thomas Anderson",
  email: "neo@gmail.com",
  username: "neo",
  pin: 1,
  time: 999999,
};

const account1 = {
  name: "Samuel Jackson",
  email: "sj@gmail.com",
  username: "sj",
  pin: 2,
  time: 0,
};

const accounts = [account0, account1];
let userAccounts = JSON.parse(localStorage.getItem("userAccounts"));

const closeInterface = function () {
  currentAccount = null;
  loginPrompt.classList.remove("hidden");
  signUpPrompt.classList.remove("hidden");
  logoutPrompt.classList.add("hidden");
  labelWelcome.textContent = "Login to get started";
  document.querySelector(".timer").style.visibility = "hidden";
  userProfilePrompt.style.display = "none";
  userProfile.style.display = "none";
  overlay.classList.add("hidden");
};

// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  userAccounts = JSON.parse(localStorage.getItem("userAccounts"));

  currentAccount = userAccounts.find(
    (acc) => acc.username === inputLoginUsername.value.toLowerCase()
  );

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

    // const currentSeconds = currentAccount.time;
    // const currentMinutes = currentSeconds % 60;
    // const currentHours = (currentSeconds / 60) % 60;
    // const currentDays = currentSeconds / 3600;
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

    //Store new accounts array in localStorage
    localStorage.setItem("userAccounts", JSON.stringify(accounts));
  }
});

/* --- Click overlay to exit --- */
overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  signUpForm.style.display = "none";
  loginForm.style.display = "none";
  userProfile.style.display = "none";
  giftMenu.style.visibility = "hidden";

  table.innerHTML = "";
  // console.log(table);
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
  userTime.textContent = `Time: ${new Intl.NumberFormat("en-AU").format(
    currentAccount.time
  )} seconds`;
  document.querySelector(".timer").style.zIndex = "3";
});

/* --- Sign out --- */
logoutPrompt.addEventListener("click", function () {
  closeInterface();
});

/* --- Timer --- */
const btnStart = document.querySelector(".timer_start");
const btnEnd = document.querySelector(".timer_end");
let hoursLabel = document.querySelector(".hours");
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let totalSeconds = 0;
let acc;
let btnStartStatus = "disabled";

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60) % 60);
  hoursLabel.innerHTML = pad(parseInt(totalSeconds / 3600));
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Start timer functionality

btnStart.addEventListener("click", function () {
  if (btnStartStatus === "disabled") {
    //Start timer
    acc = setInterval(setTime, 1000);

    //Add overlay
    overlay.classList.remove("hidden");
    document.querySelector(".timer").style.zIndex = "8";

    //Prevent repeat btnStart presses
    btnStartStatus = "enabled";
  } else if (btnStartStatus === "enabled") {
  }
});

// Stop timer functionality
btnEnd.addEventListener("click", function () {
  //Stop timer from counting up
  clearInterval(acc);

  //Remove overlay
  overlay.classList.add("hidden");

  // Reset btnStartStatus
  btnStartStatus = "disabled";
});

// Gift time functionality

let para = [];
let name1 = [];
let table = document.createElement("table");
table.className = "gift_table";

// const currentHours =

timerGift.addEventListener("click", function () {
  // console.log(table);
  overlay.classList.remove("hidden");
  giftMenu.style.visibility = "visible";
  document.querySelector(".timer").style.zIndex = "3";

  //Time display
  giftUserTime.textContent = `You currently have: ${new Intl.NumberFormat(
    "en-AU"
  ).format(currentAccount.time)} seconds.`;
  document.querySelector(".gift_menu").appendChild(table);
  for (const [ind, user] of userAccounts.entries()) {
    let singleUser = document.createElement("div");
    singleUser.className = "single_user";

    let para = document.createElement("p");
    para.className = "users_other";
    let n = document.createElement("n");
    let text = document.createTextNode(user.username);

    n.appendChild(text);
    para.appendChild(n);
    singleUser.appendChild(para);

    table.appendChild(singleUser);
    // console.log(ind, user);
  }
});

giftConfirm.addEventListener("click", function () {
  let valueTransfer = Number(timeGift.value);
  let validAccount = userAccounts.find(
    (acc) => acc.username === giftRecipient.value
  );
  if (
    // 14/10/21 - Does not allow 'Enter' to submit time gift
    currentAccount.username != validAccount.username &&
    valueTransfer > 0 &&
    validAccount &&
    timeGift.value <= currentAccount.time
  ) {
    currentAccount.time = currentAccount.time - valueTransfer;
    validAccount.time = validAccount.time + valueTransfer;
    timeGift.value = giftRecipient.value = "";
    giftUserTime.textContent = `You currently have: ${new Intl.NumberFormat(
      "en-AU"
    ).format(currentAccount.time)} seconds.`;
    // console.log("Successful gift");
    localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
  }
});

/* --- Hodl function --- */
timerHold.addEventListener("click", function () {
  currentAccount.time = totalSeconds + currentAccount.time;
  localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
  totalSeconds = 0;
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
  hoursLabel.innerHTML = "00";
  overlay.classList.add("hidden");
});

userProfile.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains("close_acc") &&
    Number(closeAccountPin.value) === currentAccount.pin
  ) {
    const index = userAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    userAccounts.splice(index, 1);
    closeInterface();
    closeAccountPin.value = "";

    localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
  }
});

/* --- Wake lock function --- */

//IOS compatible wakelock

/*
const wakeButton = document.querySelector("[data-status]");

// test support
let isSupported = false;

if ("wakeLock" in navigator) {
  isSupported = true;
  console.log("Screen Wake Lock API supported 🎉");
} else {
  btnStart.disabled = true;
  console.log("Wake lock is not supported by this browser.");
}

if (isSupported) {
  // create a reference for the wake lock
  let wakeLock = null;

  // create an async function to request a wake lock
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request("screen");

      // listen for our release event
      // wakeLock.onrelease = function(ev) {
      //   console.log(ev);
      // }
    } catch (err) {
      wakeButton.dataset.status = "off";
    }
  }; // requestWakeLock()

  // if we click our button
  wakeButton.addEventListener("click", () => {
    requestWakeLock();
  });

  // wakelock release
  btnEnd.addEventListener("click", () => {
    wakeLock.release().then(() => {
      wakeLock = null;
    });
  });

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
      requestWakeLock();
    }
  };
}

*/
