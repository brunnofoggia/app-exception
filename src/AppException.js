import http from 'http';
import HttpException from 'http-exception';
import statusList from 'http-exception/src/status';
import kebabCase from 'http-exception/src/utils/kebabCase';
import camelCase from 'http-exception/src/utils/camelCase';
import _ from 'underscore';

class AppException extends HttpException {
    constructor(message = 'Internal Server Error', code = 0, status = 500) {
        super(message);
        this.message = message;
        this.code = code;
        this.status = status;
    }

    static createError(o={}) {
        o = _.defaults(o, {message: 'Internal Server Error', code: 0, status: 500});
        const error = new AppException(o.message, o.code, o.status);
        Error.captureStackTrace(error, AppException.createError);
        return error;
    }

    toJSON() {
        return {
            message: this.message,
            code: this.code,
            status: this.status,
        }
    }
}

statusList.errorStatusCodes.forEach(function(o) {
    const status = o.status;
    const message = http.STATUS_CODES[status];
    const code = kebabCase(message);

    const method = camelCase(message);

    const defaults = {message, code, status};
    AppException[method] = (
        message = undefined,
        code = undefined
    ) => {
        const error = AppException.createError(_.defaults({message, code}, defaults));
        Error.captureStackTrace(error, AppException[method]);
        return error;
    };
});

export default AppException;
