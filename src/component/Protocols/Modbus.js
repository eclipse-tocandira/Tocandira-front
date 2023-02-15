/** This module contains the functions to
 * return the components used for MODBUS
 * protocol
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import { TextField, Stack } from "@mui/material";

// #######################################


class Modbus {

    /** Description.
    * @param ``: 
    * @returns */
    static dataSourceFields=(events,values,defaults) => {
        const comp_list = 
        <Stack direction="column" spacing='1rem'>
            <TextField variant="outlined" label="Name" type='text' required
                fullWidth
                value={values.name}
                onChange={events.onNameChange}
                sx={{marginBottom:'1rem'}}>
            </TextField>
            <Stack direction="row" spacing="1rem">
                <TextField variant="outlined" label="IP Address" type='text' required
                    fullWidth
                    value={values.ip}
                    onChange={events.onIpChange}>
                </TextField>
                <TextField variant="outlined" label="Port" type='tel' required
                    fullWidth
                    value={values.port}
                    onChange={events.onPortChange}>
                </TextField>
                <TextField variant="outlined" label="Slave ID" type='number' required
                    value={values.slave_id}
                    onChange={events.onSlaveIdChange}>
                </TextField>
            </Stack>
        </Stack>
        return(comp_list);
    }
}

export default Modbus;