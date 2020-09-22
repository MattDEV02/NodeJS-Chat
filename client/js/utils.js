const 
  chatDiv = document.querySelector(".chat-container"),
  onlineNum = document.querySelector("#online"),
  OnlineList = document.querySelector("#users"),
  msg = document.querySelector("#msg"),
  chatForm = document.querySelector("#chat-form"),
  chatMsg = document.querySelector(".chat-messages"),
  usernameDiv = document.querySelector("#user-name-container"),
  title = document.querySelector(".title"),
  imgFile = document.querySelector("input[type=file]"),
  btn = document.querySelector("[type='submit']"),
  typingDiv = document.querySelector("#typing"),
  typing = document.querySelector("#typing"),
  label = document.querySelector("label"),
  microphone = document.querySelector("#microphone"),
  recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)(),
  audio = new window.SpeechSynthesisUtterance(),
  icon = '<i class="fa fa-microphone"></i>',
  play = '<i class="fa fa-play"></i>',
  stop = '<i class="fa fa-stop"></i>',
  imageIcon = '<i class="fas fa-file-image"></i>',
  usersIcon = '<i class="fas fa-users"></i>',
  limit = 1.5,
  head=document.head, 
  url=window.location.toString();
  

var isLarge, timer, username, src, audio_str, color, size, sec = 0;

const spaces = (n) => "&nbsp".repeat(n);

const str_online = () => usersIcon + spaces(3) + "Online: " + spaces(2);

const randomColor = () => {
  var x = Math.round(0xffffff * Math.random()).toString(16);
  var y = 6 - x.length;
  var z = "000000".substring(0, y);
  return z + x;
};

const randomStr = (len) => {
  const arr = "aqwertyuiplkjhfsaazxcvbnm1234567890";
  var i,str = "";
  const lenArr = arr.length;
  for (i = 0; i < len; i++) str += arr[Math.floor(Math.random() * lenArr)];
  return str;
};

const capitalizeFirstChar = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const auto_username = (username) => {
  username = prompt("Inserisci il tuo Username: ");
  if (checkErrorMsg(username)) username = randomStr(5);
  return capitalizeFirstChar(username);
};

const username_cut = () => {
  if (username.length >= 10) username = username.substr(0, 8);
};

const showUsername = (username) =>
  (usernameDiv.innerHTML = "<center>" + username + "</center>");

const init = () => {
  color = randomColor();
  username = auto_username(username);
  username_cut();
  showUsername(username);
  msg.focus();
};

const time_msg = () => {
  const d = new Date();
  var current_day = d.getHours();
  var current_month = parseInt(d.getMonth()) + 1;
  var current_minute = d.getMinutes();
  var current_hour = d.getHours();
  var current_year = d.getFullYear();
  const int_d = parseInt(current_day);
  const int_m = parseInt(current_month);
  const int_h = parseInt(current_hour);
  const int_min = parseInt(current_minute);
  if (int_d < 10) current_day = "0" + current_day;
  if (int_m < 10) current_month = "0" + current_month;
  if (int_h < 10) current_hour = "0" + current_hour;
  if (int_min < 10) current_minute = "0" + current_minute;
  return (
    current_day +
    "/" +
    current_month +
    "/" +
    current_year +
    " - " +
    current_hour +
    ":" +
    current_minute
  );
};

const time = () => spaces(5) + time_msg();

const welcomeMsg = (username) =>
  "Benvenuto nella LambertChat! \n \nEcco il tuo Username: " + username + " , Utenti Online: ";

const userActionOutput = (message) => {
  const div = document.createElement("div");
  div.classList.add("action");
  div.innerHTML = `<center><strong>${capitalizeFirstChar(message)}</strong></center>`
  insert(div);
}

const showOnlineInfo = (users, message) => {
  onlineNum.innerHTML = str_online() + users.length;
  OnlineList.innerHTML = `${users
    .map((user) => `<li>${user.name}</li>`)
    .join("")}`;
  const sound_userAction = new Audio("./audio/userAction_sound.mp3");
  sound_userAction.play();
  userActionOutput(message);
};

const server_response = (users) => {
  var str =
    "Utenti Online: " +
    users.length +
    "\n \nUtenti: " +
    users.map((user) => user.name + " - ").join("");
  alert(str.slice(0, -2) + "\n \nIl tuo Username: " + username);
};

const insert = (element) => {
  chatMsg.insertBefore(element, typingDiv);
  chatMsg.scrollTop = chatMsg.scrollHeight;
};

const output_typing = (str) => {
  if (!checkErrorMsg(str)) return `<center><p id='type'>${str}</p></center>`;
  else return "";
};

const checkErrorMsg = (message) => {
  if (
    message === "" ||
    message == null ||
    message === undefined ||
    message.length <= 0 ||
    message === " "
  )
    return true;
};

const output_message = (user, message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.style.backgroundColor = "#" + user.color;
  div.innerHTML = `<p class="meta" style="color: black">${user.name}<span>${time()}</span></p>
  <b class="text">${capitalizeFirstChar(message)}</b>`;
  insert(div);
};

const clear_msg = () => {
  msg.value = "";
  msg.focus();
};

document.onload = () => {
  recognition.continuous = true; //
  recognition.lang = "it-IT";
};

recognition.onstart = () => audio_start();

recognition.onresult = (e) => (audio_str = e.results[0][0].transcript);

const audioCheck = () => {
  if (microphone.style.color !== "red") return true;
}

const sec_audio = (sec) => microphone.innerHTML = icon + " <b>" + sec + " sec <b/>";

const increment = () => sec++;

const audio_start = () => {
  microphone.style.color = "red";
  microphone.innerHTML = stop;
  timer = setInterval(increment, 1000);
};

const stop_recognition = () => {
  recognition.stop();
  clearInterval(timer);
};

const checkAudio = () => {
  if (sec >= 1 && !checkErrorMsg(audio_str)) return true;
}

const speak = (str) => {
  if (checkErrorMsg(str)) audio.text = 'Audio Vuoto';
  else audio.text = str;
  window.speechSynthesis.speak(audio);
  audio_str = "";
};

const output_audio = (user, audio) => {
  const div = document.createElement("div");
  div.classList.add("audio");
  div.style.backgroundColor = "#" + user.color;
  div.innerHTML = `
  <p style="color: white">
    ${spaces(3) + play + spaces(3) + audio.sec + " sec"}
    <b id="audioUsername">${
    user.name
    }<span style="font-size: 63%">${time()}</span></b>
  </p>`;
  insert(div);
  sec = 0;
  div.onclick = () => speak(audio.str);
};

const clear_audio = () => {
  microphone.innerHTML = icon;
  microphone.style.color = "white";
};

const getImgSrc = () => {
  const f = imgFile.files[0];
  size = parseFloat(f.size) / 1000000;
  if (size > limit) {
    label.innerHTML =
      imageIcon +
      spaces(2) +
      size.toFixed(2) +
      " MB - ( MAX " +
      limit +
      " MB )";
    isLarge = true;
  } else {
    const fr = new FileReader(); //try global scope
    fr.onload = () => (src = fr.result);
    fr.readAsArrayBuffer(f);
    label.innerHTML = imageIcon + spaces(3) + size.toFixed(2) + " MB";
  }
};

const checkImg = () => {
  if (
    imgFile.value.length > 0 &&
    imgFile.value != null &&
    imgFile.value !== undefined &&
    size < limit
  )
    return true;
};

const clear_img = () => {
  label.innerHTML = imageIcon;
  imgFile.value = "";
};

const leave_redirect = () =>
  (window.location.href = "https://google.it/");

const error_redirect = () =>
  (window.location.href = "https://matteolambertucci.altervista.org/404.html");

const connect = (socket) => {
  try { socket = io.connect(url); } 
  catch (e) { document.write(e); }
  return socket;
}
