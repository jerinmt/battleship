import { colorShips } from './colorShips.js';
import { gameFlow } from './gameFlow.js';
import { player } from './player.js';

const coordinates = {
    required: [],
    list: [],
    remain: [5, 4, 3, 3, 2, 2, 2],
    numberOf3Ships: 2,
    numberOf2Ships: 3,
    minimum: 2,
};

function initialiseBoards() {
    let container1 = document.querySelector(".playerFleet");
    const divSquare1 = [];
    for (let i = 0; i < 100; i++) {
        divSquare1[i] = document.createElement("div");
        container1.appendChild(divSquare1[i]);
        divSquare1[i].classList.add("gridCells");
        divSquare1[i].dataset.cellid = i;
    }
    function firstCoordinate(cellNum) {
        let flag = false;
        for(let i = 1; i < coordinates.minimum; i++) {
            if((!coordinates.list.includes(cellNum - i)) || (!coordinates.list.includes(cellNum + i))) {
                flag = true;
            }
            if((!coordinates.list.includes(cellNum - i*10)) || (!coordinates.list.includes(cellNum + i * 10))) {
                flag = true;
            }
        }
        if(flag) {
            coordinates.list.push(cellNum);
            coordinates.required.push(cellNum);
        }
        colorShips(coordinates.list);
    }
    function shipPlace(cellNum, index, difference, direction) {
        let shipType;
        if(difference == 5) {
            shipType = '1';
        }
        if(difference == 4) {
            shipType = '2';
        }
        if(difference == 3) {
            if(coordinates.numberOf3Ships == 2) {
                shipType = '3';
                coordinates.numberOf3Ships = 1;    
            }else {
                shipType = '4';
            }
        }
        if(difference == 2) {
            if(coordinates.numberOf2Ships == 3) {
                shipType = '5';
                coordinates.numberOf2Ships = 2;    
            } else if(coordinates.numberOf2Ships == 2) {
                shipType = '6';
                coordinates.numberOf2Ships = 1;    
            } else {
                shipType = '7';
            }
        }
        switch(direction) {
            case 'up':
            case 'left':
                player.board.placeShip(shipType, cellNum, coordinates.required[0]);
            break;
            case 'down':
            case 'right':
                player.board.placeShip(shipType, coordinates.required[0], cellNum);
            break;
        }
        colorShips(coordinates.list);
        coordinates.required.pop();
        coordinates.remain.splice(index, 1);
        if(!coordinates.remain.includes(2)) {
            coordinates.minimum = 3;
        }
        if(!coordinates.remain.includes(3)) {
            coordinates.minimum = 4;
        }
        if(!coordinates.remain.includes(4)) {
            coordinates.minimum = 5;
        }
    }
    function secondCoordinate(cellNum) {
        let difference = coordinates.required[coordinates.required.length-1] - cellNum;
        if((difference > -5 && difference < 5) || (difference % 10 == 0 && difference/10 > -5 && difference/10 < 5)) {
            let direction;
            if(difference < -5) {
                direction = 'down';
            } else if(difference < 0) {
                direction = 'right';
            } else if(difference < 10) {
                direction = 'left';
            } else {
                direction = 'up';
            }
            difference = (difference * difference) ** 0.5;
            if(difference > 5) {
                difference /= 10;
            }
            difference +=1;
            let index = coordinates.remain.indexOf(difference);
            if(index != -1) {
                let flag = true;
                for(let i = 0; i < difference - 1; i++) {
                    switch(direction) {
                        case 'up':
                            if(coordinates.list.includes(cellNum + i * 10)) {
                                flag = false;
                            }
                        break;
                        case 'down':
                            if(coordinates.list.includes(cellNum - i * 10)) {
                                flag = false;
                            }
                        break;
                        case 'left':
                            if(coordinates.list.includes(cellNum + i)) {
                                flag = false;
                            }
                        break;
                        case 'right':
                            if(coordinates.list.includes(cellNum - i)) {
                                flag = false;
                            }
                        break;
                    }
                }
                if(flag) {
                    for(let i=0; i < difference - 1; i++) {
                        switch(direction) {
                            case 'up':
                                coordinates.list.push(cellNum + i * 10);
                            break;
                            case 'down':
                                coordinates.list.push(cellNum - i * 10);
                            break;
                            case 'left':
                                coordinates.list.push(cellNum + i);
                            break;
                            case 'right':
                                coordinates.list.push(cellNum - i);
                            break;
                        }
                    }
                    shipPlace(cellNum, index, difference, direction);
                }
            }
        }
    }
    function inputCoordinates(cellNum) {
        if(coordinates.remain.length > 0) {
            if(!coordinates.list.includes(cellNum)) {
                if(coordinates.required.length % 2 == 0) {
                    firstCoordinate(cellNum);       
                } else {
                    secondCoordinate(cellNum);       
                }
            }
        }
    }
    
    container1.addEventListener('click', (Event) => {
        let cellNum = Event.target.dataset.cellid - 0;
        inputCoordinates(cellNum);
    }, false);
    let container2 = document.querySelector(".computerFleet");
    const divSquare2 = [];
    for (let i = 0; i < 100; i++) {
        divSquare2[i] = document.createElement("div");
        container2.appendChild(divSquare2[i]);
        divSquare2[i].classList.add("gridCells");
        divSquare2[i].dataset.cellid = i;
    }
    let start = document.querySelector('main > button');
    start.style.alignSelf = 'center';
    start.addEventListener('click', () => {
        if(coordinates.remain.length == 0) {
            start.style.display = 'none';
            container2.classList.remove('hiddenFleet');
            document.querySelector('.info').style.display = 'none';
            gameFlow();
        }
    },false);
}

export {initialiseBoards};