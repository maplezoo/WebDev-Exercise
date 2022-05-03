$("h1").css("color","orange");
$("h1").addClass("big-title");

$("button").click(function (){
    $("h1").css("color","blue");
});

$(document).keypress(function (e){
    $("h1").text(e.key);
})
