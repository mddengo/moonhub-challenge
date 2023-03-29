/**
 * Get all the unique options for a given attribute from our data
 * 
 * @param data 
 * @param attribute 
 */
export const getOptionsForAttribute = (data: any[], attribute: string | null): string[] => {
    let options: Set<string> = new Set();
    if (!attribute || attribute.length === 0) {
        return [];
    }
    
    data.map((row) => {
        const rowOptions = row[attribute].split(', ');
        rowOptions.forEach((option: string) => {
            options.add(option);
        })
    });
    return Array.from(options).sort();
}

