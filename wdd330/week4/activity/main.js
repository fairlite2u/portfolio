const name = document.querySelector('.name');
const password1 = document.querySelector('.password1');
const password2 = document.querySelector('.password2');
const form = document.querySelector('.form');
const errorElement = document.querySelector('.error');

form.addEventListener('submit', (e) => {
    let messages = [];

    if (password1.value.length <= 6 || password1.value.length >= 20) {
        messages.push('Password must be between 6 and 20 characters');
    }

    if (password1.value == 'password') {
        messages.push('Password cannot be password');
    }

    if (password1.value != password2.value) {
        messages.push('Passwords must match');
    }

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    }
});