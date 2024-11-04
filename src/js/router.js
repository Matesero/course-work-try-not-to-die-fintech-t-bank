const path = "http://localhost:3000";

export function navigateToRegistration() {
    window.location.href = `${path}/registration.html`;
}

export function navigateToLogin() {
    window.location.href = `${path}/login.html`;
}

export function navigateToProfile() {
    window.location.href = `${path}/profile.html`;
}

export function navigateToPatientCard(id) {
    window.location.href = `${path}/patient/${id}`;
}
export function navigateToPatients() {
    window.location.href = `${path}/patients.html`;
}