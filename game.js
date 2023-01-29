const buttonColours=["red", "blue", "green", "yellow"];
let userClickedPattern= [];
let gamePattern = [];
let gameStart = true;
let level = 0;
$('.btn').click( function(){
	const userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});
$(document).keypress(()=>{
	if(gameStart != false){
		nextSequence();
	}
	gameStart = false;
});
$('#reset').click(()=>{
	if(gameStart != false){
		nextSequence();
	}
	gameStart = false;
});

function nextSequence()
{
	const randomNumber = Math.floor(Math.random()*4);
	const randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$(`#${randomChosenColour}`).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0)});
	playSound(randomChosenColour);
	$('h1').text(`level ${level}`);
	level +=1
}
function playSound(name)
{
	const sound = new Audio(`./sounds/${name}.mp3`);
	sound.play();
}
function animatePress(currentColour){
	$(`.${currentColour}`).addClass("pressed");
	window.setTimeout(()=>{
		$(`.${currentColour}`).removeClass("pressed");
	}, 100);
}
function checkAnswer(currentLevel){
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
		console.log(currentLevel, level);
		if (currentLevel + 1 === level)
		{
			window.setTimeout(nextSequence, 1000);
			userClickedPattern = [];
		}
		console.log('success');
	}
	else{
		const wrongAudio = new Audio("./sounds/wrong.mp3");
		wrongAudio.play();
		$('body').addClass('game-over');
		window.setTimeout(()=>{
			$('body').removeClass('game-over');
		}, 200);
		startOver();
		$('h1').text("Game Over, Press Any Key or Click on Control to Restart");
	}
	
}
function startOver(){
	level = 0;
	gamePattern = [];
	gameStart = true;
}
