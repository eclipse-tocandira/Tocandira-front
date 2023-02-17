/** This module contains the functions to
 * return the components used for MODBUS
 * protocol
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import { TextField, Stack } from "@mui/material";

// Local Imports
import BaseProtocol from "./BaseProtocol"
import SimpleSelect from "../SimpleSelect/SimpleSelect";
import {getDataPointAddress} from "../Protocols/Protocols";

// #######################################


class Modbus extends BaseProtocol {

    /** Description.
    * @param ``: 
    * @returns */
    static getDataSourceEvents=(context,p_name) => ({
        onNameChange: this.setDSBaseProp.bind(context,context,p_name,'name'),
        onIpChange: this.setDSBaseProp.bind(context,context,p_name,'plc_ip'),
        onPortChange: this.setDSBaseProp.bind(context,context,p_name,'plc_port'),
        onSlaveIdChange: this.setDSProtocolProp.bind(context,context,p_name,'slave_id'),
    })

    /** Description.
    * @param ``: 
    * @returns */
    static getDataPointEvents=(context,p_name) => ({
        onNameChange: this.setDPBaseProp.bind(context,context,p_name,'name'),
        onDescriptionChange: this.setDPBaseProp.bind(context,context,p_name,'description'),
        onNumTypeChange: this.setDPBaseProp.bind(context,context,p_name,'num_type'),
        onFunctionCodeChange: this.setDPProtocolProp.bind(context,context,p_name,'func_code'),
        onAddressChange: this.setDPProtocolProp.bind(context,context,p_name,'address'),
    })

    static parseDataSourceDefault2Values=(defaults) => ({
        name: "",plc_ip: "",plc_port: defaults.plc_port, protocol: {
            name: defaults.protocol.name, data: {
                slave_id: defaults.protocol.data.slave_id
            }
        }
    })

    static parseDataPointDefault2Values=(defaults) => ({
        name: "", description: "", num_type: defaults.num_type.defaultValue, datasource_name: "", access: {
            name: defaults.access.name, data: {
                address: "", func_code: defaults.access.data.func_code.defaultValue}}
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
                defaultValue={defaults.access.data.func_code.defaultValue}
                onChange={events.onFunctionCodeChange}/>
            <Stack direction="row" spacing="1rem">
                <SimpleSelect
                    fullWidth
                    label={"Type"}
                    list={defaults.num_type.menuItems}
                    value={values.num_type}
                    defaultValue={defaults.num_type.defaultValue}
                    onChange={events.onNumTypeChange}/>
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