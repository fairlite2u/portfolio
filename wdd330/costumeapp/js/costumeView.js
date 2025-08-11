import Store from './costumeModel.js';

// UI Class: Handle UI Tasks
export default class UI {
    static displayCostumes() {
        const costumes = Store.getCostumes();
        costumes.forEach(costume => {
            let index = Object(costumes).indexOf(costume);
            UI.addCostumeToList(costume, index)
        });

    }

    static addCostumeToList(costume, index) {
        const list = document.querySelector('#costume-list');
        const row = document.createElement('tr');
        row.classList = "costume-row";
        row.innerHTML = `
            <td>${costume.character}</td>
            <td>${costume.gender}</td>
            <td>${costume.age} ${costume.size}</td>
            <td class="hidden">${index}</td>
            <td><a href="#" id="costume-info" class="btn-info"><img id="img-info" class="btn-info" src="./images/info-circle.svg" alt="Details"></td>
            <td><a href="#" class="btn-edit"><img id="img-edit" class="btn-edit" src="./images/edit-solid.svg" alt="Edit"></td>
            <td><a href="#" class="btn-danger delete"><img id="img-delete" class="delete" src="./images/trash-alt-solid.svg" alt="Delete"></td>
        `;
        row.classList = `costume-row ${costume.gender} ${costume.age}`
        list.appendChild(row);
    }

    static showOneCostume(index) {
        const costumes = Store.getCostumes();
        const costume = costumes[index];
        this.showCostumeDetails(document.querySelector("#costume-details-div"), costume);
        window.scrollTo(0, 0);
    }

    static showCostumeDetails(parent, costume) {
        const hideButton = document.createElement('button');
        hideButton.classList = "btn btn-primary btn-hide";
        hideButton.innerHTML = 'Close Details';
        const costumeEl = document.createElement('div');
        costumeEl.classList = 'costume-details expand';
        costumeEl.innerHTML = `<h2 id="char-heading">${costume.character}</h2>
            <div class="char-details">
            <div class="char-img"><img src=${costume.pic} alt="Picture of Costume"></div>
            <div class="char-details-div">
            <ul class="char-details-list">
            <li>Gender: ${costume.gender}</li>
            <li>Size: ${costume.age} ${costume.size}</li>
            <li>Notes: ${costume.notes}</li>
            </ul>
            </div>
            </div>`;
        parent.innerHTML = '';
        costumeEl.insertBefore(hideButton, costumeEl.childNodes[0]);
        parent.appendChild(costumeEl);
    }

    static editOneCostume(index) {
        const costumes = Store.getCostumes();
        const costume = costumes[index];
        this.editCostumeDetails(costume, index);
    }

    static editCostumeDetails(costume, index) {
        document.querySelector('#character').value = costume.character;
        const radioGender = document.getElementsByName('gender');
        for (let i = 0; i < radioGender.length; i++) {
            if (radioGender[i].getAttribute('value') == costume.gender) {
                radioGender[i].checked = true;
            }
        }
        const radioAgeGroup = document.getElementsByName('age-group');
        for (let i = 0; i < radioAgeGroup.length; i++) {
            if (radioAgeGroup[i].getAttribute('value') == costume.age) {
                radioAgeGroup[i].checked = true;
            }
        }
        document.querySelector('#size').value = costume.size;
        const picMessageDiv = document.querySelector('#picMessage');
        const picMessage = document.createElement('p');
        picMessage.classList.add('warning');
        picMessage.innerText="When editing a costume, the picture must be uploaded again.";
        picMessageDiv.appendChild(picMessage);
        document.querySelector('#notes').value = costume.notes;
        document.querySelector('#index').value = index;
    }

    static filterCostumes(el) {
        const list = document.querySelector('#costume-list');
        const costumes = list.childNodes;
        costumes.forEach(function (costume) {
            switch (el.target.value) {
                case "male":
                    if (costume.classList.contains("Male")) {
                        costume.classList.remove("hidden");
                    } else {
                        costume.classList.add("hidden");
                    }
                    break;
                case "female":
                    if (costume.classList.contains("Female")) {
                        costume.classList.remove("hidden");
                    } else {
                        costume.classList.add("hidden");
                    }
                    break;
                case "unisex":
                    if (costume.classList.contains("Unisex")) {
                        costume.classList.remove("hidden");
                    } else {
                        costume.classList.add("hidden");
                    }
                    break;
                case "adult":
                    if (costume.classList.contains("Adult")) {
                        costume.classList.remove("hidden");
                    } else {
                        costume.classList.add("hidden");
                    }
                    break;
                case "child":
                    if (costume.classList.contains("Child")) {
                        costume.classList.remove("hidden");
                    } else {
                        costume.classList.add("hidden");
                    }
                    break;
                case "infant":
                    if (costume.classList.contains("Infant")) {
                        costume.classList.remove("hidden");
                    } else {
                        costume.classList.add("hidden");
                    }
                    break;
                default:
                    costume.classList.remove("hidden");

            }
        });
    }

    static showAlert(message, className, divClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(`.${divClass}-container`);
        const form = document.querySelector('#costume-form');
        const table = document.querySelector('#inventory-table');
        const button = document.querySelector('#show-inventory');
        if (divClass === 'form') {
            container.insertBefore(div, form);
        } else if (divClass === 'inventory') {
            container.insertBefore(div, table);
        } else {
            container.insertBefore(div, button);
        }
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2500);
    }

    static clearFields() {
        document.querySelector('#costume-form').reset();
        document.querySelector("#imgPreview").setAttribute("src", "./images/No_Image_Available.jpg")
    }
    static addPara(text) {
        const p = document.createElement("p");
        p.classList.add('warning');
        p.textContent = text;
        const picMessage = document.querySelector("#picMessage");
        picMessage.appendChild(p);
        // Vanish in 2.5 seconds
        setTimeout(() => document.querySelector('.warning').remove(), 2500);
    }
}