import React, { useState } from "react";
import SigninSingUp from "./page/SigninSingUp";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}
