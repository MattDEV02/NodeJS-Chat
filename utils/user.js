const users = [];

exports.join = (name, color) => {
  const user = {
    name,
    color,
  };
  users.push(user);
  return user;
};

exports.leave = (user) => users.splice(users.indexOf(user), 1);

exports.msgJoin = (user) =>
  "Nuovo Utente connesso: " + user.name + " , Utenti Online: " + users.length;

exports.msgLeave = (user) =>
  "Utente " + user.name + " Disconnesso " + " , Utenti Online: " + users.length;

exports.getUsers = () => users;

exports.server_call = (msg) => {
  if (
    msg === "server" ||
    msg === "Server" ||
    msg === "SERVER" 
  )
    return true;
};
