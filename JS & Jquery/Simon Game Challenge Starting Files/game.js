var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(document).keydown(function () {
    if (level == 0) {
        nextSequence();
    }
})

// 1. generate a key to be pressed next
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(function (){
        $("#" + randomChosenColor).fadeToggle(100).fadeToggle(100);
        playSound(randomChosenColor);
    }, 1000);

}

// track the user's in put
$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer();
})

function checkAnswer() {
    var n = userClickedPattern.length - 1;
    if (gamePattern[n] === userClickedPattern[n]) {
        if (gamePattern.length === userClickedPattern.length) {
            console.log("success!");
            nextSequence();
        }
    } else {
        console.log("wrong");

        // play the wrong audio
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        // apply the wrong background
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // change the h1 & clear the game level
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// sound and animations
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor) {
    $("#" + currColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    gamePattern = [];
    level = 0;
}

