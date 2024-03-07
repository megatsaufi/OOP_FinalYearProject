  const { app, BrowserWindow } = require('electron');
  const fs = require('fs');
  const path = require('path');

  var btnCreate = document.getElementById('btnCreate');
  var btnDelete = document.getElementById('btnDelete');
  var fileName = document.getElementById('fileName');
  var fileContents = document.getElementById('fileContents');
  var commentSection = document.getElementById('commentSection');

  let pathName = path.join(__dirname, 'Files');

  window.onload = async function() {
    displayAllComments();
  };

  function displayAllComments() {
    fs.readdir(pathName, function(err, files) {
      if (err) {
        return console.log(err);
      }
      var commentsHTML = '';
      files.forEach(function(file) {
        let filePath = path.join(pathName, file);
        let fileName = path.basename(filePath, '.txt');
        let fileContents = fs.readFileSync(filePath, 'utf8');
        commentsHTML += `
        <div class="comment" style="background-color: white;">
                  <strong>${fileName}:</strong> ${fileContents}
                  <div class="comment-footer"><br>
                      <button class="editBtn" data-file="${file}">Edit</button>
                      <button class="deleteBtn" data-file="${file}">Delete</button>
                  <small class="comment-date">${new Date().toLocaleString()}</small>
                  </div>
              </div>`;

      });
      commentSection.innerHTML = commentsHTML;

      // Add event listeners for edit and delete buttons
      document.querySelectorAll('.editBtn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          let file = this.getAttribute('data-file');
          editComment(file);
        });
      });

      document.querySelectorAll('.deleteBtn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          let file = this.getAttribute('data-file');
          // Add confirmation dialog before deleting
          if (confirm("Are you sure you want to delete this comment?")) {
            deleteComment(file);
          }
        });
      });
    });
  }

  function editComment(file) {
    let fileNameWithoutExtension = path.basename(file, '.txt');
    fileName.value = fileNameWithoutExtension;
    let filePath = path.join(pathName, file);
    let fileContentsValue = fs.readFileSync(filePath, 'utf8'); // Change variable name to avoid confusion
    fileContents.value = fileContentsValue; // Update to set the value property
  }

  function deleteComment(file) {
    let filePath = path.join(pathName, file);
    fs.unlink(filePath, function(err) {
      if (err) {
        return console.log(err);
      }
      displayAllComments();
      console.log('The file was deleted!');
    });
  }

  btnCreate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err) {
      if (err) {
        return console.log(err);
      }
      var txtfile = document.getElementById('fileName').value;
      alert(' Comment has been sent!');
      console.log('The file was created');
      displayAllComments();
    });
  });
