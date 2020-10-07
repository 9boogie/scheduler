import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const listDay = props.days.map((eachDay) => {
    return (
      <DayListItem
        name={eachDay.name}
        key={eachDay.id}
        spots={eachDay.spots}
        selected={eachDay.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return listDay;
}
