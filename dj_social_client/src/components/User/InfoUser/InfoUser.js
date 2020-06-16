import React from "react";
import { Location, Link, DateBirth } from "../../../utils/icons";
import moment from "moment";
import localization from "moment/locale/es-us";
import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;

  return (
    <div className="info-user">
      <h2 className="name">
        {user?.name} {user?.lastName}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.bio && <div className="description"> {user.bio} </div>}
      <div className="more-info">
        {user?.location && (
          <p>
            {" "}
            <Location /> {user.location}
          </p>
        )}
        {user?.webSite && (
          <a
            href={user.webSite}
            alt={user.webSite}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <Link />
            {user.webSite}
          </a>
        )}
        {user?.birthDate && (
          <p>
            <DateBirth />
            {moment(user.birthDate).locale("es-us", localization).format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
