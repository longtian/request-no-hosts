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

  it('should work with http', function (done) {
    require('../')('http://111.13.101.208:80/robots.txt', function (err, result) {
      if (!err && result) {
        done();
      }
    });
  });

  it('error case', function (done) {
    require('../')('http://127.0.0.1:65387', function (err, result) {
      if(err){
        done();
      }
    });
  });

});