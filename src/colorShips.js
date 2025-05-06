function colorShips(list) {
    let shipCells = document.querySelectorAll('.playerFleet .gridCells');
    for(let i = 0; i < shipCells.length; i++) {
        let item = shipCells[i].dataset.cellid - 0;
        if(list.includes(item)) {
            shipCells[i].style.backgroundColor = 'yellow';
        }
    }
}

export {colorShips};
