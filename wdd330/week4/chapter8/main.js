// assign form to variable
const form = document.forms['hero'];

// add event listener for when the form is submitted
form.addEventListener('submit', makeHero, false);
document.forms.hero.powers[0].checked = true;


// Function to return an object based on the information provided in the form
function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = form.heroName.value; // create a name property based on the input field's value
    hero.realName = form.realName.value; // values from a password input field are accessed in the the same way as text input fields
    // hero.powers = []; // create a powers property for the hero object that starts as an empty array
    // // iterate over each checkbox to see if it was checked in the form, use push method to add to array if checked
    // for (let i = 0; i < form.powers.length; i++) {
    //     if (form.powers[i].checked) {
    //         hero.powers.push(form.powers[i].value);
    //     }
    // }

    // Refactored to be more succint using array iterators
    hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);

    hero.category = form.category.value; // Access all the radio buttons in the group that has the same name and get value
    hero.age = form.age.value; // Get age
    hero.city = form.city.value; // Get city
    hero.origin = form.origin.value; // Get text from text area
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}

// // Example function to exclude any superhero names that begin with "X"
// form.addEventListener('submit',validate,false);
// function validate(event) {
//     const firstLetter = form.heroName.value[0];
//     if (firstLetter.toUpperCase() === 'X') {
//         event.preventDefault();
//         alert('Your name is not allowed to start with X!');
//     }
// }

// Improved usability by giving instant feedback
form.heroName.addEventListener('keyup',validateInline,false);
const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}

// Function to disable the submit button is an input field is empty
form.heroName.addEventListener('keyup',disableSubmit,false);
function disableSubmit(event) {
    if(event.target.value === ''){
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
}




// // JavaScript for search.html:
// const form = document.forms['search'];
// const input = form.elements.searchInput;
// form.addEventListener ('submit', search, false);
// function search() {
//     alert(`You Searched for: ${input.value}`);
//     event.preventDefault();
// }
// input.value = 'Search Here';
// input.addEventListener('focus', function() {
//     if (input.value==='Search Here') {
//         input.value = ''
//     }
// }, false);

// input.addEventListener('blur', function() {
//     if (input.value==='') {
//         input.value = 'Search Here';
//     }
// }, false);