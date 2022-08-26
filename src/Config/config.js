function getApi(latitude, longitude) {

    const API_KEY = '7efa332cf48aeb9d2d391a51027f1a71';

    return `
        https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}&units=metric
    `
}

export default getApi;
