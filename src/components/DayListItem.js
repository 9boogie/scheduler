import React from "react";
import classnames from 'classnames/bind';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classnames("li","day-list__item",{
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spopts === 0
  })

  const formatSports = function(spots) {
    if (spots > 1) {
      return `${spots} spots remaining`;
    } else if (spots === 1){
      return `${spots} spot remaining`;
    } else {
      return 'no spots remaining'
    }

  }

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSports(props.spots)}</h3>
    </li>
  );
}