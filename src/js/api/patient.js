import { getCookie, path } from "./index.js";

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

    if (!token){
        return false;
    }
    console.log(token);
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
            url.searchParams.append(key, value);
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

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function postPatient(name, birthday, gender){
    const token = getCookie('jwt');

    if (!token){
        return false;
    }
    console.log(token);
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