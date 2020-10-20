import AppException from './AppException';

class Response extends AppException {
    constructor(message = undefined, code = undefined, status = undefined) {
        super(message, code, status);
        Response.dispatch(this);
    }

    static response(c) {
        typeof c === 'function' && (Response.callback = c);
        return (req, res, next) => {
            Response.res = res;
            next();
        };
    }

    static dispatch(err) {
        if (
            (typeof Response.callback === 'function' &&
                Response.callback(err, Response.res) === false) ||
            !Response.res
        ) {
            return;
        }
        !Response.res._headerSent && Response.res.status(err.status).send(err);
    }
}

export default Response;
