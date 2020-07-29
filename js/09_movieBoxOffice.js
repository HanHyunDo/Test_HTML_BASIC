function box_office() {

    $.ajax({
        async : true,
        url : "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?",
        data : {
            key : "530e47441657db539fbf493c1e87b508",
            targetDt : $("input[type=date]").val().replace(/-/gi,'')
        },
        type : "GET",
        timeout : 3000,
        dataType : "json",
        success : function (result) {
            var boxresult = result.boxOfficeResult.dailyBoxOfficeList

            $("tbody").empty()

            $.each(boxresult, function (idx, item) {
                var tr = $("<tr></tr>")
                var rnum = $("<td></td>").text(item.rnum +"등")
                var posterTd = $("<td></td>").attr(item)
                // var poster = $("<img />").attr("src", item.img)       // <img src=>
                // posterTd.append(poster)
                var movieNm = $("<td></td>").text(item.movieNm)
                var salesAcc = $("<td></td>").text(item.salesAcc)
                var audiAcc = $("<td></td>").text(item.audiAcc)
                var sangTd = $("<td></td>")
                var sangBtn = $("<input />").attr("type", "button").attr("value", "상세정보")
                // var td = $("<td></td>")

                sangBtn.on("click", function() {
                    $.ajax({
                        async: true,
                        url : "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json",
                        data : {
                            key : "530e47441657db539fbf493c1e87b508",
                            movieCd : item.movieCd
                        },
                        type : "GET",
                        timeout: 3000,
                        dataType: "json",
                        success : function (result1) {
                            var moviebox = result1.movieInfoResult.movieInfo

                            var genres =$("<td></td>")
                            for(i=0;i<moviebox.genres.length;i++){
                                genres.append(moviebox.genres[i].genreNm + " ")
                            }
                            var directors =$("<td></td>")
                            for(j=0;j<moviebox.directors.length;j++){
                                directors.append(moviebox.directors[j].peopleNm + " ")
                            }
                            var actors =$("<td></td>")
                            for(y=0;y<moviebox.actors.length;y++){
                                actors.append(moviebox.actors[y].peopleNm + " ")
                            }


                            var movieinfo = "영화제목 : " + moviebox.movieNm + "\n" +
                                "제작연도 : " + moviebox.prdtYear + "\n" +
                                "장르 : " + genres.text() + "\n" +
                                "감독 : " + directors.text() + "\n" +
                                "배우 : " + actors.text()

                            alert(movieinfo)




                        }
                    })


                })
                $.ajax({
                    async : true,   //동기 or 비동기
                    url : "https://dapi.kakao.com/v2/search/image",          // 호출할 서버쪽 프로그램
                    data : {
                        query : "영화 " + item.movieNm,
                        sort : "accuracy",

                    },
                    beforeSend : function(xhr) {
                        xhr.setRequestHeader("Authorization","KakaoAK 04373975d89c97b241b3c2089ae83478")
                    },
                    type : "GET",
                    timeout : 3000,
                    dataType : "json",
                    success : function (result2) {
                        var img_list = result2.documents
                        var img = $("<img />").attr("src", img_list[0].thumbnail_url).addClass("myImage")
                        posterTd.append(img)
                    },
                    error : function (error) {
                        alert("망함..")
                    }
                })


                sangTd.append(sangBtn)
                tr.append(rnum)
                tr.append(posterTd)
                tr.append(movieNm)
                tr.append(salesAcc)
                tr.append(audiAcc)
                tr.append(sangTd)

                $('tbody').append(tr)


            })



        },
            error : function (error) {
                alert("서버호출 실패!!")
        }

    })

}

