export const apiConfig = {
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:3333'
        : `http://${window.location.hostname}:3333`,
}

console.log('API URL:', apiConfig.baseURL);

