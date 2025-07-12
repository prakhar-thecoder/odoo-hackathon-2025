const get = async (url) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`);
    const data = await response.json();
    return data;
}

const post = async (url, body) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
}

export { get, post };
