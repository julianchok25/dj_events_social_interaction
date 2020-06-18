import React from "react";
import { map, isEmpty } from "lodash";
import User from "./User";

import "./ListFollows.scss";
export default function ListFollows(props) {
  const { follows } = props;

  if (isEmpty(follows)) {
    return <h2 className="not-results">Not Results</h2>;
  }

  return (
    <ul className="list-follows">
      {map(follows, (follow) => (
        <User key={follow.id} follow={follow} />
      ))}
    </ul>
  );
}
