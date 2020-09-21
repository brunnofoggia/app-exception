import assert from 'assert';
import _ from 'underscore';
import HttpException from 'http-exception';
import status from 'http-exception/src/status.js';
import camelCase from 'http-exception/src/utils/camelCase.js';
import AppException from '../src/AppException.js';

describe('HttpException', function() {
  it('matches Error constructor signature', () => {
    const message = 'message'
    const error = new HttpException(message)

    assert(error.message === message)
  })

  it('extends Error object', () => {
    const protoOne = Object.getPrototypeOf(HttpException.prototype)
    const protoTwo = Object.getPrototypeOf(protoOne)
    const protoThree = Object.getPrototypeOf(protoTwo)

    const isErrorPrototype = protoOne === Error.prototype
    const isObjectPrototype = protoTwo === Object.prototype
    const isNullPrototype = protoThree === null

    assert(isErrorPrototype && isObjectPrototype && isNullPrototype)
  })

  it('returns an instance with a stack trace', () => {
    const error = new HttpException()
    const hasStackTrace = error.stack && _.isString(error.stack)

    assert(hasStackTrace)
  })

  it('returns an instance with internal server error defaults', () => {
    const error = new AppException()

    const isInternalServerError =
      error.code === status.defaults.code &&
      error.message === status.defaults.message &&
      error.status === status.defaults.status

    assert(isInternalServerError)
  })

  it('has static exception methods for each error status code', () => {
    const hasMethods = status.errorStatusCodes.every(item => {
      const method = camelCase(item.message)

      return AppException[method]
    })

    assert(hasMethods)
  })

  describe('createError', () => {
    it('is a function', () => assert(_.isFunction(HttpException.createError)))

    it('returns an instance of HttpException', () => {
      const error = AppException.createError()
      const isInstance = error instanceof HttpException

      assert(isInstance)
    })

    it('returns an object with merged properties', () => {
      const properties = {
        code: Math.random(),
        message: Math.random().toString(),
        status: Math.random()
      }

      const error = AppException.createError(properties)

      const hasMergedProperties =
        error.code === properties.code &&
        error.message === properties.message &&
        error.status === properties.status

      assert(hasMergedProperties)
    })
  })

  describe('exception partials', () => {
    it('match Error constructor signature', () => {
      const matchErrorSignature = status.errorStatusCodes.every(item => {
        const method = camelCase(item.message)
        const message = 'message'
        const error = AppException[method](message)

        return error.message === message
      })

      assert(matchErrorSignature)
    })

    it('return an instance of HttpException', () => {
      const areInstances = status.errorStatusCodes.every(item => {
        const method = camelCase(item.message)
        const error = AppException[method]('test', 9)

        return error instanceof HttpException && error.message === 'test' && error.code === 9
      })

      assert(areInstances)
    })
  })
})
