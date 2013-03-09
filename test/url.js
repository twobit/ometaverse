var should = require('should'),
    ometajs = require('ometajs'),
    url = require('url'),
    URL = require('../grammars/url.ometajs').URL,
    fixtures = {
        host: 'http://foo-bar.com',
        url: 'http://admin:user@www.foo-bar.com:4080/foo/bar/baz?z=foo#dude'
    };

describe('URL', function() {
    it('should match URLs', function() {
        function compare(u) {
            URL.matchAll(u, "root").should.eql(url.parse(u));
        }

        // compare(fixtures.host);
        compare(fixtures.url);
    });
    
    it('should be nearly as fast as native URL parsing', function() {
        var time,
            otime,
            utime,
            delta = 0.2; // .2 ms performance delta

        time = process.hrtime();
        URL.matchAll(fixtures.url, 'root');
        otime = process.hrtime(time);
        otime = otime[0] + otime[1] / 1e6;

        time = process.hrtime();
        url.parse(fixtures.url);
        utime = process.hrtime(time);
        utime = utime[0] + utime[1] / 1e6;

        Math.abs(otime - utime).should.be.below(delta);
    });
});