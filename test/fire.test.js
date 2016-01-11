'use strict'

var Lab = require('lab')
var Code = require('code')
var Seneca = require('seneca')

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var expect = Code.expect

var FAF = require('..')

// "remembered" means that there was a callback for the fire statement
// "forgot" means that there was no callback for the fire statement

describe('fire-and-forget', function () {
  it('Fired a pattern which doesn\'t exist and remembered', function (done) {
    var seneca = Seneca({ log: 'silent' })
    seneca.use(FAF)

    seneca.ready(function () {
      seneca.fire({ role: 'foo' }, function (err) {
        expect(err).to.exist()
        done()
      })
    })
  })

  it('Fired a pattern which doesn\'t exist and forgot', function (done) {
    var seneca = Seneca({ log: 'silent' })
    seneca.use(FAF)

    seneca.ready(function () {
      seneca.fire({ role: 'foo' })
      setTimeout(done, 100)
    })
  })

  it('Fired a pattern which existed and remembered', function (done) {
    var seneca = Seneca({ log: 'silent' })
    seneca.use(FAF)

    seneca.add({ role: 'foo' }, function (args, done) {
      done(null, { msg: 'success' })
    })

    seneca.ready(function () {
      seneca.fire({ role: 'foo' }, function (err, reply) {
        expect(err).to.not.exist()
        expect(reply.msg).to.equal('success')
        done()
      })
    })
  })

  it('Fired a pattern which existed and forgot', function (done) {
    var seneca = Seneca({ log: 'silent' })
    seneca.use(FAF)

    seneca.add({ role: 'foo' }, function (args, done) {
      done(null, { msg: 'success' })
    })

    seneca.ready(function () {
      seneca.fire({ role: 'foo' })
      setTimeout(done, 100)
    })
  })
})
