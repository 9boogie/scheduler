import React from "react";
import DayList from "components/DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "helpers/selectors.js";
import getInterview from "helpers/interview.js";
import getInterviewersForDay from "helpers/getInterviewersForDay.js";
import useApplicationData from 'hooks/useApplicationData.js';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state,state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <ul>
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </ul>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {schedule}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
