module.exports = {
  eleventyComputed: {
    competitionCalendar: (data) => {
      const { googleCal, competitions, competitionEventsMapping } = data;

      const calEvents = competitions.map((competition) => {
        const competitionEvents = competitionEventsMapping[competition];
        return {
          competition,
          events: competitionEvents
            .map((event) =>
              googleCal[`Unicon 21 - ${event.calendar}`].items.filter(
                (item) => item.summary.trim() == event.event.trim()
              )
            )
            .flat(),
        };
      });
      return calEvents;
    },
    competitionsByDay: (data) => {
      const { competitionCalendar } = data;
      const competitionsByDay = {};

      for (const competition of competitionCalendar) {
        for (const event of competition.events) {
          const day = event.start.dateTime.toISOString().split("T")[0];
          if (!competitionsByDay[day]) {
            competitionsByDay[day] = new Set();
          }
          competitionsByDay[day].add(competition.competition);
        }
      }

      return [...Object.entries(competitionsByDay)].map(
        ([day, competitions]) => ({ day: new Date(day), competitions })
      ).sort((a, b) => a.day - b.day);
    },
  },
};
