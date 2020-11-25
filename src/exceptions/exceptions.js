export function handleError(err, req, res, next) {
    if(err instanceof GeneralError) {
        return errorBody(res, err.code, err.message);
    }

    if(err.name && err.name === 'EntityNotFound') {
        return errorBody(res, 404, "Requested resource does not exist.");
    }

    //Firebase auth errors
    if(err.code && err.code === 'auth/user-not-found') {
        return errorBody(res, 404, "Requested resource does not exist.");
    }

    if(err.code && err.code === 'auth/email-already-exists') {
        return errorBody(res, 400, "El email ingresado ya está en uso.");
    }

    //DB unique constraint violated.
    if(err.errorNum && err.errorNum === 1) {
        return errorBody(res, 400, "Value already exists.");
    }

    //DEBUG ONLY
    console.log("too bad!", err);

    return errorBody(res, 500, "There was an internal server error.");
    
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

// For use with express-validator generated errors.
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

// Utility
// Error body
function errorBody(res, code, message) {
    return res.status(code).json({
        message: message
    })
}



