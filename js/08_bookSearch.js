function call_ajax() {
    // 입력텍스트상자에서 키보드로 입력이 들어왔을 때 호출
    // 모든 키에 대해서 처리하는게 아니라 enter key일 경우에만 처리
    if (event.keyCode == 13) {
        // 만약 입력된 enter key이면 이 부분을 수행하게 된다.
        // 서버쪽 프로그램을 호출해서 결과를 받아온다.
        // jQuery를 이용해서 AJAX처리를 해보자.
        // ajax의 인자로 javascript 객체를 넣어준다.
        // javascript 객체는 => { key : value, key : value, ......}
        // data : 서버프로그램에게 넘겨줄 데이터들...
        $.ajax({
            async : true,      // 비동기 방식의 호출(default)    false는 동기 방식으로 호출
            url : "http://192.168.0.200:8080/bookSearch/search",
            data : {
                keyword : $("input[type=text]").val()
            },
            type : "GET",
            timeout : 3000,      //밀리세컨드기준임. 3초
            dataType : "json",       // 결과 JSON은 JavaScript객체로 변환이 된다.
            success : function (result) {    // 서버가 보내준 데이터가 result로 받는다.
                $("tbody").empty()
                /*
                * <tr>
                *     <td><img src=...></td>
                *
                * */
                $.each(result,function (idx, item) {
                    var tr = $("<tr></tr>")   // <tr></tr>
                    var imgTd = $("<td></td>")// <td></td>
                    var img = $("<img />").attr("src", item.img)       // <img src=>
                    imgTd.append(img)
                    var titleTd = $("<td></td>").text(item.title)// <td></td>
                    var authorTd = $("<td></td>").text(item.author)// <td></td>
                    var priceTd = $("<td></td>").text(item.price)// <td></td>
                    var buttonTd = $("<td></td>")
                    var delBtn = $("<input />").attr("type", "button").attr("value", "삭제")

                    delBtn.on("click", function () {
                        //현재 클릭된 버튼에 대한 책 정보를 찾아서 화면에서 삭제
                        // this: 현재 이벤트가 발생된 객체를 지칭
                        $(this).parent().parent().remove()
                   })

                    buttonTd.append(delBtn)
                    tr.append(imgTd)
                    tr.append(titleTd)
                    tr.append(authorTd)
                    tr.append(priceTd)
                    tr.append(buttonTd)

                    $("tbody").append(tr)
                })
            },
            error : function (error) {
                alert("서버호출 실패!!")
            }
        })
    }


}
// if(event.keyCode == 13) {
//     // AJAX call을 이용해서 데이터를 받아오는 코드가 나오면 된다.
//     // 이부분은 월요일날 작성하도록 하기.
// }
                // for(i=0;i<result.length; i++){
                //     var tr = $("<tr id='myDelete'></tr>")   // <tr></tr>
                //     var imgTd = $("<td></td>")// <td></td>
                //     var img = $("<img />").attr("src", result[i].img)       // <img src=>
                //     imgTd.append(img)
                //     var titleTd = $("<td></td>").text(result[i].title)// <td></td>
                //     var authorTd = $("<td></td>").text(result[i].author)// <td></td>
                //     var priceTd = $("<td></td>").text(result[i].price)// <td></td>
                //     var buttonTd = $("<td><input type='button' value='삭제' onclick='my_delete()'></td>")
                //
                //     tr.append(imgTd)
                //     tr.append(titleTd)
                //     tr.append(authorTd)
                //     tr.append(priceTd)
                //     tr.append(buttonTd)
                //
                //     $("tbody").append(tr)
                //
                // }


