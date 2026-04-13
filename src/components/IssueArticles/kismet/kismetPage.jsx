import IssueLayout from "../shared/IssueLayout";
import { kismetItems } from "../../../data/issues/kismet";

export default function KismetPage() {
    return (
        <IssueLayout
            items={kismetItems}
            theme={{
<<<<<<< HEAD
                drawerW: "300px",
                drawerH: "80vh",
                drawerBg: "rgba(10, 10, 10, 0.70)",
                drawerColor: "#a622edff",
                drawerAccent: "rgba(156, 33, 33, 0.18)",
=======
                bgColor: "#0f0a1e",
                textColor: "#a2baa4ff",
                drawerW: "300px",
                drawerH: "100vh",
                drawerBg: "rgba(15, 10, 30, 0.85)",
                drawerColor: "#d4b3e6",
                drawerAccent: "rgba(180, 150, 220, 0.3)",
>>>>>>> d1aab2a6d3e1849a0be7a3254ac2a4aa3688b632
                drawerSpeed: "280ms",
            }}
        />
    );
}