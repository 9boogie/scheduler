import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  const dailyAppointments = getAppointmentsForDay(state,state.day);
  console.log('dailyAppointments:', dailyAppointments, 'type', typeof(dailyAppointments))

  useEffect(() => {
    const promiseOne = axios.get(`/api/days`);
    const promiseTwo = axios.get('api/appointments');
    //const promiseThree = axios.get('api/interviewers');

    const promises = [promiseOne, promiseTwo];
    
    Promise.all(promises)
    .then(Allresponses => {
     setState(prev => ({...prev, days: Allresponses[0].data, appointments: Allresponses[1].data}));
     
    });
  }, []);
  console.log('what is in state.appointment',state.appointments);
  console.log('is Array', typeof([state.appointments]))
  
  
  const mapAppointment = dailyAppointments.map((appointment) => {
    console.log('appointment:', appointment, appointment.id)
    return (<Appointment {...appointment} />)
  })
  
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
        {mapAppointment}
      </section>
    </main>
  );
}
