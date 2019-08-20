var db = require("../models");

module.exports = function(app) {
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
};
//   // Get route used to fetch data to populate main screen
//   app.get("/api/users/:id", function(req, res) {
//     db.User.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [db.Note]
//     }).then(function(dbUser) {
//       res.json(dbUser);
//     });
//   });

//   app.delete("/api/users/:id", function(req, res) {
//     db.User.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbUser) {
//       res.json(dbUser);
//     });
//   });
// }
