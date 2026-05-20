import IssueLayout from "../shared/IssueLayout";
import { andSceneItems } from "../../../data/issues/andScene";

export default function AndScenePage() {
    return (
        <IssueLayout
            items={andSceneItems}
            theme={{
                bgColor: "#0f0a1e",
                textColor: "#a2baa4ff",
                drawerW: "300px",
                drawerH: "100vh",
                drawerBg: "rgba(15, 10, 30, 0.85)",
                drawerColor: "#d4b3e6",
                drawerAccent: "rgba(180, 150, 220, 0.3)",
                drawerSpeed: "280ms",
            }}
        />
    );
}
