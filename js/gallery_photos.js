import { displaySinglePhoto } from "./displaySinglePhoto.js";
import { applyHoverEffectToImages } from './hover_effects.js';

const columns = [
  document.getElementById("col1"),
  document.getElementById("col2"),
  document.getElementById("col3"),
];

const counts = [0, 0, 0];
let imagesData = null;

function getMinIndices(arr) {
  const min = Math.min(...arr);
  return arr.map((val, idx) => (val === min ? idx : -1)).filter(idx => idx !== -1);
}

fetch("photo_filenames_list.json")
  .then(response => response.json())
  .then(images => {
    imagesData = images;

    Object.entries(images).forEach(([filename, data]) => {
      const { src, alt } = data;

      const minCols = getMinIndices(counts);
      const randomColIndex = minCols[Math.floor(Math.random() * minCols.length)];

      // Create the wrapper div
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      // Create the img element
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.className = "gallery-img";

      // Create the caption div
      const caption = document.createElement("div");
      caption.className = "image-caption";
      caption.textContent = filename;  // Or use alt or any other data for caption

      // Append img and caption to the wrapper
      wrapper.appendChild(img);
      wrapper.appendChild(caption);

      // Append the wrapper to the column div
      columns[randomColIndex].appendChild(wrapper);

      counts[randomColIndex]++;
    });



    // ✅ Call the hover effect *after* images are added
    applyHoverEffectToImages();

    document.querySelectorAll(".image-wrapper").forEach(wrapper => {
      wrapper.addEventListener("click", () => {
        const img = wrapper.querySelector('img'); // get the img inside wrapper

        function getFilenameFromPath(path) {
          return path.split('/').pop();
        }

        const clickedImgFilename = getFilenameFromPath(img.src);

        let clickedData = null;
        for (const [filename, data] of Object.entries(imagesData)) {
          if (getFilenameFromPath(data.src) === clickedImgFilename) {
            clickedData = data;
            clickedData.filename = filename;
            break;
          }
        }

        if (!clickedData) {
          console.warn("No data found for clicked image.");
          return;
        }

        displaySinglePhoto(clickedData);
      });
    });


  })
  .catch(error => {
    console.error("Failed to load image list:", error);
  });
