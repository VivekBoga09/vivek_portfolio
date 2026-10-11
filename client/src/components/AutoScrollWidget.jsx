import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function AutoScrollWidget({ playBlip, showToast }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1); // 0: 0.8px (slow), 1: 1.6px (medium), 2: 3.2px (fast)
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const SPEEDS = [
    { label: '0.5x', value: 0.8 },
    { label: '1.0x', value: 1.6 },
    { label: '2.0x', value: 3.2 },
    { label: '3.0x', value: 4.8 },
    { label: '5.0x', value: 8.0 }
  ];

  // Update scroll percentage
  const handleScrollProgress = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const p = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      setProgress(p);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, [handleScrollProgress]);

  // Main Auto-scroll Animation Loop
  useEffect(() => {
    if (!isActive || isPaused) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const currentSpeed = SPEEDS[speedIndex].value;

    const scrollStep = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      // Scroll smoothly based on delta
      const pixelsToScroll = currentSpeed * (delta / 16.67);
      window.scrollBy({ top: pixelsToScroll, behavior: 'auto' });

      // Check if reached the bottom of page
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
      if (atBottom) {
        setIsActive(false);
        if (playBlip) playBlip(750);
        if (showToast) showToast('Auto-Scroll Showcase Finished! 🚀');
        return;
      }

      animFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive, isPaused, speedIndex, playBlip, showToast]);

  // Pause on manual user interaction (mousewheel or touch)
  useEffect(() => {
    if (!isActive) return;

    const handleUserInteraction = () => {
      if (!isPaused) {
        setIsPaused(true);
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = setTimeout(() => {
          setIsPaused(false);
        }, 3200);
      }
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isActive, isPaused]);

  // Start / Stop Handlers
  const handleStart = () => {
    if (playBlip) playBlip(650);
    setIsActive(true);
    setIsPaused(false);
    if (showToast) showToast('Auto-Scroll Presentation Mode Activated ▶');
  };

  const handleStop = () => {
    if (playBlip) playBlip(400);
    setIsActive(false);
    setIsPaused(false);
    if (showToast) showToast('Auto-Scroll Stopped ⏹');
  };

  const handleTogglePause = () => {
    if (playBlip) playBlip(550);
    setIsPaused((prev) => !prev);
  };

  const cycleSpeed = () => {
    if (playBlip) playBlip(600);
    setSpeedIndex((prev) => (prev + 1) % SPEEDS.length);
  };

  return (
    <aside className="auto-scroll-dock" aria-label="Auto Scroll Tour">
      {!isActive ? (
        <button
          type="button"
          className="auto-scroll-launch-btn"
          onClick={handleStart}
          title="Start Hands-Free Showcase Tour (Auto-Scroll)"
          aria-label="Start Auto-Scroll Tour"
        >
          <div className="launch-pulse-ring" />
          <i className="fa-solid fa-play" />
          <span className="launch-text">Auto Tour</span>
        </button>
      ) : (
        <div className={`auto-scroll-active-bar ${isPaused ? 'paused' : ''}`}>
          <div className="auto-scroll-glow" />

          {/* Pause / Resume Button */}
          <button
            type="button"
            className="autoscroll-btn pause-btn"
            onClick={handleTogglePause}
            title={isPaused ? 'Resume Auto-Scroll' : 'Pause Auto-Scroll'}
          >
            <i className={`fa-solid ${isPaused ? 'fa-play text-cyan' : 'fa-pause'}`} />
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Speed Selector Button (0.5x to 5.0x) */}
          <button
            type="button"
            className={`autoscroll-btn speed-btn ${speedIndex >= 3 ? 'speed-boost' : ''}`}
            onClick={cycleSpeed}
            title="Cycle Auto-Scroll Speed (0.5x, 1.0x, 2.0x, 3.0x, 5.0x)"
          >
            <i className={`fa-solid ${speedIndex === 4 ? 'fa-forward-fast text-yellow' : speedIndex === 3 ? 'fa-bolt text-cyan' : 'fa-gauge-high'}`} />
            <span>{SPEEDS[speedIndex].label}</span>
          </button>

          {/* Progress Percentage Badge */}
          <div className="autoscroll-progress-badge" title="Page Scrolled">
            <span className="progress-num">{progress}%</span>
          </div>

          {/* Stop / Exit Button */}
          <button
            type="button"
            className="autoscroll-btn stop-btn"
            onClick={handleStop}
            title="Exit Auto-Scroll Showcase"
          >
            <i className="fa-solid fa-stop" />
          </button>
        </div>
      )}
    </aside>
  );
}
