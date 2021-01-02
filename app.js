const filterBox = document.querySelector('.job-filter');
const emptyBox = document.querySelector('.empty-box');
const container = document.querySelector('.container');


let emptyBoxHeight = filterBox.clientHeight;

emptyBox.style.height = `${emptyBoxHeight + 60}px`;

 const resizeBox = () => {
    emptyBoxHeight = filterBox.clientHeight;
    return emptyBox.style.height = `${emptyBoxHeight}px`;
 }

window.addEventListener('resize', resizeBox);

function getJobPosts(){
   const htmlPost = ``;

  let promiseJob = fetch('http://127.0.0.1:5500/data.json');
  let promiseJob2 = promiseJob.then( response => {
      return response.json();
   });
   // console.log(promiseJob2);

   promiseJob2.then(data => {
      generateHTML(data);
      
   });
   promiseJob2.catch( error => {
      console.log('Failed to fetch page: ', err)
   })

}

function generateHTML(list){
   let htmlJobPostBox = '';
   list.map( listPost => {
      htmlJobPostBox = 
      `
      <div class="job-posts">
        <div class="logo">
          <img src="${listPost.logo}">
        </div>
        <div class="content">
          <div class="status">
            <p>${listPost.company}</p>
            <span class="postNew">${listPost.new ? 'New': ''}</span>
            <span class="postFeature">${listPost.featured ? 'Featured': ''}</span>
          </div>
          <p class ="company-name">${listPost.position}</p>
          <div class="details">
            <ul>
               <li>${listPost.postedAt}</li>
               <li>${listPost.contract}</li>
               <li>${listPost.location}</li>
            </ul>
          </div>
        </div>
        <div class="languages">
            <ul>
               <li>${listPost.role}</li>
               <li>${listPost.level}</li>
               ${getLanguages(listPost.languages)}
            </ul>
        </div>
      </div>
      
      `
      container.insertAdjacentHTML('beforeend', htmlJobPostBox);
   })

}

function getLanguages(data) {
   const dataList = data.map( language => {      
      return `<li>${language}</li>`;      
   });
console.log(dataList);
   return dataList;
}

getJobPosts();