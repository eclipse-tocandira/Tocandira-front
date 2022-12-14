/** This module contains...
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// #######################################

export default async function readConfig() {
    const data = await fetch(process.env.PUBLIC_URL+'/config.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res=>res.json())
    return (data);
}