function randomId() {

    if (window.localStorage.getItem('guest')) {
        return JSON.parse(window.localStorage.getItem('guest'));
    }
    const randomNumber = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    const timeStamp = new Date().getTime();
    const randomId = randomNumber + timeStamp;
    window.localStorage.setItem('guest', JSON.stringify(randomId));
    return randomId;
}

export default randomId