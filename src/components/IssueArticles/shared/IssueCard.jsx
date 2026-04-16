import React from "react";
import "../serial/serial.css";

export default function IssueCard({ it }) {
    return (
        <article className={`grid-card ${it.comingSoon ? "is-coming-soon" : ""}`}>
            {!it.comingSoon && it.to ? (
                <a
                    href={it.to}
                    className="card-link"
                    aria-label={it.title}
                    style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                />
            ) : null}

            <img
                className="thumb"
                src={it.imageGrid || it.image}
                alt={it.title}
                loading="lazy"
                style={{ "--obj-pos": it.gridPos || "center center" }}
            />

            <div className="card-meta">
                {it.comingSoon ? (
                    <span className="badge">Coming soon</span>
                ) : (
                    <h2 className="title">{it.title}</h2>
                )}
            </div>
        </article>
    );
}
