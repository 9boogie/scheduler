import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import classnames from 'classnames/bind';
import useVisualMode from 'hooks/useVisualMode.js';
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const lastClass = classnames("main", {
    "appointment:last-of-type": props.id === "last"
  });
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  };

  const deleteInterview = function() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      <main className={lastClass}>
        {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
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
      </main>
    </article>
  );
};

