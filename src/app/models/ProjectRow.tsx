export interface ProjectRow {
    id: string;
    title: string;
    description: string;
    Selected: boolean;
    image?: string;
    rowNumber: number;  // New attribute to specify the row number
}
