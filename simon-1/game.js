
var gamePattern=[];
var userClickedPattern=[];
var btnColours=["red","blue","green","yellow"];
var level=0;
var started=false;

$(document).keypress(function(event){
    if(!started){
        nextSequence();
    }

});

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]==userClickedPattern[currentlevel]){
        console.log("sucess");
        return true;
    }else{
        console.log("failed");
        return false;
    }
}


function nextSequence(){
    var randomNumber= (Math.floor(Math.random()*4));
    var randomChosenColour = btnColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    started=true;
    $("h1").text("Level "+level);
    
    playsound(randomChosenColour);
    Animate(randomChosenColour);
    console.log("game->"+gamePattern);
       
}

var currentlevel=0;
    $(".btn").click(function(){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playsound(userChosenColour);
        Animate(userChosenColour);
        console.log("user->" +userChosenColour);
        
        if(checkAnswer(currentlevel)){
            currentlevel++;
           // console.log("currentlevel "+currentlevel);

            if(currentlevel===gamePattern.length){
                setTimeout(function(){
                    currentlevel=0;
                    userClickedPattern=[];
                    nextSequence();
                },500);
            }
        }else{
            level=0;
            $("h1").text("Press A Key to Start");
            var audio= new Audio('./sounds/wrong.mp3');
            audio.play();
            $("body").css("background-color","red");
            setTimeout(function () {
                $("body").css("background-color", "#011F3F");
            }, 1000);
            started=false;
        }
    });


function playsound(colour){
    var audio= new Audio('./sounds/'+colour+'.mp3');
    audio.play();
}


function Animate(colour){
    $("." + colour).css("background-color", "black");
    setTimeout(function () {
        $("." + colour).css("background-color", colour);
    }, 100);
     
}


