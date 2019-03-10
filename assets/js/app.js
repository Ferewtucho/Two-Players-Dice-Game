var scores, roundScore, activePlayer, gamePlaying;

updateDom();

var lastDice;

document.querySelector(".start-game").addEventListener("click", function(e) {
  e.preventDefault();

  document.querySelector(".wrapper").style.display = "block";
  document.querySelector(".wrapper-toggle").style.display = "none";
});

document.querySelector(".btn-roll").addEventListener("click", function() {
  // if the game is playing state variable
  if (gamePlaying) {
    // 1.Random Number
    // Stores a number between 1 to 6 including 6;
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceTwo = Math.floor(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "assets/img/dice-" + dice + ".png";

    // Dice Two
    var diceDOMtwo = document.querySelector(".dice-2");
    diceDOMtwo.style.display = "block";
    diceDOMtwo.src = "assets/img/dice-" + diceTwo + ".png";

    // Find the sum of dice one and adice two

    // 3. Update the round score if the rolled number was not a 1

    if (dice !== 1 && diceTwo !== 1) {
      //Add score
      roundScore += dice + diceTwo;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  // if the game is playing state variable
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    // UPDATE THE DOM
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    // console.log(input);
    var winningScore;

    // undefined, 0, null or "" are corred to false
    // Anythingless else if corrced to true

    if (input) {
      winningScore = input;
    } else {
      winningScore = 50;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice-2").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", updateDom);

function updateDom() {
  // Bothe payers scores instead of putting it var score1 = 0; var score2 = 0;
  scores = [0, 0];

  // This will hold round score
  roundScore = 0;

  // This will tell me whose players playing 0 first player and 1 will be second player
  activePlayer = 0;

  // set the game state to true
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
