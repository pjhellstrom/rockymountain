$(document).ready(function() {
  // Getting references to the name input and user container, as well as the table body
  var nameInput = $("#user-name");
  var passwordInput = $("#password");

  // ==========================================================================
  // FIRST TIME USERS
  // ==========================================================================

  // When sending the user form, we create a new object
  $(document).on("click", "#signup-btn", handleUserFormSubmit);

  // A function to handle what happens when the form is submitted to create a new User
  function handleUserFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the username/pw fields haven't been filled out
    if (
      !nameInput ||
      !passwordInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertUser function and passing in the username and pw
    upsertUser({
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    });
  }

  // A function for creating an user. Calls launchMain upon completion
  function upsertUser(userData) {
    $.post("/api/users", userData).then(launchMain);
  }

  function launchMain(user) {
    console.log("This will launch main with ", user);
  }

  // ==========================================================================
  // RETURNING USERS
  // ==========================================================================

  // When sending the user form, we create a new object
  $(document).on("click", "#login-btn", handleUserFormSubmit);

  // A function to handle what happens when the form is submitted to create a new User
  function handleUserFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the username/pw fields haven't been filled out
    if (
      !nameInput ||
      !passwordInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertUser function and passing in the username and pw
    validateUser({
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    });
  }

  // Function for retrieving users and getting them ready to be rendered to the page
  function validateUser() {
    // First gets the list of users stored
    $.get("/api/users", function(data) {
      var activeUser = {};
      for (var i = 0; i < data.length; i++) {
        if (nameInput === data[i].name && passwordInput === data[i].password) {
          console.log("Matching user and pw found, ok to proceed!");
        }
      }
      // Need to set activeUser object here to instruct loadPage what user is logged in
      launchMain(activeUser);
    });
  }
});
