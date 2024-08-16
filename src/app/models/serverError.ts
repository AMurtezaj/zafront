export interface ServerError<T=unknown> {
    errors: any;
    statusCode: number;
    message: string;
    details: string;
    data?: T;
}