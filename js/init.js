$(document).ready(function() {

// isotope 추가
$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});

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



doSomethingAfterLoading = function () {
  // body...
  // console.log('API loaded');
  gapi.auth.authorize({
    client_id: '603054087850-5qgda69d0j99oja4q5cjbl0mr2cp5s7d.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.email ',
    immediate: true
  }, function() {
    console.log('auth completed');
    makeApiCall(today);
  });
}


  // API 를 통해서 데이터를 불러온다.
  // 식당이 오픈하지 않는 날은 분기처리한다. - 아직 하지 않은 일
  makeApiCall = function (date) {

    var request = gapi.client.bobplanetApi.menuOfDate({
      'date': date
    });
    request.then(function(resp) {
      response_json(resp.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }


    $('#nextDate').click(function () {
      // body...
      makeApiCall($(this).attr('data-id'));

    })


  function response_json(json) {
    console.log(json);

    $('.collection').find('.title').text(json.date);
    $('#previousDate').attr("data-id", json.previousDate);
    $('#nextDate').attr("data-id", json.nextDate);

    // 상세 내용을 출력한다.
    var dailyList = json.menu;
    $.each(dailyList, function (i, v) {
      // body...
      // var $div = "<div id='"+ v.date +"' class='row grid'></div>";

      var $menuOfDate = "" +
        "<div class=\"col s12 m6 l3 grid-item\">" +
          "<div class=\"card medium\">" +
            "<div class=\"card-image\">" +
              "<img height='230px' src=\""+ v.item.iconURL +"\">" +
              "<span class=\"card-title truncate\">"+ v.item.id +"</span>" +
            "</div>" +
            "<div class=\"card-content\">" +
              "<p><strong>매뉴</strong></p>" +
              // "<p>"+ v.submenu +"</p>"
            "</div>" +
            "<div class=\"card-action\">" +
            "<i class=\"material-icons\">star</i>" +
            "<i class=\"material-icons\">star</i>" +
            "<i class=\"material-icons\">star</i>" +
            "<i class=\"material-icons\">star_half</i>" +
            "<i class=\"material-icons\">star_border</i>" +
            "</div>" +
          "</div>" +
        "</div>";

        // div 추가


        //카드를 화면에 표시한다.
        $('.grid').isotope('insert', $($menuOfDate) );
        // 카드를 정렬한다
        $('.grid').isotope();
        // $('#bobcard').append($menuOfDate);

      });
  };

// Load the API and make an API call.  Display the results on the screen.


});
