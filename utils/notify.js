// VISIT https://www.webpushr.com/

const request = require("request");

const headers = {
  webpushrKey: "<YOUR KEY>",
  webpushrAuthToken: "<YOUR TOKEN>",
  "Content-Type": "application/json",
};

const data =
  '{"title":"Accedi alla LambertChat !","message":"Se sei Offline clicca qui per Accedere.","target_url":"http://127.0.0.1:80/","icon":"https://www.pngitem.com/pimgs/m/34-349739_chat-png-icon-free-download-searchpng-transparent-chat.png"}';

const options = {
  url: "https://api.webpushr.com/v1/notification/send/all",
  method: "POST",
  headers: headers,
  body: data,
};

const result = (error, response, body) => {
  if (!error && response.statusCode === 200)
     console.log("Notification: " + body);
  else console.log(error);
};

exports.notification = () => request(options, result);
