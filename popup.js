const parent = document.getElementById("entries");

document.getElementById("newEntry").addEventListener("click", newEntry);

function newEntry() {
    var newDiv = document.createElement("div");
    parent.appendChild(newDiv);
}