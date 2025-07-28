// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Enable light mode by default
  document.body.classList.add("light-mode");

  const toggleBtn = document.getElementById("toggle-btn");
  const modeIcon = document.getElementById("mode-icon");

  // Toggle dark/light mode
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    const isDark = document.body.classList.contains("dark-mode");
    modeIcon.classList.toggle("fa-sun", !isDark);
    modeIcon.classList.toggle("fa-moon", isDark);
    toggleBtn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  });

  // Fetch posts and display them
  fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((data) => {
      let output = "";
      data.posts.forEach((post) => {
        output += `
          <div id="cont">
            <div id="head">
              <h2 id="circle">${post.userId}</h2>
              <h4>${post.title}</h4>
            </div>

            <p>${post.body}</p>

            <div id="reactions">
              <h4>Likes: <span class="like-count">${post.reactions.likes}</span></h4> 
              <h4>Dislikes: ${post.reactions.dislikes}</h4>
            </div>

            <h5>#${post.tags.join(", ")}</h5><br>
            <div class="likebtn"><i class="fa-regular fa-heart"></i></div>
          </div>
        `;
      });

      document.getElementById("root").innerHTML = output;

      // Like Button Toggle Logic
      const likeButtons = document.querySelectorAll(".likebtn");
      likeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const icon = btn.querySelector("i");
          const countSpan = btn.closest("#cont").querySelector(".like-count");
          let count = parseInt(countSpan.innerText);

          if (icon.classList.contains("fa-regular")) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.style.color = "red";
            countSpan.innerText = count + 1;
          } else {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "";
            countSpan.innerText = count - 1;
          }
        });
      });
    });
});
