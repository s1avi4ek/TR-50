const detailsContainer = document.querySelector('.details-container'),
    detailsImage = document.querySelector(".details-image"),
    detailsTitle = document.querySelector(".details-title"),
    anchorElements = document.querySelectorAll(".thumbnails-anchor"),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next');

function setDetails(anchor, i) {
    const dataImage = anchor.getAttribute("data-details-image");
    detailsImage.src = dataImage;
    detailsTitle.innerHTML = anchor.getAttribute("data-details-title");
    detailsContainer.setAttribute('data-index-details', `${i}`);
}
function activeThumbnail(el) {
    anchorElements.forEach(i => {
        i.parentElement.classList.remove('thumbnail-active');
    });
    el.parentElement.classList.add('thumbnail-active');
}
function changeImageAnimation(){
    detailsContainer.classList.add('details-container-scale');
    setTimeout(() => {
        detailsContainer.classList.remove('details-container-scale');
    }, 200);
}
function addDadaIndexAttr(el, i){
    el.setAttribute('data-index', `${i}`);
}
detailsContainer.setAttribute('data-index-details', `0`);
for (let i = 0; i < anchorElements.length; i++) {
    addDadaIndexAttr(anchorElements[i], i);
    anchorElements[i].addEventListener("click", (e) => {
        e.preventDefault();
        setDetails(anchorElements[i], i);
        activeThumbnail(anchorElements[i]);
        changeImageAnimation();
    } );
}

prev.addEventListener('click', () => {
    let dataIndex = +detailsContainer.getAttribute('data-index-details');
    if (dataIndex == 0){
        dataIndex = anchorElements.length;
    }
    setDetails(anchorElements[dataIndex-1], dataIndex-1);
    activeThumbnail(anchorElements[dataIndex-1]);
    changeImageAnimation();
});

next.addEventListener('click', () => {
    let dataIndex = +detailsContainer.getAttribute('data-index-details');
    if (dataIndex == anchorElements.length-1){
        dataIndex = -1;
    }
    setDetails(anchorElements[dataIndex+1], dataIndex+1);
    activeThumbnail(anchorElements[dataIndex+1]);
    changeImageAnimation();
});

