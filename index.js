/**
 * Created by wyvernnot on 15-10-12.
 */

/**
 * request a url using result from DNS, thus bypassing hosts
 *
 * @param url
 * @param callback
 */
function request_without_hosts(url, callback) {
  "use strict";

  var parseResult = require('url').parse(url);

  /**
   * use Buffer.concat to receive all contents
   * @param res http.Response
   */
  function responseHandler(res) {
    var buffer = [];
    var toltalLength = 0;
    res.on('data', function (d) {
      buffer.push(d);
      toltalLength += d.length;
    });

    res.on('end', function () {
      // no error
      callback(null, Buffer.concat(buffer, toltalLength).toString());
    });
  }

  // DNS resolve request
  require('dns').resolve4(parseResult.host, function (err, result) {
    if (err) {
      return callback(err);
    }

    var options = {
      host: result[0],
      path: parseResult.path,
      headers: {
        // since host is IP, host in headers is very import to distinguish if the server is behind load balancer like nginx
        host: parseResult.host
      }
    };

    if (parseResult.protocol === 'https:') {
      require('https').request(options, responseHandler).end();
    } else {
      require('http').request(options, responseHandler).end();
    }

  });
}

module.exports = request_without_hosts;

