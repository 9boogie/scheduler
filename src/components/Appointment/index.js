import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import useVisualMode from 'hooks/useVisualMode.js';
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";
import Error from "components/Appointment/Error.js";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE= "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const deleteInterview = function() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {transition(EMPTY)})
      .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      <main >
        {mode === EMPTY && 
          <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={()=> back(EMPTY)}
            onSave={save} 
          />)}
        {mode === CONFIRM && (
          <Confirm
            message='Delete the appointment?'
            onCancel={()=> back(EMPTY)}
            deleteInterview={deleteInterview}
          />)}
        {mode === SAVING && (
          <Status message="SAVING" />)}
        {mode === DELETING && (
          <Status message='DELETING' />)}
        {mode === EDIT && (
          <Form 
            interviewers={props.interviewers}
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={()=> back(SHOW)}
            onSave={save} 
          />)}
        {mode === ERROR_SAVE && (
          <Error 
            message="Could not create appointment." 
            onClose={()=>back(EMPTY)}
          />)}
        {mode === ERROR_DELETE && (
          <Error 
            message="Could not delete appointment." 
            onClose={()=>back(SHOW)}
          />)}
      </main>
    </article>
  );
};

