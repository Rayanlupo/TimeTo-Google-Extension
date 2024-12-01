const urlContainer = document.getElementById("URL-list");
const addInputButton = document.getElementById("addInput");
const urlParams = new URLSearchParams(window.location.search);
let modeName = urlParams.get("mode") || "default";
let storageKey = `savedURL_${modeName}`;
const modeTitleInput = document.querySelector(".modeTitle");
let savedURLs = JSON.parse(localStorage.getItem(storageKey)) || [];

const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        savedURL(event.target.value);
        event.target.value = "";
    }
};

document.getElementById("back-button").addEventListener("click", function() {
    window.history.back();
});

document.getElementById("save-button").addEventListener("click", () => {
    handleModeNameChange();
    localStorage.setItem(storageKey, JSON.stringify(savedURLs)); 
    alert(`Mode "${modeName}" and URLs saved successfully!`);
});

const deleteMode = () => {
    if (confirm(`Are you sure you want to delete the mode "${modeName}"?`)) {
        localStorage.removeItem(storageKey);
        alert(`Mode "${modeName}" deleted successfully!`);
        window.location.href = "index.html"; 
    }
};

const savedURL = (url) => {
    if (url.trim() && url.match(/^(http|https):\/\/[^ "]+$/)) {
        savedURLs.push(url);
        localStorage.setItem(storageKey, JSON.stringify(savedURLs));
        alert(`Saved: ${url}`);
        loadURLs();
    } else {
        alert("Invalid URL");
    }
};

const addInputField = () => {
    const inputContainer = document.createElement("div");
    inputContainer.className = "URL";
    const newInput = document.createElement("input");
    newInput.type = "url";
    newInput.className = "urlInput";
    newInput.placeholder = "URL";
    newInput.addEventListener("keydown", handleKeyPress);
    inputContainer.appendChild(newInput);
    urlContainer.appendChild(inputContainer);

    newInput.focus();
};

const loadURLs = () => {
    urlContainer.innerHTML = '';
    savedURLs.forEach((url) => {
        const inputContainer = document.createElement("div");
        inputContainer.className = "URL";
        const input = document.createElement("input");
        input.type = "url";
        input.className = "urlInput";
        input.value = url;
        input.addEventListener("keydown", handleKeyPress);
        inputContainer.appendChild(input);
        urlContainer.appendChild(inputContainer);
    });
};

// Initialize the URL inputs on page load
loadURLs();

const handleModeNameChange = () => {
    const newModeName = modeTitleInput.value.trim();
    if (newModeName && newModeName !== modeName) {
        const newStorageKey = `savedURL_${newModeName}`;
        localStorage.setItem(newStorageKey, JSON.stringify(savedURLs));
        localStorage.removeItem(storageKey);
        modeName = newModeName;
        storageKey = newStorageKey;
        alert(`Mode Name updated to ${newModeName}`);
    }
};

modeTitleInput.value = modeName;
modeTitleInput.addEventListener("blur", handleModeNameChange);
modeTitleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        modeTitleInput.blur();
        alert("Mode name saved successfully");
    }
});

addInputButton.addEventListener("click", addInputField);
document.getElementById("delete-button").addEventListener("click", deleteMode);


const saveMode = () => {
    handleModeNameChange(); 
    localStorage.setItem(storageKey, JSON.stringify(savedURLs)); 
    alert(`Mode "${modeName}" and URLs saved successfully!`);
};
