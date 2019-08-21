var db = require("../models");

// Post route used when creating a new user
app.post("/api/users", function(req, res) {
  db.User.create(req.body).then(function(newUser) {
    console.log("Created new user as follows: ", newUser);
    res.json(newUser);
  });
});

// Get route used when validating existing user
app.get("/api/users", function(req, res) {
  db.User.findAll({}).then(function(allUsers) {
    res.json(allUsers);
  });
});

module.exports = app;
