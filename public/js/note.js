// $(document).ready(function() {
//   var activeUser = req.session.userId;
//   loadNotes(activeUser);

//   function loadNotes() {
//     console.log("activeUser is: ", activeUser);

//     $.get("api/users/" + activeUser, function(data) {
//       console.log("Notes returned: ", userId);
//     });
//   }

//   var notesContainer = $(".notes-container");
//   // Click events for buttons
//   $(document).on("click", "button.delete", handleNoteDelete);
//   $(document).on("click", "button.edit", handleNoteEdit);
//   // Variable to hold the notes
//   var notes;

//   // This function grabs notes from the database and updates the view
//   function getNotes(user) {
//     $.get("/api/notes" + userId, function(data) {
//       console.log("Notes", data);
//       notes = data;
//       if (!notes || !notes.length) {
//         displayEmpty(user);
//       } else {
//         initializeNotes();
//       }
//     });
//   }

//   // This function does an API call to delete notes
//   function deleteNote(id) {
//     $.ajax({
//       method: "DELETE",
//       url: "/api/notes/" + id
//     }).then(function() {
//       getNotes(noteCategorySelect.val());
//     });
//   }

//   // initializeNotes handles appending all of our constructed note HTML inside notesContainer
//   function initializeNotes() {
//     notesContainer.empty();
//     var notesToAdd = [];
//     for (var i = 0; i < notes.length; i++) {
//       notesToAdd.push(createNewRow(notes[i]));
//     }
//     notesContainer.append(notesToAdd);
//   }

//   // This function constructs a note's HTML
//   function createNewRow(note) {
//     var formattedDate = new Date(note.createdAt);
//     formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
//     var newNoteCard = $("<div>");
//     newNoteCard.addClass("card");
//     var newNoteCardHeading = $("<div>");
//     newNoteCardHeading.addClass("card-header");
//     var deleteBtn = $("<button>");
//     deleteBtn.text("x");
//     deleteBtn.addClass("delete btn btn-danger");
//     var editBtn = $("<button>");
//     editBtn.text("EDIT");
//     editBtn.addClass("edit btn btn-info");
//     var newNoteTitle = $("<h2>");
//     var newNoteDate = $("<small>");
//     var newNoteUser = $("<h5>");
//     newNoteUser.text("Written by: " + note.User.name);
//     newNoteUser.css({
//       float: "right",
//       color: "blue",
//       "margin-top": "-10px"
//     });
//     var newNoteCardBody = $("<div>");
//     newNoteCardBody.addClass("card-body");
//     var newNoteBody = $("<p>");
//     newNoteTitle.text(note.title + " ");
//     newNoteBody.text(note.body);
//     newNoteDate.text(formattedDate);
//     newNoteTitle.append(newNoteDate);
//     newNoteCardHeading.append(deleteBtn);
//     newNoteCardHeading.append(editBtn);
//     newNoteCardHeading.append(newNoteTitle);
//     newNoteCardHeading.append(newNoteUser);
//     newNoteCardBody.append(newNoteBody);
//     newNoteCard.append(newNoteCardHeading);
//     newNoteCard.append(newNoteCardBody);
//     newNoteCard.data("note", note);
//     return newNoteCard;
//   }

//   // This function figures out which note we want to delete and then calls deleteNote
//   function handleNoteDelete() {
//     var currentNote = $(this)
//       .parent()
//       .parent()
//       .data("note");
//     deleteNote(currentNote.id);
//   }

//   // This function figures out which note we want to edit and takes it to the appropriate url
//   function handleNoteEdit() {
//     var currentNote = $(this)
//       .parent()
//       .parent()
//       .data("note");
//     window.location.href = "/cms?note_id=" + currentNote.id;
//   }

//   // This function displays a message when there are no notes
//   function displayEmpty(id) {
//     var query = window.location.search;
//     var partial = "";
//     if (id) {
//       partial = " for User #" + id;
//     }
//     notesContainer.empty();
//     var messageH2 = $("<h2>");
//     messageH2.css({ "text-align": "center", "margin-top": "50px" });
//     messageH2.html(
//       "No notes yet" +
//         partial +
//         ", navigate <a href='/cms" +
//         query +
//         "'>here</a> in order to get started."
//     );
//     notesContainer.append(messageH2);
//   }
// });
