import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  // Update the remaining spots on each day
  const spotsRemain = function (id, interview) {
    const num = () => {
      if (!interview) {
        return 1;
      } else if (!state.appointments[id].interview) {
        return -1;
      } else {
        return 0;
      }
    };
    const days = state.days.map((eachDay) => {
      if (eachDay.name === state.day) {
        return {
          ...eachDay,
          spots: eachDay.spots + num(),
        };
      }
      return eachDay;
    });

    return days;
  };

  // send put request when user books the interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotsRemain(id, interview);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
      return true;
    });
  };

  // send delete request when user wants to cancel the appointment 
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotsRemain(id);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
      return true;
    });
  };

  useEffect(() => {
    const promiseOne = axios.get("/api/days");
    const promiseTwo = axios.get("/api/appointments");
    const promiseThree = axios.get("/api/interviewers");

    const promises = [promiseOne, promiseTwo, promiseThree];

    Promise.all(promises).then((Allresponses) => {
      setState((prev) => ({
        ...prev,
        days: Allresponses[0].data,
        appointments: Allresponses[1].data,
        interviewers: Allresponses[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
