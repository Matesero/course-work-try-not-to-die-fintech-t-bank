import {getParams, Pagination} from "./pagination.js";
import {renderInspection} from "./components/inspection.js";
import {checkAuth} from "./api/index.js";
import {navigateToLogin} from "./router.js";
import {getConsultations} from "./api/consultation.js";

window.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) {
        navigateToLogin();
    }
    await onload();
})

const filtersForm = document.getElementById('filters');
const mkbInput = document.getElementById('mkb-select');
const groupedInput = document.getElementById('grouped');
const sizeInput = document.getElementById('size-input');
const containerList = document.querySelector('.container__list');

filtersForm.addEventListener('submit', (event) => submit(event));

async function onload() {
    const { grouped, icdRoots, page, size} = getParams();
    const paginat = new Pagination({ grouped, icdRoots, page, size });
    const { inspections, pagination } = await getConsultations({ grouped, icdRoots, page, size });

    inspections.forEach(({id, date, conclusion, diagnosis, doctor}) => {
        const inspection = renderInspection(id, date, conclusion, diagnosis, doctor);
        containerList.appendChild(inspection);
    })

    paginat.createPagination(pagination.count)
}

function submit(event){
    event.preventDefault()

    const mkb = null;
    const grouped = groupedInput.checked;
    const size = sizeInput.value;

    const params = new URLSearchParams('');

    if (mkb) mkb.forEach((mk) => params.append("icdRoots", mk));
    if (grouped) params.append("grouped", grouped);
    params.append("size", size);

    const href = `?${params.toString()}`;

    window.location.href = href;
}