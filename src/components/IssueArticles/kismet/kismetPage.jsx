import IssueLayout from "../shared/IssueLayout";
import { kismetItems } from "../../../data/issues/kismet";

export default function KismetPage() {
    return (
        <IssueLayout
            items={kismetItems}
            theme={{
                drawerW: "300px",
                drawerH: "80vh",
                drawerBg: "rgba(10, 10, 10, 0.70)",
                drawerColor: "#a622edff",
                drawerAccent: "rgba(156, 33, 33, 0.18)",
                drawerSpeed: "280ms",
            }}
        />
    );
}