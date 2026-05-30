import IssueLayout from "../shared/IssueLayout";
import { kismetItems } from "../../../data/issues/kismet";

export default function KismetPage() {
    return (
        <IssueLayout
            items={kismetItems}
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