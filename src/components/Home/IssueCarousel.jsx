import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import IssueCard from '../IssueArticles/shared/IssueCard';
import './IssueCarousel.css';

export const IssueCarousel = ({ items = [] }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1000);

    const containerRef = useRef(null);
    const stageRef = useRef(null);
    const dragStartRef = useRef(null);
    const isPointerDownRef = useRef(false);
    const hasDraggedRef = useRef(false);
    const lastWheelTimeRef = useRef(0);

    // Measuring container width for responsive 3D spacing
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        const resizeObserver = new ResizeObserver(updateWidth);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    // Responsive card spacing calculation
    const cardSpacing = Math.min(340, Math.max(220, containerWidth * 0.38));

    const goToSlide = useCallback((index) => {
        const target = Math.max(0, Math.min(items.length - 1, index));
        setCurrentIndex(target);
    }, [items.length]);

    const handlePrev = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    const handleNext = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handlePrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            handleNext();
        }
    }, [handlePrev, handleNext]);

    // Drag pointer events with physical resistance
    const handlePointerDown = (e) => {
        if (e.button !== 0) return; // Only main mouse button

        dragStartRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            lastX: e.clientX,
            lastTime: performance.now(),
            velocity: 0,
        };

        isPointerDownRef.current = true;
        hasDraggedRef.current = false;
    };

    const handlePointerMove = (e) => {
        if (!isPointerDownRef.current || !dragStartRef.current) return;

        const deltaX = e.clientX - dragStartRef.current.startX;
        const absDeltaX = Math.abs(deltaX);

        // Only start dragging and capturing pointer if movement exceeds threshold
        if (!isDragging && absDeltaX > 7) {
            setIsDragging(true);
            hasDraggedRef.current = true;
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
                // Ignore capture errors
            }
        }

        if (isDragging) {
            const now = performance.now();
            const dt = now - dragStartRef.current.lastTime;
            if (dt > 12) {
                dragStartRef.current.velocity = (e.clientX - dragStartRef.current.lastX) / dt;
                dragStartRef.current.lastX = e.clientX;
                dragStartRef.current.lastTime = now;
            }

            // Applying resistance: tangible drag feel with rubber-band boundaries
            let move = deltaX * 0.92;
            if (currentIndex === 0 && move > 0) {
                move *= 0.22;
            } else if (currentIndex === items.length - 1 && move < 0) {
                move *= 0.22;
            }

            setDragOffset(move);
        }
    };

    const handlePointerUp = (e) => {
        if (!isPointerDownRef.current) return;
        isPointerDownRef.current = false;

        if (isDragging) {
            try {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                }
            } catch {
                // Ignore capture release errors
            }

            const offset = dragOffset;
            const velocity = dragStartRef.current ? dragStartRef.current.velocity : 0;
            const threshold = cardSpacing * 0.2;
            const isFlickLeft = velocity < -0.35 && offset < -12;
            const isFlickRight = velocity > 0.35 && offset > 12;

            let nextIndex = currentIndex;
            if ((offset < -threshold || isFlickLeft) && currentIndex < items.length - 1) {
                nextIndex = currentIndex + 1;
            } else if ((offset > threshold || isFlickRight) && currentIndex > 0) {
                nextIndex = currentIndex - 1;
            }

            setCurrentIndex(nextIndex);
            setDragOffset(0);
            setIsDragging(false);

            // Suppress clicks briefly after drag release
            setTimeout(() => {
                hasDraggedRef.current = false;
            }, 100);
        }
    };

    // Trackpad and wheel scrolling
    const handleWheel = (e) => {
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
        if (Math.abs(delta) < 25) return;

        const now = performance.now();
        if (now - lastWheelTimeRef.current < 350) return;
        lastWheelTimeRef.current = now;

        if (delta > 0 && currentIndex < items.length - 1) {
            goToSlide(currentIndex + 1);
        } else if (delta < 0 && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    };

    // Handle card clicks: centering side cards or navigating to active card's route
    const handleCardClick = (e, item, index) => {
        if (hasDraggedRef.current || isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // If clicking a side card, bring it to center
        if (index !== currentIndex) {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(index);
            return;
        }

        // If clicking active card, navigate to its "to" destination
        const destination = item.to || item.path;
        if (destination) {
            e.preventDefault();
            e.stopPropagation();
            if (destination.startsWith('http') || destination.endsWith('.html')) {
                window.location.href = destination;
            } else {
                // Normalize casing to match TanStack route definitions
                const normalized = destination.replace(/^\/issues\//i, '/Issues/');
                if (e.metaKey || e.ctrlKey) {
                    window.open(normalized, '_blank');
                } else {
                    navigate({ to: normalized });
                }
            }
        }
    };

    // Continuous progress for fluid 3D transformations during drag
    const effectiveProgress = currentIndex - (dragOffset / cardSpacing);

    return (
        <div
            ref={containerRef}
            className="issue-carousel-container"
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
            tabIndex={0}
            aria-label="Issues carousel"
        >
            {/* 3D Perspective Stage */}
            <div
                ref={stageRef}
                className={`issue-carousel-stage ${isDragging ? 'is-dragging' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {/* Navigation Arrows */}
                <button
                    type="button"
                    className="issue-carousel-nav-btn issue-carousel-nav-prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                    }}
                    disabled={currentIndex === 0}
                    aria-label="Previous article"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="issue-carousel-nav-btn issue-carousel-nav-next"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                    disabled={currentIndex === items.length - 1}
                    aria-label="Next article"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Top 4 3D Dimensional Cards */}
                {items.map((item, index) => {
                    const offset = index - effectiveProgress;
                    const absOffset = Math.abs(offset);
                    const isActive = index === currentIndex;

                    // 3D Dimensional Transformation Math
                    const translateX = offset * cardSpacing;
                    const translateZ = -Math.min(3, absOffset) * 105;
                    const rotateY = Math.max(-2, Math.min(2, offset)) * -24;
                    const scale = Math.max(0.74, 1 - Math.min(2.5, absOffset) * 0.13);
                    const opacity = Math.max(0.2, 1 - Math.min(2.5, absOffset) * 0.28);
                    const zIndex = Math.round(30 - Math.min(3, absOffset) * 8);
                    const transformStyle = `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

                    return (
                        <div
                            key={item.id || item.to || item.title || index}
                            className={`issue-carousel-card ${isActive ? 'is-active' : ''} ${isDragging ? 'is-dragging' : ''}`}
                            style={{
                                transform: transformStyle,
                                zIndex,
                                opacity,
                            }}
                            onClickCapture={(e) => handleCardClick(e, item, index)}
                        >
                            <div className="issue-carousel-card-inner">
                                <IssueCard it={item} />

                                {/* Centered hover title and darkened opaque cover overlay */}
                                <div className="carousel-card-hover-overlay">
                                    <h3 className="carousel-card-hover-title">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Indicators */}
            <div className="issue-carousel-pagination">
                {items.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`issue-carousel-dot ${index === currentIndex ? 'is-active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}: ${item.title}`}
                    />
                ))}
            </div>

            {/* Drag Gesture Hint */}

        </div>
    );
};

export default IssueCarousel;
