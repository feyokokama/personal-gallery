// gallery_filename_list.js
import { displaySinglePhoto } from "./displaySinglePhoto.js";

const fileListDiv = document.getElementById("fileList");

fetch("photo_filenames_list.json")
  .then(response => response.json())
  .then(images => {
    if (typeof images !== "object" || images === null || Array.isArray(images)) {
      fileListDiv.textContent = "Invalid image data.";
      return;
    }

    const ul = document.createElement("ul");

    Object.entries(images).forEach(([filename, data]) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#"; // prevent default navigation
      link.textContent = filename;

      link.addEventListener("click", (e) => {
        e.preventDefault();

        const clickedData = {
          ...data,
          filename: filename
        };

        displaySinglePhoto(clickedData);
      });

      li.appendChild(link);
      ul.appendChild(li);
    });

    fileListDiv.appendChild(ul);
  })
  .catch(error => {
    fileListDiv.textContent = "Failed to load image list.";
    console.error(error);
  });
