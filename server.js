const
express = require("express"),
app = express().use(express.static("client")),
server = require("http").createServer(app),
io = require("socket.io")(server),   
_user = require("./utils/user"),
notify = require("./utils/notify");

notify.notification(); //Also sends notifications with the offline browser

io.on("connection", socket => {
  socket.on("getUser", __user => {
    const user = _user.join(__user.username, __user.color);
    socket.user = user;
    const users = _user.getUsers();
    socket.emit("welcomeUser", users);
    socket.broadcast.emit("joinChat", _user.msgJoin(socket.user), users);
  });
  socket.on("typing", str => socket.broadcast.emit("type", str));
  socket.on("submitImg", src => {
    io.emit("sendImg", src);
    socket.emit("audioMsg");
    socket.broadcast.emit("audioSub");
  });
  socket.on("submitAudio", _audio => {
    const audio = {
      str: _audio.audio_str,
      sec: _audio.sec
    };
    io.emit("sendAudio", socket.user, audio);
    socket.emit("audioMsg");
    socket.broadcast.emit("audioSub");
  });
  socket.on("submitMsg", msg => {
    if (_user.server_call(msg))
      socket.emit("server_InfoResponse", _user.getUsers());
    else {
      io.emit("sendMsg", socket.user, msg);
      socket.emit("audioMsg");
      socket.broadcast.emit("audioSub");
    }
  });
  socket.on("clickOnInfo", () =>
    socket.emit("server_InfoResponse", _user.getUsers())
  );
  socket.on("disconnect", () => {
    _user.leave(socket.user);
    io.emit("leaveChat", _user.msgLeave(socket.user), _user.getUsers());
  });
});


var port, host;

const  
    protocol='http',
    options = [port = process.env.PORT || 80, host = "127.0.0.1", () => console.log("\nRunning on "+protocol+ "://" + host + ":" + port + "\n")];

server.listen(...options);
