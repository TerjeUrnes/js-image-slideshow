
const t79Show = {
    //
    AUTOPLAY : false,
    LOOP : false,
    NAVIGATION_CONTROLS : true,
    SLIDESHOW_CONTROLS : true,
    //
    GALLERY_TAG_ATTRIBUTE : "data-gallery",
    GALLERY_CLASS_NAME : "gallery",
    MARK_IMAGE_GROUPS : true,
    ALT_IMAGE_URL : "data-galleryimage",
    ALT_IMAGE_SIZE : "data-gallerysize",
    //
    LEFT_NAVIGATION_ARROW : "icons/caret-left-solid.svg",
    RIGHT_NAVIGATION_ARROW : "icons/caret-right-solid.svg",
    SLIDESHOW_PLAY : "icons/play-solid.svg",
    SLIDESHOW_PAUSE : "icons/pause-solid.svg",
    SLIDESHOW_INCREASE : "icons/caret-up-solid.svg",
    SLIDESHOW_DECREASE : "icons/caret-down-solid.svg"
}

const t79Style = {
    BACKGROUND_COLOR : "#00000066",
    BACKGROUND_BLUR : "10px",
    BASE_FONT_SIZE : "14px",
    MARGIN : "2em"
}

window.addEventListener('resize', function() {
	positionImageView();
	window.setTimeout(function() {
		positionImageView();
	}, 600);
});

function slideshowInit() {
    t79Show.slideshowDuration = 6;
    generateSlideshowElm();
    getImages();
}

function generateSlideshowElm() {
    t79Show.containerElm = makeContainerElm();
    t79Show.innerContainerElm = makeInnerContainerElm();
    t79Show.previousImageButtonElm = makePreviousImageButtonElm();
    t79Show.slideshowControllerContainerElm = makeSlideshowControllerContainer();
    t79Show.slideshowPlayPauseButtonElm = makeSlideshowPlayPauseButtonElm();
    t79Show.slideshowTimerContainerElm = makeSlideshowTimerContainerElm();
    t79Show.slideshowIncreaseButtonElm = makeSlideshowIncreaseButtonElm();
    t79Show.slideshowDecreaseButtonElm = makeSlideshowDecreaseButtonElm();
    t79Show.slideshowTimerLabelElm = makeSlideshowTimerLabelElm();
    t79Show.outerImageFrameElm = makeOuterImageFrameElm();
    t79Show.innerImageFrameElm = makeInnerImageFrameElm();
    t79Show.imageViewElm = makeImageViewElm();
    t79Show.nextImageButtonElm = makeNextImageButtonElm();


    t79Show.slideshowControllerContainerElm.appendChild(t79Show.slideshowPlayPauseButtonElm);    
    t79Show.slideshowControllerContainerElm.appendChild(t79Show.slideshowTimerContainerElm);
    t79Show.slideshowTimerContainerElm.appendChild(t79Show.slideshowIncreaseButtonElm);
    t79Show.slideshowTimerContainerElm.appendChild(t79Show.slideshowTimerLabelElm);
    t79Show.slideshowTimerContainerElm.appendChild(t79Show.slideshowDecreaseButtonElm);
    t79Show.innerImageFrameElm.appendChild(t79Show.imageViewElm);
    t79Show.outerImageFrameElm.appendChild(t79Show.innerImageFrameElm);
    t79Show.innerContainerElm.appendChild(t79Show.outerImageFrameElm);
    t79Show.innerContainerElm.appendChild(t79Show.slideshowControllerContainerElm);
    t79Show.innerContainerElm.appendChild(t79Show.previousImageButtonElm);
    t79Show.innerContainerElm.appendChild(t79Show.nextImageButtonElm);
    t79Show.containerElm.appendChild(t79Show.innerContainerElm);

    document.body.appendChild(t79Show.containerElm);

    styleContainerElm("initialize");
    styleInnerContainerElm("initialize");
    styleSlideshowControllersContainerElm("initialize");
    styleSlideshowTimerContainerElm("initialize");
    styleSliderControllersButtonsElm(t79Show.slideshowPlayPauseButtonElm, "initialize");
    styleSliderControllersButtonsElm(t79Show.slideshowIncreaseButtonElm, "initialize");
    styleSliderControllersButtonsElm(t79Show.slideshowTimerLabelElm, "initialize");
    styleSliderControllersButtonsElm(t79Show.slideshowDecreaseButtonElm, "initialize");
    styleNavigationButtonElm(t79Show.previousImageButtonElm, "initialize");
    styleNavigationButtonElm(t79Show.previousImageButtonElm, "initialize left");
    styleOuterFrameElm("initialize");
    styleInnerFrameElm("initialize");
    styleImageViewElm("initialize");
    styleNavigationButtonElm(t79Show.nextImageButtonElm, "initialize");
    styleNavigationButtonElm(t79Show.nextImageButtonElm, "initialize right");
}

function makeContainerElm() {
    const containerElm = document.createElement("div");
    containerElm.id = "slideshow-container";
    containerElm.addEventListener("click", goOutOfFullscreen);
    return containerElm;
}

function makeInnerContainerElm() {
    const innerContainerElm = document.createElement("div");
    innerContainerElm.id = "slideshow-container";
    return innerContainerElm;
}

function makeLeftControllersContainerElm() {
    const leftContainerElm = document.createElement("div");
    leftContainerElm.id = "slideshow-left-controllers-container";
    return leftContainerElm;
}

function makePreviousImageButtonElm() {
    const previousButElm = document.createElement("img");
    previousButElm.id = "slideshow-previous-image-button";
    previousButElm.src = t79Show.LEFT_NAVIGATION_ARROW;
    previousButElm.addEventListener("click", (e) => {
        if (e.target.style.opacity == 1) {
            e.stopPropagation();
        }
        goToPreviousImage();
    });
    return previousButElm;
}

function makeSlideshowControllerContainer() {
    const controllerElm = document.createElement("div");
    controllerElm.id = "slideshow-controller-container";
    return controllerElm;
}

function makeSlideshowPlayPauseButtonElm() {
    const playButElm = document.createElement("img");
    playButElm.id = "slideshow-play-button";
    playButElm.src = t79Show.SLIDESHOW_PLAY;
    playButElm.setAttribute("data-playing", false);
    playButElm.addEventListener("click", (e) => {
        e.stopPropagation();
        if (e.target.getAttribute("data-playing") == "true") {
            stopSlideshow();
        }
        else {
            runSlideshow();
        }
    });
    return playButElm;
}

function makeSlideshowTimerContainerElm() {
    const timerElm = document.createElement("div");
    timerElm.id = "slideshow-timer-container";
    return timerElm;
}

function makeSlideshowIncreaseButtonElm() {
    const increaseButElm = document.createElement("img");
    increaseButElm.id = "slideshow-increase-button";
    increaseButElm.src = t79Show.SLIDESHOW_INCREASE;
    increaseButElm.addEventListener("click", (e) => {
        e.stopPropagation();
        increaseSlideshowDuration()
    });
    return increaseButElm;
}

function makeSlideshowDecreaseButtonElm() {
    const decreaseButElm = document.createElement("img");
    decreaseButElm.id = "slideshow-decrease-button";
    decreaseButElm.src = t79Show.SLIDESHOW_DECREASE;
    decreaseButElm.addEventListener("click", (e) => {
        e.stopPropagation();
        decreaseSlideshowDuration()
    });
    return decreaseButElm;
}

function makeSlideshowTimerLabelElm() {
    const label = document.createElement("div");
    label.id = "slideshow-timer-label";
    label.innerText = t79Show.slideshowDuration;
    return label;
}

function makeOuterImageFrameElm() {
    const outerFrameElm = document.createElement("div");
    outerFrameElm.id = "slideshow-outer-frame";
    return outerFrameElm;
}

function makeInnerImageFrameElm() {
    const innerFrameElm = document.createElement("div");
    innerFrameElm.id = "slideshow-inner-frame";
    return innerFrameElm;
}

function makeImageViewElm() {
    const imageViewElm = document.createElement("img");
    imageViewElm.id = "slideshow-image-view";
    return imageViewElm;
}

function makeNextImageButtonElm() {
    const nextButElm = document.createElement("img");
    nextButElm.id = "slideshow-next-image-button";
    nextButElm.src = t79Show.RIGHT_NAVIGATION_ARROW;
    nextButElm.addEventListener("click", (e) => {        
        if (e.target.style.opacity == 1) {
            e.stopPropagation();
        }
        goToNextImage();
    });
    return nextButElm;
}

//
//
//
//
//
//
//
//
//
//

function getImages() {
    const searchResult = searchForImages();
    makeImagesReady(searchResult);
}

function searchForImages() {
    const searchString = constructSearchString();
    const rawSearchOutput = mainSearchForImages(searchString);
    const images = extractImages(rawSearchOutput);
    return images;
}

function constructSearchString() {
    let searchString = "";
    if (t79Show.MARK_IMAGE_GROUPS) {
        searchString += "[" + t79Show.GALLERY_TAG_ATTRIBUTE + "] img, " + t79Show.GALLERY_CLASS_NAME + " img, ";
    }
    searchString += "img[" + t79Show.GALLERY_TAG_ATTRIBUTE + "], img." + t79Show.GALLERY_CLASS_NAME;
    return searchString;
}

function mainSearchForImages(searchString) {
    const galleries = document.querySelectorAll(searchString);
    const galleriesArray = Array.from(galleries);
    return galleriesArray;
}

function extractImages(rawSearchOutput) {
    const result = [];
    rawSearchOutput.forEach(element => {
        if (element.children.length > 0) {
            result.concat(searchImagesFromOneGroup(element));
        }
        else {
            result.push(element);
        }
    });
    return result;
}

function searchImagesFromOneGroup(element) {
    const images = element.querySelectorAll("img");
    const imagesArray = Array.from(images);
    return imagesArray;
}

function makeImagesReady(searchResult) {
    let imageCount = 1;
    t79Show.idFirstImage = imageCount;
    var previousImage;
    searchResult.forEach(element => {
        styleSelectedImageElm(element, "initialize");
        element.addEventListener("click", goIntoFullscreen);
        element.setAttribute("data-galleryimageid", imageCount);
        if (previousImage) {
            previousImage.setAttribute("data-nextgalleryimage", imageCount);
            element.setAttribute("data-previousgalleryimage", previousImage.getAttribute("data-galleryimageid"));
        }
        previousImage = element;
        imageCount++;
    });
}

function increaseSlideshowDuration() {
    t79Show.slideshowDuration += 1;
    updateSlideshowDuration();
}

function decreaseSlideshowDuration() {
    t79Show.slideshowDuration -= 1;
    updateSlideshowDuration();
}

function updateSlideshowDuration() {
    t79Show.slideshowTimerLabelElm.innerText = t79Show.slideshowDuration;
    changeSlideshowDuration();
}

function runSlideshow() {
    if (t79Show.slideshowPlayPauseButtonElm.getAttribute("data-playing") == "true") {
        return;
    }
    t79Show.slideshowInterval = window.setInterval(goToNextImage, t79Show.slideshowDuration * 1000);
    t79Show.slideshowRunning = true;
    t79Show.slideshowPlayPauseButtonElm.src = t79Show.SLIDESHOW_PAUSE;
    t79Show.slideshowPlayPauseButtonElm.setAttribute("data-playing", true);
}

function changeSlideshowDuration() {
    if (t79Show.slideshowPlayPauseButtonElm.getAttribute("data-playing") == "false") {
        return;
    }
    window.clearInterval(t79Show.slideshowInterval);
    t79Show.slideshowInterval = window.setInterval(goToNextImage, t79Show.slideshowDuration * 1000);
}

function stopSlideshow() {
    window.clearInterval(t79Show.slideshowInterval);
    t79Show.slideshowRunning = false;
    t79Show.slideshowPlayPauseButtonElm.src = t79Show.SLIDESHOW_PLAY;
    t79Show.slideshowPlayPauseButtonElm.setAttribute("data-playing", false);
}

function goIntoFullscreen(e) {
    if(t79Show.AUTOPLAY) {
        runSlideshow()
    } else {
        t79Show.slideshowRunning = false;
    }
    styleContainerElm("goesIntoFullscreen");
    styleSelectedImageElm(this, "goesIntoFullscreen");
    t79Show.selectedImageElm = this;
    t79Show.imageViewElm.src = getImageAddress(this);
    updateNavigationButtons();
    positionImageView();
    //runSlideshow();
}

function getImageAddress(image) {
    if (image.getAttribute(t79Show.ALT_IMAGE_URL) != undefined) {
        return image.getAttribute(t79Show.ALT_IMAGE_URL);
    }
    else {
        return image.src;
    }
}

function goToPreviousImage() {
    const previousImageId = t79Show.selectedImageElm.getAttribute("data-previousgalleryimage");
    if (previousImageId == undefined) {
        return;
    }
    const previousImageElm = document.querySelector("[data-galleryimageid='" + previousImageId + "']");
    changeSelectedImage(previousImageElm);
    t79Show.imageViewElm.src = getImageAddress(previousImageElm);
    console.log(previousImageElm);
    updateNavigationButtons();
    positionImageView();
}

function goToNextImage() {
    var nextImageId = t79Show.selectedImageElm.getAttribute("data-nextgalleryimage");
    if (nextImageId == undefined) {
        if (t79Show.slideshowRunning) {
            if (t79Show.slideshowLooping) {
                nextImageId = t79Show.idFirstImage;
            }
            else {
                stopSlideshow();
                return;
            }
        }
        else {
            return;
        }
    }
    console.log(nextImageId);
    const nextImageElm = document.querySelector("[data-galleryimageid='" + nextImageId + "']");
    changeSelectedImage(nextImageElm);
    t79Show.imageViewElm.src = getImageAddress(nextImageElm);
    updateNavigationButtons();
    positionImageView();
}

function positionImageView() {
    let imageWidth = 1;
    let imageHeight = 1;
    if (t79Show.selectedImageElm.getAttribute(t79Show.ALT_IMAGE_SIZE) != undefined) {
        var width;
        var height;
        [width, height] = t79Show.selectedImageElm.getAttribute(t79Show.ALT_IMAGE_SIZE).split("x");
        imageWidth = parseInt(width);
        imageHeight = parseInt(height);
    }
    else {
        imageWidth = t79Show.selectedImageElm.getAttribute("width");
        imageHeight = t79Show.selectedImageElm.getAttribute("height");
    }
    const imageRatio = imageWidth / imageHeight;
    const outerFrameWidth = t79Show.outerImageFrameElm.clientWidth;
    const outerFrameHeight = t79Show.outerImageFrameElm.clientHeight;
    const outerFrameRatio = outerFrameWidth / outerFrameHeight;

    if (imageWidth < outerFrameWidth && imageHeight < outerFrameHeight) {
        t79Show.imageViewElm.width = imageWidth;
        t79Show.imageViewElm.height = imageHeight;
    }
    else if (imageRatio < outerFrameRatio) {
        t79Show.innerImageFrameElm.style.width = `${outerFrameHeight * imageRatio}px`;
        t79Show.innerImageFrameElm.style.height = `${outerFrameHeight}px`;
        t79Show.imageViewElm.width = outerFrameHeight * imageRatio;
        t79Show.imageViewElm.height = outerFrameHeight;
    }
    else {
        t79Show.innerImageFrameElm.style.width = `${outerFrameWidth}px`;
        t79Show.innerImageFrameElm.style.height = `${outerFrameWidth / imageRatio}px`;
        t79Show.imageViewElm.width = outerFrameWidth;
        t79Show.imageViewElm.height = outerFrameWidth / imageRatio; 
    }

    //styleImageViewElmClipPath(imageWidth, imageHeight, outerFrameWidth);
}

function goOutOfFullscreen(e) {
    styleContainerElm("goesOutOfFullscreen");
    styleSelectedImageElm(t79Show.selectedImageElm, "comesOutOfFullscreen");
    t79Show.selectedImageElm = undefined;
    if (t79Show.slideshowRunning) {
        stopSlideshow();
    }
}

function changeSelectedImage(imageElm) {
    if (t79Show.selectedImageElm) {
        styleSelectedImageElm(t79Show.selectedImageElm, "areDeselected");
    }
    t79Show.selectedImageElm = imageElm;
    styleSelectedImageElm(imageElm, "becomingSelected");
}

function updateNavigationButtons() {
    if (t79Show.selectedImageElm.getAttribute("data-previousgalleryimage") == undefined) {
        styleNavigationButtonElm(t79Show.previousImageButtonElm, "hide");
    }
    else {
        styleNavigationButtonElm(t79Show.previousImageButtonElm, "show");
    }
    if (t79Show.selectedImageElm.getAttribute("data-nextgalleryimage") == undefined) {
        styleNavigationButtonElm(t79Show.nextImageButtonElm, "hide");
    }
    else {
        styleNavigationButtonElm(t79Show.nextImageButtonElm, "show");
    }
}

//
//
//
//
//
//
//
//
//
//
//
//

function styleContainerElm(state) {
    switch (state) {
        case "initialize":
            t79Show.containerElm.style.backgroundColor = t79Style.BACKGROUND_COLOR;
            t79Show.containerElm.style.position = "fixed";
            t79Show.containerElm.style.top = 0;
            t79Show.containerElm.style.left = 0;
            t79Show.containerElm.style.width = "100vw";
            t79Show.containerElm.style.height = "100vh";
            t79Show.containerElm.style.fontSize = t79Style.BASE_FONT_SIZE;
            t79Show.containerElm.style.display = "none";
            t79Show.containerElm.style.flexFlow = "row nowrap";
            t79Show.containerElm.style.justifyContent = "space-between";
            t79Show.containerElm.style.alignItems = "center";
            t79Show.containerElm.style.boxSizing = "border-box";
            t79Show.containerElm.style.overflow = "hidden";
            t79Show.containerElm.style.cursor = "zoom-out";
            t79Show.containerElm.style.webkitBackdropFilter = `blur(${t79Style.BACKGROUND_BLUR})`;
            t79Show.containerElm.style.backdropFilter = `blur(${t79Style.BACKGROUND_BLUR})`;
            break;
        case "goesIntoFullscreen":
            t79Show.containerElm.style.display = "flex";
            break;
        case "goesOutOfFullscreen":
            t79Show.containerElm.style.display = "none";
    }
}

function styleInnerContainerElm(state) {
    switch (state) {
        case "initialize":
            t79Show.innerContainerElm.style.width = "100%";
            t79Show.innerContainerElm.style.height = "100%";
            t79Show.innerContainerElm.style.display = "flex";
            t79Show.innerContainerElm.style.flexFlow = "column nowrap";
            t79Show.innerContainerElm.style.justifyContent = "center";
            t79Show.innerContainerElm.style.alignItems = "center";
            t79Show.innerContainerElm.style.position = "relative";
            t79Show.innerContainerElm.style.padding = t79Style.MARGIN;
    }
}

function styleSlideshowControllersContainerElm(state) {
    switch (state) {
        case "initialize":
            t79Show.slideshowControllerContainerElm.style.position = "absolute";
            t79Show.slideshowControllerContainerElm.style.left = "1em";
            t79Show.slideshowControllerContainerElm.style.bottom = "calc(50% + 3.5em)";
            t79Show.slideshowControllerContainerElm.style.display = "flex";
            t79Show.slideshowControllerContainerElm.style.flexFlow = "column nowrap";
            t79Show.slideshowControllerContainerElm.style.justifyContent = "flex-start";
            t79Show.slideshowControllerContainerElm.style.alignItems = "center";
            t79Show.slideshowControllerContainerElm.style.gap = "1em";

    }
}

function styleSlideshowTimerContainerElm(state) {
    switch (state) {
        case "initialize":
            t79Show.slideshowTimerContainerElm.style.display = "flex";
            t79Show.slideshowTimerContainerElm.style.flexFlow = "column nowrap";
            t79Show.slideshowTimerContainerElm.style.justifyContent = "center";
            t79Show.slideshowTimerContainerElm.style.alignItems = "center";
    }
}

function styleSliderControllersButtonsElm(buttonElm, state) {
    switch (state) {
        case "initialize":
            buttonElm.style.width = "auto";
            buttonElm.style.height = "1.3em";
            buttonElm.style.cursor = "pointer";
    }
}

function styleNavigationButtonElm(buttonElm, state) {
    switch (state) {
        case "initialize":
            buttonElm.style.width = "auto";
            buttonElm.style.height = "3em";
            buttonElm.style.position = "absolute";
            buttonElm.style.bottom = "calc(50% - 1.5em)";
            break;
        case "initialize left":
            buttonElm.style.left = "1em";
            break;
        case "initialize right":
            buttonElm.style.right = "1.2em";
            break;
        case "show":
            buttonElm.style.opacity = 1;
            break;
        case "hide":
            buttonElm.style.opacity = 0;
    }
}

function styleOuterFrameElm(state) {
    switch (state) {
        case "initialize":
            t79Show.outerImageFrameElm.style.display = "flex";
            t79Show.outerImageFrameElm.style.flexFlow = "column nowrap";
            t79Show.outerImageFrameElm.style.justifyContent = "center";
            t79Show.outerImageFrameElm.style.alignItems = "center";
            t79Show.outerImageFrameElm.style.width = "100%";
            t79Show.outerImageFrameElm.style.height = "100%";
            t79Show.outerImageFrameElm.style.position = "relative";
    }
}

function styleInnerFrameElm(state) {
    switch (state) {
        case "initialize": 
            t79Show.innerImageFrameElm.style.display = "flex";
            t79Show.innerImageFrameElm.style.flexFlow = "column nowrap";
            t79Show.innerImageFrameElm.style.justifyContent = "center";
            t79Show.innerImageFrameElm.style.alignItems = "center";
            t79Show.innerImageFrameElm.style.width = "100%";
    }
}

function styleSelectedImageElm(image, state) {
    switch (state) {
        case "initialize":
            image.style.cursor = "zoom-in";
            break;
        case "goesIntoFullscreen":
        case "becomingSelected":
            image.style.opacity = 0;
            break;
        case "comesOutOfFullscreen":
        case "areDeselected":
            image.style.opacity = 1;
    }
}

function styleImageViewElm(state) {
    switch (state) {
        case "initialize":
            break;
    }
}

function styleImageViewElmClipPath(imageWidth, imageHeight, outerFrameWidth) {
    if (imageWidth < outerFrameWidth - 500) {
        t79Show.imageViewElm.style.clipPath = "none";
        return;
    }

    const iW = imageWidth;
    const iH = imageHeight;

    const bH = 50;

    const pH = iH * 0.5 - bH * 0.5;
    const pL = iH * 0.5 + bH * 0.5;

    const c = 8;

    const p0 = 'M0,0';
    const p5 = 'L0,' + iH;
    const p6 = 'L' + iW + ',' + iH;
    const p7 = 'L' + iW + ',0';

    let path1 = '';

    const p1a = 'L0,' + (pH - c);
    const p1b = 'Q0,' + pH;
    const p1c = '' + c + ',' + pH;
    const p2a = 'L' + 50 + ',' + pH;
    const p2b = 'Q' + (50 + c) + ',' + pH;
    const p2c = '' + (50 + c) + ',' + (pH + c);
    const p3a = 'L' + (50 + c) + ',' + (pL - c);
    const p3b = 'Q' + (50 + c) + ',' + (pL);
    const p3c = '' + 50 + ',' + pL;
    const p4a = 'L' + c + ',' + pL;
    const p4b = 'Q0,' + pL;
    const p4c = '0,' + (pL + c);
    path1 = p1a + ' ' + p1b + ' ' + p1c + ' ' + p2a + ' ' + p2b + ' ' + p2c + ' ' + p3a + ' ' + p3b + ' ' + p3c + ' ' + p4a + ' ' + p4b + ' ' + p4c;

    const path = "'" + p0 + ' ' + path1 + ' ' + p5 + ' ' + p6 + ' ' + p7 + " Z'";

    console.log(path);

    t79Show.imageViewElm.style.clipPath = 'path(' + path + ')';
}



export { slideshowInit };