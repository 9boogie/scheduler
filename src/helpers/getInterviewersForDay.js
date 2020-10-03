const getInterviewersForDay = function(state, day) {
  const filteredDay = state.days.filter(filterDay => filterDay.name === day);

  if (filteredDay.length >= 1) {
    const filterInterviewers = filteredDay[0]['interviewers'];
    const result = filterInterviewers.map(id => state.interviewers[id])
    return result;
  } else {
    return [];
  }
};

export default getInterviewersForDay;