const { OK_STATUS_CODE, UNAUTHORIZED_STATUS_CODE, PAGE_NOT_FOUND_STATUS_CODE, SERVER_ERROR_STATUS_CODE } = require('../helpers/globals');

module.exports = {
    /**
     * Plain json response on landing page `/api` route
     * 
     * @param {*} request 
     * @param {*} response
     * 
     * @returns JSON
     */ 

    index(request, response) {
        const env = process.env.APP_ENVIRONMENT;
        const data = {
            application: "Simple Food API",
            environment: env.trim()
        }; 

        response.status(OK_STATUS_CODE).json({
            data: data,
            message: "Serving base Page"
        })
    }

}