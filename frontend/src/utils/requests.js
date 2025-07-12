const get = async (url) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` || '',
        },
    });
    const data = await response.json();
    if (response.status === 422) {
        document.location.href = '/login';
    }
    return data;
}

const post = async (url, body) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 422) {
        document.location.href = '/login';
    }
    return data;
}

const put = async (url, body) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 422) {
        document.location.href = '/login';
    }
    return data;
}

export { get, post, put };
