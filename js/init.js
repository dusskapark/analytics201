$(document).ready(function() {

  function auth() {
  	gapi.auth.authorize({
  		client_id: '603054087850-5qgda69d0j99oja4q5cjbl0mr2cp5s7d.apps.googleusercontent.com',
  		scope: 'https://www.googleapis.com/auth/userinfo.email ',
  		immediate: true
  	}, function() {
  		console.log('auth completed');
  	});
  }

  function helloworld() {
  	gapi.client.bobplanetApi.helloworld().execute(function(resp) {
  		console.log(resp.message)
  	});
  }



};
