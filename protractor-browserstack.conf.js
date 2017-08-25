var browserstack = require('browserstack-local');

exports.config = {
  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  'capabilities': {
    'browserstack.user': 'srinivaskotta1',
    'browserstack.key': 'gRqwGqaJ1uSTTGeYp3oB',
    'browserstack.debug': true,
    'browserName': 'chrome',
   'browserstack.local': true,
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  // Code to start browserstack local before start of test
  beforeLaunch: function(){
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.capabilities['browserstack.key'] }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function(){
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }
};
