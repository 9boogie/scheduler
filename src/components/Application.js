import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "helpers/selectors.js";
import getInterview from "helpers/interview.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state,state.day);

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
  
  console.log(getInterview(state, state.interview));

  const schedule = dailyAppointments.map((appointment) => {
    

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
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
        {schedule}
      </section>
    </main>
  );
}
