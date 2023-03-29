import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { AND_OP, AND, OR_OP, OR } from '../constants';

type AndOrToggleProps = {
    selectedValue?: string;
}

export const AndOrToggle: React.FC<AndOrToggleProps> = ({ selectedValue }: AndOrToggleProps) => {
    const [value, setValue] = useState(selectedValue ? selectedValue : AND_OP);

    return (
        <ToggleButtonGroup
            sx={{ paddingLeft: '20px' }}
            color={'primary'}
            exclusive
            onChange={(e, newValue) => setValue(newValue)}
            value={value}
        >
            <ToggleButton value={AND_OP}>{AND}</ToggleButton>
            <ToggleButton value={OR_OP}>{OR}</ToggleButton>
        </ToggleButtonGroup>
    )
}