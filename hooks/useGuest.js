import React, { useState, useEffect } from 'react';

function useGuest() {

    const [guestId, setGuestId] = useState(null);

    useEffect(() => {

        if (window.localStorage.getItem('guest')) {
            const id = JSON.parse(window.localStorage.getItem('guest'));
            setGuestId(id);
        } else {
            const randomNumber = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
            const timeStamp = new Date().getTime();
            const randomId = randomNumber + timeStamp;
            window.localStorage.setItem('guest', JSON.stringify(randomId));
            setGuestId(randomId);
        }

    }, [])

    return {
        guestId
    }
}

export default useGuest