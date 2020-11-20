export function handleError(err, req, res, next) {
    if(err instanceof GeneralError) {
        return res.status(err.code).json({
            message: err.message
        });
    }
    
    //DEBUG ONLY
    console.log(err);

    return res.status(500).json({
        message: "There was an internal server error."
    });
    
}

export class GeneralError extends Error {
    constructor(message = "An error has occurred.") {
        super();
        this.message = message;
        this.code = 400;
    }
}

export class ResourceNotFoundError extends GeneralError {
    constructor() {
        super("Requested resource does not exist.");
        this.code = 404;
    }
}

export class BadBodyError extends GeneralError {

    constructor(errors) {
        super();
        this.code = 400;
        this.message = this.parseValidatorError(errors.array());
    }

    // Return only first error from express-validator.
    parseValidatorError(errors) {
        return errors[0].msg;
    }

    
}





