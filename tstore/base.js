$(document).ready(function() {


  url = "http://metadata.co.kr/tstore/data/sampleN.json";
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
    console.log('click');
    callApi(url, response_json);

  });

var contentStr = "";

  function response_json (json){
    var list = json.content;
    for (var i = 0; i < list.length; i++) {

      contentStr += "<tr>";
      contentStr += "<td>"+ i + "</td>";
      contentStr += "<td>"+ list[i].pkgNm + "</td>";
      contentStr += "<td>"+ list[i].prodNm + "</td>";
      contentStr += "</tr>";
      $('tbody').append(contentStr);


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
           console.log(search_callback);

          //  contentStr += "<td>"+ search_callback +"</td>";
          //  contentStr += "</tr>";
          //  $('tbody').append(contentStr);
        }
    } // 루프 끝
} // 펑션 끝
}); // 문서 끝
