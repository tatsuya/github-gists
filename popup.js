$(function(){

  var authorized = $('button#github.authorized');

  if (authorized.length) {
    console.log('authorized!');

    var provider = window['github'];
    var data = {
      access_token: provider.getAccessToken()
    }

    get('https://api.github.com/gists', data, function(gists){
      for (var i = 0; i < gists.length; i++) {
        var gist = gists[i];
        var name = '';
        for (var key in gist.files) {
          name = key;
          break;
        }
        var html = '<div><a href="' + gist.html_url + '">' + name + '</div>';
        $('body').append(html);
      }
    });
  }

  function get(url, data, success) {
    $.ajax({
      type: 'GET',
      timeout: '5000',
      url: url,
      data: data,
      success: success
    });
  }

});