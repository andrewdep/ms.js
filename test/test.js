


/**
 * Dependencies.
 */

if ('undefined' != typeof require) {
  expect = require('expect.js');
  ms = require('../');
}

// strings

describe('ms(string)', function(){
  it('should preserve ms', function () {
    expect(ms('100')).to.be(100);
  });

  it('should convert from m to ms', function () {
    expect(ms('1m')).to.be(60000);
  });

  it('should convert from h to ms', function () {
    expect(ms('1h')).to.be(3600000);
  });

  it('should convert d to ms', function () {
    expect(ms('2d')).to.be(172800000);
  });

  it('should convert s to ms', function () {
    expect(ms('1s')).to.be(1000);
  });

  it('should convert ms to ms', function () {
    expect(ms('100ms')).to.be(100);
  });

  it('should convert weeks to ms', function() {
    expect(ms('2w')).to.be(2 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert months to ms', function() {
    expect(ms('3mo')).to.be(3 * 4 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long weeks to ms', function() {
    expect(ms('2weeks')).to.be(2 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long months to ms', function() {
    expect(ms('3months')).to.be(3 * 4 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long week to ms', function() {
    expect(ms('1week')).to.be(1 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long month to ms', function() {
    expect(ms('1month')).to.be(1 * 4 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should work with decimals', function () {
    expect(ms('1.5h')).to.be(5400000);
  });

  it('should return NaN if invalid', function () {
    expect(isNaN(ms('☃'))).to.be(true);
  });

  it('should be case-insensitive', function () {
    expect(ms('1.5H')).to.be(5400000);
  });

  it('should work with numbers starting with .', function () {
    expect(ms('.5ms')).to.be(.5);
  });
})

// numbers

describe('ms(number, { long: true })', function(){
  it('should support milliseconds', function(){
    expect(ms(500, { long: true })).to.be('500 ms');
  })

  it('should support seconds', function(){
    expect(ms(1000, { long: true })).to.be('1 second');
    expect(ms(1200, { long: true })).to.be('1.2 seconds');
    expect(ms(10000, { long: true })).to.be('10 seconds');
  })

  it('should support minutes', function(){
    expect(ms(60 * 1000, { long: true })).to.be('1 minute');
    expect(ms(60 * 1200, { long: true })).to.be('1.2 minutes');
    expect(ms(60 * 10000, { long: true })).to.be('10 minutes');
  })

  it('should support hours', function(){
    expect(ms(60 * 60 * 1000, { long: true })).to.be('1 hour');
    expect(ms(60 * 60 * 1200, { long: true })).to.be('1.2 hours');
    expect(ms(60 * 60 * 10000, { long: true })).to.be('10 hours');
  })

  it('should support days', function(){
    expect(ms(24 * 60 * 60 * 1000, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).to.be('1.2 days');
    expect(ms(24 * 60 * 60 * 6000, { long: true })).to.be('6 days');
  });

  it('should support weeks', function() {
    expect(ms(7 * 24 * 60 * 60 * 1000, { long: true })).to.be('1 week');
    expect(ms(7 * 24 * 60 * 60 * 1200, { long: true })).to.be('1.2 weeks');
    expect(ms(3 * 7 * 24 * 60 * 60 * 1000, { long: true })).to.be('3 weeks');
  });

  it('should support months', function() {
    expect(ms(4 * 7 * 24 * 60 * 60 * 1000, { long: true })).to.be('1 month');
    expect(ms(4 * 7 * 24 * 60 * 60 * 1200, { long: true })).to.be('1.2 months');
    expect(ms(6 * 4 * 7 * 24 * 60 * 60 * 1000, { long: true })).to.be('6 months');
  });

  it('should support years', function() {
    expect(ms(365.25 * 24 * 60 * 60 * 1000, { long: true })).to.be('1 year');
    expect(ms(365.25 * 24 * 60 * 60 * 1200, { long: true })).to.be('1.2 years');
    expect(ms(6 * 365.25 * 24 * 60 * 60 * 1000, { long: true })).to.be('6 years');
  });

  it('should round', function(){
    expect(ms(234234234, { long: true })).to.be('2.711 days');
  })
})

// numbers

describe('ms(number)', function(){
  it('should support milliseconds', function(){
    expect(ms(500, {short:true})).to.be('500ms');
  })

  it('should support seconds', function(){
    expect(ms(1000, {short:true})).to.be('1s');
    expect(ms(1200, {short:true})).to.be('1.2s');
    expect(ms(10000, {short:true})).to.be('10s');
  })

  it('should support minutes', function(){
    expect(ms(60 * 1000, {short:true})).to.be('1m');
    expect(ms(60 * 1200, {short:true})).to.be('1.2m');
    expect(ms(60 * 10000, {short:true})).to.be('10m');
  })

  it('should support hours', function(){
    expect(ms(60 * 60 * 1000, {short:true})).to.be('1h');
    expect(ms(60 * 60 * 1200, {short:true})).to.be('1.2h');
    expect(ms(60 * 60 * 10000, {short:true})).to.be('10h');
  })

  it('should support days', function(){
    expect(ms(24 * 60 * 60 * 1000, {short:true})).to.be('1d');
    expect(ms(24 * 60 * 60 * 1200, {short:true})).to.be('1.2d');
    expect(ms(6 * 24 * 60 * 60 * 1000, {short:true})).to.be('6d');
  })

  it('should support weeks', function(){
    expect(ms(7 * 24 * 60 * 60 * 1000, {short:true})).to.be('1w');
    expect(ms(9 * 24 * 60 * 60 * 1000, {short:true})).to.be('1.2857w');
    expect(ms(3 * 7 * 24 * 60 * 60 * 1000, {short:true})).to.be('3w');
  })

  it('should support months', function(){
    expect(ms(4 * 7 * 24 * 60 * 60 * 1000, {short:true})).to.be('1m');
    expect(ms(6 * 7 * 24 * 60 * 60 * 1000, {short:true})).to.be('1.5m');
    expect(ms(6 * 4 * 7 * 24 * 60 * 60 * 1000, {short:true})).to.be('6m');
  })

  it('should support years', function(){
    expect(ms(365.25 * 24 * 60 * 60 * 1000, {short:true})).to.be('1y');
    expect(ms(500 * 24 * 60 * 60 * 1000, {short:true})).to.be('1.3689y');
    expect(ms(6 * 365.25 * 24 * 60 * 60 * 1000, {short:true})).to.be('6y');
  })

  it('should round', function(){
    expect(ms(234234234, {short:true})).to.be('2.711d');
  })
})
