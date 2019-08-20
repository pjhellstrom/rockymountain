var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the notes
  // app.get("/api/notes", function(req, res) {
  //   var query = {};
  //   if (req.query.user_id) {
  //     query.UserId = req.query.user_id;
  //   }
  //   db.Note.findAll({
  //     where: query,
  //     include: [db.User]
  //   }).then(function(dbNote) {
  //     res.json(dbNote);
  //   });
  // });
  app.get("/api/notes", function(req, res) {
    res.send("Hello World!");
  });

  // Get route for retrieving a single note
  app.get("/api/notes/:id", function(req, res) {
    db.Note.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // POST route for saving a new note
  app.post("/api/notes", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // DELETE route for deleting notes
  app.delete("/api/notes/:id", function(req, res) {
    db.Note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // PUT route for updating notes
  app.put("/api/notes", function(req, res) {
    db.Note.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });
};
