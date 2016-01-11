/* Copyright (c) 2016 Glen Keane, MIT License */
'use strict'

function noop () {}

module.exports = function () {
  var seneca = this

  delete seneca.fixedargs.fatal$

  seneca.decorate('fire', (args, callback) => {
    args.fatal$ = false

    callback = callback || noop

    seneca.act(args, (err, result) => {
      if (err) {
        seneca.log.info('Seneca-fire-and-forget error firing:', args, '\n\n', err)
        return callback(err)
      }

      return callback(null, result)
    })
  })

  return {
    name: 'fireAndForget'
  }
}
