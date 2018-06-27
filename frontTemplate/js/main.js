const homeContainer = document.getElementById('home');
const imgCover = document.getElementById('imgCover');

function getBG(index) {
    const imgRootPath = 'img/bg/';
    const bgImmages = [ 'arma3jet.jpg', 'arma3kart.jpg', 'arma3mine.jpg', 'arma3tank.jpg' ];

    index = index === undefined ? Math.floor(Math.random() * bgImmages.length) : index;

    return imgRootPath + bgImmages[index];
};

function setBG(element, img) {
    const css = element.style;

    css.height = '100vh';
    css.background = '#222';
    css.backgroundImage = `url(${img})`;
    css.backgroundRepeat = 'no-repeat';
    css.backgroundSize = 'cover';
    css.backgroundPosition = 'center';
    css.backgroundAttachment = 'fixed';

    return css;
};

function updateBG(element, img) {
    const css = element.style;

    css.backgroundImage = `url(${img})`;

    return css.backgroundImage;
};


class BGCover {
    constructor (element, img) {
        this.imgList;
        this.element;
    };
};


setBG(imgCover, getBG());

setInterval(() => {
    updateBG(imgCover, getBG());
},2000);



console.log();