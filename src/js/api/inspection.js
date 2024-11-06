import {getCookie, path} from "./index.js";

export async function getInspection(id){
    const token = getCookie('jwt');

    let url = new URL(`${path}/inspection/${id}`);

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

export async function getInspectionChain(id){
    const token = getCookie('jwt');

    let url = new URL(`${path}/inspection/${id}/chain`);

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