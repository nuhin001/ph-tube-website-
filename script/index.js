console.log("index is connected");

// removeing  active class
function removeActiveClass(){
  const activeButtons = document.getElementsByClassName("active");
  console.log(activeButtons);

  for( let btn of activeButtons){
    btn.classList.remove("active");
  }
}

function loadCategories() {
  // console.log("categories is loading");
  // fetch the data
  fetch("http://localhost:5001/api/phero-tube/categories")
    .then((res) => res.json())
    .then((res) => displayCategories(res.data)); // categories
}

function loadVideos() {
  fetch("http://localhost:5001/api/phero-tube/videos")
    .then((res) => res.json())
    .then((res) => {
      displayVideos(res.data)

      removeActiveClass(); // all button is first inactive in my (default) system
      document.getElementById("btn-all").classList.add("active"); //active class button
    }); // videos
}
//        it is the category_id :1001 starting point
const  loadCategoriesVideoDetails = (id) => {

  const url= `http://localhost:5001/api/phero-tube/category/${id}`
  console.log(url);

  fetch(url)
  .then(res =>res.json())
  .then(res =>{

    removeActiveClass(); //<- remove active class in the button 

     // calling buttons with active class
    const clickButton = document.getElementById(`btn-${id}`)
    clickButton.classList.add("active");
    // console.log(clickButton);
    displayVideos(res.data)})
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }

// {
//     "category_id": "1003",
//     "video_id": "vid011",
//     "thumbnail": "https://picsum.photos/seed/phero011/640/360",
//     "title": "Drawing a Landscape Step by Step",
//     "authors": [
//         {
//             "profile_picture": "https://i.pravatar.cc/120?img=53",
//             "name": "Sakib Ahmed",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "43K",
//         "posted_date": "2 weeks ago"
//     },
//     "description": "Follow along as a landscape illustration is created from sketch to final details."
// }

// how to display categories with normal function
function displayCategories(categories) {
  // console.log(categories); //working

  //get the container
  const categoryContainer = document.getElementById("category-container");

  //loop operation on Array of object
  for (let cat of categories) {
    // console.log(cat);

    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id= btn-${cat.category_id} onclick="loadCategoriesVideoDetails(${cat.category_id})" class="btn btn-sm  hover:bg-red-600 hover:text-[#FFFFFF] ">${cat.category}</button>
    `;

    //Append
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  //if any array length is "0" this condition will apply
  if(videos.length == 0){
    videoContainer.innerHTML = ` 
     <div class="col-span-full text-center flex flex-col  items-center py-20">
      <img class="w-[140px]" src="assests/Icon.png" alt="" srcset="">
      <h2 class="font-bold text-3xl">Oops!! Sorry, There is no content here</h2>
    </div>
    `
    return;
  }

  // for each loop
  videos.forEach((video) => {
    // console.log(video);
    // create element in the for each lopp
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100 ">
        <figure class="relative w-full aspect-video overflow-hidden rounded">
          <img class = "w-full h-full object-cover"
            src= ${video.thumbnail};
            alt=""
            
          />
          <span
            class="absolute bottom-2 right-2 text-sm text-[#FFFFFF] bg-black p-1 rounded"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class=" flex gap-3 px-1 py-6">
          <div class="profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2"
              >
                <img
                  alt="Tailwind-CSS-Avatar-component"
                  src=${video.authors[0].profile_picture}
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="font-bold text-base">${video.title}</h2>
            <p class=" font-normal text-sm text-gray-600 flex gap-1">${video.authors[0].name}
                <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=QMxOVe0B9VzG&format=png" alt="" srcset=""></p>
                <p class="font-normal text-sm text-gray-600">${video.others.views}</p>
          </div>

        </div>
      </div>
    `;
    // appned
    videoContainer.append(videoCard);
  });
};

loadCategories();
// loadVideos();
