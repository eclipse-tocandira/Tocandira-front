/** This module contains the functions to
 * return the components used for MODBUS
 * protocol
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import { TextField, Stack } from "@mui/material";

// Local Imports
import SimpleSelect from "../SimpleSelect/SimpleSelect";
import {getDataPointAddress} from "../Protocols/Protocols";

// #######################################


class Modbus {

    NAME="Modbus"

    static parseDataSourceDefault2Values=(defaults) => ({
        name: "",plc_ip: "",plc_port: defaults.plc_port, protocol: {
            name: this.NAME,data: {
                slave_id: defaults.protocol.data.slave_id
            }
        }
    })

    /** Description.
    * @param ``: 
    * @returns */
    static dataSourceFields=(events,values,defaults) => {
        const comp_list = 
        <Stack direction="column" spacing='1rem'>
            <TextField variant="outlined" label="Name" type='text' required
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={values.name}
                placeholder={defaults.name}
                onChange={events.onNameChange}
                sx={{marginBottom:'1rem'}}>
            </TextField>
            <Stack direction="row" spacing="1rem">
                <TextField variant="outlined" label="IP Address" type='text' required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={values.plc_ip}
                    placeholder={defaults.plc_ip}
                    onChange={events.onIpChange}>
                </TextField>
                <TextField variant="outlined" label="Port" type='tel' required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={values.plc_port}
                    placeholder={defaults.plc_port.toString()}
                    onChange={events.onPortChange}>
                </TextField>
                <TextField variant="outlined" label="Slave ID" type='number' required
                    InputLabelProps={{ shrink: true }}
                    value={values.protocol.data.slave_id}
                    placeholder={defaults.protocol.data.slave_id}
                    onChange={events.onSlaveIdChange}>
                </TextField>
            </Stack>
        </Stack>
        return(comp_list);
    }

    /** Description.
    * @param ``: 
    * @returns */
    static dataPointFields=(events,values,defaults) => {
        const comp_list = 
        <Stack direction="column" spacing='1rem'>
            <TextField variant="outlined" label="Name" type='text' required
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={values.name}
                placeholder={defaults.name}
                onChange={events.onNameChange}>
            </TextField>
            <TextField variant="outlined" label="Description" type='text' required
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={values.description}
                placeholder={defaults.description}
                onChange={events.onDescriptionChange}>
            </TextField>
            <SimpleSelect
                fullWidth
                label={"Function Code"}
                list={defaults.access.data.func_code.menuItems}
                value={values.access.data.func_code}
                defaultValue={defaults.access.data.func_code.defaultValue}/>
            <Stack direction="row" spacing="1rem">
                <SimpleSelect
                    fullWidth
                    label={"Type"}
                    list={defaults.num_type.menuItems}
                    value={values.num_type}
                    defaultValue={defaults.num_type.defaultValue}/>
                <TextField variant="outlined" label="Address" type='text' required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={getDataPointAddress(values,values.access.name)}
                    placeholder={getDataPointAddress(defaults,defaults.access.name)}
                    onChange={events.onAddressChange}>
                </TextField>
            </Stack>
        </Stack>
        return(comp_list);
    }
}

export default Modbus;