/** This module contains the function to 
 * read the config.json file that contains
 * informations about routing and the
 * connectivity to the backend api.
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