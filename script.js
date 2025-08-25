const audio = document.getElementById("bgAudio");
const button = document.getElementById("audioBtn");

let isPlaying = false;

// Autoplay audio setup
window.addEventListener("load", () => {
  audio.play().then(() => {
    button.classList.add("playing");
    isPlaying = true;
  }).catch(() => {
    console.log("Autoplay blocked, waiting for user click.");
  });
});

button.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    button.classList.remove("playing");
    button.classList.add("stopped"); 
  } else {
    audio.muted = false; 
    audio.play();
    button.classList.add("playing");
    button.classList.remove("stopped");
  }
  isPlaying = !isPlaying;
});


const video = document.querySelector('.hero-video');
const nextThumb = document.getElementById('nextThumb');

const movieList = [
  'videos/hero-1.mp4',
  'videos/hero-2.mp4',
  'videos/hero-3.mp4',
  'videos/hero-4.mp4'
];

let thumbs = []; 
let index = 0;

// Function to generate thumbnail for one video
function generateThumbnail(videoPath) {
  return new Promise((resolve) => {
    const tempVideo = document.createElement("video");
    tempVideo.src = videoPath;
    tempVideo.crossOrigin = "anonymous";
    tempVideo.muted = true;
    tempVideo.playsInline = true;

    tempVideo.addEventListener("loadeddata", () => {
      
      tempVideo.currentTime = 0;
    });

    tempVideo.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = tempVideo.videoWidth;
      canvas.height = tempVideo.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg");
      resolve(imageUrl);
    });
  });
}

async function prepareThumbnails() {
  for (let i = 0; i < movieList.length; i++) {
    const thumb = await generateThumbnail(movieList[i]);
    thumbs.push(thumb);
  }
  const nextIndex = (index + 1) % movieList.length;
  nextThumb.src = thumbs[nextIndex];
}
prepareThumbnails();


function playNextVideo() {
  
  nextThumb.parentElement.classList.add("animate-zoom");
  video.classList.add("fade-out");

  setTimeout(() => {
   
    index = (index + 1) % movieList.length;
    video.src = movieList[index];
    video.play();

    const nextIndex = (index + 1) % movieList.length;
    nextThumb.src = thumbs[nextIndex];

    nextThumb.parentElement.classList.remove("animate-zoom");

    video.classList.remove("fade-out");
  }, 800); 
}

const heroSection = document.querySelector('.hero-section');
const previewBox = document.querySelector('.next-preview');

heroSection.addEventListener("mousemove", (e) => {
  const rect = heroSection.getBoundingClientRect();
  const x = e.clientX - rect.left; 
  const y = e.clientY - rect.top;  

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const toleranceX = rect.width * 0.2; 
  const toleranceY = rect.height * 0.2;

  if (
    x > centerX - toleranceX &&
    x < centerX + toleranceX &&
    y > centerY - toleranceY &&
    y < centerY + toleranceY
  ) {
    previewBox.classList.add("visible");
  } else {
    previewBox.classList.remove("visible");
  }
});

heroSection.addEventListener("mouseleave", () => {
  previewBox.classList.remove("visible");
});

nextThumb.addEventListener('click', playNextVideo);
