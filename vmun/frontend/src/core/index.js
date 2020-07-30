import React from "react";
import { render } from "react-dom";
import { version, Timeline } from "antd";
import "antd/dist/antd.css";
import Navbar from "../components/core/navbar";

const App = () => {
  return (
    <div style={{ marginRight: 100, marginLeft: 100, paddingTop: 50 }}>
      <h1>Ant Design version: {version}</h1>
      <Timeline style={{ paddingTop: 30 }}>
        <Timeline.Item style={{ paddingBottom: 5 }}>Added account stuffs, edit user later (+ rewrite in drf)</Timeline.Item>
        <Timeline.Item style={{ paddingBottom: 5 }}>The <a href="/task/">tasks</a> are here. They will be linked as foreignkeys to a user</Timeline.Item>
      </Timeline>,
    </div>
  );
};

render(<Navbar />, document.querySelector("#navbar"));
render(<App />, document.getElementById("root"));
