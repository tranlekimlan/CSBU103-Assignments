const gallery = document.querySelector('.gallery');



function addImage(url, name) {
    const img = document.createElement("img");
    img.onerror = function() {
        this.src = "https://media.istockphoto.com/id/476438632/vector/warning-rubber-stamp-ink-imprint-icon.jpg?s=612x612&w=0&k=20&c=Q_ATD3Diqko9s9twE5hpmIRebUh1XpN1eg3vhy-s1Gs=";
        this.alt = "Broken Image";
    }; 

    img.src = url;
    img.alt = name || "Image";
    gallery.appendChild(img);
}



document.getElementById("add-url-btn").addEventListener("click", () => {
    const urlInput = document.getElementById("img-url");
    const url = urlInput.value.trim();

    if (url) {
        addImage(url, "Image from URL");
        urlInput.value = "";
    }
});



document.getElementById("add-file-btn").addEventListener("click", () => {
    const fileInput = document.getElementById("img-file");
    const file = fileInput.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => addImage(e.target.result, file.name);
    reader.readAsDataURL(file);

    fileInput.value = "";
});



const viewer = document.getElementById("expand");
const viewerImg = document.getElementById("viewing");
const closeViewer = document.getElementById("collapse");
const captionText = document.getElementById("caption");
const deleteButton = document.getElementById("delete-button");

gallery.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
        viewerImg.src = e.target.src;
        captionText.innerText = e.target.alt;
        viewer.classList.remove("hidden");  
    }
});

closeViewer.addEventListener("click", () => {
    viewer.classList.add("hidden");
});

deleteButton.addEventListener("click", () => {
    if (!confirm("Are you sure you want to delete this image forever?")) {
        return;
    }
    const currentSrc = viewerImg.src;
    const allImages = document.querySelectorAll(".gallery img");
    allImages.forEach(img => {
        if (img.src === currentSrc) {
            img.remove();
        }
    });
    viewer.classList.add("hidden");
});