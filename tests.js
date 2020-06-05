/* eslint-disable no-undef */
/**
 * Dependencies.
 */

if (typeof require !== 'undefined') {
  expect = require('expect.js');
  ms = require('./');
}

// strings

describe('ms(string)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms('1m');
    }).to.not.throwError();
  });

  it('should preserve ms', function () {
    expect(ms('100')).to.be(100);
  });

  it('should preserve number ms', function () {
    expect(ms(100)).to.be(100);
    expect(ms(-1234567)).to.be(-1234567);
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

  it('should convert w to ms', function () {
    expect(ms('3w')).to.be(1814400000);
  });

  it('should convert s to ms', function () {
    expect(ms('1s')).to.be(1000);
  });

  it('should convert ms to ms', function () {
    expect(ms('100ms')).to.be(100);
  });

  it('should convert weeks to ms', function () {
    expect(ms('2w')).to.be(2 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert months to ms', function () {
    expect(ms('3mo')).to.be(3 * 4 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long weeks to ms', function () {
    expect(ms('2weeks')).to.be(2 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long months to ms', function () {
    expect(ms('3months')).to.be(3 * 4 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long week to ms', function () {
    expect(ms('1week')).to.be(1 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should convert long month to ms', function () {
    expect(ms('1month')).to.be(1 * 4 * 7 * 24 * 60 * 60 * 1000);
  });
  it('should work with decimals', function () {
    expect(ms('1.5h')).to.be(5400000);
  });

  it('should work with multiple spaces', function () {
    expect(ms('1   s')).to.be(1000);
  });

  it('should return NaN if invalid', function () {
    expect(isNaN(ms('☃'))).to.be(true);
    expect(isNaN(ms('10-.5'))).to.be(true);
  });

  it('should be case-insensitive', function () {
    expect(ms('1.5H')).to.be(5400000);
  });

  it('should work with numbers starting with .', function () {
    expect(ms('.5ms')).to.be(0.5);
  });

  it('should work with negative integers', function () {
    expect(ms('-100ms')).to.be(-100);
  });

  it('should work with negative decimals', function () {
    expect(ms('-1.5h')).to.be(-5400000);
    expect(ms('-10.5h')).to.be(-37800000);
  });

  it('should work with negative decimals starting with "."', function () {
    expect(ms('-.5h')).to.be(-1800000);
  });
});

// long strings

describe('ms(long string)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms('53 milliseconds');
    }).to.not.throwError();
  });

  it('should convert milliseconds to ms', function () {
    expect(ms('53 milliseconds')).to.be(53);
  });

  it('should convert msecs to ms', function () {
    expect(ms('17 msecs')).to.be(17);
  });

  it('should convert sec to ms', function () {
    expect(ms('1 sec')).to.be(1000);
  });

  it('should convert from min to ms', function () {
    expect(ms('1 min')).to.be(60000);
  });

  it('should convert from hr to ms', function () {
    expect(ms('1 hr')).to.be(3600000);
  });

  it('should convert days to ms', function () {
    expect(ms('2 days')).to.be(172800000);
  });

  it('should work with decimals', function () {
    expect(ms('1.5 hours')).to.be(5400000);
  });

  it('should work with negative integers', function () {
    expect(ms('-100 milliseconds')).to.be(-100);
  });

  it('should work with negative decimals', function () {
    expect(ms('-1.5 hours')).to.be(-5400000);
  });

  it('should work with negative decimals starting with "."', function () {
    expect(ms('-.5 hr')).to.be(-1800000);
  });
});

// numbers

describe('ms(number, { long: true })', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms(500, { long: true });
    }).to.not.throwError();
  });

  it('should support milliseconds', function () {
    expect(ms(500, { long: true })).to.be('500 ms');

    expect(ms(-500, { long: true })).to.be('-500 ms');
  });

  it('should support seconds', function () {
    expect(ms(1000, { long: true })).to.be('1 second');
    expect(ms(1200, { long: true })).to.be('1.2 seconds');
    expect(ms(10000, { long: true })).to.be('10 seconds');

    expect(ms(-1000, { long: true })).to.be('-1 second');
    expect(ms(-1200, { long: true })).to.be('-1.2 seconds');
    expect(ms(-10000, { long: true })).to.be('-10 seconds');
  });

  it('should support minutes', function () {
    expect(ms(60 * 1000, { long: true })).to.be('1 minute');
    expect(ms(60 * 1200, { long: true })).to.be('1.2 minutes');
    expect(ms(60 * 10000, { long: true })).to.be('10 minutes');

    expect(ms(-1 * 60 * 1000, { long: true })).to.be('-1 minute');
    expect(ms(-1 * 60 * 1200, { long: true })).to.be('-1.2 minutes');
    expect(ms(-1 * 60 * 10000, { long: true })).to.be('-10 minutes');
  });

  it('should support hours', function () {
    expect(ms(60 * 60 * 1000, { long: true })).to.be('1 hour');
    expect(ms(60 * 60 * 1200, { long: true })).to.be('1.2 hours');
    expect(ms(60 * 60 * 10000, { long: true })).to.be('10 hours');

    expect(ms(-1 * 60 * 60 * 1000, { long: true })).to.be('-1 hour');
    expect(ms(-1 * 60 * 60 * 1200, { long: true })).to.be('-1.2 hours');
    expect(ms(-1 * 60 * 60 * 10000, { long: true })).to.be('-10 hours');
  });

  it('should support days', function () {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).to.be('1.2 days');
    expect(ms(24 * 60 * 60 * 6000, { long: true })).to.be('6 days');

    expect(ms(-1 * 24 * 60 * 60 * 1000, { long: true })).to.be('-1 day');
    expect(ms(-1 * 24 * 60 * 60 * 1200, { long: true })).to.be('-1.2 days');
    expect(ms(-1 * 24 * 60 * 60 * 6000, { long: true })).to.be('-6 days');
  });

  it('should support weeks', function () {
    expect(ms(7 * 24 * 60 * 60 * 1000, { long: true })).to.be('1 week');
    expect(ms(7 * 24 * 60 * 60 * 1200, { long: true })).to.be('1.2 weeks');
    expect(ms(3 * 7 * 24 * 60 * 60 * 1000, { long: true })).to.be('3 weeks');
  });

  it('should support months', function () {
    expect(ms(4 * 7 * 24 * 60 * 60 * 1000, { long: true })).to.be('1 month');
    expect(ms(4 * 7 * 24 * 60 * 60 * 1200, { long: true })).to.be('1.2 months');
    expect(ms(6 * 4 * 7 * 24 * 60 * 60 * 1000, { long: true })).to.be(
      '6 months'
    );
  });

  it('should support years', function () {
    expect(ms(365.25 * 24 * 60 * 60 * 1000, { long: true })).to.be('1 year');
    expect(ms(365.25 * 24 * 60 * 60 * 1200, { long: true })).to.be('1.2 years');
    expect(ms(6 * 365.25 * 24 * 60 * 60 * 1000, { long: true })).to.be(
      '6 years'
    );
  });

  it('should round', function () {
    expect(ms(234234234, { long: true })).to.be('2.711 days');

    expect(ms(-234234234, { long: true })).to.be('-2.711 days');
  });
});

// numbers

describe('ms(number, {short: true})', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms(500, { short: true });
    }).to.not.throwError();
  });

  it('should support milliseconds', function () {
    expect(ms(500, { short: true })).to.be('500ms');

    expect(ms(-500, { short: true })).to.be('-500ms');
  });

  it('should support seconds', function () {
    expect(ms(1000, { short: true })).to.be('1s');
    expect(ms(10000, { short: true })).to.be('10s');

    expect(ms(-1000, { short: true })).to.be('-1s');
    expect(ms(-10000, { short: true })).to.be('-10s');
  });

  it('should support minutes', function () {
    expect(ms(60 * 1000, { short: true })).to.be('1m');
    expect(ms(60 * 10000, { short: true })).to.be('10m');

    expect(ms(-1 * 60 * 1000, { short: true })).to.be('-1m');
    expect(ms(-1 * 60 * 10000, { short: true })).to.be('-10m');
  });

  it('should support hours', function () {
    expect(ms(60 * 60 * 1000, { short: true })).to.be('1h');
    expect(ms(60 * 60 * 10000, { short: true })).to.be('10h');

    expect(ms(-1 * 60 * 60 * 1000, { short: true })).to.be('-1h');
    expect(ms(-1 * 60 * 60 * 10000, { short: true })).to.be('-10h');
  });

  it('should support days', function () {
    expect(ms(24 * 60 * 60 * 1000, { short: true })).to.be('1d');
    expect(ms(24 * 60 * 60 * 6500, { short: true })).to.be('6.5d');

    expect(ms(-1 * 24 * 60 * 60 * 1000, { short: true })).to.be('-1d');
    expect(ms(-1 * 24 * 60 * 60 * 6500, { short: true })).to.be('-6.5d');
  });

  it('should support weeks', function () {
    expect(ms(7 * 24 * 60 * 60 * 1000, { short: true })).to.be('1w');
    expect(ms(9 * 24 * 60 * 60 * 1000, { short: true })).to.be('1.2857w');
    expect(ms(3 * 7 * 24 * 60 * 60 * 1000, { short: true })).to.be('3w');
  });

  it('should support months', function () {
    expect(ms(4 * 7 * 24 * 60 * 60 * 1000, { short: true })).to.be('1mo');
    expect(ms(6 * 7 * 24 * 60 * 60 * 1000, { short: true })).to.be('1.5mo');
    expect(ms(6 * 4 * 7 * 24 * 60 * 60 * 1000, { short: true })).to.be('6mo');
  });

  it('should support years', function () {
    expect(ms(365.25 * 24 * 60 * 60 * 1000, { short: true })).to.be('1y');
    expect(ms(500 * 24 * 60 * 60 * 1000, { short: true })).to.be('1.3689y');
    expect(ms(6 * 365.25 * 24 * 60 * 60 * 1000, { short: true })).to.be('6y');
  });

  it('should round', function () {
    expect(ms(234234234, { short: true })).to.be('2.711d');

    expect(ms(-234234234, { short: true })).to.be('-2.711d');
  });
});

// invalid inputs

describe('ms(invalid inputs)', function () {
  it('should throw an error, when ms("")', function () {
    expect(function () {
      ms('');
    }).to.throwError();
  });

  it('should throw an error, when ms(undefined)', function () {
    expect(function () {
      ms(undefined);
    }).to.throwError();
  });

  it('should throw an error, when ms(null)', function () {
    expect(function () {
      ms(null);
    }).to.throwError();
  });

  it('should throw an error, when ms([])', function () {
    expect(function () {
      ms([]);
    }).to.throwError();
  });

  it('should throw an error, when ms({})', function () {
    expect(function () {
      ms({});
    }).to.throwError();
  });

  it('should throw an error, when ms(NaN)', function () {
    expect(function () {
      ms(NaN);
    }).to.throwError();
  });

  it('should throw an error, when ms(Infinity)', function () {
    expect(function () {
      ms(Infinity);
    }).to.throwError();
  });

  it('should throw an error, when ms(-Infinity)', function () {
    expect(function () {
      ms(-Infinity);
    }).to.throwError();
  });
});
