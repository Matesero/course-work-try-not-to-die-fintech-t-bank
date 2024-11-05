import {getCookie, handleResponseStatus, path} from "./index.js";
import {navigateToLogin} from "../router.js";

export async function postLogin(email, password) {
    const url = new URL(`${path}/doctor/login`);

    try {
        const response = await fetch(url,
          {
              method: 'POST',
              headers: {
                  'Accept': 'text/plain',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email,
                  password
              })
          })

        const data = await response.json();
        const token = data.token;

        if (token) {
            document.cookie = `jwt=${token}; path=/;`;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function postRegister(
  name,
  password,
  email,
  birthday,
  gender,
  phone,
  speciality
) {
    const url = new URL(`${path}/doctor/register`);

    try {
        const response = await fetch(url,
          {
              method: 'POST',
              headers: {
                  'Accept': 'text/plain',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name,
                  password,
                  email,
                  birthday,
                  gender,
                  phone,
                  speciality
              })
          })

        const data = await response.json();
        const token = data.token;

        console.log(token)

        if (token) {
            document.cookie = `jwt=${token}; path=/;`;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    const token = getCookie('jwt');

    let url =  `${path}/doctor/logout`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        document.cookie = "jwt=; expires=Thu, 07 Apr 2005 00:00:00 UTC; path=/;";
        navigateToLogin();
    } catch (error) {
        handleResponseStatus(error);
    }
}

export async function getProfile(){
    const token = getCookie('jwt');

    let url =  `${path}/doctor/profile`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        handleResponseStatus(error);
    }
}

export async function putProfile(
  name,
  email,
  birthday,
  gender,
  phone,
) {
    const token = getCookie('jwt');

    if (!token){
        return false;
    }

    const url = `${path}/doctor/profile`;

    try {
        await fetch(url,
          {
              method: 'PUT',
              headers: {
                  'Accept': 'text/plain',
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email,
                  name,
                  birthday,
                  gender,
                  phone,
              })
          })
    } catch (error) {
        console.log(error);
    }
}