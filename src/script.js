"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const chessboardWrapper = document.querySelector('.board'),
        generateCessboardBtn = document.querySelector('.generate');

    function buildBoard() {
        for (let i = 0; i < 10; i++) {
            let chessboardRow = document.createElement('section');
            chessboardRow.classList.add('board-row');
            chessboardWrapper.appendChild(chessboardRow);

            for (let j = 0; j < 10; j++) {
                let chessboardCell = document.createElement('div');
                chessboardCell.classList.add('cell');
                chessboardRow.appendChild(chessboardCell);

                if (i == 0 || i == 9) {
                    chessboardCell.classList.add('boardborders');
                    if (j > 0 && j < 9) {
                        chessboardCell.innerHTML = String.fromCharCode(65 + j - 1);
                    }
                }

                if (j == 0 || j == 9) {
                    chessboardCell.classList.add('boardborders');
                    if (i > 0 && i < 9) {
                        chessboardCell.innerHTML = 9 - i;
                    }
                }
                if (j < 9 && j > 0 && i > 0 && i < 9) {
                    (i % 2 == j % 2) ? chessboardCell.classList.add('cell-white') : chessboardCell.classList.add('cell-black');
                }
            }
        }
    }
    generateCessboardBtn.addEventListener('click', () => {
        buildBoard();
        chessboardWrapper.classList.remove('hidden');
        chessboardWrapper.classList.add('board-border', 'appear-animation');
        generateCessboardBtn.remove();
    });

});