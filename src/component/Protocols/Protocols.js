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