import IssueLayout from "../shared/IssueLayout";
import { notItems } from "../../../data/issues/not";

export default function NotPage() {
    return (
        <IssueLayout
            items={notItems}
            theme={{
                drawerW: "300px",
                drawerH: "80vh",
                drawerBg: "rgba(12, 12, 12, 0.85)",
                drawerColor: "#e8e8e8",
                drawerAccent: "rgba(93, 207, 222, 0.2)",
                drawerSpeed: "280ms",
            }}
        />
    );
}