$(document).ready(function() {

// isotope 추가
$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});



doSomethingAfterLoading = function () {
  // body...

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

  // console.log('API loaded');
  gapi.auth.authorize({
    client_id: '603054087850-5qgda69d0j99oja4q5cjbl0mr2cp5s7d.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.email ',
    immediate: true
  }, function() {
    console.log('auth completed');
    makeApiCall(today, response_json);
  });
}


  // API 를 통해서 데이터를 불러온다.
  // 식당이 오픈하지 않는 날은 분기처리한다. - 아직 하지 않은 일
  makeApiCall = function (date, responseFn) {

    var request = gapi.client.bobplanetApi.menuOfDate({
      'date': date
    });
    request.then(function(resp) {
      responseFn(resp.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }


    $("body").on("click", "#bobcard > li", function ( e ) {
      // body...
      var clickedDate = $(this).attr('data-id');
      makeApiCall(clickedDate, response_clickedDate);



    });

  function response_json(json) {

    console.log(json);

    $('.collection').find('.title').text(json.date);
    $('#previousDate').attr("data-id", json.previousDate);
    $('#nextDate').attr("data-id", json.nextDate);

    // 상세 내용을 출력한다.
    var dailyList = json.menu;
    var $menuOfDate = "";
    var $days;
    $.each(dailyList, function (i, v) {
      // body...
      $menuOfDate += "" +
        "<div class=\"col s12 m6 l3\">" +
          "<div class=\"card medium\">" +
            "<div class=\"card-image waves-effect waves-block waves-light\">" +
              "<img height='230px' src=\""+ v.item.iconURL +"\" class=\"activator\">" +
              "<span class=\"card-title truncate\">"+ v.item.id +"</span>" +
            "</div>" +
            "<div class=\"card-content\">" +
              "<span class='card-title activator grey-text text-darken-4 truncate'><i class=\"material-icons circle\">access_time</i>" + v.when + "</span>" +
              "<p class='activator' alt='description'>뭘 넣어야 할지는 모르겠으니깐 일단은 아무거나 넣어두려고 합니다. 글자수가 많으면 어떻게 되는지도 궁금하네요 </p>" +  
            "</div>" +
            "<div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\">매뉴 평가<i class=\"material-icons right close\">close</i></span>"+
              "<div class='container center-align'>" +
                "<i class=\"fa fa-heart\"></i> " +
                "<i class=\"fa fa-heart\"></i> " +
                "<i class=\"fa fa-heart\"></i> " +
                "<i class=\"fa fa-heart-o\"></i> " +
                "<i class=\"fa fa-heart-o\"></i> " +
                "<p class='left-align' alt='description'>" + v.item.submenu + "</p>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>";

      });

      $days = "" +
        "<li data-id='"+ json.previousDate +"'>" +
          "<div class=\"collapsible-header\"><i class=\"material-icons\">filter_drama</i>"+ json.previousDate +"</div>" +
          "<div class=\"collapsible-body\"><p>Lorem ipsum dolor sit amet.</p></div>" +
        "</li>" +
        "<li data-id=\""+ json.date +"\" class=\"active\">" +
          "<div class=\"collapsible-header active \">"+
          "<i class=\"material-icons\">place</i>"+ json.date +
          // "<span> ("+ json.menu.length +")</span>"+
          "</div>" +
          "<div data-id=\"collapsible-body\">"+
            "<div class=\"row grid\">"+
            $menuOfDate +
            "</div>" +
          "</div>" +

        "</li>" +
        "<li class='"+ json.nextDate +"'>" +
          "<div class=\"collapsible-header\"><i class=\"material-icons\">whatshot</i>"+ json.nextDate +"</div>" +
          "<div class=\"collapsible-body\"><p>Lorem ipsum dolor sit amet.</p></div>" +
        "</li>";

        $("#bobcard").append($days);

    $('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

  };


});
