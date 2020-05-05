var clickSound = new Audio('mouseClick.wav');
var correctSound = new Audio('correct.wav');
var wrongSound = new Audio('wrong2.mp3');


var question = document.getElementById("question");
var button1 = document.getElementById("option1");
var button2 = document.getElementById("option2");
var button3 = document.getElementById("option3");

var scoreIndicator = document.getElementById("scoreIndicator");


var score = 0;

var questionNumber = 0;

var questionsEnded = false;

var questions = {
	
		0 : ["Question", "Wrong", "Wrong", "Correct", ["Correct"]], //pos 0 : question, pos 1: option 1, pos 2: option 2, pos 3:option 3, pos 4: correct option
		1 : ["Sophisticated Question", "Wrong", "Correct", "Wrong", ["Correct"]],
		2 : ["Weird Question", "Correct", "Wrong", "Wrong", ["Correct"]],
		3 : ["Dumb Question", "Wrong", "Correct", "Wrong", ["Correct"]],
		4 : ["Trick Question", "Wrong", "Wrong", "Correct", ["Wrong"]],
		5 : ["Magic Question", "Correct", "Wrong", "Wrong", ["Correct"]],
		6 : ["Laggy Question", "Wrong", "Wrong", "Correct", ["Correct"]],
		7 : ["What", "Correct", "Correct", "Correct", ["Correct"]],
		8 : ["Question", "Wrong", "Wrong", "Correct", ["Correct"]],
		9 : ["Question", "Wrong", "Correct", "Wrong", ["Correct"]],
		10 : ["The Question is the Answer", "Wrong", "Wrong", "Correct", ["Correct"]],
}


question.innerHTML = "Q"+questionNumber + ". " + questions[questionNumber][0];
button1.append(document.createElement("h3").innerHTML = questions[questionNumber][1]);
button2.append(document.createElement("h3").innerHTML = questions[questionNumber][2]);
button3.append(document.createElement("h3").innerHTML = questions[questionNumber][3]);





function playSound(){
	clickSound.play();
}

//$( ".button" ).onmouseenter(function() {
//  clickSound.play();
//});


$('.button').click(function(){
	
	if(this.id == "start"){
		document.getElementById('quizStart').style.opacity = '0';
		document.getElementById('quizStart').style.zIndex = "-10";
		document.getElementById('quizStart').style.transition = "opacity 0.4s;";
		clickSound.play();

	} else{
			console.log(score);
		if(questionNumber == Object.keys(questions).length - 1){

			if(questionsEnded){
				restart();

			} else{
				this.style.background = "red";
				this.style.transition = "background .25s ease-in-out";
				changeBack(this);
				wrongSound.play();
				changeValue(-1);
			
			}

				

			
		} else{
			if(questions[questionNumber][4].includes(this.innerHTML)){
				this.style.background = "green";
				correctSound.play();
				changeValue(3);
				nextQuestion(this);			
				

			} else{
				this.style.background = "red";
				this.style.transition = "background .25s ease-in-out";
				changeBack(this);
				wrongSound.play();
				changeValue(-1);

				
			}

		}
	}
	
});

$('#question').click(function(){
	if(questionNumber == Object.keys(questions).length - 1){
		changeValue(3);

		questionsEnded = true;
		correctSound.play();
		endScore();		
	}
	

});

function changeValue(num){
	setTimeout(function () {
		
		score += num;
		scoreIndicator.style.width = "calc(" + ((score/(Object.keys(questions).length*3)) * 100) + "%)";
		scoreIndicator.style.transition = "width .25s";
		if(score < -2){
			score = 0;
		}


	}, 10);
				
}

function nextQuestion(id){
	document.getElementById("box").style.pointerEvents="none";

	button1.style.opacity = "0";
	button1.style.transition = "opacity .25s ease-in-out";

	button2.style.opacity = "0";
	button2.style.transition = "opacity .25s ease-in-out";

	button3.style.opacity = "0";
	button3.style.transition = "opacity .25s ease-in-out";

    setTimeout(function () {

		questionNumber += 1;

		question.innerHTML = "Q"+questionNumber + ". " + questions[questionNumber][0];
		button1.innerHTML = questions[questionNumber][1];
		button2.innerHTML = questions[questionNumber][2];
		button3.innerHTML = questions[questionNumber][3];

		button1.style.background = "";
		button2.style.background = "";
		button3.style.background = "";

		button1.style.opacity = "1";
		button1.style.transition = "opacity .25s ease-in-out";

		button2.style.opacity = "1";
		button2.style.transition = "opacity .25s ease-in-out";

		button3.style.opacity = "1";
		button3.style.transition = "opacity .25s ease-in-out";

		document.getElementById("box").style.pointerEvents="auto";
		correctSound.pause();
		correctSound.currentTime = 0;
    }, 500);

}

function endScore(){
	document.getElementById("box").style.pointerEvents="none";

	button1.style.background = "";
	button2.style.background = "";
	button3.style.background = "";	

	question.style.opacity = "0";
	question.style.transition = "opacity .25s ease-in-out";

	button1.style.opacity = "0";
	button1.style.transition = "opacity .25s ease-in-out";

	button2.style.opacity = "0";
	button2.style.transition = "opacity .25s ease-in-out";

	button3.style.opacity = "0";
	button3.style.transition = "opacity .25s ease-in-out";

	

    setTimeout(function () {
	question.innerHTML = "Final Score";
	question.style.opacity = "1";
	question.style.transition = "opacity .25s ease-in-out";
	scoreIndicator.style.width = "calc(" + ((score/(Object.keys(questions).length*3)) * 100) + "%)";

	scoreIndicator.style.transition = "width .25s";
	button2.style.opacity = "1";
	button2.style.pointerEvents="none";
	button2.style.border="0px";
	button2.innerHTML = score+ "/" + (Object.keys(questions).length) * 3;
	button2.style.transition = "opacity .25s ease-in-out";

	button3.style.opacity = "1";
	button3.innerHTML = "Try Again?";
	button3.style.transition = "opacity .25s ease-in-out";

	document.getElementById("box").style.pointerEvents="auto";
	button1.style.zIndex = "-10";
	

    }, 500);
}

function restart(){
	questionNumber = 0;
	questionsEnded = false;
	score = 0;



	document.getElementById('quizStart').style.opacity = '1';
	document.getElementById('quizStart').style.zIndex = "10";
	document.getElementById('quizStart').style.transition = "opacity 0.25s";

    setTimeout(function () {
		button1.style.background = "";
		button2.style.background = "";
		button3.style.background = "";

		document.getElementById("box").style.pointerEvents="auto";

		button1.style.opacity = "1";
		button1.style.transition = "opacity .25s ease-in-out";
		button1.style.zIndex = "1";

		button2.style.opacity = "1";
		button2.style.pointerEvents="auto";
		button2.style.border="0.5px solid #25383C";
		button2.style.transition = "opacity .25s ease-in-out";

		button3.style.opacity = "1";
		button3.style.transition = "opacity .25s ease-in-out";
		scoreIndicator.style.width = "calc(" + ((score/(Object.keys(questions).length*3)) * 100) + "%)";
		scoreIndicator.style.transition = "width .25s";
		question.innerHTML = "Q"+questionNumber + ". " + questions[questionNumber][0];
		button1.innerHTML = questions[questionNumber][1];
		button2.innerHTML = questions[questionNumber][2];
		button3.innerHTML = questions[questionNumber][3];
	

    }, 500);

}

function changeBack(id){
    setTimeout(function () {
		id.style.background = "white";
		id.style.transition = "background .25s ease-in-out";
		wrongSound.currentTime = 0;
		wrongSound.pause();
    }, 250);

}
