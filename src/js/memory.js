(function(board) {
    'use strict';
    function getImages() {
        const images = [{src: 'img/cock.svg', alt: '', id: 1},
                        {src: 'img/dog.svg', alt: '', id: 2},
                        {src: 'img/hedgehog.svg', alt: '', id: 3},
                        {src: 'img/kangaroo.svg', alt: '', id: 4},
                        {src: 'img/koala.svg', alt: '', id: 5},
                        {src: 'img/mouse.svg', alt: '', id: 6},
                        {src: 'img/snail.svg', alt: '', id: 7},
                        {src: 'img/turtle.svg', alt: '', id: 8}];
        
        return images;
    }
    function temlateTile(src, alt, id) {
        const tile = document.createElement('div');
        const img = document.createElement('img');
        
        tile.classList.add('memory__tile');
        tile.classList.add('curtain');
        tile.dataset.id = id;
        tile.setAttribute('tabindex', '0');
        
        img.src = src;
        img.alt = alt;
        
        tile.appendChild(img);
        
        return tile;
    }
    function createDocFragment(array) {
        const arrLen = array.length;
        const docFragment = document.createDocumentFragment();
        for(let i = 0; i < arrLen; i++) {
            docFragment.appendChild(array[i]);
        }
        return docFragment;
    }
    /* http://stackoverflow.com/a/12646864 */
    function shuffle(array) {
        const arrLen = array.length - 1;
        for(let i = arrLen; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function generateTiles() {
        const images = getImages();
        const imgsLen = images.length * 2;
        const arrTiles = [];
        for(let i = 0; i < imgsLen; i++) {
            const j = Math.floor(i/2);
            arrTiles.push(temlateTile(images[j].src, images[j].alt, images[j].id));
        }
        return shuffle(arrTiles);
    }
    function appendTilesToBoard() {
        const tiles = generateTiles();
        const frag = createDocFragment(tiles);
        board.appendChild(frag);
    }
    let clickedTiles = [];
    let clickAlowed = true;
    function restoreBasicValues() {
        clickedTiles = [];
        clickAlowed = true;
    }
    function setCurtain() {
        clickedTiles[0].classList.add('curtain');
        clickedTiles[1].classList.add('curtain');
        restoreBasicValues();
    }
    function areTheSame(el1, el2) {
        if(el1.dataset.id === el2.dataset.id) {
            return true;
        }
        return false;
    }
    function removeTabIndex(arr) {
        const arrLen = arr.length;
        for(let i = 0; i < arrLen; i++) {
            arr[i].removeAttribute('tabindex');
        }
    }
    function checkTiles(e) {
        const t = e.target;
        if(!t.classList.contains('curtain') || !clickAlowed) {
            return false;
        }
        clickedTiles.push(t);
        t.classList.remove('curtain');
        if(!clickedTiles[1]) {
            return false;
        }
        clickAlowed = false;
        if(areTheSame(clickedTiles[0], clickedTiles[1])) {
            removeTabIndex(clickedTiles);
            restoreBasicValues();
        } else {
            setTimeout(setCurtain, 800);
        }
    }
    function keyHandler(e) {
        const enterKeyCode = 13;
        if(e.keyCode !== enterKeyCode) {
            return false;
        }
        checkTiles(e);
    }
    appendTilesToBoard();
    
    document.addEventListener('click', checkTiles);
    document.addEventListener('keydown', keyHandler);
    
}(document.querySelector('.memory')))