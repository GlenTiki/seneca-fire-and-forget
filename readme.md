![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
### A Seneca.js decorator that adds a fire-and-forget method.

# Seneca-fire-and-forget
This is a plugin for Seneca that adds a simple `.fire(pattern[, cb])` method to
your Seneca instance. This acts in a fire-and-forget manner, so this will
swallow any errors from the act you called. _The callback is optional._

## Example
```javascript
var seneca = require('seneca')()

seneca.use(require('fire-and-forget'))

// A basic pattern to use
seneca.add({ role: 'foo' }, (args, done) => {
  // maybe save args.name in a database?
  done(null, { msg: `hey ${args.name}!` })
})

// Expected use!, no reply is expected, so callback can be excluded
seneca.fire({ role: 'foo', name: 'glen' })

// Don't actually need to worry about any error here...
seneca.fire({ role: 'bar', name: 'glen' })

// Firing and using the reply data
seneca.fire({ role: 'foo', name: 'glen' }, (err, reply) => {
  if (err) {
    //maybe handle an error if it happens?
  }
  console.log(reply.msg)
})

// Firing, but no reply to be expected
seneca.fire({ role: 'bar', name: 'glen' }, (err, reply) => {
  if (err) {
    //maybe handle an error if it happens?
  }
  console.log(reply.msg)
})

```

## API
```javascript
seneca.fire(args[, callback])
```

### `args`

your standard  `seneca` argument object/pattern, which you would expect to call any function with.

### `callback` **(optional)**

Function which can be called, taking two arguments:
  - **Error**: This is any error which was generated when calling the pattern (eg. act_not_found).
  - **Result**: This is the result returned by the `seneca` function for the pattern you pass in.

## Contributing

This module follows the general [Senecajs org][senecaOrg] contribution guidelines, and encourages open participation. If you feel you can help in any way, or discover any Issues, feel free to [create an issue][issue] or [create a pull request][pr]!

If you wish to read more on our guidelines, feel free to

  - Checkout the concise [contribution file][contrib]
  - Checkout our much more indepth [contributing guidelines][contribGuide]

## License
Copyright Glen Keane and other contributors 2016, Licensed under [MIT][].

[senecaOrg]: https://github.com/senecajs/
[issue]: https://github.com/senecajs/seneca-fire-and-forget/issues
[pr]:https://github.com/senecajs/seneca-fire-and-forget/pulls
[MIT]: ./LICENSE
[contrib]: ./CONTRIBUTING.md
[contribGuide]: http://senecajs.org/contribute/
