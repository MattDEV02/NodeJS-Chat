(function (w, d, s, id) {
  if (typeof (w.webpushr) !== 'undefined') return;
  w.webpushr = w.webpushr || function () {
    (w.webpushr.q = w.webpushr.q || []).push(arguments)
  };
  var js, fjs = d.getElementsByTagName(s)[0];
  js = d.createElement(s);
  js.id = id;
  js.src = "https://cdn.webpushr.com/app.min.js";
  fjs.parentNode.appendChild(js);
}(window, document, 'script', 'webpushr-jssdk'));
webpushr('setup', {
  'key': '<YOUR KEY>'
});
