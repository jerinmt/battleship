import { ship } from "./ship.js";

const gameboard = function () {
    //the grid will be in a linear array to improve performance, 
    //0=empty cell:not hit, 1-7=ship:not hit, H-hit, X-miss
    const grid = [
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'
    ];
    const carrier = ship('1', 5);
    const battleship = ship('2', 4);
    const cruiser1 = ship('3', 3);
    const cruiser2 = ship('4', 3);
    const destroyer1 = ship('5', 2);
    const destroyer2 = ship('6', 2);
    const destroyer3 = ship('7', 2);
    const placeShip = function(shipType, start, end) {
        grid[start] = shipType;
        grid[end] = shipType;        
        switch(shipType) {
            case '1':
                if((end-start) === 4) {
                    grid[start+1] = shipType;
                    grid[start+2] = shipType;
                    grid[start+3] = shipType;
                } else {
                    grid[start+10] = shipType;
                    grid[start+20] = shipType;
                    grid[start+30] = shipType;
                }
            break;
            case '2':
                if((end-start) === 3) {
                    grid[start+1] = shipType;
                    grid[start+2] = shipType;
                } else {
                    grid[start+10] = shipType;
                    grid[start+20] = shipType;
                }
            break;
            case '3':
            case '4':
                if((end-start) === 2) {
                    grid[start+1] = shipType;
                } else {
                    grid[start+10] = shipType;
                }
            break;
        }
    }
    const receiveAttack = function (cell) {
        switch(grid[cell]) {
            case 'H':
            case 'X':
                return;
            case '0':
                grid[cell] = 'X';
                return;
            case '1':
                carrier.hit();
            break;
            case '2':
                battleship.hit();
            break;
            case '3':
                cruiser1.hit();
            break;
            case '4':
                cruiser2.hit();
            break;
            case '5':
                destroyer1.hit();
            break;
            case '6':
                destroyer2.hit();
            break;
            case '7':
                destroyer3.hit();
            break;
        }
        grid[cell] = 'H';
        showGrid();
    }
    const isDefeated = function () {
        if(carrier.isSunk()) {
            return true;
        }
        if(battleship.isSunk()) {
            return true;
        }
        if(cruiser1.isSunk()) {
            return true;
        }
        if(cruiser2.isSunk()) {
            return true;
        }
        if(destroyer1.isSunk()) {
            return true;
        }
        if(destroyer2.isSunk()) {
            return true;
        }
        if(destroyer3.isSunk()) {
            return true;
        }
        return false;
    }
    function showGrid() {
        console.log(grid);
    }
    return {placeShip, receiveAttack, isDefeated, showGrid}
}

export {gameboard};
