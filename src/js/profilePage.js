import {checkAuth, getProfile, putProfile} from "./api/index.js";
import {navigateToLogin} from "./router.js";
import {validate} from "./validator.js";

const editBtn = document.getElementById('edit-button');
const submitBtn = document.getElementById("submit-button");
const nameInput = document.getElementById('name-input');
const genderInput = document.getElementById('gender-input');
const birthdayInput = document.getElementById('date-input');
const numberInput = document.getElementById('number-input');
const emailInput = document.getElementById('email-input');

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) {
        navigateToLogin();
    }
    await setProfileData()
});

editBtn.addEventListener('click', () => switchEditing());
submitBtn.addEventListener('click', () => onSubmitClick());

let editing = false;
let profile = null;

function switchEditing() {
    editing = !editing;
    if (editing){
        nameInput.disabled = false;
        genderInput.disabled = false;
        birthdayInput.disabled = false;
        numberInput.disabled = false;
        emailInput.disabled = false;
        submitBtn.classList.remove('hidden');
        editBtn.classList.remove('edit');
        editBtn.textContent="Отмена";
    } else {
        nameInput.disabled = true;
        genderInput.disabled = true;
        birthdayInput.disabled = true;
        numberInput.disabled = true;
        emailInput.disabled = true;
        submitBtn.classList.add('hidden');
        editBtn.classList.add('edit');
        editBtn.textContent="Редактировать";
        setProfileData(false);
    }
}

function formatDate(date) {
    const parts = date.split('T');
    const datePart = parts[0];

    return datePart;
}


async function setProfileData(request = true) {
    if (request) {
        profile = await getProfile();
    }

    if (!profile) {
        // бб пока
        console.log('Данных нет');
        return;
    }

    nameInput.value = profile.name;
    genderInput.value = profile.gender;
    birthdayInput.value = formatDate(profile.birthday);
    numberInput.value = profile.phone;
    emailInput.value = profile.email;
}

function getDataFromInputs() {
    const name = nameInput.value;
    const gender = genderInput.value;
    const birthday = birthdayInput.value;
    const phone = numberInput.value;
    const email = emailInput.value;

    return { name, email, birthday, gender, phone };
}

async function onSubmitClick() {
    const { name, email, birthday, gender, phone } = getDataFromInputs();

    if (!validate(phone, 'phone')) {
        return;
    }

    await putProfile(name, email, birthday, gender, phone);
    profile = await getProfile();
    switchEditing();
}