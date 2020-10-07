// Get the appointments on each day
const getAppointmentsForDay = function (state, day) {
  const filteredDay = state.days.filter((filterDay) => filterDay.name === day);

  if (filteredDay.length > 0) {
    const appointmentId = filteredDay[0]["appointments"];
    const result = appointmentId.map((id) => state.appointments[id]);
    return result;
  } else {
    return [];
  }
};

export default getAppointmentsForDay;
