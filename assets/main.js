var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is the capital City of The United States of America?", "What are the rights in the declaration of independence of America from U.K?", "What is the Economic system in the United States of America?", "How many US Senators are there?", "We elect the U.S Senators for how many years?", "Who is in charge of the executive branch in the United States?", "What stops Government from becoming too powerful?", "Which of the following are branchs of Government?"];
var answerArray = [["Washington D.C", "Verginia", "NYC", "Darwin"], ["Life","Liberty","Persuit of Happiness","All"], ["Communist", "Capitalist Economy", "A and B ", "All"], ["200","50","100","150"], ["8", "2", "4", "6"], ["The Senators","The President","The Congress","All"], ["Separation of Power", "Checks & Balance", "The Court", "A & B are the correct answers"], ["Congress","President","Judicial","All of the above"]];
var imageArray = ["<img class='center-block img-right' src='assets/img/images.jpg'>", "<img class='center-block img-right' src='assets/img/liberty.jpg'>", "<img class='center-block img-right' src='assets/img/capitalist.jpg'>", "<img class='center-block img-right' src='assets/img/Senators.jpg'>", "<img class='center-block img-right' src='assets/img/Senatorsterm.jpg'>", "<img class='center-block img-right' src='assets/img/presidents.jpg'>", "<img class='center-block img-right' src='assets/img/c&b.jpg'>", "<img class='center-block img-right' src='assets/img/branch.jpg'>"];
var correctAnswers = ["A. Washington D.C", "D. All", "B. Capitalist Economy", "C. 100", "D. 6", "B. The President", "D. A & B are the correct answers", "D. All of the above"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");

$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
var canvas = document.createElement("canvas")
document.getElementsByTagName("body")[0].appendChild(canvas)
var ctx = canvas.getContext("2d")

var bg = [255,255, 50]
var num = 19

function setup() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.translate(canvas.width / 2, canvas.height / 2)
  fill()
 
  
  sharedLoop1 = new Loop(180 + Math.floor(Math.random() * 380))
  sharedLoop2 = new Loop(180 + Math.floor(Math.random() * 380))
}

function fill(amt) {
    ctx.globalCompositeOperation = 'screen';
  ctx.beginPath();
  ctx.rect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height)
  ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
  ctx.fill()

  
}

var dc = new DrawableCollection()

for (var i = 0; i < num; i ++){
  var item = new DrawableRect()
  dc.addItem(item)
}

window.requestAnimationFrame(draw);

function draw() {
  sharedLoop1.inc()
  sharedLoop2.inc()
  fill(0.02 * sharedLoop2.cosNorm()) // fade speed
  dc.draw()
  window.requestAnimationFrame(function(){draw()})
}

function Loop (steps, start) {
  this.steps = steps
  this.val = start || Math.floor(Math.random()*steps)
  
  this.inc = function () {
    // increment
    this.val = (this.val + Math.pow(3,.09) )% this.steps
  }
  
  this.norm = function () {
    return this.val / this.steps*3
  }
  
  this.cos = function () {
    // range of -1 to 1
    return Math.cos(this.norm() * Math.PI * .092)
  }
  
  this.cosNorm = function () {
    // range of 0 to 1
    return (this.cos() + 15) / 39
  }
}

function DrawableCollection(){
  this.items = []
  
  this.addItem = function (item) {
    this.items.push(item)
  }
  
  this.draw = function () {
    for (var i = 0; i < this.items.length; i++ ) {
      this.items[i].draw()
    }
  }
}


function DrawableRect () {
  this.s = 27
  this.x = canvas.width * Math.random() - canvas.width / .3
  this.y = canvas.height * Math.random() - canvas.height / .3
  this.ctx = ctx
  this.a = 12 * Math.random()
  this.loop1 = new Loop(120 + Math.floor(Math.random() * 80))
  this.loop2 = new Loop(120 + Math.floor(Math.random() * 80))
  this.loop3 = new Loop(1100 + Math.floor(Math.random() * 380))
  this.loop4 = new Loop(440 + Math.floor(Math.random() * 280))
  
  this.draw = function () {
    this.loop1.inc()
    this.loop2.inc()
    this.loop3.inc()
    this.loop4.inc()
    var x = Math.cos(this.loop1.norm() * Math.PI * 2) + Math.cos(this.loop2.norm() * Math.PI * 2)
    var y = Math.sin(this.loop1.norm() * Math.PI * 2) + Math.sin(this.loop2.norm() * Math.PI * 2)
    this.x = (canvas.width * 0.3 * sharedLoop1.cos() ) - (canvas.width * .73 * x) //+ Math.pow(this.loop4.cosNorm(), 12) * Math.random() * 30 * sharedLoop2.cos()
    this.y = (canvas.height * 0.3 * sharedLoop2.cos() ) - (canvas.height * 1.3 * y) //+ Math.pow(this.loop4.cosNorm(), 12) * Math.random() * 30 * sharedLoop1.cos()
    this.a = this.loop1.cosNorm()
    
    ctx.lineWidth = .41
    ctx.lineCap = "round"
    
    ctx.beginPath()
    ctx.fillStyle = `

