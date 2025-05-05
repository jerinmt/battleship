import ship1Image from './assets/ship5.svg';
import ship2Image from './assets/ship4.svg';
import ship3Image from './assets/ship3.svg';
import ship4Image from './assets/ship2.svg';

function initialiseBoards() {
    const vessels = ['p5ship', 'p4ship', 'p3ship1', 'p3ship2', 'p2ship1', 'p2ship2', 'p2ship3'];
    const images = [ship1Image, ship2Image, ship3Image, ship3Image, ship4Image, ship4Image, ship4Image];
    let container1 = document.querySelector(".playerFleet");
    const divSquare1 = [];
    for(let i=0;i < 100; i++) {
        divSquare1[i] = document.createElement("div");
        container1.appendChild(divSquare1[i]);
        divSquare1[i].classList.add("gridCells");
        divSquare1[i].addEventListener('drop', (Event)=> {
            Event.preventDefault();
            const data = Event.dataTransfer.getData("text");
            Event.target.appendChild(document.getElementById(data));        
        }, false);
        divSquare1[i].addEventListener('dragover', (Event)=> {
            Event.preventDefault();
        }, false);
    }
    let container2 = document.querySelector(".computerFleet");
    const divSquare2 = [];
    for(let i=0;i < 100; i++) {
        divSquare2[i] = document.createElement("div");
        container2.appendChild(divSquare2[i]);
        divSquare2[i].classList.add("gridCells");    
    }
    for(let i=0; i < 7; i++) {
        let item = document.createElement('img');
        item.addEventListener('dragstart', (Event)=> {
            Event.dataTransfer.setData("text", Event.target.id);    
        }, false);
        item.draggable = true;
        item.src = images[i];
        item.id = vessels[i];
        divSquare1[i].appendChild(item);
    }
}

export {initialiseBoards};