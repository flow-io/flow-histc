flow-histc
==========

Reduce transform stream which computes a histogram over a stream of numeric data.


## Installation

``` bash
$ npm install flow-histc
```


## Examples

``` javascript
var // Flow histogram stream generator:
	hStream = require( 'flow-histc' );

var data = new Array( 1000 ),
	edges = new Array( 22 ),
	stream;

// Create some data...
for ( var i = 0; i < 1000; i++ ) {
	data[ i ] = Math.random();
}

// Create the bin edges... (centering the bins)
for ( var j = 0; j < 22; j++ ) {
	edges[ j ] = -0.025 + j*0.05;
}

// Create a new stream:
stream = hStream()
	.edges( edges )
	.stream();

// Add a listener:
stream.on( 'data', function( counts ) {
	console.log( 'Counts: ' + JSON.stringify( counts ) );
});

// Write the data to the stream...
for ( var k = 0; k < data.length; k++ ) {
	stream.write( data[ k ] );
}
stream.end();
```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

