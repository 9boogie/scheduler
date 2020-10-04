import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "helpers/selectors.js";
import getInterview from "helpers/interview.js";
import getInterviewersForDay from "helpers/getInterviewersForDay.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state,state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    console.log('interview:', interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prev) => ({ ...prev, appointments }));
        return true;
      });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        console.log('deleting')
        setState((prev) => ({ ...prev, appointments }));
        return true;
      });
  }

  useEffect(() => {
    const promiseOne = axios.get(`/api/days`);
    const promiseTwo = axios.get('api/appointments');
    const promiseThree = axios.get('api/interviewers');

    const promises = [promiseOne, promiseTwo, promiseThree];
    
    Promise.all(promises)
    .then(Allresponses => {
     setState(prev => ({...prev, days: Allresponses[0].data, appointments: Allresponses[1].data, interviewers: Allresponses[2].data}));
     
    });

  }, []);

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
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
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
