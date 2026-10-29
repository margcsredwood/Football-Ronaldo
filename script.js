const ball = document.getElementById("ball");
const field = document.querySelector(".field");
const message = document.getElementById("message");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

// Background music starts after the user clicks the music button or presses SPACE.
backgroundMusic.volume = 0.3;

async function toggleBackgroundMusic() {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicButton.textContent = "⏸ Pause Background Music";
    } catch (error) {
      message.textContent = "Add football-music.mp3 to this folder, then try again. 🎵";
    }
  } else {
    backgroundMusic.pause();
    musicButton.textContent = "▶ Play Background Music";
  }
}

musicButton.addEventListener("click", toggleBackgroundMusic);

function kickBall() {
  if (ball.classList.contains("kick")) return;

  // Browsers require a user action before playing audio, so SPACE can start it too.
  if (backgroundMusic.paused) {
    backgroundMusic.play().then(() => {
      musicButton.textContent = "⏸ Pause Background Music";
    }).catch(() => {
      // The game still works if the music file is missing or cannot be played.
    });
  }

  ball.classList.remove("kick");
  void ball.offsetWidth;

  // Sometimes the ball goes into the goal.
  const scores = Math.random() < 0.40;
  if (scores) {
    ball.style.left = "50%";
    ball.style.bottom = "70%";
    message.textContent = "GOAL! ⚽🎉";
    field.classList.add("goal-scored");
  } else {
    const randomLeft = 15 + Math.random() * 70;
    const randomBottom = 25 + Math.random() * 55;
    ball.style.left = randomLeft + "%";
    ball.style.bottom = randomBottom + "%";
    message.textContent = "Miss! Try again! ⚽";
  }

  ball.classList.add("kick");
  // Reset the ball to the center after every shot.
  setTimeout(() => {
    ball.classList.remove("kick");
    field.classList.remove("goal-scored");
    ball.style.left = "50%";
    ball.style.bottom = "45px";
    message.textContent = "Press SPACE to kick! ⚽";
  }, 900);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    kickBall();
  }
});
