import React from "react";
import IssueLayout from "../shared/IssueLayout";
import { serialItems } from "../../../data/issues/serial";

export default function Serial() {
  return (
    <IssueLayout
      items={serialItems}
      theme={{
        drawerW: "300px",
        drawerH: "80vh",
        drawerBg: "rgba(10,10,10,0.70)",
        drawerColor: "#f8d254ff",
        drawerAccent: "rgba(255,255,255,0.18)",
        drawerSpeed: "280ms",
      }}
    />
  );
}
