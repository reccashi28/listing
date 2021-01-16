const filterBox = document.querySelector('.job-filter');
const emptyBox = document.querySelector('.empty-box');
const container = document.querySelector('.container1');
const searchField = document.querySelector('.searchField');
let jobs = [];
searchField.addEventListener('input', e => {
   let input = e.target.value;
   const filteredSearch = jobs.filter( job => {
      const languages = job.languages.map( lang => lang.toLowerCase());
      const tools = job.tools.map( tool => tool.toLowerCase());
      return job.role.toLowerCase().includes(input)|| languages.includes(input) || tools.includes(input) || job.level.toLowerCase().includes(input);
   });
   generateHTML(filteredSearch);
});

let emptyBoxHeight = filterBox.clientHeight;

emptyBox.style.height = `${emptyBoxHeight}px`;

 const resizeBox = () => {
    emptyBoxHeight = filterBox.clientHeight;
    return emptyBox.style.height = `${emptyBoxHeight}px`;
 }

window.addEventListener('resize', resizeBox);

const getJobPosts = async () => {
   try {
      const res = await fetch('http://127.0.0.1:5500/data.json');
      jobs = await res.json();
      generateHTML(jobs);
      // console.log(jobs);
   } catch (error) {
      console.log(error);
   }

}

const jobTags = data => {
   let tagArray = [];
   const filterArray = [data.role, data.level, ...data.languages, ...data.tools];
   filterArray.map( aray => {
      if(!tagArray.includes(aray)){
         return tagArray.push(aray)
      }
   });
   // console.log(tagArray);
   const array = filterArray.join(' ').split(' ');  
   // console.log('array',array);
}

// console.log(jobTags);

//generate job post html
const generateHTML = list =>{
   let htmlJobPostBox =  list.map( listPost => {
      const filterArray = [listPost.role, listPost.level, ...listPost.languages, ...listPost.tools];

      return `
      <div class="job-posts">
        <div class="logo">
          <img src="${listPost.logo}">
        </div>
        <div class="content-body">
            <div class="content">
               <div class="status">
                  <p>${listPost.company}</p>
                  <span class="postNew">${listPost.new ? 'NEW': ''}</span>
                  <span class="postFeature">${listPost.featured ? 'FEATURED': ''}</span>
               </div>
               <p class ="company-name">${listPost.position}</p>
            
            </div>
            <div class="languages">
                  <ul>
                  ${filterArray.map( tag => {
                     return `<li>${tag}</li>`
                  }).join('')}
                  </ul>
            </div>
            <div class="details">
                  <ul>
                     <li>${listPost.postedAt}</li>
                     <li>${listPost.contract}</li>
                     <li>${listPost.location}</li>
                  </ul>
               </div>
         </div>
      </div>
      
      `
   }).join('');
   container.innerHTML = htmlJobPostBox;
};



getJobPosts();