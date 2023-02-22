/** This module contains the
 * constans 
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules

// Local Imports
import Siemens from "./Siemens"
import Rockwell from "./Rockwell"
import Modbus from "./Modbus"

// #######################################

export const ImplementedProtocols = [
    {name:"Siemens", class:Siemens},
    {name:"Rockwell", class:Rockwell},
    {name:"Modbus", class:Modbus}
]

/** Description.
    * @param ``: 
    * @returns */
export function getDataPointAddress(row, prot_name) {
    let address;
    if (prot_name==="Rockwell"){
        address = row.access.data.tag_name;
    } else {
        address = row.access.data.address;
    }
    return(address)
}