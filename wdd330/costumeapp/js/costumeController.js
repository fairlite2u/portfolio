// The controller needs access to both the model and the view...so let's import them
import Store from './costumeModel.js';
import UI from './costumeView.js';

// Costume Class: Represents a Costume
class Costume {
    constructor(character, gender, size, age, pic, notes) {
        this.character = character;
        this.gender = gender;
        this.size = size;
        this.age = age;
        this.pic = pic;
        this.notes = notes;
    }
}

// Event: Show/Hide Inventory List
document.querySelector('#show-inventory').addEventListener('click', function () {
    const inventoryBtn = document.querySelector('.inventory-container');
    inventoryBtn.classList.toggle('expand');
    if (inventoryBtn.classList.contains('expand')) {
        document.querySelector('#show-inventory').innerText = "Hide Current Inventory";
    } else {
        document.querySelector('#show-inventory').innerText = "Show Current Inventory";
    }
});

// Event: Display Costumes
document.addEventListener('DOMContentLoaded', UI.displayCostumes);

// Event: Filter Costume Inventory List
document.querySelector('.filter-list').addEventListener('click', UI.filterCostumes);

// Event: View Full Costume Details
document.querySelector('#costume-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-info')) {
        UI.showOneCostume(e.target.parentElement.parentElement.previousElementSibling.textContent);
    }
    // Event: Close full details
    const costDetails = document.querySelector('#costume-details-div');
    const detailsList = document.querySelector('.costume-details');
    if (costDetails.contains(detailsList)) {
        document.querySelector('.btn-hide').addEventListener('click', function () {
            const hideDetails = document.querySelector('.costume-details');
            hideDetails.classList.toggle('expand');
        })
    }
});

// Event: Edit a Costume
document.querySelector('#costume-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-edit')) {
        const inventoryBtn = document.querySelector('.inventory-container');
        inventoryBtn.classList.toggle('expand');
        if (inventoryBtn.classList.contains('expand')) {
            document.querySelector('#show-inventory').innerText = "Hide Current Inventory";
        } else {
            document.querySelector('#show-inventory').innerText = "Show Current Inventory";
        }
        const showFormBtn = document.querySelector('.form-container');
        if (!showFormBtn.classList.contains('expand')) {
            showFormBtn.classList.toggle('expand');
            document.querySelector('#add-inventory').innerText = "Edit Costume In Inventory";
            document.querySelector('#add-heading').innerText = "Edit Costume Details";
        }
        document.querySelector('.add-btn').classList.toggle('hidden');
        document.querySelector('.edit-btn').classList.toggle('hidden');
        document.querySelector('.cancel-btn').classList.toggle('hidden');
        // Event: Close full details
        const costDetails = document.querySelector('#costume-details-div');
        const detailsList = document.querySelector('.costume-details');
        if (costDetails.contains(detailsList)) {
            const hideDetails = document.querySelector('.costume-details');
            if (hideDetails.classList.contains('expand')) {
                hideDetails.classList.toggle('expand');
            }
        }
        UI.editOneCostume(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent);
    }
});

// Event: Submit Costume edit
document.querySelector(".edit-btn").addEventListener('click', (e) => {
    e.preventDefault();
    // Get form values
    const character = document.querySelector('#character').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const size = document.querySelector('#size option:checked').value;
    const age = document.querySelector('input[name="age-group"]:checked').value;
    const pic = localStorage.getItem("recent-image");
    const notes = document.querySelector('#notes').value;
    const index = document.querySelector('#index').value;
    // Validate
    if (character === '' | gender === '' | size === '' | age === '' | pic === '' | notes === '') {
        UI.showAlert('Please fill in all fields', 'danger', 'form');
    } else {
        // Instantiate costume
        const costume = new Costume(character, gender, size, age, pic, notes);
        // Expand, close, and fix headings
        const inventoryBtn = document.querySelector('.inventory-container');
        inventoryBtn.classList.toggle('expand');
        document.querySelector('#add-inventory').innerText = "Add Costume to Inventory";
        document.querySelector('#add-heading').innerText = "Add Costume Details";
        document.querySelector('.add-btn').classList.toggle('hidden');
        document.querySelector('.edit-btn').classList.toggle('hidden');
        document.querySelector('.cancel-btn').classList.toggle('hidden');
        // Add Costume to UI
        UI.addCostumeToList(costume, index);

        // Add costume to store
        Store.editCostume(costume, index);

        // Show success message
        UI.showAlert('Costume Updated', 'success', 'form');

        // Clear fields
        UI.clearFields();

        // Refresh page
        location.reload();
    }
});

// Event: Cancel Edit Costume
document.querySelector('.cancel-btn').addEventListener('click', () => {
    // Clear fields
    UI.clearFields();
    document.querySelector('.warning').remove();
    document.querySelector('#add-inventory').innerText = "Add Costume to Inventory";
    document.querySelector('#add-heading').innerText = "Add Costume Details";
    const inventoryBtn = document.querySelector('.inventory-container');
    inventoryBtn.classList.toggle('expand');
    if (inventoryBtn.classList.contains('expand')) {
        document.querySelector('#show-inventory').innerText = "Hide Current Inventory";
    } else {
        document.querySelector('#show-inventory').innerText = "Show Current Inventory";
    }
    document.querySelector('.add-btn').classList.toggle('hidden');
    document.querySelector('.edit-btn').classList.toggle('hidden');
    document.querySelector('.cancel-btn').classList.toggle('hidden');
    const showFormBtn = document.querySelector('.form-container');
    showFormBtn.classList.toggle('expand');
    if (showFormBtn.classList.contains('expand')) {
        document.querySelector('#add-inventory').innerText = "Hide Form";
    } else {
        document.querySelector('#add-inventory').innerText = "Add New Costume To Inventory";
    }
});

// Event: Remove a Costume
document.querySelector('#costume-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // Remove costume from UI
        e.target.parentElement.parentElement.parentElement.remove();

        // Remove costume from store
        Store.removeCostume(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

        // Show success message
        UI.showAlert('Costume Removed', 'success', 'inventory');
    }
});

// Event: Show Add Costume Form
document.querySelector('#add-inventory').addEventListener('click', function () {
    const showFormBtn = document.querySelector('.form-container');
    showFormBtn.classList.toggle('expand');
    if (showFormBtn.classList.contains('expand')) {
        document.querySelector('#add-inventory').innerText = "Hide Form";
    } else {
        document.querySelector('#add-inventory').innerText = "Add New Costume To Inventory";
    }
});

// Event: Add a Costume
document.querySelector('#costume-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    // Get form values
    const character = document.querySelector('#character').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const size = document.querySelector('#size option:checked').value;
    const age = document.querySelector('input[name="age-group"]:checked').value;
    const pic = localStorage.getItem("recent-image");
    const notes = document.querySelector('#notes').value;
    // Validate
    if (character === '' | gender === '' | size === '' | age === '' | pic === '' | notes === '') {
        UI.showAlert('Please fill in all fields', 'danger', 'form');
    } else {
        // Instantiate costume
        const costume = new Costume(character, gender, size, age, pic, notes);

        // Add Costume to UI
        UI.addCostumeToList(costume);

        // Add costume to store
        Store.addCostume(costume);

        // Show success message
        UI.showAlert('Costume Added', 'success', 'form');

        // Clear fields
        UI.clearFields();

        // Refresh page
        location.reload();
    }
});

// Event: Save and load images
document.querySelector("#picture-file").addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
        const recentImageDataURL = localStorage.getItem("recent-image");
        if (recentImageDataURL) {
            document.querySelector("#imgPreview").setAttribute("src", recentImageDataURL);
        } else {
            document.querySelector("#imgPreview").setAttribute("src", "./images/No_Image_Available.jpg")
        }
    })
    reader.readAsDataURL(this.files[0]);
});

// Event: Check File Size of Image
document.getElementById("picture-file").addEventListener("change", function showFileSize() {
    // (Can't use `typeof FileReader === "function"` because apparently it
    // comes back as "object" on some browsers. So just see if it's there
    // at all.)
    const input = document.getElementById('picture-file');
    const file = input.files[0];
    const size = file.size / 1024 / 1024
    if (!file) { // This is VERY unlikely, browser support is near-universal
        console.error("This browser doesn't seem to support the `files` property of file inputs.");
    } else if (!file) {
        UI.addPara("Please select a file.");
    } else if (size > 1.1) {
        UI.addPara(file.name + " is " + size.toFixed(2) + " Mb in size. Please choose a file smaller than 1 Mb.");
        document.querySelector('#picture-file').value = "";
    } else {
        UI.addPara("File add successful");
    }
});