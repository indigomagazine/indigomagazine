import IssueLayout from "../shared/IssueLayout";
import { reminiscenceItems } from "../../../data/issues/reminiscence";

export default function ReminiscencePage() {
    return (
        <IssueLayout
            items={reminiscenceItems}
            theme={{
                bgColor: "#1c1514",
                textColor: "#d6c5b4",
                drawerW: "300px",
                drawerH: "100vh",
                drawerBg: "rgba(28, 21, 20, 0.85)",
                drawerColor: "#d6c5b4",
                drawerAccent: "rgba(214, 197, 180, 0.2)",
                drawerSpeed: "280ms",
            }}
        />
    );
}
