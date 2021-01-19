import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

export const searchSpa = (filter) => {
  return fetch(`spa/search?name=${filter.name}&price=${filter.price}`).then(checkStatus);
}

export const getAllSpa = () => {
  return fetch('spa').then(checkStatus);
}

export const addNewSpa = spa =>
    fetch('spa', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(spa)
    })
    .then(checkStatus);

export const updateSpa = (id, spa) =>
    fetch(`spa/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(spa)
    })
    .then(checkStatus);

export const deleteSpa = id =>
    fetch(`spa/${id}`, {
        method: 'DELETE'
    })
    .then(checkStatus);

