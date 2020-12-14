// success: true => message, data
// success: false => errorMessage, None
export interface IResponse {

    success: boolean;
    message: string;
    data: any[];

}
