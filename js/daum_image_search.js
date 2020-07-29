function search_image() {
    // enter key를 입력하면.
    if(event.keyCode == 13) {

        //AJAX를 이용해서 DAUM쪽 Open API를 호출

        $.ajax({
            async : true,   //동기 or 비동기
            url : "https://dapi.kakao.com/v2/search/image",          // 호출할 서버쪽 프로그램
            data : {
                query : $("#movie_name").val() + "영화 포스터",
                sort : "accuracy"
            },
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Authorization","KakaoAK 04373975d89c97b241b3c2089ae83478")
            },
            type : "GET",
            timeout : 3000,
            dataType : "json",
            success : function (result) {
                var img_list = result.documents
                var li = $("<li></li>")
                var img = $("<img />").attr("src", img_list[0].thumbnail_url).addClass("myImage")
                li.append(img)
                $("ul").append(li)
            },
            error : function (error) {
                alert("망함..")
            }
        })

    }

}

// curl -X GET -H 'Authorization: KakaoAK ${APP_KEY}' 'https://dapi.kakao.com/v2/search/image?query=%EC%9D%B8%ED%84%B0%EC%8A%A4%ED%85%94%EB%9D%BC&sort=accuracy'
// 04373975d89c97b241b3c2089ae83478