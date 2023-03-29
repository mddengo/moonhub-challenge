/**
 * Example FilterExpression
 * {
 *      type: '&&',
 *      children: [
 *          {
 *              type: '||',
 *              children: [
 *                  {type: 'attribute', name: 'country', values: ['France', 'Belgium']},
 *              ]
 *           },
 *          {
 *              type: '&&',
 *              children: [
 *                 {type: 'attribute', name: 'color', value: ['brown']} 
 *              ]
 *          }     
 *      ]
 * }
 */
export type TypeOfFilterExpressionType = '&&' | '||' | 'attribute';

export type FilterExpressionType = {
    type: TypeOfFilterExpressionType,
    children: FilterExpressionChildrenType[]
}

export type FilterExpressionChildrenType = {
    type: TypeOfFilterExpressionType,
    name: string,
    values: string[]
}