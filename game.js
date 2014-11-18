$(document).ready(function() {
    var current = -1;
    var play = true;
    var score = 0;
    var i = 0;
    var N = 100;
    var hit = 0;
    var states = ["left", "up", "right", "down"];

    function run() {
        current = (Math.floor(Math.random()*4));
        color = '#'+Math.floor(Math.random()*16777215).toString(16);
        $("body").append("<div class='game-block'style='background:"+color+"'>"+states[current]+"</div>");
        $("html, body").animate({ scrollTop: $(document).height() }, 100);
        i ++;
        if (i < N && hit+1 === i) {
            setTimeout(run, 2000);
        }
        else {
            alert("Game Over! Your Score: "+score);
            location.reload();
        }
    }
    run();

    $(document).keydown(function (e) {
        if (e.keyCode === (37+current)) {
            score++;
            hit ++; 
            $("#score-block").text("Score: "+score);
        }
        else{
            hit ++;
            alert("Game Over! Your Score is: "+score);
            location.reload();
        }
    });
});