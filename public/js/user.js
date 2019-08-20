$(document).ready(function() {
  // Getting references to the name input and user container, as well as the table body
  var nameInput = $("#user-name");
  var passwordInput = $("#password");
  var newNameInput = $("#new-user-name");
  var newPasswordInput = $("#new-password");
  var activeUser = {};

  // ==========================================================================
  // FIRST TIME USERS
  // ==========================================================================

  // When sending the user form, we create a new object
  $(document).on("click", "#signup-btn", handleNewUserSubmit);
  // A function to handle what happens when the form is submitted to create a new User
  function handleNewUserSubmit(event) {
    event.preventDefault();
    console.log("handleNewUserSubmit has been called");
    // Don't do anything if the username/pw fields haven't been filled out
    if (
      !newNameInput
        .val()
        .trim()
        .trim() ||
      !newPasswordInput
        .val()
        .trim()
        .trim()
    ) {
      alert("username or pw missing");
      return;
    }

    // Calling the createUser function and passing in the username and pw
    createUser({
      name: newNameInput.val().trim(),
      password: newPasswordInput.val().trim()
    });
  }

  // A function for creating an user. Calls launchMain upon completion
  function createUser(userData) {
    console.log("createUser with userData: ", userData);
    $.post("/api/users", userData).then(launchMain(userData.name));
  }

  function launchMain(activeUser) {
    $.get("/api/notes", function(notes) {
      console.log("This will launch main with ", notes, activeUser);
    });
  }

  // ==========================================================================
  // RETURNING USERS
  // ==========================================================================

  // When sending the user form, we create a new object
  $(document).on("click", "#login-btn", handleUserLoginSubmit);

  // A function to handle what happens when the form is submitted to create a new User
  function handleUserLoginSubmit(event) {
    event.preventDefault();
    console.log("handleUserLoginSubmit has been called");
    // Don't do anything if the username/pw fields haven't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim() ||
      !passwordInput
        .val()
        .trim()
        .trim()
    ) {
      alert("username or pw missing");
      return;
    }
    // Calling the createUser function and passing in the username and pw
    validateUser({
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    });
  }

  // Function for retrieving users and getting them ready to be rendered to the page
  function validateUser(userData) {
    // First gets the list of users stored
    $.get("/api/users", function(users) {
      console.log("Returning login get request data: ", users);
      var foundUser = users.find(function(user) {
        if (
          user.name === userData.name &&
          user.password === userData.password
        ) {
          console.log("Matching user and pw found, ok to proceed!");
          activeUser =
            users[
              users.findIndex(function(user) {
                return user.name === userData.name;
              })
            ];
          console.log("activeUser: ", activeUser);
          return activeUser;
        } else {
          console.log("No user and password found!");
          return false;
        }
      });
      console.log("foundUser: ", foundUser);
      if (foundUser === false) {
        alert("No user and password found!");
      } else {
        launchMain(activeUser);
      }
    });
  }
});
