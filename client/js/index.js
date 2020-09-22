var socket;

socket = connect(socket);

socket.on("connect_error", () => error_redirect());

init();

socket.on("connect", () => socket.emit("getUser", {
  username,
  color
}));

socket.on("welcomeUser", (users) =>
  showOnlineInfo(users, welcomeMsg(username) + users.length)
);

socket.on("joinChat", (message, users) => showOnlineInfo(users, message));

const infoClick = () => socket.emit("clickOnInfo");

socket.on("server_InfoResponse", (users) => server_response(users));

const notType = () => socket.emit("typing", "");

const startType = () => {
  if (!checkErrorMsg(msg.value))
    socket.emit("typing", username + " sta Scrivendo...");
  else notType();
};

socket.on("type", str => (typing.innerHTML = output_typing(str)));

const submitMsg = () => {
  if (!checkErrorMsg(msg.value)) socket.emit("submitMsg", msg.value);
  clear_msg();
};

socket.on("sendMsg", (user, message) => output_message(user, message));

const start_stop = () => {
  if (audioCheck()) {
    recognition.start();
    socket.emit("typing", username + " sta Registrando un Audio...");
  } else {
    stop_recognition();
    notType();
    if (sec >= 1) sec_audio(sec);
    else clear_audio();
  }
};

const submitAudio = () => {
  if (sec >= 1) socket.emit("submitAudio", {
    audio_str,
    sec
  });
  clear_audio();
};

socket.on("sendAudio", (user, audio) => output_audio(user, audio));

const submitImg = () => {
  if (checkImg()) {
    socket.emit("typing", username + " sta caricando una Immagine...");
    socket.emit("submitImg", src);
    label.innerHTML = imageIcon + spaces(3) + "Caricamento Immagine...";
  } else label.innerHTML = imageIcon;
};

chatForm.onsubmit = event => {
  event.preventDefault();
  submitMsg();
  submitAudio();
  submitImg();
};

socket.on("sendImg", src => {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(new Blob([src], {
    type: "image/png"
  }));
  img.onload = () => {
    URL.revokeObjectURL(img.src);
    notType();
  };
  insert(img);
  clear_img();
});

socket.on("audioSub", () => {
  const sound_submit = new Audio("./audio/submit_sound.mp3");
  sound_submit.play();
});

socket.on("audioMsg", () => {
  const sound_message = new Audio("./audio/message_sound.mp3");
  sound_message.play();
});

socket.on("disconnect", () => leave_redirect());

socket.on("leaveChat", (message, users) => showOnlineInfo(users, message));
