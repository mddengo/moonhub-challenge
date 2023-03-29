import React, { useState } from 'react';
import { Autocomplete, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import { getOptionsForAttribute } from '../utils';
import { Add, Delete } from '@mui/icons-material';

const IS = 'is';

type FilterGroupProps = {
    data: any[],
    attributes: string[],
    deleteFilterGroup: (index: number) => void,
    index: number,
    addSubFilterGroup: (index: number) => void,
    type?: 'subfilter' | 'filter'
}

export const FilterGroup: React.FC<FilterGroupProps> = ({ data, attributes, deleteFilterGroup, index, addSubFilterGroup }: FilterGroupProps) => {
    const [selectedAttribute, setSelectedAttribute] = useState<string | null>('');
    const [selectedAttributeOption, setSelectedAttributeOption] = useState<string | null>('');

    const handleOnSelectedAttributeChange = (event: any, newValue: string | null) => {
        setSelectedAttribute(newValue);
    }

    return (
        <Container>
            <Stack direction={'row'} spacing={2}>
                <Autocomplete
                    sx={{ width: '400px' }}
                    id={'AttributeFilter'}
                    color={'white'}
                    value={selectedAttribute}
                    options={attributes}
                    renderInput={(params) =>
                        <TextField {...params} label={'Choose Option'} />
                    }
                    onChange={handleOnSelectedAttributeChange}
                />
                <Typography variant={'h6'}>{IS}</Typography>
                <Autocomplete
                    sx={{ width: '400px' }}
                    value={selectedAttributeOption}
                    id={'AttributeOptionsFilter'}
                    options={getOptionsForAttribute(data, selectedAttribute)}
                    renderInput={(params) =>
                        <TextField {...params} label={'Choose Option'} />
                    }
                    onChange={(event: any, newValue: string | null) => setSelectedAttributeOption(newValue)}
                />
                <Stack direction={'column'} spacing={0}>
                    <IconButton onClick={() => addSubFilterGroup(0)}>
                        <Add fontSize={'small'} />
                    </IconButton>
                    <IconButton onClick={() => deleteFilterGroup(index)}>
                        <Delete fontSize={'small'} />
                    </IconButton>
                </Stack>
            </Stack>
        </Container>
    )
}