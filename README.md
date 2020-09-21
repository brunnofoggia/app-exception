# AppException

> AppException is a small and easy-to-use HTTP error library for Node. It's an addition to [HttpException](https://github.com/vedrxn/http-exception)

[Exceptions vs Errors](https://nodejs.org/api/errors.html#errors_exceptions_vs_errors)

## Features

AppException improves HttpException work making easier to create errors with custom application codes.

[Node's http module](https://nodejs.org/api/http.html)

## How to Use

```javascript
import AppException from 'app-exception-99xp';

// via the AppException class. Parameters: message, application error code, http error code
const errorOne = new AppException('error message', 9, 500);

// via the createError factory
const errorTwo = AppException.createError();

// via AppException's static HTTP status-specific methods
throw AppException.internalServerError('test', 9);
throw AppException.badRequest('test', 9);

```

## Syntax

### new AppException([message], [code], [status])
### HttpException\[httpStatusType\]([message], [code])
### HttpException.internalServerError([message], [code])
### HttpException.badRequest([message], [code])

* `message` { String } error message
* `code` { String / Integer } application error code
* `status` { Integer } http error code

Returns a new AppException object.

```javascript
throw new HttpException()
```

### HttpException\[httpStatusType\]([message], [code])
### HttpException.internalServerError([message], [code])
### HttpException.badRequest([message], [code])

* `message` { String } error message
* `code` { String / Integer } application error code

Returns a new AppException object.

### HttpException.createError([options])

* `options` { Object }

Return a new HttpException object.

```javascript
const error = HttpException.createError({
  message: 'No user found'
})

throw error
```

## Contact

For support and questions contact mail me at team@99xp.org

## Licence

[MIT](https://github.com/vedb/http-exception/blob/master/LICENSE)

