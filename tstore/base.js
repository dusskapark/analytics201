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

randomString = function () {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
  var string_length = 3;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
  var rnum = Math.floor(Math.random() * chars.length);
  randomstring += chars.substring(rnum,rnum+1);
  }
  //document.randform.randomfield.value = randomstring;
  return randomstring;
  }

  // 800개 리스트를 불러온다.
  function response_json (json){

    var NList = json.content;
    NList.forEach(function(v, i) {
      var item = v;
      // console.log(item.pkgNm);
      // console.log(item.prodNm);


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

        console.log(randomString() + data.tstore.totalCount);
        console.log(data.tstore.products.product);


        }


    });
    // $('#bobcard').find('p').text('총 상품숫자: ' + totalElements);
  }



});
