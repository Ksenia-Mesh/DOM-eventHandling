/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Board.js
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
class Board {
  constructor() {
    this.board = null;
    this.boardEl = document.getElementById('board');
  }
  initiationBoard(size) {
    // создание массива board
    const arr = [];
    let element = '';
    for (let i = 0; i < size; i++) {
      arr.push([]);
      for (let j = 0; j < size; j++) {
        arr[i].push(element);
      }
    }
    this.board = arr;
    this.renderBoard(this.board);
  }
  renderBoard(board) {
    const fields = [];
    for (const [i, row] of board.entries()) {
      for (const [j, value] of row.entries()) {
        fields.push(`
            <div class="field" 
              data-row="${i}" 
              data-col="${j}"
              style="grid-row:${i + 1};grid-column:${j + 1};">
              ${value || ''}
            </div>
          `);
      }
    }
    this.boardEl.innerHTML = fields.join('');
  }
}
;// CONCATENATED MODULE: ./src/js/Sprite.js
class Sprite {
  constructor() {
    this.sprite = 'sprite';
    this.positionSprite = -1;
  }
  randomPositionSprite(size) {
    const divs = document.querySelectorAll('.field');
    const randomInt = Math.floor(Math.random() * size ** 2);
    if (this.positionSprite >= 0) {
      divs[this.positionSprite].classList.remove(this.sprite);
      this.positionSprite = -1;
    }
    divs[randomInt].classList.add(this.sprite);
    this.positionSprite = randomInt;
  }
}
;// CONCATENATED MODULE: ./src/js/GamePlay.js
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */


class GamePlay {
  constructor() {
    this.size = 4; // кол-во ячеек в массиве
    this.modalEl = document.getElementById('modal');
    this.countDead = null;
    this.countLost = null;
    this.count = null;
  }
  startGame() {
    const board = new Board();
    board.initiationBoard(this.size);
    const sprite = new Sprite();
    this.onCellClick();
    this.onButtonClick();
    setInterval(() => {
      sprite.randomPositionSprite(this.size);
      this.countLost.textContent = +this.countLost.textContent + this.count;
      if (this.count !== 1) {
        setTimeout(this.count = 1, 1000);
      }
      this.checkWinner();
    }, 1000);
  }
  onCellClick() {
    const fields = document.querySelectorAll('.field');
    this.countDead = document.getElementById('dead');
    this.countLost = document.getElementById('lost');
    for (let i = 0; i < fields.length; i++) {
      fields[i].addEventListener('click', () => {
        if (fields[i].classList.contains('sprite')) {
          fields[i].classList.remove('sprite');
          this.countDead.textContent = +this.countDead.textContent + 1;
        } else {
          this.countLost.textContent = +this.countLost.textContent + 1;
        }
        this.checkWinner();
        this.count = 0;
      });
    }
  }
  onButtonClick() {
    const resetButtons = document.querySelectorAll('.reset');
    for (const btn of resetButtons) {
      btn.addEventListener('click', () => {
        if (!this.modalEl.classList.contains('hidden')) {
          this.modalEl.classList.add('hidden');
        }
        this.reset();
      });
    }
  }
  reset() {
    this.countDead.textContent = 0;
    this.countLost.textContent = 0;
  }
  checkWinner() {
    if (this.countDead.textContent == 5) {
      this.showWinner('🍾 Победа! 🍾');
    }
    if (this.countLost.textContent > 5) {
      this.showWinner('Вы проиграли!');
    }
  }
  showWinner(status) {
    const header = this.modalEl.getElementsByTagName('h2')[0];
    header.textContent = status;
    this.modalEl.classList.remove('hidden');
    this.reset();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const gamePlay = new GamePlay();
gamePlay.startGame();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;