import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardHeader, Container, Stack, Typography } from '@mui/material';
import { FilterGroup } from './FilterGroup';
import { usePapaParse } from 'react-papaparse';
import { DOG_BREEDS_CSV } from '../data/dogBreedsData';
import { FilterGroupContainer } from './FilterGroupContainer';
import { FilterExpressionChildrenType, FilterExpressionType } from '../types';
import { Results } from './Results';

export const FilterContainer: React.FC = () => {
    const [filterGroups, setFilterGroups] = useState<any[]>([]);
    const [subFilterGroups, setSubFilterGroups] = useState<any[]>([]);
    const [attributes, setAttributes] = useState<string[]>([]);
    const [attributeOptions, setAttributeOptions] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);

    const [filterExpression, setFilterExpression] = useState<FilterExpressionType>();
    const [breeds, setBreeds] = useState([]);

    const { readString } = usePapaParse();

    useEffect(() => {
        // Read the static csv file to get the raw data
        readString(DOG_BREEDS_CSV, {
            worker: true,
            header: true,
            complete: (results) => {
                console.log('---------------------------');
                console.log(results);
                console.log('---------------------------');
                const dogBreedsData = results.data;
                setData(dogBreedsData);
                setAttributes(results.meta.fields!.slice(1));
                setAttributeOptions([]);
            }
        })
    }, []);

    /*

    // Find breed with traits using AND 
    const getBreedsWithAllTraits = (attribute: string, traits: string[]) => {
        let breeds: string[] = [];
        data.forEach((row) => {
            const dataValues = row[attribute].split(', ');
            const matchingValues = dataValues.filter((value: string) => traits.includes(value));
            if (matchingValues.length > 0) {
                breeds.push(row['Breed']);
            }
        });
        return breeds;
    }

    // Find breed with traits using OR
    const getBreedsWithAnyTraits = (attribute: string, traits: string[]) => {
        let breeds: string[] = [];
        data.forEach((row) => {
            const dataValues = row[attribute].split(', ');
            const overlap = dataValues.some((value: string) => traits.includes(value));
            if (overlap) {
                breeds.push(row['Breed']);
            }
        });
        return breeds;
    }

    // Recursively evaluate the selected filters to find the breeds that match the search filters
    const evaluateExpression = (expression: FilterExpressionType, breeds: string[]) => {
        if (expression.type === 'attribute') {
            // Get all breeds that have the given attribute and value
          return getBreedsWithAllTraits(expression.name, expression.values)
        } else if (expression.type === '&&') {
          // If the expression is an "and" operator, evaluate each child expression
          // and return all breeds that contain all the options
          expression.children.forEach((childExpression) => {
            return breeds.concat(evaluateExpression(childExpression.name, childExpression.values, breeds))
          })
          return breeds;
        } else if (expression.type === '||') {
          // If the expression is an "or" operator, evaluate each child expression
          // and return all breeds that contain any of the options
          expression.children.forEach((childExpression) => {
                return breeds.concat(evaluateExpression(childExpression.name, childExpression.values, breeds));
          })
          return breeds;
        }
      }
      */

    const handleAddSubFilterGroup = (index: number) => {
        console.log('adding sub filter group');
        setSubFilterGroups((prevState) => {
            return [
                ...prevState,
                <FilterGroup
                    data={data}
                    attributes={attributes}
                    deleteFilterGroup={() => { }}
                    addSubFilterGroup={handleAddSubFilterGroup}
                    index={index}
                />
            ]
        })
    }

    const handleAddFilterGroup = (index: number) => {
        console.log('adding filter group: ', index);
        setFilterGroups((prevState) => {
            return [
                ...filterGroups,
                <FilterGroup
                    data={data}
                    attributes={attributes}
                    deleteFilterGroup={deleteFilterGroup}
                    addSubFilterGroup={handleAddSubFilterGroup}
                    index={index} />]
        })
    }

    const deleteFilterGroup = (filterGroupIndex: number) => {
        console.log('deleting filter group number: ', filterGroupIndex);
        console.log(filterGroups);
        const newFilterGroups = [...filterGroups].splice(filterGroupIndex);
        console.log(newFilterGroups);

        // Since our data is from a static csv file,
        // we know the first column is the breed,
        // which we don't want to show as a filterable option
        setFilterGroups(newFilterGroups);
    }

    const deleteSubFilterGroup = (index: number) => {
        console.log('deleting sub filter group number: ', index);
        const newSubFilterGroups = [...subFilterGroups];

        setSubFilterGroups(newSubFilterGroups.splice(index, 1));
    }

    const handleClearFilters = () => {
        setFilterGroups([]);
        setSubFilterGroups([]);
    }

    const onClickApplyFilters = () => {
        console.log('applying filters');
    }

    return (
        <>
            <Container
                sx={{
                    width: '1000px',
                    top: '50%',
                    position: 'absolute',
                    left: '50%',
                    margin: '0 auto',
                    marginLeft: '-500px',
                    marginTop: '-250px',
                }}>
                <Card>
                    <CardHeader title={'Dog Breed Search'} />
                    {
                        filterGroups.length === 0 && <Typography sx={{ padding: '1em' }} variant={'subtitle1'}>Click "Add Filter Group" to get started!</Typography>
                    }
                    <Stack spacing={2} sx={{ margin: '2em' }}>
                        <FilterGroupContainer
                            filterGroups={filterGroups}
                            handleAddFilterGroup={handleAddFilterGroup}
                            subFilterGroups={subFilterGroups}
                        />
                    </Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <CardActions>
                            <Button size={'small'} onClick={() => handleClearFilters()}>Clear</Button>
                            <Button size={'small'} variant='contained' onClick={() => onClickApplyFilters()}>Apply Filters</Button>
                        </CardActions>
                    </Box>
                </Card>
                <Results breeds={breeds} />
            </Container>
        </>
    )
}
