import IssueLayout from "../shared/IssueLayout";
import { notItems } from "../../../data/issues/not";

export default function NotPage() {
    return (
        <IssueLayout
            items={notItems}
            theme={{
                bgColor: "#0c2847ff",
                textColor: "#5e88c0ff",
                drawerW: "300px",
                drawerH: "100vh",
                drawerBg: "rgba(12, 12, 12, 0.85)",
                drawerColor: "#5fa1d7ff",
                drawerAccent: "rgba(93, 207, 222, 0.46)",
                drawerSpeed: "280ms",
            }}
        />
    );
}