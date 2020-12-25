const filterBox = document.querySelector('.job-filter');
const emptyBox = document.querySelector('.empty-box');

let emptyBoxHeight = filterBox.clientHeight;

emptyBox.style.height = `${emptyBoxHeight + 60}px`;

 const resizeBox = () => {
    emptyBoxHeight = filterBox.clientHeight;
    return emptyBox.style.height = `${emptyBoxHeight}px`;
    console.log(emptyBoxHeight);
 }

window.addEventListener('resize', resizeBox);