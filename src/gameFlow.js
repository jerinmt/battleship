import { computer, player } from "./player.js";

function gameFlow() {
    computer.placeFleet();
    let turn = Math.floor(Math.random() * 2);
    if(turn == 1) {
       comStrike();
    } else {
      playerStrike();
    }
}
function comStrike() {
    let next = computer.attack();
    let hit = player.board.receiveAttack(next);
    let cells = document.querySelectorAll('.playerFleet .gridCells');
    for(let i = 0; i < 100; i++) {
        if(cells[i].dataset.cellid == next) {
            if(hit == 2) {
                cells[i].style.backgroundColor = 'red';
                computer.registerHit(next);
            }
            if(hit == 1) {
                cells[i].style.backgroundColor = 'green';
            }
        }
    }
    if(player.board.isDefeated()) {
        document.querySelector('dialog h3').textContent = 'You lost!!';
        document.querySelector('dialog').showModal();
    } else {
        playerStrike();
    }
}
function strike(Event) {
    let cell = Event.target.dataset.cellid - 0;
    let hit = computer.board.receiveAttack(cell);
    let cellSet = document.querySelectorAll('.computerFleet .gridCells');
    if(hit > 0) {
            if(hit == 2) {
                cellSet[cell].style.backgroundColor = 'red';
            }
            if(hit == 1) {
                cellSet[cell].style.backgroundColor = 'green';
            }
        document.querySelector('.computerFleet').removeEventListener('click', strike, false);
        if(computer.board.isDefeated()) {
            document.querySelector('dialog').showModal();
        } else {
            comStrike();
        }
    }
}
function playerStrike() {
    document.querySelector('.computerFleet').addEventListener('click', strike, false);
}

export {gameFlow};
