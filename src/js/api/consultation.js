import {getCookie, path} from "./index.js";

export async function getConsultations({grouped, icdRoots, page, size} = {}){
    const token = getCookie('jwt');

    if (!token){
        return false;
    }

    let url = new URL(`${path}/consultation`);

    const params = {
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

        console.log(data)

        return data;
    } catch (error) {
        console.log(error)
    }
}