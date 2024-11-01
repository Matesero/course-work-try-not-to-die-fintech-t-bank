import {getSpecialities, postRegister} from "./api/index.js";

const nameInput = document.getElementById('name-input');
const genderInput = document.getElementById('gender-input');
const birthdayInput = document.getElementById('date-input');
const numberInput = document.getElementById('number-input');
const specInput = document.getElementById('spec-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById("submit-button");

document.addEventListener('DOMContentLoaded', () => setSpecialities());
submitBtn.addEventListener('click', () => onSubmit());

function getDataFromInputs() {
    const name = nameInput.value;
    const gender = genderInput.value;
    const birthday = birthdayInput.value;
    const phone = numberInput.value;
    const speciality = specInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    return { name, password, email, birthday, gender, phone, speciality };
}

async function setSpecialities() {
    const data = await getSpecialities({ page: 1, size: 18 });

    for (const speciality of data.specialties) {
        const item = document.createElement('option');
        item.setAttribute('value', speciality.id);
        item.textContent = speciality.name;
        specInput.appendChild(item);
    }
}

async function onSubmit() {
    const {
        name,
        password,
        email,
        birthday,
        gender,
        phone,
        speciality
    } = getDataFromInputs();
    await postRegister(name, password, email, birthday, gender, phone, speciality);
}