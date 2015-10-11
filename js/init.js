$(document).ready(function() {


doSomethingAfterLoading = function () {
  // body...
  // console.log('API loaded');
  gapi.auth.authorize({
    client_id: '603054087850-5qgda69d0j99oja4q5cjbl0mr2cp5s7d.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.email ',
    immediate: true
  }, function() {
    console.log('auth completed');
    makeApiCall()
  });
}


// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {

  gapi.client.bobplanetApi.bobplanetApi.menuOfDate({'date': '2015-10-05'}.then(function(resp) {
  console.log(resp.result);
}, function(reason) {
  console.log('Error: ' + reason.result.error.message);
});

  // // Step 4: Load the Google+ API
  // gapi.client.load('plus', 'v1').then(function() {
  //   // Step 5: Assemble the API request
  //   var request = gapi.client.plus.people.get({
  //     'userId': 'me'
  //   });
  //   // Step 6: Execute the API request
  //   request.then(function(resp) {
  //     var heading = document.createElement('h4');
  //     var image = document.createElement('img');
  //     image.src = resp.result.image.url;
  //     heading.appendChild(image);
  //     heading.appendChild(document.createTextNode(resp.result.displayName));
  //
  //     document.getElementById('content').appendChild(heading);
  //   }, function(reason) {
  //     console.log('Error: ' + reason.result.error.message);
  //   });
  // });
}



});
