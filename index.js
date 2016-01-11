/* Copyright (c) 2016 Glen Keane, MIT License */
'use strict'

function noop () {}

module.exports = function () {
  var seneca = this

  seneca.decorate('fire', (args, done) => {
    args.fatal$ = false

    done = done || noop

    return seneca.act(args, (err, result) => {
      if (err) {
        return seneca.log.info('Seneca-fire-and-forget got an error firing:',
                                  args, '\n\n', err)
      }
      else {
        return done(result)
      }
    })
  })

  return {
    name: 'fireAndForget'
  }
}
