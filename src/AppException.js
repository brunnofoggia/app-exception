import http from 'http';
import HttpException from 'http-exception';
import statusList from 'http-exception/src/status.js';
import kebabCase from 'http-exception/src/utils/kebabCase.js';
import camelCase from 'http-exception/src/utils/camelCase.js';
import _ from 'underscore';

class AppException extends HttpException {
    constructor(message = undefined, code = undefined, status = undefined) {
        super(message);
        this.message = message || statusList.defaults.message;
        this.code = code || statusList.defaults.code;
        this.status = status || statusList.defaults.status;
    }

    static createError(o={}) {
        o = _.defaults(o, statusList.defaults);
        const error = new this(o.message, o.code, o.status);
        Error.captureStackTrace(error, this.createError);
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
    AppException[method] = function(
        message = undefined,
        code = undefined
    ) {
        const error = this.createError(_.defaults({message, code}, defaults));
        Error.captureStackTrace(error, this[method]);
        return error;
    };
});

export default AppException;
