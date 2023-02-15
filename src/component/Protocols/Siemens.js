/** This module contains the functions to
 * return the components used for SIEMENS
 * S7 Communication protocol
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import { TextField, Stack } from "@mui/material";

// Local Imports
import SimpleSelect from "../SimpleSelect/SimpleSelect";

// #######################################


class Siemens {

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
            </Stack>
            <Stack direction="row" spacing="1rem">
                <TextField variant="outlined" label="Rack" type='number' required
                    value={values.rack}
                    onChange={events.onRackChange}>
                </TextField>
                <TextField variant="outlined" label="Slot" type='number' required
                    value={values.slot}
                    onChange={events.onSlotChange}>
                </TextField>
                <SimpleSelect
                    fullWidth
                    label={"PLC Model"}
                    list={defaults.plc.menuItems}
                    value={values.plc}
                    defaultValue={defaults.plc.defaultValue}/>
            </Stack>
        </Stack>
        return(comp_list);
    }
}

export default Siemens;