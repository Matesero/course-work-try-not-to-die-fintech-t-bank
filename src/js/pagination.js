export class Pagination {
    name = null;
    conclusions = null;
    sorting = null;
    scheduledVisits = null;
    onlyMine = null;
    page = 1;
    size = 5;

    constructor({ name = null, conclusions = null, sorting = null, scheduledVisits = null, onlyMine = null, page = null, size = null } = {}) {
        this.name = name;
        this.conclusions = conclusions;
        this.sorting = sorting;
        this.scheduledVisits = scheduledVisits;
        this.onlyMine = onlyMine;
        if (page) this.page = page;
        if (size) this.size = size;
    }

    createPagination(pageCount){
        const paginationContainer = document.getElementById("pagination-container");
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement("a");
            const params = new URLSearchParams('');
            pageLink.textContent = i;

            if (this.name) params.append("name", this.name);
            if (this.conclusions) params.append("conclusions", this.conclusions);
            if (this.sorting) params.append("sorting", this.sorting);
            if (this.scheduledVisits) params.append("scheduledVisits", this.scheduledVisits);
            if (this.onlyMine) params.append("onlyMine", this.onlyMine);
            params.append("page", i);
            params.append("size", this.size);
            pageLink.href = `?${params.toString()}`;

            if (i === this.page) {
                pageLink.classList.add("active");
            }

            paginationContainer.appendChild(pageLink);
        }
    }
}

export function getParams(){
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || '';
    const conclusions = urlParams.get('conclusions') || '';
    const sorting = urlParams.get('sorting') || '';
    const scheduledVisits = urlParams.get('scheduledVisits') || '';
    const onlyMine = urlParams.get('onlyMine') || '';
    const page = urlParams.get('page') || '';
    const size = urlParams.get('size') || '';

    console.log(name, conclusions, sorting, scheduledVisits, onlyMine, page, size);

    return {name, conclusions, sorting, scheduledVisits, onlyMine, page, size};
}