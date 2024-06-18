const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameState[index] !== null || !gameActive) {
        return;}
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()){
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== null)) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';}}
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== null && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });}
function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
