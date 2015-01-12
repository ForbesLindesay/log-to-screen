# log-to-screen

Make log messages appear on the screen, and implement `console` if not defined.

Additionally, it handles `window.onerror` and adds `window.FIRST_ERROR = {msg: msg, url: url, line: line};` and `window.ERROR_HAS_OCCURED = true;` when an error occurs.  This is useful for detecting client errors via selenium.

## License

  MIT
