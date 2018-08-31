exports.v1 = LariClient;

const LariClientImpl = require(__dirname + '/impl/lariclientimpl.js').LariClientImpl;

function LariClient() {
  let that = this;
  let impl = new LariClientImpl();

  this.setLariHubUrl = function(url) {
    impl.setLariHubUrl(url);
  };
  this.runProcess = function(node_id, processor_name, inputs, outputs, parameters, opts) {
    outputs = outputs || {};
    parameters = parameters || {};
    opts = opts || {};
    return new Promise(function(resolve, reject) {
      impl.runProcess(node_id, processor_name, inputs, outputs, parameters, opts, function(err, resp) {
        if (err) return reject(err);
        resolve(resp);
      });
    });
  };
  this.probeProcess = function(node_id, job_id, opts) {
    opts = opts || {};
    return new Promise(function(resolve, reject) {
      impl.probeProcess(node_id, job_id, opts, function(err, resp) {
        if (err) return reject(err);
        resolve(resp);
      });
    });
  };
  this.cancelProcess = function(node_id, job_id, opts) {
    opts = opts || {};
    return new Promise(function(resolve, reject) {
      impl.cancelProcess(node_id, job_id, opts, function(err, resp) {
        if (err) return reject(err);
        resolve(resp);
      });
    });
  };
  this.getProcessorSpec = function(node_id, processor_name, opts) {
    opts = opts || {};
    return new Promise(function(resolve, reject) {
      impl.getProcessorSpec(node_id, processor_name, opts, function(err, resp) {
        if (err) return reject(err);
        resolve(resp);
      });
    });
  };
  this.getNodeInfo = function(node_id) {
    return new Promise(function(resolve, reject) {
      impl.getNodeInfo(node_id, function(err, resp) {
        if (err) return reject(err);
        resolve(resp);
      });
    });
  };
}

/*
LariClient.test = function() {
  const kbucket = require('@magland/kbucket'); // only for test
  kbucket.start_test_nodes(function() {
    let LC = new LariClient();
    let lari_id = '178f0bd07ae4';
    let lari_passcode = 'passcode_test_larinode1';
    let processor_name = 'hello.world';
    LC.setLariHubUrl('http://localhost:64240');
    let job_id = '';
    LC.getProcessorSpec(lari_id, processor_name, {
        lari_passcode: lari_passcode
      })
      .then(function(spec) {
        console.info(spec);
        return LC.runProcess(lari_id, processor_name, {}, {}, {}, {
          lari_passcode: lari_passcode,
          force_run: true
        });
      })
      .then(function(resp) {
        job_id = resp.job_id;
        console.info('job_id: ' + job_id);
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve();
          }, 5000);
        });
      })
      .then(function() {
        return LC.probeProcess(lari_id, job_id, {
          lari_passcode: lari_passcode
        });
      })
      .then(function(resp) {
        console.info(resp);
        if (!resp.is_complete) {
          console.error('Processor job did not complete.');
          process.exit(-1);
        }
        if (!resp.result.success) {
          console.error('Error in processor job: '+resp.result.error);
          process.exit(-1);  
        }
        console.info(`Job ${processor_name} completed successfully.`);
        kbucket.stop_test_nodes();
      })
      .catch(function(err) {
        console.error(err);
        process.exit(-1);
      });
  });

};
*/