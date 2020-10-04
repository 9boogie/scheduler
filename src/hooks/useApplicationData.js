import {useState, useEffect} from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
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

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;