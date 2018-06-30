const homeContainer = document.getElementById('home');
const imgCover = document.getElementById('imgCover');

const imgFolderPath = 'img/bg/';
const bgImmages = [ 'arma3jet.jpg', 'arma3kart.jpg', 'arma3mine.jpg', 'arma3tank.jpg' ];

const HomeCover = new BGCover(imgCover, bgImmages, imgFolderPath, true);
