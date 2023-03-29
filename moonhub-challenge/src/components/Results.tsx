import { Button, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

type ResultProps = {
    breeds: string[]
}

const AKC_SEARCH_QUERY_URL = 'https://www.akc.org/?s=';
export const Results: React.FC<ResultProps> = ({ breeds }: ResultProps) => {
    const searchOnAkc = (breed: string) => {
        window.open(`${AKC_SEARCH_QUERY_URL}${breed}`, '_blank')?.focus();
    }
    return (
        <>
            {
                breeds.length > 0 && (
                    <Card sx={{ marginTop: '2em', marginBottom: '2em' }}>
                        <Typography variant={'h5'} sx={{ padding: '10px' }}>Search Results</Typography>
                        {
                            breeds.map((breed: string) => {
                                return (
                                    <Stack sx={{ paddingLeft: '2em' }}>
                                        <Stack direction={'row'} spacing={3}>
                                            <Typography variant={'h6'}>{breed}</Typography>
                                            <Button onClick={() => searchOnAkc(breed)} endIcon={<SearchIcon />}>Search on AKC</Button>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        }
                    </Card>
                )
            }
        </>
    );
}