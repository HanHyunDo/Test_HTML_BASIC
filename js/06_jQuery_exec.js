function print_text() {
//    버튼을 눌렀을 때 실행할 코드를 기술해요!!
//     alert("호출되요!!")
    console.log($("#apple").text())
    console.log($("#pineapple").text())
    console.log($("ul > li[class]").text())  // text()는 태그 사이의 글자를 땡겨오는 역할임.

    console.log($("input[type=text]").val())  // 태그


    console.log($("ol > li.myList:first").text())
    console.log($("ol > li.myList:nth-child(1)").text())  // 몇번째 순번인가?
    console.log($("ol > li.myList:first + li").text())
    console.log($("ol > li.myList:last").text())

    $("input [type=text]").attr("size", 10)    // 사이즈를 10으로 줄이겠다. attr은 속성을 제어하는 메서드


}
function my_func() {
    // alert("과일이 바뀌었어요")
    // select box에서 과일이 바뀌면 실행된다.
    // 1. 선택한 과일이 어떤 과일인지 알아내야 한다.
    var fruit = $("select > option:selected").text()

    var my_list = $("ul > li")
    my_list.each(function(idx, item) {     //each()는 반복하라는 함수
        // console.log($(item).text())
        if($(item).text() == fruit) {
            $(item).css("color", "red")
        } else {
            $(item).css("color", "black")
        }
    })



}