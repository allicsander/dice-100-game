
var scores, 
    currentScore, 
    activePlayer, 
    gameState, 
    previousRoll,
    isRollable;

    init();

    document.querySelector(".btn-new").addEventListener("click", init);
    
    function init() {
        scores = [0, 0];
        currentScore = 0;
        activePlayer = 0;
        previousRoll = 0;
        gameState = true;
        isRollable = true;
        document.getElementById("name-" + 0).textContent = "Player 1";
        document.getElementById("name-" + 1).textContent = "Player 2";
        document.querySelector(".player-0-panel").classList.remove("winner");
        document.querySelector(".player-1-panel").classList.remove("winner");
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.add("active");
        document.querySelector(".dice").style.display = "none";
        document.getElementById("score-0").textContent = 0;
        document.getElementById("score-1").textContent = 0;
        document.getElementById("current-0").textContent = 0;
        document.getElementById("current-1").textContent = 0;
    }
    
    function changePlayer() {
        if (gameState) {
            currentScore = 0;
            previousRoll = 0;
            document.getElementById("current-" + activePlayer).textContent = currentScore;
            if(activePlayer === 0) {
                activePlayer = 1
            } else {
                activePlayer = 0
            }
            document.querySelector(".player-0-panel").classList.toggle("active");
            document.querySelector(".player-1-panel").classList.toggle("active");
            document.querySelector(".dice").style.display = "none";
        }
    }
    
    document.querySelector(".btn-roll").addEventListener("click", function() {
        if (gameState && isRollable) {
            //Roll a dice
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceLeftOffset = Math.floor(Math.random() * 20) + 40;
        var diceTopOffset = Math.floor(Math.random() * 25) + 20;
        document.querySelector(".dice").src = "img/dice-" + dice + ".png";
        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice").style.left = diceLeftOffset + "%";
        document.querySelector(".dice").style.top = diceTopOffset + "%";
            if(previousRoll === 6 && dice === 6){
                scores[activePlayer] = 0;
                document.getElementById("score-" + activePlayer).textContent = scores[activePlayer] ;
                changePlayer();
            } else {
                //Add to current score
                  if(dice !== 1) {
                    currentScore += dice;
                    previousRoll = dice;
                    document.getElementById("current-" + activePlayer).textContent = currentScore;
                } else {
                  //If 1 is rolled, pause for 1.5 sec. and then reset current score and activate another player
                  isRollable = false;      
                  setTimeout(activateRoll, 1500);
                }   
             }
        }
    })
    
    function activateRoll(){
      isRollable = true;
      changePlayer();
    }


    document.querySelector(".btn-hold").addEventListener("click", function() {
        if (gameState) {
        //Transfer current score to global score
        scores[activePlayer] += currentScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            
            var input = document.querySelector(".final-score").value;
            var winningScore;
            if(input) {
                winningScore = input;
            } else {
                winningScore = 100;
            }

        //Checking whether player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gameState = false;
        }

        //Changing player
        changePlayer();
        }
    })
