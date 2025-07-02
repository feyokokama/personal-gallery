export function displaySinglePhoto(clickedData) {
  // Show the photo display panel
  document.querySelector(".single-display").style.visibility = "visible";

  // Get display elements
  const photoDiv = document.getElementById("single-photo");
  const nameDiv = document.getElementById("single-name");
  const dateDiv = document.getElementById("single-date");
  const descriptionDiv = document.getElementById("single-description");
  const locationDiv = document.getElementById("single-location");
  const dimensionsDiv = document.getElementById("single-dimenstions");
  const filesizeDiv = document.getElementById("single-filesize");

  // Ensure all necessary elements exist
  if (!photoDiv || !nameDiv || !dateDiv || !locationDiv || !descriptionDiv || !dimensionsDiv || !filesizeDiv) {
    console.error("One or more display elements not found in the DOM.");
    return;
  }

  // Clear the previous image
  photoDiv.innerHTML = "";

  // Create wrapper for the image
  const wrapper = document.createElement("div");
  wrapper.className = "image-wrapper";

  // Create clickable link
  const link = document.createElement("a");
  link.href = clickedData.src;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  // Create and configure image element
  const img = document.createElement("img");
  img.src = clickedData.src;
  img.alt = clickedData.alt || clickedData.filename;
  img.style.maxWidth = "100%";

  // Nest elements
  link.appendChild(img);
  wrapper.appendChild(link);

  // Create caption with name and filename
  const caption = document.createElement("div");
  caption.className = "image-caption";
  const displayfilename = clickedData.filename;
  caption.textContent = `${clickedData.name}`;
  wrapper.appendChild(caption);

  // Append to DOM
  photoDiv.appendChild(wrapper);

  // Populate metadata fields
  nameDiv.textContent = displayfilename;
  dateDiv.textContent = clickedData.date || "Unknown Date";
  descriptionDiv.textContent = clickedData.description || "No description available.";
  locationDiv.textContent = clickedData.location || "Unknown Location";
  dimensionsDiv.textContent = clickedData.dimensions
    ? `${clickedData.dimensions.width} x ${clickedData.dimensions.height}`
    : "-";
  filesizeDiv.textContent = clickedData.filesize
    ? `${clickedData.filesize}`
    : "-";
}
