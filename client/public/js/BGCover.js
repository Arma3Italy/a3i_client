function BGCover(element, imgList, imgPath, initImg = false, imgIndex) {
    this.imgList = [],
    this.imgList = this.imgList.concat(imgList),
    this.imgPath = imgPath,
    this.imgIndex = imgIndex !== undefined && parseInt(imgIndex) <= imgList.length ? parseInt(imgIndex) : Math.floor(Math.random() * this.imgList.length),
    this.element = element;

    if (initImg) this.setImg();
};

BGCover.prototype.getImgIndex = function () {
    return this.imgIndex;
};
BGCover.prototype.getImg = function () {
    return this.imgList[this.imgIndex];
};

BGCover.prototype.getSrcImg = function () {
    return this.imgPath + this.getImg();
};

BGCover.prototype.setImg = function () {
    const css = this.element.style;

    // css.height = '100vh';
    css.height = '100%';
    css.background = '#222';
    css.backgroundImage = `url(${this.getSrcImg()})`;
    css.backgroundRepeat = 'no-repeat';
    css.backgroundSize = 'cover';
    css.backgroundPosition = 'center';
    css.backgroundAttachment = 'fixed';

    return css;
};

BGCover.prototype.nextImg = function (update = false) {
    this.imgIndex = this.imgIndex < (this.imgList.length) - 1 ? this.imgIndex + 1 : 0;

    if (update) this.updateImg();

    return this.imgList[this.imgIndex];
};

BGCover.prototype.updateImg = function (fade = false) {
    const css = this.element.style;

    css.backgroundImage = `url(${this.getSrcImg()})`;

    return css;
};

BGCover.prototype.autoUpdareImg = function (status, fade = false, time = 10000) {
    if (status === 'start') {

        const update = (() => {
            this.nextImg();
            this.updateImg(fade);
        }).bind(this);

        if (this.autoUpdateImmages === undefined) {
            this.autoUpdateImmages = setInterval(update, time);

            return this.autoUpdateImmages;
        } else return 'ERROR: autoUpdate already started';

    } else if (status === 'stop') {
        clearInterval(this.autoUpdateImmages);

        this.autoUpdateImmages = undefined;

        return 'Stopped';
    } else return 'ERROR: start or stop param';
};