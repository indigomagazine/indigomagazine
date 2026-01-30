import { useEffect, useRef, useState } from "react";
import heroVideo from "../../assets/hero videos/NOTgroup2vid.mp4";
import heroFallback from "../../assets/hero videos/fallback.jpg";
import logoDark from "../../assets/logos/indigologowhite.png";
import logoLight from "../../assets/logos/indigologoblack.png";
import featuredImage from "../../legacy/article photos/western/moviePoster.png";
import stomachImage from "../../../legacy/article photos/stomachache/stomachacheImage.JPG";
import covetImage from "../../../legacy/article photos/covet/1-cereal.jpg"
import notAirItOutImage from "../../assets/NOT photos/group3/3.jpg";
import notQuietDevourmentImage from "../../assets/NOT photos/group 6/cover.jpg";
import notInTheWindImage from "../../assets/NOT photos/group 4/Sarah_Rizvi_Final_Graphic_3.jpeg";
import kismetLadyImage from "../../assets/photos/group4/kismetnew.jpg";
import kismetJudasImage from "../../assets/photos/group5/illustration.jpeg";
import kismetSignImage from "../../assets/photos/group2/GMA_cover.png";
import reminiscenceAmsterdamImage from "../../assets/article photos/amsterdam/amsterdamfinal.jpeg";
import reminiscenceHeLovesMeImage from "../../assets/article photos/helovesme/final2.jpg";
import reminiscenceRestaurantImage from "../../assets/article photos/therestaurant/rem3.png";
import pinterestIcon from "../../assets/socials/pint.jpg";
import instagramIcon from "../../assets/socials/inst.png";
import tiktokIcon from "../../assets/socials/tik.jpg";
import spotifyIcon from "../../assets/socials/spot.png";
import twitterIcon from "../../assets/socials/twit.png";
import gmailIcon from "../../assets/socials/gmail.webp";
import "./LegacyStyle.css";

const NAV_LINKS = [
  { label: "CREATIVE", href: "creative.html", className: "CREATIVE" },
  { label: "VISUAL ARTS", href: "visualarts.html", className: "VISUALARTS" },
  { label: "ABOUT", href: "about.html", className: "ABOUT" },
];

const FEATURED_ARTICLE = {
  title: "Stomach Ache",
  href: "/articles/serial/stomachache",
  image: stomachImage,
};

const ISSUE_SECTIONS = [
  {
    title: "NOT",
    href: "NOT.html",
    articles: [
      {
        title: "Air It Out",
        href: "legacy/articles/NOT/airitout.html",
        image: notAirItOutImage,
        alt: "Air It Out",
      },
      {
        title: "Quiet Devourment",
        href: "articles/NOT/quietdevourment.html",
        image: notQuietDevourmentImage,
        alt: "Quiet Devourment",
      },
      {
        title: "In the Wind",
        href: "articles/NOT/inthewind.html",
        image: notInTheWindImage,
        alt: "In the Wind",
      },
    ],
  },
  {
    title: "KISMET",
    href: "kismet.html",
    articles: [
      {
        title: "The Lady Of The Castle",
        href: "articles/kismet/theladyofthecastle.html",
        image: kismetLadyImage,
        alt: "The Lady Of The Castle",
      },
      {
        title: "Judas",
        href: "articles/kismet/judas.html",
        image: kismetJudasImage,
        alt: "Judas",
      },
      {
        title: "Give me a sign",
        href: "articles/kismet/giveMeASign.html",
        image: kismetSignImage,
        alt: "Give me a sign",
      },
    ],
  },
  {
    title: "REMINISCENCE",
    href: "reminiscence.html",
    articles: [
      {
        title: "Amsterdam",
        href: "articles/reminiscence/amsterdam.html",
        image: reminiscenceAmsterdamImage,
        alt: "Amsterdam",
      },
      {
        title: "He Loves Me, He Loves Me Not",
        href: "articles/reminiscence/helovesme.html",
        image: reminiscenceHeLovesMeImage,
        alt: "He Loves Me, He Loves Me Not",
      },
      {
        title: "The Restaurant",
        href: "articles/reminiscence/therestaurant.html",
        image: reminiscenceRestaurantImage,
        alt: "The Restaurant",
      },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: "https://pin.it/29ELT8gzs", icon: pinterestIcon, label: "Pinterest" },
  {
    href: "https://www.instagram.com/utdindigo/",
    icon: instagramIcon,
    label: "Instagram",
  },
  { href: "https://www.tiktok.com", icon: tiktokIcon, label: "TikTok" },
  {
    href: "https://open.spotify.com/user/316ijys7qrsyxqfsd4o5yfrmvtuu?si=b59bc6b18e024035",
    icon: spotifyIcon,
    label: "Spotify",
  },
  { href: "https://x.com/utdindigo", icon: twitterIcon, label: "Twitter" },
  {
    href: "mailto: indigomagazineutd@gmail.com",
    icon: gmailIcon,
    label: "Gmail",
  },
];

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("theme") === "light" ? "light" : "dark";
  });
  const videoRef = useRef(null);
  const [primaryIssue, ...additionalIssues] = ISSUE_SECTIONS;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);
    document.body.classList.toggle("light-mode", theme === "light");
    document.body.style.backgroundColor = theme === "light" ? "white" : "black";
    document.body.style.color = theme === "light" ? "black" : "white";

    const headings = document.querySelectorAll("h1");
    headings.forEach((heading) => {
      heading.style.color = theme === "light" ? "black" : "white";
    });

    const missionStatement = document.querySelector(".mission-statement");
    if (missionStatement) {
      missionStatement.style.color = theme === "light" ? "#51289C" : "#C19EEA";
    }

    const taskbarText = document.querySelectorAll(".taskbar-text");
    taskbarText.forEach((element) => {
      element.style.color = theme === "light" ? "black" : "white";
    });
  }, [theme]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        video.pause();
      });
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <div id="Taskbar-container" className="visible">
        <a href="index.html" className="logo-link">
          <img
            src={theme === "light" ? logoLight : logoDark}
            alt="Website Logo"
            className="logo"
          />
        </a>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`link-bar hvr-fade ${link.className}`}
          >
            <p className="tabfont taskbar-text">{link.label}</p>
          </a>
        ))}
      </div>

      <div className="hero-section">
        <div className="overlay" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroFallback}
        >
          <source src={heroVideo} type="video/mp4" />
          <source src={heroVideo} type="video/mp4" media="(max-width: 480px)" />
        </video>
        <button type="button" onClick={toggleTheme} className="change-mode">
          {theme === "light" ? "\u2600" : "\u263D"}
        </button>
      </div>

      <div id="Featured-Article">
        <h1>
          <br />
          FEATURED ARTICLE
        </h1>
        <a href={FEATURED_ARTICLE.href} className="article">
          <img
            src={FEATURED_ARTICLE.image}
            alt={FEATURED_ARTICLE.title}
            style={{ maxWidth: "300px" }}
          />
          <div className="article-title">{FEATURED_ARTICLE.title}</div>
        </a>
      </div>

      <div>
        <h1>
          <a href={primaryIssue.href} className="header-link">
            {primaryIssue.title}
          </a>
        </h1>
        <div className="articles-container">
          {primaryIssue.articles.map((article) => (
            <a key={article.title} href={article.href} className="article">
              <img src={article.image} alt={article.alt} />
              <div className="article-title">{article.title}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="spotify-section">
        <iframe
          title="Indigo Spotify Playlist"
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/0X9K1ewdZrIU6U8RlYl5hg?utm_source=generator&theme=0"
          width="35%"
          height="370"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <div className="kismet-notes">
          <p>NOT</p>
          <p>
            To scream at a void of grotesque inaction. To oppose what exists,
            what lacks, what overwhelms, what oppresses. Our world is made of
            both rage and hope.
          </p>
          <p>
            <em>
              Do you ignore it?
              <br />
              Do you revel in it?
              <br />
            </em>
          </p>
          <p>
            Maybe you&apos;d rather dance the pain away-out of sight, out of
            mind. Ignorance is so blissful. There is too much of everything; it
            feels as if there is nothing at all.
          </p>
          <p>
            <strong>
              NOT is born from this chaos, from the desperate need to say no, to
              resist, to refuse.
            </strong>
          </p>
        </div>
      </div>

      {additionalIssues.map((section) => (
        <div key={section.title}>
          <h1>
            <a href={section.href} className="header-link">
              {section.title}
            </a>
          </h1>
          <div className="articles-container">
            {section.articles.map((article) => (
              <a key={article.title} href={article.href} className="article">
                <img src={article.image} alt={article.alt} />
                <div className="article-title">{article.title}</div>
              </a>
            ))}
          </div>
        </div>
      ))}

      <fieldset className="icons">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            className="icon-color"
            href={social.href}
            target="_blank"
            rel="noreferrer"
          >
            <img src={social.icon} alt={social.label} />
          </a>
        ))}
      </fieldset>
    </div>
  );
}

export default App;
