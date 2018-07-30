// Saves options to chrome.storage
function save_options() {
  var github_token = document.getElementById('github_access_token').value;
  chrome.storage.sync.set({
    github_access_token: github_token
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1250);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    github_access_token: ''
  }, function(items) {
    document.getElementById('github_access_token').value = items.github_access_token;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);