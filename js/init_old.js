$(document).ready(function() {


  // 오늘 날짜를 가져온다.
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  today = yyyy+'-' + mm+'-'+dd;


  // API 를 통해서 데이터를 불러온다.
  // 식당이 오픈하지 않는 날은 분기처리한다. - 아직 하지 않은 일
  function makeApiCall() {

    var request = gapi.client.bobplanetApi.menuOfDate({
      'date': '2015-10-08'
    });
    request.then(function(resp) {
      response_json(resp.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  function response_json(json) {
    console.log(json);

    // 상세 내용을 출력한다.
    var dailyList = json.menu;
    $.each(dailyList, function (i, v) {
      // body...
      $menuOfDate = "" +
        "<div class=\"col s12 m6 l3\">" +
          "<div class=\"card medium\">" +
            "<div class=\"card-image\">" +
              "<img height='230px' src=\""+ v.item.iconURL +"\">" +
              "<span class=\"card-title\">"+ v.item.id +"</span>" +
            "</div>" +
            "<div class=\"card-content\">" +
              "<p><strong>"+ v.item.id +"</strong></p>" +
              // "<p>"+ v.submenu +"</p>"
              "<i class=\"material-icons\">star</i>" +
              "<i class=\"material-icons\">star</i>" +
              "<i class=\"material-icons\">star</i>" +
              "<i class=\"material-icons\">star_half</i>" +
              "<i class=\"material-icons\">star_border</i>" +

            "</div>" +
            // "<div class=\"card-action\">" +
            // "</div>" +
          "</div>" +
        "</div>";
      });

      var $days = "" +
        "<li class='"+ json.previousDate +"'>" +
          "<div class=\"collapsible-header\"><i class=\"material-icons\">filter_drama</i>"+ json.previousDate +"</div>" +
          "<div class=\"collapsible-body\"><p>Lorem ipsum dolor sit amet.</p></div>" +
        "</li>" +
        "<li class='"+ json.date +"'>" +
          "<div class=\"collapsible-header active \">"+
          "<i class=\"material-icons\">place</i>"+ json.date +
          "<span> ("+ json.menu.length +")</span>"+
          "</div>" +
          "<div class=\"collapsible-body\">"+
          $menuOfDate +
          "</div>" +

        "</li>" +
        "<li class='"+ json.nextDate +"'>" +
          "<div class=\"collapsible-header\"><i class=\"material-icons\">whatshot</i>"+ json.nextDate +"</div>" +
          "<div class=\"collapsible-body\"><p>Lorem ipsum dolor sit amet.</p></div>" +
        "</li>";

        $("#bobcard").append($days);

    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

  };

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


});
