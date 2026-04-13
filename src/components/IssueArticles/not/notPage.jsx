import IssueLayout from "../shared/IssueLayout";
import { notItems } from "../../../data/issues/not";

export default function NotPage() {
    return (
        <IssueLayout
            items={notItems}
            theme={{
<<<<<<< HEAD
                drawerW: "300px",
                drawerH: "80vh",
                drawerBg: "rgba(12, 12, 12, 0.85)",
                drawerColor: "#e8e8e8",
                drawerAccent: "rgba(93, 207, 222, 0.2)",
=======
                bgColor: "#0c2847ff",
                textColor: "#5e88c0ff",
                drawerW: "300px",
                drawerH: "100vh",
                drawerBg: "rgba(12, 12, 12, 0.85)",
                drawerColor: "#5fa1d7ff",
                drawerAccent: "rgba(93, 207, 222, 0.46)",
>>>>>>> d1aab2a6d3e1849a0be7a3254ac2a4aa3688b632
                drawerSpeed: "280ms",
            }}
        />
    );
}