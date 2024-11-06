import {getCookie, handleResponseStatus, path} from "./index.js";

export async function getPatients({
    name = null,
    conclusions = null,
    sorting = null,
    scheduledVisits = null,
    onlyMine = null,
    page = null,
    size = null
} = {}
){
    const token = getCookie('jwt');

    let url = new URL(`${path}/patient`);

    const params = {
        name,
        conclusions,
        sorting,
        scheduledVisits,
        onlyMine,
        page,
        size
    };

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            if (Array.isArray(value)) {
                value.forEach((param) => {
                    url.searchParams.append(key, param);
                })
            } else {
                url.searchParams.append(key, value);
            }
        }
    });

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        handleResponseStatus(error)
    }
}

export async function postPatient(name, birthday, gender){
    const token = getCookie('jwt');

    if (!token){
        return false;
    }

    let url = new URL(`${path}/patient`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                birthday,
                gender,
            })
        })

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function getInspections({id, grouped, icdRoots, page, size} = {}){
    const token = getCookie('jwt');

    console.log(icdRoots)

    if (!token){
        return false;
    }

    let url = new URL(`${path}/patient/${id}/inspections`);

    const params = {
        name,
        grouped,
        icdRoots,
        page,
        size
    };

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            if (Array.isArray(value)) {
                value.forEach((param) => {
                    url.searchParams.append(key, param);
                })
            } else {
                url.searchParams.append(key, value);
            }
        }
    });

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`,
            }
        })

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function getPatient(id){
    const token = getCookie('jwt');

    if (!token){
        return false;
    }

    let url = new URL(`${path}/patient/${id}`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`,
            },
        })

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}