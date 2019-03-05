var scores, roundScore, activePlayer;

updateDom();

document.querySelector('.start-game').addEventListener('click', function (e) {

    e.preventDefault();

    document.querySelector('.wrapper').style.display = "block";
    document.querySelector('.wrapper-toggle').style.display = "none";

});


document.querySelector('.btn-roll').addEventListener('click', function () {

    // 1.Random Number
    // Stores a number between 1 to 6 including 6;
    var dice = Math.floor(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/img/dice-' + dice + '.png';

    // 3. Update the round score if the rolled number was not a 1
    if (dice !== 1) {
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {

        nextPlayer()

    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {

        document.querySelector('#name-' + activePlayer).textContent = "Winner!!";
        document.querySelector(".dice").style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        nextPlayer();
    }

})



function nextPlayer() {

    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector(".dice").style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', updateDom);

function updateDom() {
    // Bothe payers scores instead of putting it var score1 = 0; var score2 = 0;
    scores = [0, 0];

    // This will hold round score
    roundScore = 0;

    // This will tell me whose players playing 0 first player and 1 will be second player
    activePlayer = 0;

    document.querySelector(".dice").style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}