import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import classnames from 'classnames/bind';

export default function Appointment (props) {
  const lastClass = classnames("main", {
    "appointment:last-of-type": props.id === "last"
  });

  return (
    <article className="appointment">
      <Header time={props.time} />
      <main className={lastClass}>
        {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
      </main>
    </article>
  );
};

