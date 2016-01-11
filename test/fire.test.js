'use strict'

var Lab = require('lab')
var Code = require('code')
var Seneca = require('seneca')

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var expect = Code.expect

var FAF = require('..')

describe('fire-and-forget', function () {
  it('Fired a pattern which doesn\'t exist and forgot', function (done) {
    var seneca = Seneca()
    seneca.use(FAF)

    // We don't expect anything here, so timeout is the best way to handle
    // expected behaviour

    seneca.ready(function () {
      seneca.fire({ role: 'foo' }, function () {
        done(Error('unexpectedly got into .fire callback (???)'))
      })
    })

    setTimeout(function () {
      done()
    }, 3000)
  })

  it('Fired a pattern which exist and got data back', function (done) {
    var seneca = Seneca()
    seneca.use(FAF)

    // We expect data back, so no need for a timeout

    seneca.add({ role: 'foo' }, function (args, done) {
      done(null, { msg: 'success' })
    })

    seneca.ready(function () {
      seneca.fire({ role: 'foo' }, function (reply) {
        expect(reply.msg).to.equal('success')
        done()
      })
    })
  })

  it('Fired a pattern which exists and but didn\'t care about a response', function (done) {
    var seneca = Seneca()
    seneca.use(FAF)

    // We don't expect any reply, so a timeout is the best measure of success

    seneca.add({ role: 'foo' }, function (args, done) {
      done(null, { msg: 'success' })
    })

    seneca.ready(function () {
      seneca.fire({ role: 'foo' })
    })

    setTimeout(function () {
      done()
    }, 3000)
  })

  it('Fired a pattern which didn\'t exist and and didn\'t care about a response', function (done) {
    var seneca = Seneca()
    seneca.use(FAF)

    // It's completely okay to just fire a random pattern here
    // We don't expect to get a reply anyway

    seneca.ready(function () {
      seneca.fire({ role: 'foo' })
    })

    setTimeout(function () {
      // if it hasn't failed, this should run
      done()
    }, 3000)
  })
})
