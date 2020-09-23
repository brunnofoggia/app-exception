import AppException from './AppException';

class Response extends AppException {
    constructor(message = undefined, code = undefined, status = undefined) {
        super(message, code, status);
        Response.dispatch(this);
    }

    static response(res) {
        if (res) {
            Response.res = res;
        }
    }

    static dispatch(err) {
        if (!Response.res || Response.res._headerSent) {
            return;
        }
        !Response.res._headerSent &&
            Response.res.status(err.status).send(err.message);
    }
}

export default Response;