// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/notes", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Note.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Note.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Note.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });
};
