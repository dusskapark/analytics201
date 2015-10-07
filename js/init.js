$(document).ready(function() {



  function init() {
    var ROOT = 'https://your_app_id.appspot.com/_ah/api';
    gapi.client.setApiKey('AIzaSyAbhJQT4oo9TrL94KkJOvEg7AZfCyxMIAc');

    gapi.client.load('menuOfDate', 'v1', function() {
      doSomethingAfterLoading();
    }, ROOT);

};


  doSomethingAfterLoading = function (json) {
    var apisToLoad;
    var callback = function() {
      if (--apisToLoad == 0) {
        console.log(json)
      }
    }

    apisToLoad = 1; // must match number of calls to gapi.client.load()
    gapi.client.load('menuOfDate', 'v1', callback, apiRoot);
  };
