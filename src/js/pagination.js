export class Pagination {
    name = null;
    conclusions = null;
    sorting = null;
    scheduledVisits = null;
    onlyMine = null;
    grouped = null;
    icdRoots = null;
    page = 1;
    size = 5;

    constructor({ name = null, conclusions = null, sorting = null, scheduledVisits = null, onlyMine = null, grouped = null, icdRoots = null, page = null, size = null } = {}) {
        this.name = name;
        this.conclusions = conclusions;
        this.sorting = sorting;
        this.scheduledVisits = scheduledVisits;
        this.onlyMine = onlyMine;
        this.grouped = grouped;
        this.icdRoots = icdRoots;
        if (page) this.page = page;
        if (size) this.size = size;
    }

    createPagination(pageCount){
        const paginationContainer = document.getElementById("pagination-container");
        paginationContainer.innerHTML = '';

        let start = Math.max(1, this.page - 2);
        const end = Math.min(start + 4, pageCount)

        if (end - start < 4 && start !== 1) {
            start = end - 4;
        }

        const params = new URLSearchParams('');
        if (this.name) params.append("name", this.name);
        if (this.conclusions) params.append("conclusions", this.conclusions);
        if (this.sorting) params.append("sorting", this.sorting);
        if (this.scheduledVisits) params.append("scheduledVisits", this.scheduledVisits);
        if (this.onlyMine) params.append("onlyMine", this.onlyMine);
        const numberedPage = Number(this.page);

        for (let i = start - 1; i <= end + 1; i++) {
            const copyParams = new URLSearchParams(params.toString());
            const pageBtn = renderPaginationButton(copyParams, i, numberedPage, this.size, pageCount, start, end);

            if (i === numberedPage) pageBtn.classList.add("active");
            if (i === pageCount + 1 && numberedPage === pageCount) pageBtn.classList.add('disabled')
            if (i === 0 && numberedPage === 1) pageBtn.classList.add('disabled')

            paginationContainer.appendChild(pageBtn);
        }
    }
}

function renderPaginationButton(params, page, currentPage, size, pageCount, start, end) {
    const pageBtn = document.createElement("a");
    pageBtn.classList.add("pagination__button");

    switch (page) {
        case start - 1:
            pageBtn.textContent = "<";
            params.append("page", currentPage - 1);
            break
        case end + 1:
            pageBtn.textContent = ">";
            params.append("page", currentPage + 1);
            break
        default :
            pageBtn.textContent = page;
            params.append("page", page);
    }

    params.append("size", size);
    pageBtn.href = `?${params.toString()}`;

    return pageBtn
}

export function getParams(){
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || '';
    const conclusions = urlParams.get('conclusions') || '';
    const sorting = urlParams.get('sorting') || '';
    const scheduledVisits = urlParams.get('scheduledVisits') || '';
    const onlyMine = urlParams.get('onlyMine') || '';
    const grouped = urlParams.get('grouped') || '';
    const icdRoots = urlParams.get('icdRoots') || '';
    const page = urlParams.get('page') || '';
    const size = urlParams.get('size') || '';

    console.log(name, conclusions, sorting, scheduledVisits, onlyMine, grouped, page, size);

    return {name, conclusions, sorting, scheduledVisits, onlyMine, grouped, icdRoots, page, size};
}