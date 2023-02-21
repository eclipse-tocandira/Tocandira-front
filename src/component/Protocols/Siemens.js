/** This module contains the functions to
 * return the components used for SIEMENS
 * S7 Communication protocol
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


class Siemens extends BaseProtocol {

    
    /** Description.
    * @param ``: 
    * @returns */
    static getDataSourceEvents=(context,p_name) => ({
        onNameChange: this.setDSBaseProp.bind(context,context,p_name,'name',false),
        onIpChange: this.setDSBaseProp.bind(context,context,p_name,'plc_ip',false),
        onPortChange: this.setDSBaseProp.bind(context,context,p_name,'plc_port',true),
        onRackChange: this.setDSProtocolProp.bind(context,context,p_name,'rack',true),
        onSlotChange: this.setDSProtocolProp.bind(context,context,p_name,'slot',true),
        onPlcChange: this.setDSProtocolProp.bind(context,context,p_name,'plc',false),
    })

    /** Description.
    * @param ``: 
    * @returns */
    static getDataPointEvents=(context,p_name) => ({
        onNameChange: this.setDPBaseProp.bind(context,context,p_name,'name',false),
        onDescriptionChange: this.setDPBaseProp.bind(context,context,p_name,'description',false),
        onNumTypeChange: this.setDPBaseProp.bind(context,context,p_name,'num_type',false),
        onAddressChange: this.setDPProtocolProp.bind(context,context,p_name,'address',false),
    })

    static parseDataSourceDefault2Values=(defaults) => ({
        name: "",plc_ip: "",plc_port: defaults.plc_port, protocol: {
            name: defaults.protocol.name, data: {
                rack: defaults.protocol.data.rack,
                slot: defaults.protocol.data.slot,
                plc: defaults.protocol.data.plc.defaultValue
            }
        }
    })

    static parseDataPointDefault2Values=(defaults) => ({
        name: "", description: "", num_type: defaults.num_type.defaultValue, datasource_name: "", access: {
            name: defaults.access.name, data: {
              address: ""}}
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
            </Stack>
            <Stack direction="row" spacing="1rem">
                <TextField variant="outlined" label="Rack" type='number' required
                    InputLabelProps={{ shrink: true }}
                    value={values.protocol.data.rack}
                    placeholder={defaults.protocol.data.rack}
                    onChange={events.onRackChange}>
                </TextField>
                <TextField variant="outlined" label="Slot" type='number' required
                    InputLabelProps={{ shrink: true }}
                    value={values.protocol.data.slot}
                    placeholder={defaults.protocol.data.slot}
                    onChange={events.onSlotChange}>
                </TextField>
                <SimpleSelect
                    fullWidth
                    label={"PLC Model"}
                    list={defaults.protocol.data.plc.menuItems}
                    value={values.protocol.data.plc}
                    defaultValue={defaults.protocol.data.plc.defaultValue}
                    onChange={events.onPlcChange}/>
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
            <TextField variant="outlined" label="Protocol" type='text' disabled
                size="small" fullWidth value={values.access.name}
                sx={{marginBottom:'1rem'}}>
            </TextField>
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

export default Siemens;