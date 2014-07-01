
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	hStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'histc', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( hStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to get the edges', function test() {
		var rStream = hStream();

		expect( rStream.edges() ).to.be.an( 'array' );
	});

	it( 'should provide a method to set the edges', function test() {
		var rStream = hStream(),
			expected = [ 0, 1, 2, 3, 4, 5 ];
		rStream.edges( expected );
		assert.deepEqual( rStream.edges(), expected );
	});

	it( 'should not allow edges to be set as a non-array', function test() {
		var rStream = hStream();
		
		expect( badValue( '5' ) ).to.throw( Error );
		expect( badValue( 99 ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );
		expect( badValue( function(){} ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				rStream.value( value );
			};
		}
	});

	it( 'should compute the histogram counts of piped data', function test( done ) {
		var data, expected, rStream,
			edges = [ -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5 ];

		// Simulate some data...
		data = [ 1, 1, 1, 2, 3, 3, 3, 3, 4 ];

		// Expected counts (histc also returns negative and positive infinity bins which include data which does not fall into any bin defined by the edge vector):
		expected = [
			[ Number.NEGATIVE_INFINITY, 0, -0.5 ], // -infinity
			[ -0.5, 0, 0.5 ],
			[ 0.5, 3, 1.5 ],
			[ 1.5, 1, 2.5 ],
			[ 2.5, 4, 3.5 ],
			[ 3.5, 1, 4.5 ],
			[ 4.5, 0, 5.5 ],
			[ 5.5, 0, Number.POSITIVE_INFINITY ] // +infinity
		];

		// Create a new histc stream:
		rStream = hStream()
			.edges( edges )
			.stream();

		// Mock reading from the stream:
		utils.readStream( rStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, rStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;
			assert.deepEqual( actual[ 0 ], expected );
			done();
		} // end FUNCTION onRead()
	});

	it( 'should, when computing the histogram counts of piped data, assign out-of-bounds data to appropriate bins', function test( done ) {
		var data, expected, rStream,
			edges = [ -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5 ];

		// Simulate some data...
		data = [ -1, -100, Number.NEGATIVE_INFINITY, 6, 100, Number.POSITIVE_INFINITY ];

		// Expected counts (histc also returns negative and positive infinity bins which include data which does not fall into any bin defined by the edge vector):
		expected = [
			[ Number.NEGATIVE_INFINITY, 3, -0.5 ], // -infinity
			[ -0.5, 0, 0.5 ],
			[ 0.5, 0, 1.5 ],
			[ 1.5, 0, 2.5 ],
			[ 2.5, 0, 3.5 ],
			[ 3.5, 0, 4.5 ],
			[ 4.5, 0, 5.5 ],
			[ 5.5, 3, Number.POSITIVE_INFINITY ] // +infinity
		];

		// Create a new histc stream:
		rStream = hStream()
			.edges( edges )
			.stream();

		// Mock reading from the stream:
		utils.readStream( rStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, rStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;
			assert.deepEqual( actual[ 0 ], expected );
			done();
		} // end FUNCTION onRead()
	});

});