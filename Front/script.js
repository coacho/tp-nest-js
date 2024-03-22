// Constants - START //
    const gameBoard = document.getElementById('gameBoard');
    const score = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    const GAMEBOARD_DATA_UPDATE_URL = 'http://localhost:3000/api/game-board-data';
    // const SCORE_UPDATE_URL_UPDATE_URL = 'http://localhost:3000/api/game-board-data';
    const GAMEBOARD_UPDATE_URL = 'http://localhost:3000/api/game-board';
    const MOVE_URL = 'http://localhost:3000/api/move';

    const handleResponse = (response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.text().then(text => text ? JSON.parse(text) : {})
    }
// Constants - END //

// Public method - START //
    // asyncrone //
    async function initializeGame() {
        updateGameBoard();
        updateGameBoardData();
        // await updateScore();
        move();
    }

    async function fetchData(url, method, body) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            .then(handleResponse)
            .then(data => {
                console.log(`Data from ${url}:`, data);
                return data;
            });
            console.log(`Response from ${url}:`, response);
            return response;
        } catch(error) { 
            console.error('Error : ', error);
        }
    }
    
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

    // async function fetchData(url,method,body){
    //     try {
    //         const response = await fetch(url,{
    //             method:method,
    //             headers:{
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify(body),
    //         })
    //         .then(handleResponse)
    //         .then(data => {
    //             console.log('Data:', data);
    //             return data;
    //         });
    //         console.log('response:', response);
    //         return response;
    //     } catch(error){ 
    //         console.error('Error : ',error);
    //     }
    // }
    // syncrone //
    // async function updateScore(){
    //     await fetchData(SCORE_UPDATE_URL,'POST',{score: score.textContent});
    // }

    // function updateGameBoard(){
    //     fetchData(GAMEBOARD_UPDATE_URL,'POST',{gameBoard: gameBoard.textContent}).then(gameBoard => { console.log('gameBoard  from updateGameBoard:'+gameBoard); displayGameBoard(gameBoard);}); 
    // }
    
    
    // function updateGameBoard(){
    //     fetchData(GAMEBOARD_UPDATE_URL,'POST',{}).then(gameBoardData => { 
    //         console.log('gameBoard from updateGameBoard:', gameBoardData); 
    //         displayGameBoard(gameBoardData);
    //     }); 
    // }

    function updateGameBoardData(){
        fetchData(GAMEBOARD_DATA_UPDATE_URL,'POST',{});
    }
    // function move() {
    //     let direction = '';
    //     document.addEventListener('keydown', function(event) {
    //         direction = event.key;                   
    //         console.log('Direction:', direction);    // toDo: remove
    //         fetchData(MOVE_URL,'POST',{direction: direction}).then (gameBoard => { console.log('gameBoard from move:'+gameBoard); updateGameBoard;})
    //     });
    //     }

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
                // if (gameBoardData[i][j] !== '' && gameBoardData[i][j] !== ' ' && gameBoardData[i][j] !== null && gameBoardData[i][j] !== undefined && gameBoardData[i][j] !== 0) {
                //     cell.classList.add('tetrimino');
                //     cell.textContent = gameBoardData[i][j];
                // }
                // else {
                //     cell.classList.remove('tetrimino');
                //     cell.textContent = '.';
                // }

                row.appendChild(cell);
                row.textContent = row.textContent + '\n';
            }
            gameBoard.appendChild(row);
        }
    }
    // function displayGameBoard(gameBoardData) {
    //     gameBoard.textContent.replace(/\n/g, '');
    //     for (let i = 0; i < gameBoardData.length; i++) {
    //         let row = document.createElement('div');
    //         row.className = 'row';
    //         for (let j = 0; j < gameBoardData[i].length; j++) {
    //             let cell = document.createElement('div');
    //             cell.className = 'cell';
    //             if (gameBoardData[i][j] !== '') {
    //                     cell.classList.add('tetrimino');
    //                     cell.textContent = gameBoardData[i][j];
    //             }
    //             else {
    //                 cell.classList.remove('tetrimino');
    //                 cell.textContent = '.';
    //             }
    //             row.appendChild(cell);
    //             row.textContent = row.textContent + '\n';
    //         }
    //         gameBoard.appendChild(row);
    //     }
    // }



//  Public method - END //

// Main - START //
    startButton.onclick = async function(){
        await initializeGame().then(startButton.textContent= 'Restart');
    };
// Main  - END //