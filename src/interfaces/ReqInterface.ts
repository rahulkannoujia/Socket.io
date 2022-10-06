import { Request, Response } from 'express';



export interface ReqInterface extends Request {
    startTime: number;
   // admin?: AdminInterface,
    user?: any;
    files?: any;
    deviceType?: string;
}


/**
 * @interface
 * 
 */
export interface ResInterface extends Response {
    /**
     * @type {(message: string) => string} translation message
     */
    __: (message: string) => string;
    logMsg: string;
    startTime: number;
    api: string;
    method: string;
}

