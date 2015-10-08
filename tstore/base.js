$(document).ready(function() {


  url = "./tstore/data/sampleN.json";
  PlanetX.init({appkey : "a2121b2c-529a-31e1-9550-2606b1196ac3"});

  callApi = function( url, successFn ) {
      $.ajax({
          type : 'GET',
          url : url,
          dataType : 'json',
          success : successFn,
      });
  };

  $('#bobcard').click(function(){
    callApi(url, response_json);

  });

  // 800개 리스트를 불러온다.
  function response_json (json){
    var list = $.parseJSON(json);
    var listLen = list.length;
    var search_callback ="";
    var contentStr = "";

    for(var i=0; i<listLen; i++){

      // 플래닛 API를 콜한다
      PlanetX.api(
        "get",
        "http://apis.skplanetx.com/tstore/products",
        "JSON",
        {"version": 1,
        "page": 1,
        "count": 5,
        "searchKeyword": list[i].prodNm,
        "order": "R"},
        search_callback
      );

      function search_callback( data ) {
         var search_callback = data.tstore.totalCount;

         contentStr += "<tr>"+
             "<td>"+ list[i].pkgNm + "</td>" +
             "<td>"+ list[i].prodNm + "</td>" +
             "<td>"+ search_callback +"</td>"+
           "</tr>";
        }
      }

      $('#bobcard').find('tbody').append(table);
  }



});
