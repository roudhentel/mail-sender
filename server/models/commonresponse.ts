export class CommonResponse {
    success: boolean = false;
    statusCode: number = 400;
    details?: string;
    errMsg?: any;
}