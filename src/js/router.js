const path = "http://localhost:3000";

export function navigateToRegistration() {
    window.location.href = `${path}/registration`;
}

export function navigateToLogin() {
    window.location.href = `${path}/login`;
}

export function navigateToConsultations() {
    window.location.href = `${path}/consultations`;
}

export function navigateToProfile() {
    window.location.href = `${path}/profile`;
}

export function navigateToPatientCard(id) {
    window.location.href = `${path}/patient/${id}`;
}

export function navigateToCreate() {
    window.location.href = `${path}/create`;
}

export function navigateToPatients() {
    window.location.href = `${path}/patients`;
}

export function navigateToInspection(id) {
    window.location.href = `${path}/inspection/${id}`;
}

export function navigateToReports() {
    window.location.href = `${path}/reports`;
}