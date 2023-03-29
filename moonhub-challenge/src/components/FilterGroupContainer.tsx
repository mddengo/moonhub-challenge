import React, { useState } from 'react';
import { Stack, Card, ToggleButtonGroup, ToggleButton, Button, Box } from '@mui/material';
import { AndOrToggle } from './AndOrToggle';
import { OR_OP } from '../constants';

type FilterContainerProps = {
    filterGroups: any[];
    handleAddFilterGroup: (index: number) => void;
    subFilterGroups: any[];
}

export const FilterGroupContainer: React.FC<FilterContainerProps> = ({ filterGroups, handleAddFilterGroup, subFilterGroups }: FilterContainerProps) => {
    return (
        <>
            {
                filterGroups.length > 0 && filterGroups.map((filterGroup, i) => {
                    return (
                        <Card key={i} sx={{ backgroundColor: '#f7f7f7' }}>
                            <Stack sx={{ padding: '1em' }} spacing={1}>
                                {filterGroup}
                                {
                                    subFilterGroups && subFilterGroups.length > 0 && subFilterGroups.map((subFilterGroup, j) => {
                                        return (
                                            <Stack key={j} sx={{ paddingLeft: '50px' }} spacing={1}>
                                                <AndOrToggle selectedValue={OR_OP} />
                                                {subFilterGroup}
                                            </Stack>
                                        )
                                    })
                                }
                                {i !== filterGroups.length - 1 &&
                                    <AndOrToggle />
                                }
                            </Stack>
                        </Card>
                    );
                })
            }
            <Button sx={{ width: '200px' }} size={'small'} onClick={() => handleAddFilterGroup(filterGroups.length)}>+ Add Filter Group</Button>
        </>
    );
}