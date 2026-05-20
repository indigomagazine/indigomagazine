import React from "react";
import { useEffect, useRef, forwardRef } from "react";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import IssueSidebar from "./IssueSidebar";
import IssueCard from "./IssueCard";
import "../serial/serial.css";

export default function IssueLayout({ items, theme }) {
    const [view, setView] = useState("scroll"); // 'scroll' | 'grid'
    const data = useMemo(() => items, [items]);

    const [prevView, setPrevView] = useState("scroll");
    const [animClass, setAnimClass] = useState(""); // "slide-in-left" | "slide-in-right" | ""

    // Scroll-hint state
    // Use a per-issue storage key so different issue pages don't share the same saved index
    const storageKey = useMemo(() => {
        const base = (items && items[0] && items[0].title) ? String(items[0].title).replace(/\s+/g, '_') : 'default';
        return `issue_last_index_${base}`;
    }, [items]);

    const [activeIndex, setActiveIndex] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? parseInt(saved, 10) : 0;
    });
    const [showHint, setShowHint] = useState(false);
    const hasScrolled = useRef(false);

    const scrollerRef = useRef(null);
    const isSnappingRef = useRef(false);
    const sectionHRef = useRef(0);

    const [barOpen, setBarOpen] = useState(false);

    useEffect(() => {
        if (view !== "scroll") return;

        if (activeIndex > 0) {
            hasScrolled.current = true;
            setShowHint(false);
            return;
        }

        hasScrolled.current = false;
        setShowHint(false);
        const timer = setTimeout(() => {
            if (!hasScrolled.current) setShowHint(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [view, activeIndex]);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el || view !== "scroll") return;
        const onScroll = () => {
            const h = sectionHRef.current || el.clientHeight;
            const idx = Math.round(el.scrollTop / h);
            if (idx !== activeIndex) {
                setActiveIndex(idx);
                localStorage.setItem(storageKey, idx);
            }
            if (!hasScrolled.current) {
                hasScrolled.current = true;
                setShowHint(false);
            }
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [view, activeIndex]);

    useEffect(() => {
        const prev = document.body.style.margin;
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        return () => {
            document.body.style.margin = prev;
        };
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el || view !== "scroll") return;

        const sections = Array.from(el.querySelectorAll(".snap-section"));
        const getIndex = () => Math.round(el.scrollTop / sectionHRef.current);

        const onResize = () => {
            sectionHRef.current = el.clientHeight;
        };
        onResize();
        window.addEventListener("resize", onResize);

        const onWheel = (e) => {
            if (isSnappingRef.current) {
                e.preventDefault();
                return;
            }

            const delta = e.deltaY;
            const threshold = 25;
            if (Math.abs(delta) < threshold) return;

            e.preventDefault();
            isSnappingRef.current = true;

            const cur = getIndex();
            const next = Math.min(
                sections.length - 1,
                Math.max(0, cur + (delta > 0 ? 1 : -1))
            );

            el.scrollTo({ top: next * sectionHRef.current, behavior: "smooth" });

            const release = () => {
                isSnappingRef.current = false;
                el.removeEventListener("scrollend", release);
            };
            el.addEventListener?.("scrollend", release);
            setTimeout(() => {
                isSnappingRef.current = false;
            }, 420);
        };

        el.addEventListener("wheel", onWheel, { passive: false });

        if (activeIndex > 0) {
            el.scrollTop = activeIndex * el.clientHeight;
        }

        return () => {
            window.removeEventListener("resize", onResize);
            el.removeEventListener("wheel", onWheel);
        };
    }, [view, activeIndex]);

    const handleToggle = (checked) => {
        const next = checked ? "grid" : "scroll";
        const dir =
            prevView === "scroll" && next === "grid"
                ? "slide-in-right"
                : prevView === "grid" && next === "scroll"
                    ? "slide-in-left"
                    : "";

        setPrevView(next);
        setAnimClass(dir);
        setView(next);

        window.requestAnimationFrame(() => {
            setTimeout(() => setAnimClass(""), 420);
        });
    };

    return (
        <div
            className="mg-root"
            style={{
                "--bg": theme?.bgColor || "#fffcf1",
                "--text": theme?.textColor || "#F5E7BA",
                "--drawer-w": theme?.drawerW || "300px",
                "--drawer-h": theme?.drawerH || "100vh",
                "--drawer-bg": theme?.drawerBg || "rgba(10,10,10,0.70)",
                "--drawer-color": theme?.drawerColor || "#f8d254ff",
                "--drawer-accent": theme?.drawerAccent || "rgba(255,255,255,0.18)",
                "--drawer-speed": theme?.drawerSpeed || "280ms",
            }}
        >
            <IssueSidebar barOpen={barOpen} setBarOpen={setBarOpen} />

            <div className={`content-stage ${animClass}`}>
                {view === "scroll" ? (
                    <ScrollSections ref={scrollerRef} items={data} />
                ) : (
                    <GridGallery items={data} />
                )}
            </div>

            {view === "scroll" && (
                <div className="scroll-dots" aria-hidden="true">
                    {data.map((_, i) => (
                        <span
                            key={i}
                            className={`scroll-dot${i === activeIndex ? " is-active" : ""}`}
                        />
                    ))}
                </div>
            )}

            {view === "scroll" && showHint && activeIndex < data.length - 1 && (
                <div className="scroll-hint" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <polyline
                            points="6 9 12 15 18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}

const ScrollSections = forwardRef(function ScrollSections({ items }, ref) {
    return (
        <div ref={ref} className="snap-wrapper" aria-label="Feature stories">
            {items.map((it) => (
                <section
                    className={`snap-section ${it.comingSoon ? "is-coming-soon" : ""}`}
                    key={it.id}
                >
                    {!it.comingSoon && it.to ? (
                        <a href={it.to} className="hit-area" aria-label={it.title} />
                    ) : null}

                    <img
                        className={`cover ${it.blur ? "is-blurred" : ""}`}
                        src={it.imageScroll || it.image}
                        alt={it.title}
                        loading="lazy"
                        style={{ "--cover-pos": it.coverPos || "center" }}
                    />
                    <MetaOverlay item={it} />
                </section>
            ))}
        </div>
    );
});

function GridGallery({ items }) {
    return (
        <div className="grid-wrapper" aria-label="All stories (grid)">
            {items.map((it) => (
                <IssueCard key={it.id || it.title} it={it} />
            ))}
        </div>
    );
}

function MetaOverlay({ item }) {
    return (
        <div className="meta">
            <div className="bullet" aria-hidden="true">
                <img src="" alt="" />
            </div>
            <h2 className="title">{item.title}</h2>
            <p className="desc">{item.description}</p>
            {item.tags?.length ? (
                <div className="tags">
                    {item.tags.map((t) => (
                        <span className="tag" key={t}>
                            {t}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
