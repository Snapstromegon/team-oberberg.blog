const EleventyFetch = require("@11ty/eleventy-fetch");

const CALENDAR_IDS = [
  "c_372a1a5797b7a96947ea1413c4bad541be84f21639d3db77cdfd8fae53d4003c@group.calendar.google.com",
  "c_a95c962e43ab02fa59ad772b6c7a086988e29233d91ecd856ce69f2886259307@group.calendar.google.com",
  "c_2844ad58af246a293ad90fad904d5fa039edcfb026347862c002156468aef4af@group.calendar.google.com",
  "c_8a7a0b293cbc4917d68b3d036e0a1bf7d4ee300ab6d97f6808f41369c56cbe6c@group.calendar.google.com",
  "c_76a0b2e17220f0fdc58084e3190b6aea12c438797358483078a27e3957a2bb2d@group.calendar.google.com",
  "c_d2f12c8fb348fb3090b68cc2bbb56cc220d1a4953cf43998fcd45ce83c95720b@group.calendar.google.com",
  "c_d13a15d4ad44e553cdf2b70f9649e9550f4646c8a2b18f552fbca8fdbe3a7c28@group.calendar.google.com",
  "c_c423bc6628276fbf25cca5a61f7bebac192fd928009f7f6589b75f63d7a5b04f@group.calendar.google.com",
];

const loadCalendar = async (calendarId) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const res = await EleventyFetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
    {
      duration: "1d",
      type: "json",
    }
  );
  for (const item of res.items) {
    item.start.dateTime = new Date(item.start.dateTime);
    item.end.dateTime = new Date(item.end.dateTime);
  }

  res.items.sort((a, b) => {
    return a.start.dateTime - b.start.dateTime;
  });

  return res;
};

module.exports = async function () {
  return Object.fromEntries(
    (await Promise.all(CALENDAR_IDS.map(loadCalendar))).map((cal) => [
      cal.summary,
      cal,
    ])
  );
};
