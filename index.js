(function () {
  var consoleOutput = document.createElement('pre');
  document.body.appendChild(consoleOutput);
  function proxy(original, color) {
    return function (msg) {
      var index = 1;
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      if (typeof msg === 'string') {
        msg = msg.replace(/(^|[^%])%[sd]/g, function (_, s) {
          return s + args[index++];
        });
      }
      else msg = JSON.stringify(msg);

      for (var i = index; i < args.length; i++) {
        msg += ' ' + JSON.stringify(args[i]);
      }

      var span = document.createElement('span');
      var txt = document.createTextNode(msg + '\n');
      span.setAttribute('style', 'color: ' + color);
      span.appendChild(txt);
      consoleOutput.appendChild(span);

      if (typeof original === 'function') {
        return original.apply(this, arguments);
      }
      else if (original) return original(arguments[0]);
    };
  }

  window.ERROR_HAS_OCCURRED = false;
  window.onerror = function (msg, url, line) {
    console.error(msg + '\n' + url + ':' + line);
    if (!window.ERROR_HAS_OCCURED) {
      window.FIRST_ERROR = {msg: msg, url: url, line: line};
    }
    window.ERROR_HAS_OCCURRED = true;
  };

  if (typeof console === 'undefined') window.console = {};

  console.log = proxy(console.log, 'black');
  console.warn = proxy(console.warn, 'orange');
  console.error = proxy(console.error, 'red');
}());
