let game = (function() {
    const board = [];
    let outcome;
    const choice = document.querySelector('.pvp')
    function gameboard() {
        const rows = 3;
        const columns = 3;
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
            board[i].push('');
            }
        }
    }
    const players = [
        {
            name: '',
            token:"X"
        },
        {
            name:'',
            token:"O"
        }
    ]
    let activePlayer = players[0];
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players [0]
    }
    const turn = document.querySelector('.turn')
    function dropToken(row,column) {
        if (board[row][column] != '' ){
            turn.textContent = 'This spot is already taken!';return 
        }
            else {
                board[row][column] = activePlayer.token
            }
            switchPlayer()
            turn.textContent = `Now it is ${activePlayer.name}'s turn`
    }
        const container = document.querySelector('.container')
    let generateGrid = function() {
            for (i = 0;i < board.length;i++){
            const box = document.createElement('div');
            box.classList.add(`box`);
            box.setAttribute('id',`${i}0`);
            box.textContent= `${board[i][0]}`;
            container.appendChild(box)
                for(j = 1;j < board.length;j++){
                    const box = document.createElement('div');
                    box.classList.add(`box`);
                    box.setAttribute('id',`${i}${j}`);
                    box.textContent= `${board[i][j]}`;
                    container.appendChild(box)
                }      
            }
    }
    function wipeChoice(){
        const gamechoice = document.querySelector('.game-choice')
            for(i=0;i < 1;i++){
                gamechoice.removeChild(gamechoice.lastChild)
            }
        }
    const nametext = document.querySelector('.pvp')
    const reset = document.querySelector('.reset')
    function setName() {
    choice.addEventListener('click',() => {
            gameboard();wipeChoice();
            players[0].name = prompt('Enter Player 1`s name.');
            players[1].name= prompt('Enter Player 2`s name.');
            if (players[0].name === '' || players[1].name === ''){
                players[0].name = prompt('Enter Player 1`s name.');
                players[1].name= prompt('Enter Player 2`s name.');
            }
            nametext.textContent = `${players[0].name}(X) VS ${players[1].name}(O)`;
            generateGrid();gameListener();
            reset.style.cssText = 'display:initial'
        })
    }
    setName()
    let gameListener = function(){
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(div => div.addEventListener('click',(event) => controller(event.target.id[0],event.target.id[1])))
    }
    gameListener()

    let wipeGrid = function() {
    let childcount = container.childElementCount
        for (i = 0;i < childcount;i++) {
            container.removeChild(container.firstChild)
        }
    }
    function outcomeLogic(){
        f = board.flat();
        let g = f.map((x) => {
                if(x === ''){return 'x'}
                    else {return ''}
            }
        )
        if (f[0]!= '' && f[0] ===f[1] && f[1]===f[2] ||
            f[3] != '' && f[3] === f[4] && f[4] === f[5] ||
            f[6] != '' && f[6] === f[7] && f[7] === f[8] ||
            f[0] != '' && f[0] === f[3] && f[3] === f[6] ||
            f[1] != '' && f[1] === f[4] && f[4] === f[7] ||
            f[2] != '' && f[2] === f[5] && f[5] === f[8] ||
            f[0] != '' && f[0] === f[4] && f[4] === f[8] ||
            f[2] != '' && f[2] === f[4] && f[4] === f[6])
            {return outcome = 1}
        else if (g.toString().replaceAll(',','') === ''){return outcome = 2}
    }
    function winMessage(){
        const outcome = document.querySelector('.outcome')
        const outcomeText = document.createElement('div')
        outcomeText.classList.add('.outcome-text')
        outcomeText.textContent = `${activePlayer.name} Wins!`
        outcome.appendChild(outcomeText)
    }
    function drawMessage(){
        const outcome = document.querySelector('.outcome')
        const outcomeText = document.createElement('div')
        outcomeText.classList.add('.outcome-text')
        outcomeText.textContent = `Its a Draw!`
        outcome.appendChild(outcomeText)
    }
    let controller = (row,column) => {
        dropToken(row,column);
        outcomeLogic();
        wipeGrid();
        generateGrid();
        if (outcome === 1){return winMessage()}
        else if (outcome === 2){return drawMessage()}
        gameListener()
    }
    reset.addEventListener('click',(e) => location.reload())
})()

