import React from "react";
import BasicLayout from "../../layout/BasicLayout";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <h2>This is Home</h2>
    </BasicLayout>
  );
}
