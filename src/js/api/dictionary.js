import { path } from "./index.js";

export async function getSpecialities({
      name = null,
      page = null,
      size = null
  } = {}
) {
    let url =  new URL(`${path}/dictionary/speciality`);

    const params = {
        name,
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
            },
        });

        const data = await response.json();

        console.log(data)

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getICD({ request = null, page, size } = {}) {
    let url =  new URL(`${path}/dictionary/icd10`);

    const params = {
        request,
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
            }
        });

        const data = await response.json();

        console.log(data)

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getICDRoots() {
    let url =  new URL(`${path}/dictionary/icd10/roots`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
            },
        });

        const data = await response.json();

        console.log(data)

        return data;
    } catch (error) {
        console.log(error);
    }
}