

$("#searchBtn").on("click", function(){
//     debugger;
    var searchterm = $("#searchText").val();
    console.log(searchterm);
    var queryURL = "/api/notes/search/" + searchterm
    $.ajax({
        url: queryURL,
        method:"GET"
        }).then(function(response){
                console.log( `.. api/nootes response: `, response );
                debugger;
                $("#notes-container").empty();
                // If no notes exist yet, display starter message
                if (response.length <= 1) {
                $('#notes-container').prepend(`
                        <div class="hero-body">
                        <div class="container has-text-centered">
                        <h1 class="title">
                        Welcome to Noted.
                        </h1>
                        <h2 class="subtitle">
                        Click on the + button to add your first note!
                        </h2>
                        </div>
                        </div>
                `);
        } else {
                // else loop through response and populate notes
                for (var i = 0; i < response.length; i++) {
                $('#notes-container').prepend(`
                        <div class="box note-box category-${response[i].category} note-light" id="note-styling">
                        <article class="media">
                        <div class="media-content">
                        <div class="content">
                        <p>
                        <strong id="note-title-style">${response[i].title}</strong>
                        <small class="category-label">${response[i].category.charAt(0).toUpperCase() + response[i].category.slice(1)}</small>
                        <br>
                        <small>Created on ${moment(response[i].createdAt).format("MMM D, YYYY")}</small>
                        <br>
                        ${response[i].category === "code" ?
                        `<p id="note-body">
                        <pre class="prettyprint">${response[i].body}</pre>
                        </p>`
                        :
                        `<p id="note-body">
                        ${response[i].body}
                        </p>`
                        }
                        </p>
                        </div>
                        <nav class="level is-mobile">
                        <div class="level-left">
                        <a href="#" class="level-item edit-note" id="${response[i].id}" aria-label="edit">
                        <span class="icon is-small">
                        <i class="fas fa-edit" aria-hidden="true"></i>
                        </span>
                        </a>
                        <a class="level-item" aria-label="share">
                        <span class="icon is-small">
                        <i class="fas fa-share" aria-hidden="true"></i>
                        </span>
                        </a>
                        </div>
                        <div class="level-right">
                        <a href="#" class="level-item delete-note" id="${response[i].id}" aria-label="delete">
                        <span class="icon is-small" id="deleteIcon">
                        <i class="fas fa-trash" aria-hidden="true"></i>
                        </span>
                        </a>
                        </div>
                        </nav>
                        </div>
                        </article>
                        </div>`);
                }
        }
        });
});