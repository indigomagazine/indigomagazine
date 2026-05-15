import IssueLayout from "../shared/IssueLayout";
import { andsceneItems } from "../../../data/issues/andscene";

export default function AndScenePage() {
  return (
    <IssueLayout
      items={andsceneItems}
      theme={{
        bgColor: "#0b0b10",
        textColor: "#e6e1ff",
        drawerW: "300px",
        drawerH: "100vh",
        drawerBg: "rgba(11, 11, 16, 0.82)",
        drawerColor: "#e6e1ff",
        drawerAccent: "rgba(230, 225, 255, 0.22)",
        drawerSpeed: "280ms",
      }}
    />
  );
}

