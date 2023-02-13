import {
	StatusCodes
} from 'http-status-codes';

class BaseError extends Error {

    public readonly name1: string;
    public readonly httpCode!: StatusCodes;
    public readonly isOperational: boolean;
    
    constructor(name: string, httpCode: StatusCodes, isOperational: boolean, description: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
      
        this.name1 = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
      
        Error.captureStackTrace(this);
    }
}

export default BaseError;