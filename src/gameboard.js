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
                return 0;
            case '0':
                grid[cell] = 'X';
                return 1;
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
        return 2;
    }
    const isDefeated = function () {
        let status1 = carrier.isSunk();
        let status2 = battleship.isSunk();
        let status3 = cruiser1.isSunk();
        let status4 = cruiser2.isSunk();
        let status5 = destroyer1.isSunk();
        let status6 = destroyer2.isSunk();
        let status7 = destroyer3.isSunk();
        if(status1 && status2 && status3 && status4 && status5 && status6 && status7) {
            return true;
        }
        return false;
    }
    return {placeShip, receiveAttack, isDefeated}
}

export {gameboard};
