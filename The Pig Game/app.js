/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var score, roundScore, currentPlayer, isGameOver, winScore;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(!isGameOver){
        // get dice value
        var dice = Math.floor(Math.random() * 6) + 1;

        // add the dice image corresponding to the value
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // add the values in respective players score card
        if(dice === 1){
            nextPlayer();
        }else{
            //add them
            roundScore += dice;
            document.getElementById('current-' + currentPlayer).textContent = roundScore;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(!isGameOver){
        // add to score of the current player
        score[currentPlayer] += roundScore;
        document.getElementById('score-' + currentPlayer).textContent = score[currentPlayer];

        // check winner
        if(score[currentPlayer] >= winScore){
            document.querySelector('.player-' + currentPlayer +'-panel').classList.add('winner');
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            isGameOver = true;
        }else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame(){

    winScore = prompt('What should be the Winnig Score?');

    winScore = winScore === 0? 100 : winScore;

    isGameOver = false;
    score = [0, 0];
    roundScore = 0;
    currentPlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer(){

    // change player
    currentPlayer = currentPlayer === 0? 1 : 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}
