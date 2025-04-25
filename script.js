// const posts = [
//   {
//     postid : 1,
//     user: 'User1',
//     image: 'image1.jpg', 
//     caption: 'Explore the latest fashion trends with our new collection.',
//     likes: 311030,
//     time: '5 hours ago'
//   },
//   {
//     postid : 2,
//     user: 'User2',
//     image: 'image2.jpg', 
//     caption: 'Take care of your health with our premium health and personal care products.',
//     likes: 150000,
//     time: '2 hours ago'
//   },
//   {
//     postid : 3,
//     user: 'User3',
//     image: 'image3.jpg', 
//     caption: 'Upgrade your living space with our modern furniture designs.',
//     likes: 120000,
//     time: '1 hour ago'
//   },
//   {
//     postid : 4,
//     user: 'User4',
//     image: 'image4.jpg', 
//     caption: 'Get the latest smartphones at unbeatable prices.',
//     likes: 90000,
//     time: '3 hours ago'
//   },
//   {
//     postid : 5,
//     user: 'User5',
//     image: 'image5.jpg', 
//     caption: 'Enhance your beauty with our exclusive beauty products.',
//     likes: 200000,
//     time: '4 hours ago'
//   },
//   {
//     postid : 6,
//     user: 'User6',
//     image: 'image6.jpg', 
//     caption: 'Pamper your pets with high-quality pet care products.',
//     likes: 80000,
//     time: '6 hours ago'
//   },
//   {
//     postid : 7,
//     user: 'User7',
//     image: 'image7.jpg', 
//     caption: 'Fun and creative DIY craft ideas for kids at home.',
//     likes: 50000,
//     time: '7 hours ago'
//   },
//   {
//     postid : 8,
//     user: 'User8',
//     image: 'image8.jpg', 
//     caption: 'Fashion that speaks to your style. Shop now for the latest trends.',
//     likes: 45000,
//     time: '8 hours ago'
//   }
// ];


// const users = [
//   {
//     userid : 1,
//     firstname : "Ahmad",
//     lastname : "Raza",
//     username : "Ahmad123",
//     image :'login-user.png',
//     isLoggedIn : 0
//   },
//   {
//     userid : 2,
//     firstname: "Ali",
//     lastname: "Raza",
//     username: "ali123",
//     image : "user1.jpeg",
//     isLoggedIn : 0
//   },
//   {
//     userid : 3,
//     firstname: "Farhan",
//     lastname: "Ali",
//     username: "farhan456",
//     image : "user2.png",
//     isLoggedIn : 0
//   },
//   {
//     userid : 4,
//     firstname: "Usman",
//     lastname: "Ali",
//     username: "usman789",
//     image : "user3.png",
//     isLoggedIn : 0
//   },
//   {
//     userid : 5,
//     firstname: "Raza",
//     lastname : "Zaid",
//     username: "raza321",
//     image : "user4.jpeg",
//     isLoggedIn : 1
//   },
//   {
//     userid : 6,
//     firstname: "Zain",
//     firstname: "Ali",
//     username: "zain654",
//     image : "user5.png",
//     isLoggedIn : 0
//   }
// ];


// localStorage.setItem("users", JSON.stringify(users));
// localStorage.setItem('posts', JSON.stringify(posts));
// localStorage.setItem('user', JSON.stringify(user));


// set postId 
// let postId = 10;
// localStorage.setItem("postId", JSON.stringify(postId));


const usersdata = JSON.parse(localStorage.getItem("users")) || [];
const loggedInUser = usersdata.find(user => user.isLoggedIn === 1);
let _userId = loggedInUser?.userid;

console.log(_userId)

let likes = JSON.parse(localStorage.getItem("likes")) || [];

function isLiked(postId) {
  return likes.some(like => like.userId === _userId && like.postId === postId);
}

function handleLike(button, postId) {
  if (!_userId) {
    alert("Please log in to like posts");
    return;
  }

  const postElement = button.closest('.post');
  const likeCountElement = postElement.querySelector('.like-count');
  const retrievedPosts = JSON.parse(localStorage.getItem('posts')) || [];

  const postIndex = retrievedPosts.findIndex(p => p.postId === postId);
  if (postIndex === -1) return;

  if (isLiked(postId)) {
    likes = likes.filter(like => !(like.userId === _userId && like.postId === postId));
    button.classList.remove("fa-solid");
    button.classList.add("fa-regular");
    retrievedPosts[postIndex].likes--;
  } else {
    likes.push({ userId: _userId, postId });
    button.classList.remove("fa-regular");
    button.classList.add("fa-solid");
    retrievedPosts[postIndex].likes++;
  }

  localStorage.setItem("likes", JSON.stringify(likes));
  localStorage.setItem("posts", JSON.stringify(retrievedPosts));

  likeCountElement.textContent = `${retrievedPosts[postIndex].likes.toLocaleString()} likes`;
}


if (loggedInUser) {
  const userdiv = document.querySelector('.user');
  userdiv.innerHTML = `
    <div class="u-image">
      <img src="${loggedInUser.image}" alt="User Image">
    </div>
    <div class="name">
      <p>${loggedInUser.username}</p>
      <span>${loggedInUser.firstname} ${loggedInUser.lastname}</span>
    </div>
    <span class="switch" onclick="SwitchClick()">switch</span>`;
}

let follow = true;
function SwitchClick() {
  follow = false;
  loadSuggestions();
}

const retrievedPosts = JSON.parse(localStorage.getItem('posts'));
if (retrievedPosts) {
  const feed = document.querySelector('.feed');
  retrievedPosts.forEach(post => {
    const isPostLiked = isLiked(post.postId);
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
      <div class="post-content">
        <div class="post-head">
          <div class="story-ring">
            <div class="user-image-post"></div>
          </div>
          <span>${post.user}</span>
          <i class="fa-solid fa-certificate"></i>
          <time>${post.time}</time>
          <a class="posthead-follow">Follow</a>
          <i class="fa-solid fa-ellipsis" title="More options"></i>
        </div>
        <div class="post-image">
          <img src="${post.image}" alt="Post Image">
        </div>
        <div class="post-actions">
          <div class="left-icons">
            <i class="${isPostLiked ? 'fa-solid' : 'fa-regular'} fa-heart like-btn" 
               onclick="handleLike(this, ${post.postId})"></i>
            <i class="fa-regular fa-comment"></i>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
          <div class="right-icon">
            <i class="fa-regular fa-bookmark"></i>
          </div>
        </div>
        <span class="like-count">${post.likes.toLocaleString()} likes</span>
        <div class="caption">
          <a href="">${post.user}</a> <span>${post.caption}</span>
        </div>
        <span class="all-comments">View all comments</span>
        <br>
        <span class="add-comment">Add a comment...</span>
      </div>`;

    feed.appendChild(postDiv);
  });
} else {
  console.log("No posts data found.");
}


function setSwitchUser(username) {
  const usersData = JSON.parse(localStorage.getItem("users")) || [];
  usersData.forEach(user => user.isLoggedIn = 0);
  const switchingUser = usersData.find(user => user.username === username);
  if (switchingUser) {
    switchingUser.isLoggedIn = 1;
  }
  localStorage.setItem("users", JSON.stringify(usersData));
  location.reload();
}


const retrievedusers = JSON.parse(localStorage.getItem('users'));
if (retrievedusers) {
  const suggestiondiv = document.querySelector('.suggestions-container');
  retrievedusers.slice(0, 5).forEach(user => {
    const postSuggestion = document.createElement('div');
    postSuggestion.classList.add('sugession');
    postSuggestion.innerHTML = `
      <div class="u-image">
        <img src="${user.image}" alt="Image">
      </div>
      <div class="name">
        <p>${user.firstname}</p>
        <span>${user.username}</span>
      </div> 
      <span class="follow" onclick="${follow ? `handleFollow('${user.username}')` : `setSwitchUser('${user.username}')`}">
        ${follow ? 'Follow' : 'Switch with'}
      </span>`;
    suggestiondiv.appendChild(postSuggestion);
  });
}

document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("imageInput");
  const caption = document.getElementById("captionInput").value;
  let pId = parseInt(localStorage.getItem('postId')) || 10;
  pId++;

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Image = reader.result;
    const post = {
      user: loggedInUser.username,
      image: base64Image,
      caption: caption,
      likes: 0,
      time: "Just now",
      postId: pId
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem('postId', pId);
    location.reload();
  };

  reader.readAsDataURL(file);
});

function loadSuggestions() {
  const retrievedusers = JSON.parse(localStorage.getItem('users'));
  const suggestiondiv = document.querySelector('.suggestions-container');
  suggestiondiv.innerHTML = "";

  if (retrievedusers) {
    retrievedusers.slice(0, 5).forEach(user => {
      const postSugession = document.createElement('div');
      postSugession.classList.add('sugession');

      postSugession.innerHTML = `
        <div class="u-image">
          <img src="${user.image}" alt="Image">
        </div>
        <div class="name">
          <p>${user.firstname}</p>
          <span>${user.username}</span>
        </div> 
        <span class="follow" ${follow ? "" : `onclick="setSwitchUser('${user.username}')"`}>
          ${follow ? "Follow" : "Switch with"}
        </span>`;

      suggestiondiv.appendChild(postSugession);
    });
  }
}

