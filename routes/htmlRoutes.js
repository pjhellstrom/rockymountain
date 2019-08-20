var path = require("path");

module.exports = function(app) {
  // default route loads login.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // main route loads main.html
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  // jonas-test route loads jonas-test.html
  app.get("/jonas-test", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/jonas-test.html"));
  });
};
