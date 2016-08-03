module.exports = function() {
    'use strict';

    global.SM = global.SM || {};
    if (process.env.NODE_ENV == 'production') {
        SM.properties = require('./../../../properties').production;
    } else if (process.env.NODE_ENV == 'preprod') {
        SM.properties = require('./../../../properties').preprod;
    } else if (process.env.NODE_ENV == 'development') {
        SM.properties = require('./../../../properties').development;
    } else {
        SM.properties = require('./../../../properties').local;
    }


    // This hook will (supposedly) be executed before scenarios tagged with @foo and either @bar or @baz
    // this.Before( "@foo", "@bar,@baz", function( callback ) {
    // });

    // this.Before( function( callback ) {
    // });

    // this.After( function( callback ) {
    // });

    // this.Around( function( after_func ) {
    // });

    // this.StepResult( function( event, callback ) {
    // });

    // this.AfterFeatures( function( event, callback ) {
    // });

    // this.StepResult( function( event, callback ) {
    //     var stepResult = event.getPayloadItem('stepResult');
    //
    //     if (stepResult.isFailed()) {
    //         console.info('this step failed');
    //     }
    //     if (stepResult.isPending()) {
    //         console.info('this step is pending');
    //     }
    //     if (stepResult.isSkipped()) {
    //         console.info('this step is skipped');
    //     }
    //     if (stepResult.isSuccessful()) {
    //         console.info('this step passed');
    //     }
    //     if (stepResult.isUndefined()) {
    //         console.info('this step is undefined');
    //     }
    //     console.info('the duration of this step was: ' + stepResult.getDuration());

    //     callback();
    // });

    // this.BeforeFeature( function( event, callback ) {
    // });

    // this.BeforeFeature(function (jsEvent, callback) {
    //     // test environment setup here
    //     callback();
    // });

    this.BeforeFeatures( function ( event, callback ) {
        var EventEmitter = require('events');
        class MyEmitter extends EventEmitter {}
        SM.EMITTER = new MyEmitter();
        SM.EMITTER.on('app-started', function() {
            callback();
        });

        process.env.TEST = true;
        require('./../../../app');
    });

    // this.BeforeScenario( function ( event, callback ) {
    // });

    // this.BeforeStep( function( event, callback ) {
    // });

    // this.AfterFeature( function( event, callback ) {
    // });

    // this.AfterFeatures( function( event, callback ) {
    //     // cleanup; end of test
    // });

    // this.AfterScenario( function( event, callback ) {
    // });

    // this.AfterStep( function( event, callback ) {
    // });
};
