var express = require("express");
var bodyParser = require("body-parser")
var session = require("express-session");
var Sequelize = require("sequelize");
var path = require("path");
var db = require("./models");

var app = express();

var {
  PORT = process.env.PORT || 3000,
  SESS_NAME = "sid"
} = process.env;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  name: SESS_NAME,
  secret: "asecret",
  cookie: { maxAge: 1000 * 60 * 15}
}));

app.use(express.static("./public"));

// Routes
// require("./routes/userRoutes")(app);
// require("./routes/noteRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Custom middleware
var redirectLogin = function(req, res, next) {
  // If user is not authenticated, redirect to login page
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
}

var redirectHome = function(req, res, next) {
  // If user is already authenticated, redirect to home page
  if (req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
}

// app.use(function(req, res, next) {
//   var userId = req.session;
//   console.log("custom mw reached");
//   console.log(userId);

//   if (userId) {
//     res.locals.user = users.find(function(user){
//       user.id === req.session.userId
//     })
//   }
//   next();
// })

// Routers ====================================================================

app.get("/", function(req, res) {
  var userId = req.session;
  console.log("logging userId: ", userId);
  res.sendFile(
    path.join(__dirname, "./public/login.html")
    );
});

app.get("/login", function(req, res) {
  var userId = req.session;
  console.log("logging userId: ", userId);
  res.sendFile(
    path.join(__dirname, "./public/login.html")
    );
});

app.post("/login", redirectHome, function(req, res) {
  console.log("In post to login route: ", req.body);
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    db.User.findAll({
      where: {
        username: username,
        password: password
      }
    }).then(function(foundUser) {
      console.log("Database returned THIS: ", foundUser);
    if (foundUser.length > 0) {
      console.log("Database returned allUsers: ", foundUser[0].dataValues);
      console.log("authentication successful, you are connected as user.id: ", foundUser[0].dataValues.id);
      // Set session
      req.session.userId = foundUser[0].dataValues.id;
      // Respond with user
      // res.json(foundUser[0].dataValues);
      // Redirect to home page
      return res.redirect("/home");
    } else {
      res.sendFile(path.join(__dirname, "./public/loginerror.html"));
    }
  });
}
});

app.post("/register", redirectHome, function(req, res) {
  console.log("In post to login route: ", req.body);
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    db.User.findAll({
      where: {
        username: username
      }
    }).then(function(foundUser) {
    if (foundUser.length > 0) {
      console.log("Database returned allUsers: ", foundUser[0].dataValues);
      console.log("WARNING This user already exists!");
      res.sendFile(path.join(__dirname, "./public/duplicateerror.html"));
    } else {
      db.User.create(req.body).then(function(newUser) {
        console.log("Adding new user to DB: ", newUser);
        req.session.userId = newUser.id;
        return res.redirect("/home");
    });
    }
  });
  }
});

// app.get("api/users/:id", function(req, res) {
//   var activeUser = req.params.id;
//   db.Note.findAll({
//     where: {
//       UserId: activeUser
//     }
//   }).then(function(userNotes) {
//     res.json(userNotes);
//   });
// });

app.get("/home", redirectLogin, function(req, res) {
  var user = req.locals;
  console.log("session object: ", req.session);
  console.log("session user id: ", req.session.userId);
  res.sendFile(path.join(__dirname, "./public/main.html"));
  // Code to populate cards
});

// NOTES ======================================================================

app.get("/api/notes", function(req, res) {
  db.Note.findAll({
    where: {
      UserId: req.session.userId
    }
  }).then(function(notesFound){
    // console.log("for user ", req.session.userId, " found notes : ", notesFound)
    res.json(notesFound);
  });
});

app.get("/api/notes/search/:searchterm", function(req, res) {
  var Op = Sequelize.Op;
  var searchValue = req.params.searchterm.toLowerCase();
  db.Note.findAll({
    where: {
      title: {
        [Op.like]: '%' + searchValue + '%'
      },
      UserId: req.session.userId
    }
  }).then(function(notesFound){
    // console.log("for user ", req.session.userId, " found notes : ", notesFound)
    res.json(notesFound);
  });
});

app.get("/api/notes/:category", function(req, res) {
  db.Note.findAll({
    where: {
      category: req.params.category,
      UserId: req.session.userId
    }
  }).then(function(notesFound){
    res.json(notesFound);
  });
});

app.post("/api/notes", function(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;
  var UserId = req.session.userId;
  db.Note.create({
    title: title,
    body: body,
    category: category,
    format: 1,
    UserId: UserId
  }).then(function(newNote) {
    // console.log("New note has been created: ", newNote);
    res.json(newNote);
  });
});

app.get("/api/notes/edit/:id", function(req, res) {
  console.log("in get to id number: ", req.params.id);
  db.Note.findAll({
    where: {
      id: req.params.id,
      UserId: req.session.userId
    }
  }).then(function(noteBody){
    console.log("existing Note body found: ", noteBody);
    res.json(noteBody);
  });
});

app.delete("/api/notes/:id", function(req, res) {
  db.Note.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    // console.log("Note has been deleted: ", dbPost);
    res.json(dbPost);
  });
});

app.put("/api/notes/:id", function(req, res) {
  console.log("req.body in put request is: ", req.body);
  db.Note.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
    console.log("Note has been edited: ", dbPost);
    res.json(dbPost);
  });
});
// LOGOUT =====================================================================
app.post("/logout", redirectLogin, function(req, res) {
  console.log("logout post route reached!")
  req.session.destroy( function(err){
    if (err) {
      console.log("logout post route ran into error!")
      return res.redirect("/home");
    }
    res.clearCookie(SESS_NAME);
    res.send(200);
    console.log("logout post route sending login.html!");
  })
});

var syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
