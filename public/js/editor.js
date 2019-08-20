$(document).ready(function() {
  // Getting jQuery references to the note body, title, form, and user select
  var titleInput = $("#title");
  var bodyInput = $("#body");
  var cmsForm = $("#cms");
  var userSelect = $("#user");

  // ==========================================================================
  // NEW NOTE CREATION
  // ==========================================================================

  // New note modal listener
  // CODE GOES HERE ===========================================================

  // New note form submission listener
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a note)
  var url = window.location.search;
  var noteId;
  // Sets a flag for whether or not we're updating a note to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the note id from the url
  // In '?note_id=1', noteId is 1
  if (url.indexOf("?note_id=") !== -1) {
    noteId = url.split("=")[1];
    getNoteData(noteId, "note");
  }
  // Otherwise if we have a user_id in our url, preset the user select box to be our user
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the notes for the user
  getNotes();

  // A function to get Users and then render our list of Users
  function getNotes() {
    $.get("/api/notes", renderNotes);
  }

  // A function for handling what happens when the form to create a new note is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the note if we are missing a body, title, or user
    if (
      !titleInput.val().trim() ||
      !bodyInput.val().trim() ||
      !userSelect.val()
    ) {
      return;
    }
    // Constructing a newNote object to hand to the database
    var newNote = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      UserId: userSelect.val()
    };

    // If we're updating a note run updateNote to update a note
    // Otherwise run submitNote to create a whole new note
    if (updating) {
      newNote.id = noteId;
      updateNote(newNote);
    } else {
      submitNote(newNote);
    }
  }

  // Submits a new note and brings user to main page upon completion
  function submitNote(note) {
    $.post("/api/notes", note, function() {
      window.location.href = "/main";
    });
  }

  // Gets note data for the current note if we're editing, or if we're adding to an user's existing notes
  function getNoteData(id, type) {
    var queryUrl;
    switch (type) {
    case "note":
      queryUrl = "/api/notes/" + id;
      break;
    case "user":
      queryUrl = "/api/users/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        // If this note exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        userId = data.UserId || data.id;
        // If we have a note with this id, set a flag for us to know to update the note
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given note, bring user to the blog page when done
  function updateNote(note) {
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: note
    }).then(function() {
      window.location.href = "/main";
    });
  }
});
