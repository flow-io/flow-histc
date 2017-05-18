flow-histc
==========

Reduce transform stream which computes a histogram over a stream of numeric data.


## Installation

``` bash
$ npm install flow-histc
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	hStream = require( 'flow-histc' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create the bin edges... (centering the bins)
var edges = new Array( 22 );
for ( var j = 0; j < edges.length; j++ ) {
	edges[ j ] = -0.025 + j*0.05;
}

// Create a new histogram stream:
var stream = hStream()
	.edges( edges )
	.stream();

// Create a pipeline:
readStream.pipe( stream )
	.pipe( eventStream.stringify() )
	.pipe( process.stdout );
```

## Tests

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions.

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

