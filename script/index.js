console.log("index is connected");

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
    .then((res) => displayVideos(res.data)); // videos
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
  const categoryContainer = document.getElementById("catagory-container");

  //loop operation on Array of object
  for (let cat of categories) {
    // console.log(cat);

    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-red-600 hover:text-[#FFFFFF] ">${cat.category}</button>
    `;

    //Append
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");

  // for each loop
  videos.forEach((video) => {
    console.log(video);
    // create element in the for each lopp
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src= ${video.thumbnail}
      alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

    `;
    // appned
    videoContainer.append(videoCard);
  });
};

loadCategories();
loadVideos();
