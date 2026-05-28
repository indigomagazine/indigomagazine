import { createFileRoute } from "@tanstack/react-router";
import SlideshowContainer from "../../components/Slideshow/SlideshowContainer";
import Taskbar from "../../components/Home/Taskbar";

export const Route = createFileRoute("/slideshow/$slug")({
    component: Slideshow,
});

function Slideshow() {
    const { slug } = Route.useParams();

    const slideshows = {
        anumberoutofplace: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/a%20number%20out%20of%20place/REN_1404%20copy.jpg",
                link: "/articles/serial/anumberoutofplace",
            },
            // more images
        ],

        covet: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/covet/clothes-1.1.JPG",
                link: "/articles/serial/covet",
            },
            // more images
        ],

        iloveshopping: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/i%20love%20shopping/BF5T7721.jpg",
                link: "/articles/serial/iloveshopping",
            },
            // more images
        ],

        keyboards: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/keyboards/nolan%202.png",
                link: "/articles/serial/keyboards",
            },
            // more images
        ],

        lifeinparadise: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/life%20in%20paradise/page%201.png",
                link: "/articles/serial/lifeinparadise",
            },
            // more images
        ],

        western: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/vengeance%20of%20the%20west/both.png",
                link: "/articles/serial/western",
            },
            // more images
        ],

        youcantwisttime: [
            {
                src: "https://cdn.indigomagazinetx.com/article%20photos/11%20-%20serial/you%20can%20twist%20time/final_edited3.png",
                link: "/articles/serial/youcantiwsttime",
            },
            // more images
        ],
    };

    const images = slideshows[slug] || [];

    return (
        <div>
            <Taskbar />
            <SlideshowContainer slides={images} />
        </div>
    );
}