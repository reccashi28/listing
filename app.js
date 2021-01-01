const filterBox = document.querySelector('.job-filter');
const emptyBox = document.querySelector('.empty-box');

let emptyBoxHeight = filterBox.clientHeight;

emptyBox.style.height = `${emptyBoxHeight + 60}px`;

 const resizeBox = () => {
    emptyBoxHeight = filterBox.clientHeight;
    return emptyBox.style.height = `${emptyBoxHeight}px`;
 }

window.addEventListener('resize', resizeBox);

function getJobPosts(){

  let promiseJob = fetch('http://127.0.0.1:5500/data.json');

  let promiseJob2 = promiseJob.then( response => {
      return response.json();
   });
   // console.log(promiseJob2);

   promiseJob2.then(data => {
      data.map( list => console.log(list));
      
   });
}

getJobPosts();