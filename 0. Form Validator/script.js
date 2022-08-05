var form = document.getElementById('form');
var username = document.getElementById("username");
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');

function showSuccess(input) {
    input.parentElement.className = 'form-control success';
}

function showError(input, message) {
    input.parentElement.className = 'form-control error';
    input.parentElement.querySelector('small').innerText = message;
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        console.log(input);
        if (input.value.trim() === '') {
            showError(input, `${getInputName(input)} is Required`);
        } else {
            showSuccess(input);
        }
    })
}

// Get field name
function getInputName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check if email is valid
function isValidEmail(email) {
    return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
}

function checkEmail(email) {
    if (isValidEmail(email.value)) {
        showSuccess(email);
    } else if (email.value.trim() != '') {
        showError(email, 'Email is not valid');
    }
}

// Check the length of fields
function checkLength(input, min, max) {
    if (input.value.length < min && input.value.trim() != '') {
        showError(input, `${getInputName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} must be less than ${max} characters`)
    } else if (input.value.trim() != '') {
        showSuccess(input);
    }
}

// Check if passwords match
function checkPasswordMatch(input1, input2) {
    if (input1.value != input2.value && input2.value.trim() != '') {
        showError(input2, 'Passwords do not match');
    }
}

// Event Listener
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);

})