import axios from "axios";

export class ResponseError extends Error {
    response

    constructor(response) {
        super(response.statusText);
        this.response = response;
    }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
// eslint-disable-next-line no-unused-vars
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        //WTF is this???
        //Maybe we should have a unique kind of response from server?
        if (response.status?.toString()?.startsWith("2")) {
            return response.data
        }
        return response;
    }
    const error = new ResponseError(response);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(method, url, options) {

    if (!HTTP_METHOD[method]) {
        throw new Error("Not a valid HTTP method.")
    }
    //This method will refresh automatically the token if exprired
    // const accessJwtToken = await getAccessJwtToken();
    //
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        "Content-Type":"application/json"
        //"X-Identity-Token": accessJwtToken
    }

    let fetchResponse = {};
    if (method === "post" || method === "put" || method === "patch") {
        fetchResponse = await axios[method](url, options.data, getAxiosOptionsWithoutData(options, headers));
    } else {
        fetchResponse = await axios[method](url, getAxiosOptions(options, headers, options));
    }
    const response = checkStatus(fetchResponse);
    return response;
}

const getAxiosOptionsWithoutData = (options, headers) => {
    const newOptions = { ...options, data: undefined, mode: 'no-cors'}
    getAxiosOptions(newOptions, headers)

}
const getAxiosOptions = (options, headers) => {
    const optionsAxios = options ? {
        ...options,
        headers,
        mode: 'no-cors'
    } : {
        headers
    }
    if (options && options.headers) {
        optionsAxios.headers = {
            ...options.headers,
            ...headers
        }
    }
    return optionsAxios;
}

// const getAccessJwtToken = async () => {
//     // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
//     const session = await Auth.currentSession();
//     return session.getAccessToken().getJwtToken();
// };

export const HTTP_METHOD = {
    get: 'get',
    post: 'post',
    put: 'put',
    patch: 'patch',
    delete: 'delete'
}

export async function noOptRequest(method, url){
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        "Content-Type":"application/json"
    }
    let fetchResponse = await axios[method](url);
    const response = checkStatus(fetchResponse);
    return response;
}

