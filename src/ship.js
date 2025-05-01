const ship = function (num, len) {
    const id = num;
    let life = len;
    let floating = true;
    const hit = function() {
        if(life > 0) {
            life -= 1;
            isSunk();
        }
        else {
            life = 0;
        }
    }
    const isSunk = function() {
        if(life === 0) {
            floating = false;
            return true;
        }
        return false;
    }
    return {hit, isSunk, id}
}

export {ship};
