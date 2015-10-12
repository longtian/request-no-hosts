/**
 * Created by wyvernnot on 15-10-12.
 */
describe('request no hosts', function () {

  "use strict";

  it('should work with https', function (done) {
    require('../')('https://static.oneapm.com/assets/version.txt', function (err, result) {
      if (!err && result) {
        done();
      }
    });
  });

  it('should work with http', function (done) {
    require('../')('http://www.youku.com/robots.txt', function (err, result) {
      if (!err && result) {
        done();
      }
    });
  });
});