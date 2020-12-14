// success: true => message, data
// success: false => errorMessage, None
import { IResponse } from '../interfaces/response.interface';

export class ResponseError implements IResponse {

    success: boolean;
    message: string;
    data: any[];

    constructor(infoMessage: string, data?: any) {
        this.success = false;
        this.message = infoMessage;
        this.data = data;
    }

}

export class ResponseSuccess implements IResponse {

    message: string;
    data: any[];
    success: boolean;

    constructor(infoMessage: string, data?: any) {
        this.success = true;
        this.message = infoMessage;
        this.data = data;
    }

}
