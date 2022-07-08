// write your code here

const BASE_URL = 'http://localhost:3000/ramens/';
//If we need to go to ramens/:id => BASE_URL + id

// ! GLOBAL DOM ELEMENTS
const ramenMenu = document.querySelector('#ramen-menu');
const ramenForm = document.getElementById('new-ramen');

// When the page loads, request the data from the server to get AN ARRAY of the ramen objects.
// See all ramen images in the div with the id of ramen-menu.
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
const fetchAllRamens = () => {
    fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        data.forEach((ramen) => {
        createRamenImg(ramen);
        });
    });
}

const fetchOneRamen = (id) => {
    fetch(BASE_URL + id)
    .then((res) => res.json())
    .then((oneRamen) => {
        console.log(oneRamen);
        displayDetail(oneRamen);
    });
}

const createRamenImg = (ramen) => {
    let imgTag = document.createElement('img');
    imgTag.src = ramen.image;
    imgTag.alt = ramen.name;
    imgTag.id = ramen.id;

    imgTag.addEventListener('click', (event) => {
        displayDetail(ramen);
    });
    ramenMenu.append(imgTag);
}

const displayDetail = (oneRamen) => {
    let detailImg = document.querySelector('.detail-image');
    detailImg.src = oneRamen.image;
    detailImg.alt = oneRamen.name;

    document.querySelector('.name').textContent = oneRamen.name;
    document.querySelector('.restaurant').textContent = oneRamen.restaurant;
    document.querySelector('#rating-display').textContent = oneRamen.rating;
    document.querySelector('#comment-display').textContent = oneRamen.comment;
}

// Click on an image from the #ramen-menu div
// see all the info about that ramen displayed inside the #ramen-detail div and 
// where it says insert comment here and insert rating here.
const menuEventHandler = (event) => {
    if (event.target.id !== "ramen-menu") {
      // utilize the img.id to fetch one ramen and popluate the details
      fetchOneRamen(event.target.id);
    }
  }
  
  const handleNewRamen = (event) => {
    event.preventDefault();
    console.log(event);
    // ! FIRST
    let ramenObj = {
      name: ramenForm[0].value,
      restaurant: ramenForm[1].value,
      image: ramenForm[2].value,
      rating: ramenForm[3].value,
      comment: ramenForm[4].value,
    };
    console.log(ramenObj);
    createRamenImg(ramenObj);
  }
  
  const imgEventHandler = (ramen) => {
    displayDetail(ramen);
  }
  
  const init = () => {
    // This is where we put the page load functions
    fetchAllRamens();
    // ramenMenu.addEventListener("click", menuEventHandler);
    ramenForm.addEventListener("submit", handleNewRamen);
  }
  
  init();






















































// const ramenMenu = document.querySelector("#ramen-menu");
// // let ramenTest 

// getAllRamen();
// formEventListener();

// function getAllRamen(){
//     fetch("http://localhost:3000/ramens")
//     .then(response => response.json())
//     .then(ramenItems)
// }

// function ramenItems(ramenArr){
//     ramenArr.forEach(ramen => {
//        //helper function to create image
//         renderImage(ramen);
//     })
// }

// function renderImage(ramen){
//     const img = document.createElement("img")
//     img.src = ramen.image 
//     img.alt = ramen.name 
//     img.dataset.id = ramen.id 
//     ramenMenu.append(img)

//     img.addEventListener("click", function(e){
//         //helper method to get fetch with id request 
//         getRamen(e.target.dataset.id);
//     })
// }

// function getRamen(ramenId){
//     fetch(`http://localhost:3000/ramens/${ramenId}`)
//     .then(response => response.json())
//     .then(ramen => {
//         renderDetails(ramen)
//     })
// }

// function renderDetails(ramen){
//     // const ramenDetail = document.querySelector("#ramen-detail");
//     const img = document.querySelector(".detail-image");
//     const h2 = document.querySelector(".name");
//     const h3 = document.querySelector(".restaurant");
//     const ratingInput = document.querySelector("#rating")
//     ratingInput.value = ramen.rating 
//     const commentInput = document.querySelector("#comment")
//     commentInput.value = ramen.comment
//     img.src = ramen.image;
//     img.alt = ramen.name; 
//     h2.textContent = ramen.name
//     h3.textContent = ramen.restaurant 
//     const ramenForm = document.querySelector("#ramen-rating")
//     ramenForm.dataset.id = ramen.id;
// }

// function formEventListener(){

//     const ramenForm = document.querySelector("#ramen-rating")
//     ramenForm.addEventListener("submit", function(e) {
//         e.preventDefault();
//         // console.log(e);
//         const newRating = document.querySelector("#rating").value
//         const newComment = document.querySelector("#comment").value
//         // const r = e.target.rating.value    
//         const updatedObj = {
//             id: parseInt(ramenForm.dataset.id),
//             rating: newRating,
//             comment: newComment
//         }

//         updateRamen(updatedObj);
//         e.target.reset();
//     })
// }

// function updateRamen(updatedObj){

//     fetch(`http://localhost:3000/ramens/${updatedObj.id}`, {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(updatedObj),
// })
// .then(response => response.json())
// .then(updatedObj => {
//     const ratingInput = document.querySelector("#rating")
//     const commentInput = document.querySelector("#comment")
//     ratingInput.value = updatedObj.rating
//     commentInput.value = updatedObj.comment
    
// })

// }