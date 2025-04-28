class AppError extends Error {
    constructor(statusCode, statusMessage) {
        super();
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}

module.exports = AppError;