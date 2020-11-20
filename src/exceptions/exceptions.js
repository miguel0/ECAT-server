export function handleError(err, req, res, next) {
    if(err instanceof GeneralError) {
        return res.status(err.code).json({
            message: err.message
        });
    }

    return res.status(500).json({
        message: "There was an internal server error."
    });
}

export class GeneralError extends Error {
    constructor(message) {
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





