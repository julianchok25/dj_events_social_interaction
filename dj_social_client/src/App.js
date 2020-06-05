import React, { useState } from "react";
import SigninSingUp from "./page/SigninSingUp";

export default function App() {
  const [user, Setuser] = useState({ name: "Camilo Araque" });

  return (
    <div>
      {user ? (
        <div>
          {" "}
          <SigninSingUp />{" "}
        </div>
      ) : (
        <h1>Not Logged</h1>
      )}
    </div>
  );
}
