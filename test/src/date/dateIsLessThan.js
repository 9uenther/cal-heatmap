QUnit.module("Date computation : dateLessThan()");

const min = 60 * 1000; // one min millis
const hour = 60 * min; // one hour millis
const day = 24 * hour; // one hour millis
const month = 30 * day; // one (average month);

QUnit.test(
  "date is less than now in the domain hour, subdomain min",
  function (assert) {
    assert.expect(6);

    const cal = createCalendar({});

    const now = new Date(2013, 12, 9, 12, 30, 30, 0); // 12:30:30, 2013-12-9

    assert.ok(cal.dateIsLessThan(new Date(0), now));
    assert.ok(cal.dateIsLessThan(new Date(now.getTime() - min), now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() - 5 * 1000), now)); // still within the min
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + 5 * 1000), now)); // still within the min
    assert.ok(!cal.dateIsLessThan(now, now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + min), now));
  }
);

QUnit.test(
  "date is less than now in the domain day, subdomain hour",
  function (assert) {
    assert.expect(6);

    const cal = createCalendar({ domain: "day", subDomain: "hour" });

    const now = new Date(2013, 12, 9, 12, 30, 0, 0); // 12:30, 2013-12-9

    assert.ok(cal.dateIsLessThan(new Date(0), now));
    assert.ok(cal.dateIsLessThan(new Date(now.getTime() - hour), now));
    assert.ok(
      !cal.dateIsLessThan(new Date(now.getTime() - 5 * 60 * 1000), now)
    ); // still within the hour
    assert.ok(
      !cal.dateIsLessThan(new Date(now.getTime() + 5 * 60 * 1000), now)
    ); // still within the hour
    assert.ok(!cal.dateIsLessThan(now, now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + hour), now));
  }
);

QUnit.test(
  "date is less than now in the domain month, subdomain day",
  function (assert) {
    assert.expect(6);

    const cal = createCalendar({ domain: "month", subDomain: "day" });

    const now = new Date(2013, 12, 9, 12, 30, 0, 0); // 12:30, 2013-12-9

    assert.ok(cal.dateIsLessThan(new Date(0), now));
    assert.ok(cal.dateIsLessThan(new Date(now.getTime() - day), now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() - 5 * hour), now)); // still within the day
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + 5 * hour), now)); // still within the day
    assert.ok(!cal.dateIsLessThan(now, now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + day), now));
  }
);

QUnit.test(
  "date is less than now in the domain month, subdomain day",
  function (assert) {
    assert.expect(6);

    const cal = createCalendar({ domain: "year", subDomain: "month" });

    const now = new Date(2013, 12, 9, 12, 30, 0, 0); // 12:30, 2013-12-9

    assert.ok(cal.dateIsLessThan(new Date(0), now));
    assert.ok(cal.dateIsLessThan(new Date(now.getTime() - month), now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() - 5 * day), now)); // still within the month
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + 5 * day), now)); // still within the month
    assert.ok(!cal.dateIsLessThan(now, now));
    assert.ok(!cal.dateIsLessThan(new Date(now.getTime() + month), now));
  }
);
