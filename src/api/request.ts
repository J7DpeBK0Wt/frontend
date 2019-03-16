import { API_BASE_URL } from 'src/config';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestQuery = {
    [key: string]: string | number | boolean,
};

type RequestBody = {
    [key: string]: string | number | boolean | RequestBody | [RequestBody],
};

const strigifyQuery = (query: RequestQuery) =>
    Object.keys(query).map(prop => `${prop}=${query[prop]}`).join('&');

type RequestOptions = {
    entrypoint: string,
    method?: RequestMethod,
    query?: RequestQuery,
    body?: RequestBody,
};

const request = async ({
    entrypoint,
    method = 'GET',
    query,
    body,
}: RequestOptions) => {
    let url = `${API_BASE_URL}${entrypoint}`;

    if (query) {
        url += `?${strigifyQuery(query)}`;
    }

    const fetchOptions: Parameters<typeof fetch>[1] = {
        method,
    };

    if (body && method !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
        fetchOptions.headers = new Headers();
        fetchOptions.headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(url, fetchOptions);

    return await response.json();
};

export default request;
