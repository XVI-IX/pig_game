/**
 * Game Rules:
 * -- 2 Players playing in rounds
 * -- each player roll die as many times as he wishes and score is added to
 * round score, this takes place on every turn
 *  first person to reach a particular score wins
 */

var scores, roundScore, activePlayer, gamePlaying;

init();



var diceDOM = document.querySelector(".dice");

// Adding Events listener to rool dice button

document.querySelector(".btn--roll").addEventListener('click', function() {
    if (gamePlaying) {
      // 1. Random number is needed
      var dice = Math.floor(Math.random() * 6) + 1;
      document.querySelector("#current--" + activePlayer).textContent = dice;

      // 2. display results
      diceDOM.style.display = "block";
      diceDOM.src = "/images/dice-" + dice + ".png";

      //3. Update round only if rolled number is not 1
      if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector("#current--" + activePlayer).textContent =
          roundScore;
      } else {
        // change players
        nextPlayer();
      }
    }
});

document.querySelector(".btn--hold").addEventListener('click', function() {
    if (gamePlaying) {
      // Add current score to global score
      scores[activePlayer] += roundScore;

      // update ui to reflect changes
      document.querySelector("#score--" + activePlayer).textContent =
        scores[activePlayer];
      // change players

      // check if player won the game
      if (scores[activePlayer] >= 20) {
        document.getElementById("name--" + activePlayer).textContent = "Winner";
        diceDOM.style.display = "none";

        document
          .querySelector(".player--" + activePlayer)
          .classList.remove("player--active");
        document
          .querySelector(".player--" + activePlayer)
          .classList.add("player--winner");
        gamePlaying = false;
        
      } else {
        nextPlayer();
      }
    }
});


document.querySelector(".btn--new").addEventListener('click', init);


function nextPlayer() {
    document.querySelector("#current--" + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    
    document.querySelector(".player--0").classList.toggle("player--active");
    document.querySelector(".player--1").classList.toggle("player--active");
    diceDOM.style.display = 'none';
}


function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // Set scores to 0
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";


  // Hiding the dice
  document.querySelector(".dice").style.display = "none";

  document.querySelector(".player--0").classList.remove('player--winner');
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");

  document.querySelector(".player--0").classList.add('player--active');
  
}