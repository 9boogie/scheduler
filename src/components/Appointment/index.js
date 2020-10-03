import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import classnames from 'classnames/bind';
import useVisualMode from 'hooks/useVisualMode.js';
import Form from "components/Appointment/Form.js";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const lastClass = classnames("main", {
    "appointment:last-of-type": props.id === "last"
  });

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
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={()=> back(EMPTY)}
          />)}
      </main>
    </article>
  );
};

