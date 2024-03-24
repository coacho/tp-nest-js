// Constants - START //
    const gameBoard = document.getElementById('gameBoard');
    const score = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    const GAMEBOARD_DATA_UPDATE_URL = 'http://localhost:3000/api/game-board-data';
    const SCORE_UPDATE_URL_UPDATE_URL = 'http://localhost:3000/api/update-score';
    const GAMEBOARD_UPDATE_URL = 'http://localhost:3000/api/game-board';
    const MOVE_URL = 'http://localhost:3000/api/move';

    const handleResponse = (response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.text().then(text => text ? JSON.parse(text) : {})
    }
// Constants - END //

// Public method - START //
    // asyncrone //
    async function initializeGame(newGame) {
        const indexGame = newGame ? 0 : 1;
        updateGameBoardData(indexGame);
        updateGameBoard();
        move();
        newGame = false;
    }

    async function fetchData(url, method, body) {
        try {
            const timestamp = Date.now();  
            const uniqueUrl = `${url}?t=${timestamp}`;
     
            const response = await fetch(uniqueUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                cache: 'no-cache',
            })
            .then(handleResponse)
            .then(data => {
                console.log(`Data from ${uniqueUrl}:`, data);
                return data;
            });
            console.log(`Response from ${uniqueUrl}:`, response);
            return response;
        } catch(error) { 
            console.error('Error : ', error);
        }
    }
    
    // syncrone //
    function updateGameBoard() {
        fetchData(GAMEBOARD_UPDATE_URL, 'POST', {})
        .then(gameBoardData => { 
            console.log('gameBoard from updateGameBoard:', gameBoardData); 
            displayGameBoard(gameBoardData);
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
    }

    function updateGameBoardData(indexGame){
        fetchData(GAMEBOARD_DATA_UPDATE_URL,'POST',{index:indexGame});
    }

    function move() {
        let direction = '';
        document.addEventListener('keydown', function(event) {
            direction = event.key;                   
            console.log('Direction:', direction);
            fetchData(MOVE_URL,'POST',{direction: direction})
            .then(() =>{ 
                console.log('UPDATE GAMEBOARD'); 
                updateGameBoard();
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
        });
    }

    function displayGameBoard(gameBoardData) {
        
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
    
        for (let i = 0; i < gameBoardData.length; i++) {
            let row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < gameBoardData[i].length; j++) {
                let cell = document.createElement('div');
                cell.className = 'cell';
                if (gameBoardData[i][j] !== '') {
                    cell.classList.add('tetrimino');
                    cell.textContent = gameBoardData[i][j];
                }
                else {
                    cell.classList.remove('tetrimino');
                    cell.textContent = '';
                }

                row.appendChild(cell);
                row.textContent = row.textContent + '\n';
            }
            gameBoard.appendChild(row);
        }
    }

//  Public method - END //

// Main - START //
    startButton.onclick = async function(){
        await initializeGame(true).then(startButton.textContent= 'Restart', newGame = true);
    };
// Main  - END //