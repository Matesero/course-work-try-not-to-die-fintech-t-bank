import {getParams, Pagination, setPaginationData} from "./classes/pagination.js";
import {renderInspection} from "./components/inspection.js";
import {checkAuth} from "./api/index.js";
import {navigateToLogin} from "./router.js";
import {getConsultations} from "./api/consultation.js";
import {Dropdown} from "./classes/dropdown.js";
import {getICDRoots} from "./api/dictionary.js";

const filtersForm = document.getElementById('filters');
const groupedInput = document.getElementById('grouped');
const sizeInput = document.getElementById('size-input');
const containerList = document.querySelector('.container__list');
const dropdown = new Dropdown([], [], [], 'icdRoots');

filtersForm.addEventListener('submit', (event) => submit(event));

window.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) {
        navigateToLogin();
    }
    await onload();
})

async function onload() {
    const params = getParams();

    setPaginationData(params)

    const paginationPage = new Pagination(params);
    const { inspections, pagination } = await getConsultations(params);
    const icdRoots = await getICDRoots();

    let options = [];
    let valueOptions = [];
    let selectedOptions = [];
    icdRoots.forEach((icd) => {
        const option = `(${icd.code}) ${icd.name}`;
        options.push(option);
        valueOptions.push(icd.id);
        selectedOptions.push(icd.code);
    })
    dropdown.addNewOptions(options, valueOptions, selectedOptions);
    dropdown.setSelected(params.icdRoots)

    for (const data of inspections) {
        const inspection = await renderInspection(data, params.grouped);
        containerList.appendChild(inspection);
    }

    paginationPage.createPagination(pagination.count)
}

function submit(event){
    event.preventDefault()

    const icdRoots = dropdown.getValueOptions();
    const grouped = groupedInput.checked;
    const size = sizeInput.value;

    const params = new URLSearchParams('');

    if (icdRoots) icdRoots.forEach((icd) => params.append("icdRoots", icd));
    if (grouped) params.append("grouped", grouped);
    params.append("size", size);

    const href = `?${params.toString()}`;

    window.location.href = href;
}