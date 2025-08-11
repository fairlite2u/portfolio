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

// UI Class: Handle UI Tasks
class UI {
    static displayCostumes() {
        const costumes = Store.getCostumes();

        costumes.forEach(costume => UI.addCostumeToList(costume));
    }

    static addCostumeToList(costume) {
        const list = document.querySelector('#costume-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${costume.character}</td>
            <td>${costume.gender}</td>
            <td>${costume.age} ${costume.size}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</td>
        `;

        list.appendChild(row);
    }

    static deleteCostume(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showCostumeDetails(costume) {
        const costumeDetails = document.querySelector('#costume-details');

        const costumeEl = document.createElement('li');
        costumeEl.classList = 'costume-details';
        costumeEl.innerHTML = `<h3>${costume.character}</h3>
        <ul>
        <li>Gender: ${costume.gender}</li>
        <li>Size: ${costume.age} ${costume.size}</li>
        <li>Picture: ${costume.pic}</li>
        <li>Notes: ${costume.notes}</li>
        </ul>`;
        return costumeEl;
    }

    static showAlert(message, className, divClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(`.${divClass}-container`);
        const form = document.querySelector('#costume-form');
        const table = document.querySelector('#inventory-table');
        if (divClass === 'form') {
            container.insertBefore(div, form);
        } else {
        container.insertBefore(div, table);
        }
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#costume-form').reset();
    }
}

// Store Class: Handles Storage
class Store {
    static getCostumes() {
        let costumes;
        if(localStorage.getItem('costumes') === null) {
            costumes = [];
        } else {
            costumes = JSON.parse(localStorage.getItem('costumes'));
        }

        return costumes;
    }

    static addCostume(costume) {
        const costumes = Store.getCostumes();

        costumes.push(costume);

        localStorage.setItem('costumes', JSON.stringify(costumes));
    }

    static removeCostume(character) {
        const costumes = Store.getCostumes();

        costumes.forEach((costume, index) => {
            if(costume.character === character) {
                costumes.splice(index, 1);
            }
        });

        localStorage.setItem('costumes', JSON.stringify(costumes));
    }
}

// Event: Display Costumes
document.addEventListener('DOMContentLoaded', UI.displayCostumes);

// Event: Add a Costume
document.querySelector('#costume-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const character = document.querySelector('#character').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const size = document.querySelector('#size option:checked').value;
    const age = document.querySelector('input[name="age-group"]:checked').value;
    const pic = document.querySelector('#costume-pic').value;
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
    }
});

// Event: Remove a Costume
document.querySelector('#costume-list').addEventListener('click', (e) => {
    // Remove costume from UI
    UI.deleteCostume(e.target);
    console.log(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    // Remove costume from store
    Store.removeCostume(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Costume Removed', 'success', 'inventory');
});