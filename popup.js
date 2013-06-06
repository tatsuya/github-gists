var github = new OAuth2('github', {
  client_id: '2ad241392c1517d21515',
  client_secret: 'b0635e6bbd6f16ce012d19bae4770da3f728b708',
});

// github.clearAccessToken();

github.authorize(function() {
  requestGists();
});

function requestGists() {
  var accessToken = github.getAccessToken();
  var gistUrl = 'https://api.github.com/gists?access_token=' + accessToken;  

  // Make an XHR that creates the gists
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(event) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        // Great success: parse response with JSON
        var gists = JSON.parse(req.responseText);
        showGists(gists);
      } else {
        // Request failure: something bad happend
      }
    }
  }
  req.open('GET', gistUrl, true);
  req.send();
}

function showGists(gists) {
  // Title
  var title = document.createElement('h1');
  title.innerHTML = 'Your Gists';

  document.querySelector('#gists').appendChild(title);

  for (var i = 0; i < gists.length; i++) {
    var gist = gists[i];

    console.log(gist);

    // Get the file length
    var files = Object.keys(gist.files).length

    // Get the first filename
    var name = '';
    for (var key in gist.files) {
      name = key;
      break;
    }

    // Generate html
    var div = document.createElement('div');
    div.className = 'gist';

    var link = document.createElement('a');
    link.setAttribute('href', gist.html_url);
    link.innerHTML = name;

    var span = document.createElement('span');
    span.innerHTML = '(' + files.toString() + ' files)';

    div.appendChild(link);
    div.appendChild(span);

    document.querySelector('#gists').appendChild(div);
  }
}