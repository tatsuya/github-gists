var github = new OAuth2('github', {
  client_id: '2ad241392c1517d21515',
  client_secret: 'b0635e6bbd6f16ce012d19bae4770da3f728b708',
});

function authorize(providerName) {
  var provider = window[providerName];
  provider.authorize(checkAuthorized);
}

function clearAuthorized() {
  console.log('clear');
  ['github'].forEach(function(providerName) {
    var provider = window[providerName];
    provider.clearAccessToken();
  });
  checkAuthorized();
}

function checkAuthorized() {
  console.log('checkAuthorized');
  ['github'].forEach(function(providerName) {
    var provider = window[providerName];
    var button = document.querySelector('#' + providerName);
    if (provider.hasAccessToken()) {
      button.classList.add('authorized');
    } else {
      button.classList.remove('authorized');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button#github').addEventListener('click', function() { authorize('github'); });
  document.querySelector('button#clear').addEventListener('click', function() { clearAuthorized() });

  checkAuthorized();
});

  