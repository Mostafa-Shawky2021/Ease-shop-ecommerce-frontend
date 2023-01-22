import { v4 as uuidv4 } from 'uuid'
function randomId() {

    if (window.localStorage.getItem('guest')) {
        return JSON.parse(window.localStorage.getItem('guest'));
    }
    const randomId = uuidv4().toString()
    window.localStorage.setItem('guest', JSON.stringify(randomId));
    return randomId;
}

export default randomId