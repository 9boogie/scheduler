import React from 'react';
import classnames from 'classnames/bind';
import "components/InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const interviewerClass = classnames('li',"interviewers__item",{
    "interviewers__item--selected" : props.selected
  })

  const imageClass = classnames('img',"interviewers__item-image", {
    "interviewers__item--selected-image" : props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={imageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
