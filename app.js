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

  let promiseJob = fetch('http://127.0.0.1:5500/data.json');
  let promiseJob2 = promiseJob.then( response => {
      return response.json();
   });
   // console.log(promiseJob2);

   promiseJob2.then(data => {
      generateHTML(data);
      // filterList(data);
      
   });
   promiseJob2.catch( error => {
      console.log('Failed to fetch page: ', err)
   })

}

function filterList(data){
   // const filter = data.map( tags => console.log('from Filterlist function', tags));
   // return filter;
   console.log('filterlist function', data[0]);
}



function jobTags(data) {
      const filterArray = [data.role, data.level, ...data.languages, ...data.tools];
   return filterArray;
}

function generateHTML(list){

   let htmlJobPostBox = '';
   // console.log(filterList);

   list.map( listPost => {
      const tagsSearch = jobTags(listPost);
      filterList(tagsSearch);
      console.log('tags search',tagsSearch);
      htmlJobPostBox = 
      `
      <div class="job-posts">
        <div class="logo">
          <img src="${listPost.logo}">
        </div>
        <div class="content">
          <div class="status">
            <p>${listPost.company}</p>
            <span class="postNew">${listPost.new ? 'NEW': ''}</span>
            <span class="postFeature">${listPost.featured ? 'FEATURED': ''}</span>
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
              ${tagsSearch.map( tag => {
               return `<li>${tag}</li>`
              }).join('')}
            </ul>
        </div>
      </div>
      
      `
      container.insertAdjacentHTML('beforeend', htmlJobPostBox);
   })

}



getJobPosts();