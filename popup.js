$(function(){

  function get(url, success) {
    $.ajax({
      type: 'GET',
      timeout: '5000',
      url: url,
      success: success
    });
  }

  get('https://api.github.com/gists', function(gists){

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

});