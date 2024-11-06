import {getCookie, path} from "./index.js";

export async function getReports({start, end, icdRoots} = {}) {
    const url = new URL(`${path}/report/icdrootsreport`);

    const token = getCookie('jwt');

    const params = {
        start,
        end,
        icdRoots,
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
        const response = await fetch(url,
          {
              method: 'GET',
              headers: {
                  'Accept': 'text/plain',
                  'Authorization': `Bearer ${token}`
              }
          })

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}