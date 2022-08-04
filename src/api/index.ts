interface CustomError extends Error {
    response?: unknown;
}

export function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const headers = new Headers(options?.headers || {});
    const apiUrl = 'https://api.spacexdata.com/v4';
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    delete options?.headers;
    const API_URL = new URL(`${apiUrl}${url}`);
    return fetch(API_URL.href, {
        headers,
        ...options,
    })
        .then(checkStatus)
        .then(decode);
}

async function checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error: CustomError = new Error(response.statusText);
    error.response = await decode(response);

    throw error.response;
}

const decode = (data: Response) => {
    return data?.text()?.then((text) => (text ? JSON.parse(text) : ''));
};
