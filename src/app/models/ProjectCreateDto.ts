export interface ProjectCreateDto {
    title: string;
    description: string;
    image?: File | null;
}