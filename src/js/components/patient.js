import {postPatient} from "../api/patient.js";
import {navigateToPatientCard} from "../router.js";

const nameInput = document.getElementById('register-name-input');
const genderInput = document.getElementById('gender-input');
const birthdayInput = document.getElementById('date-input');

export function renderPatient(id, name, gender, birthday) {
    const patientDiv = document.createElement('div');
    patientDiv.className = "patient";
    patientDiv.addEventListener('click', () => navigateToPatientCard(id));

    const nameParagraph = document.createElement('p');
    nameParagraph.className = "patient__name";
    nameParagraph.textContent = name;

    const infoDiv = document.createElement('div');
    infoDiv.className = "patient__info";

    const genderDiv = document.createElement('div');
    genderDiv.className = "info__gender";
    const genderLabel = document.createElement('p');
    genderLabel.className = "info__label";
    genderLabel.textContent = "Пол – ";
    const genderValue = document.createElement('p');
    genderValue.className = "info__value";
    genderValue.textContent = gender === "Male" ? " Мужчина" : " Женщина";
    genderDiv.appendChild(genderLabel);
    genderDiv.appendChild(genderValue);

    const birthdayDiv = document.createElement('div');
    birthdayDiv.className = "info__birthday";
    const birthdayLabel = document.createElement('p');
    birthdayLabel.className = "info__label";
    birthdayLabel.textContent = "Дата рождения – ";
    const birthdayValue = document.createElement('p');
    birthdayValue.className = "info__value";
    birthdayValue.textContent = formatDate(birthday);

    birthdayDiv.appendChild(birthdayLabel);
    birthdayDiv.appendChild(birthdayValue);

    infoDiv.appendChild(genderDiv);
    infoDiv.appendChild(birthdayDiv);

    patientDiv.appendChild(nameParagraph);
    patientDiv.appendChild(infoDiv);

    const containerList = document.querySelector('.container__list');
    containerList.appendChild(patientDiv);
}

export async function reg(event) {
    event.preventDefault();

    const name = nameInput.value;
    const gender = genderInput.value;
    const birthday = birthdayInput.value;

    resetFields();

    await postPatient(name, birthday, gender);
}


export function resetFields() {
    nameInput.value = '';
    genderInput.value = "Male";
    birthdayInput.value = '';
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('registration-background').classList.add('hidden');
}

export function formatDate(date) {
    if (!date) {
        return 'without birthday';
    }

    const parts = date.split('T');
    const datePart = parts[0];

    const [year, month, day] = datePart.split('-');

    return `${day}.${month}.${year}`;
}