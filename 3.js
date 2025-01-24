// Game variables
let board = ['', '', '', '', '', '', '', '', '']; // Board state
let currentPlayer = 'X'; // Current player
let gameActive = true; // Game status

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});
resetButton.addEventListener('click', resetGame);
closePopupButton.addEventListener('click', closePopup);

// Handle cell click
function handleCellClick(index) {
    if (board[index] || !gameActive) return; // Ignore if cell already filled or game over

    board[index] = currentPlayer;
    cells[index].classList.add(currentPlayer); // Add X or O class to cell
    cells[index].style.pointerEvents = 'none'; // Disable further clicks on filled cells
    cells[index].classList.add('clicked'); // Add clicked class for animation
    checkWinner();
    switchPlayer();
}

// Switch player turns
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            highlightWinningCells([a, b, c]);
            showPopup(`${currentPlayer} Wins!`);
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        statusText.textContent = "It's a Draw!";
        showPopup("It's a Draw!");
    }
}

// Highlight winning cells
function highlightWinningCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = '#f39c12'; // Yellow for winning cells
        cells[index].style.transition = 'background-color 0.3s ease';
    });
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('X', 'O', 'clicked');
        cell.style.backgroundColor = '#ecf0f1';
        cell.style.pointerEvents = 'auto';
    });
    statusText.textContent = `Player X's Turn`;
}

// Show Popup
function showPopup(message) {
    popup.style.display = 'flex';
    popupMessage.textContent = message;
}

// Close Popup
function closePopup() {
    popup.style.display = 'none';
}
