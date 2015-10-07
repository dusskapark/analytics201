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


    callApi(url, response_json)

  // 800개 리스트를 불러온다.
  function response_json (json){

    var NList = json.content;
    NList.forEach(function(v, i) {
      var item = v;
      $('#bobcard').append(item.pkgNm);
      $('#bobcard').append(item.prodNm);


      // 플래닛 API를 콜한다
      PlanetX.api(
        "get",
        "http://apis.skplanetx.com/tstore/products",
        "JSON",
        {"version": 1,
        "page": 1,
        "count": 5,
        "searchKeyword": item.prodNm,
        "order": "R"},
        search_callback
        // "success": search_callback,
        // "fail": "console.log('fail')"
      );

      function search_callback( data ) {

        $('#bobcard').append(data.tstore.totalCount);

        var list  = $.parseJSON(data.tstore.products.product);
        var contentStr = "";
        for (var i = 0; i < list.length; i++) {
          contentStr += list[i].name;
        }

        $('#bobcard').append(contentStr);

        // product.forEach(function(v,i){
        //   var aid = v;
        //   var aidDiv = "<a href='"+ aid.tinyUrl +"' target='_blank'> <p>" + aid.name + "</a></p>";
        //
        //   $('li').find(item.pkgNm).find('p').text('OK').append(aidDiv)
        //
        //
        // })


        }


    });
    // $('#bobcard').find('p').text('총 상품숫자: ' + totalElements);
  }



});
