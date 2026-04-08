module.exports = {
  eleventyComputed: {
    competitionsByDay: (data) => {
      const competitionsByDay = {};

      for (const competition of data.settings.competitions.filter((c) =>
        data.competitions.includes(c.name),
      )) {
        const day = competition.date;
        if (!competitionsByDay[day]) {
          competitionsByDay[day] = new Set();
        }
        competitionsByDay[day].add(competition.name);
      }

      return [...Object.entries(competitionsByDay)]
        .map(([day, competitions]) => ({ day: new Date(day), competitions }))
        .sort((a, b) => a.day - b.day);
    },
  },
};
