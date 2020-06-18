import React from "react";
import { Link } from "react-router-dom";
import error404 from "../../assets/png/Error404.png";
import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error404">
      <img src={error404} alt="vinyl" />
      <Link to="/">Back To Home</Link>
    </div>
  );
}
