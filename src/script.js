const mainContainer = document.querySelector('.main-class'),
    detailsContainer = document.querySelector('.details-container'),
    detailsFrame = document.querySelector('.details-frame'),
    detailsImage = document.querySelector('.details-image'),
    detailsTitle = document.querySelector('.details-title'),
    anchorElements = document.querySelectorAll('.thumbnails-anchor'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    hideBtn = document.querySelector('#hide-button'),
    HIDDEN = 'hidden',
    audio = document.querySelector('#audio');

function setDetails(anchor, i) {
    if (mainContainer.classList.contains(HIDDEN)) {
        mainContainer.classList.remove(HIDDEN);
    }
    const dataImage = anchor.getAttribute("data-details-image");
    playAudio(anchor, i);
    setTimeout(() => {
        detailsImage.src = dataImage;
        detailsTitle.innerHTML = anchor.getAttribute("data-details-title");
        detailsContainer.setAttribute('data-index-details', `${i}`);
    }, 140);
}
function playAudio(anchor, i){
    if (detailsContainer.getAttribute('data-index-details') != i) {
        audio.src=anchor.getAttribute('data-audio');
        audio.play();
        setTimeout(() => {
            audio.pause();
        }, 3000);
    }
}
function activeThumbnail(el) {
    anchorElements.forEach(i => {
        i.parentElement.classList.remove('thumbnail-active');
    });
    el.parentElement.classList.add('thumbnail-active');
}
function changeImageAnimation(i) {
    if (mainContainer.classList.contains(HIDDEN)) {
        detailsFrame.classList.add('details-container-scale-main');
        setTimeout(() => {
            detailsFrame.classList.remove('details-container-scale-main');
        }, 100);
    } else if (detailsContainer.getAttribute('data-index-details') != i){
        detailsFrame.classList.add('details-container-scale');
        setTimeout(() => {
            detailsFrame.classList.remove('details-container-scale');
        }, 200);
    }
}

function addDadaIndexAttr(el, i) {
    el.setAttribute('data-index', `${i}`);
}

for (let i = 0; i < anchorElements.length; i++) {
    addDadaIndexAttr(anchorElements[i], i);
    anchorElements[i].addEventListener("click", e => {
        e.preventDefault();
        changeImageAnimation(i);
        setDetails(anchorElements[i], i);
        activeThumbnail(anchorElements[i]);
    });
}

prev.addEventListener('click', () => {
    let dataIndex = +detailsContainer.getAttribute('data-index-details');
    if (dataIndex == 0) {
        dataIndex = anchorElements.length;
    }
    setDetails(anchorElements[dataIndex - 1], dataIndex - 1);
    activeThumbnail(anchorElements[dataIndex - 1]);
    changeImageAnimation();
});

next.addEventListener('click', () => {
    let dataIndex = +detailsContainer.getAttribute('data-index-details');
    if (dataIndex == anchorElements.length - 1) {
        dataIndex = -1;
    }
    setDetails(anchorElements[dataIndex + 1], dataIndex + 1);
    activeThumbnail(anchorElements[dataIndex + 1]);
    changeImageAnimation();
});

hideBtn.addEventListener('click', () => {
    detailsFrame.classList.add('details-container-scale-main');
    setTimeout(() => {
        mainContainer.classList.add(HIDDEN);
    }, 120);
    anchorElements.forEach(i => {
        i.parentElement.classList.remove('thumbnail-active');
    });
});