import React, { useState, useEffect, useRef } from 'react';

export default function TrafficSimulatorModal({ isOpen, onClose, playBlip }) {
  const canvasRef = useRef(null);
  const [ambulanceActive, setAmbulanceActive] = useState(false);
  const [corridorStats, setCorridorStats] = useState({
    status: 'NORMAL_CYCLE',
    timeSaved: 0,
    activePhase: 'NORTH_SOUTH_GREEN',
    speed: 0
  });

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Simulation Entities
    const width = (canvas.width = 600);
    const height = (canvas.height = 420);

    let tick = 0;
    let ambulanceY = height + 40;
    let isAmbulancePassing = false;

    // Cars array
    const normalCars = [
      { x: 120, y: 190, vx: 2, vy: 0, color: '#38bdf8', dir: 'east' },
      { x: 480, y: 225, vx: -2, vy: 0, color: '#f59e0b', dir: 'west' },
      { x: 275, y: 60, vx: 0, vy: 1.8, color: '#a855f7', dir: 'south' }
    ];

    const render = () => {
      tick++;

      // Background Asphalt
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Roads
      ctx.fillStyle = '#1e293b';
      // Vertical Road (Ambulance lane)
      ctx.fillRect(240, 0, 120, height);
      // Horizontal Road
      ctx.fillRect(0, 150, width, 120);

      // Intersection box
      ctx.fillStyle = '#334155';
      ctx.fillRect(240, 150, 120, 120);

      // Lane Dash Lines
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);

      // Vertical road dividers
      ctx.beginPath();
      ctx.moveTo(300, 0);
      ctx.lineTo(300, 150);
      ctx.moveTo(300, 270);
      ctx.lineTo(300, height);
      ctx.stroke();

      // Horizontal road dividers
      ctx.beginPath();
      ctx.moveTo(0, 210);
      ctx.lineTo(240, 210);
      ctx.moveTo(360, 210);
      ctx.lineTo(width, 210);
      ctx.stroke();
      ctx.setLineDash([]);

      // Traffic Signals
      // North-South (Ambulance corridor) & East-West
      const nsGreen = isAmbulancePassing || (!isAmbulancePassing && Math.floor(tick / 180) % 2 === 0);
      const ewGreen = !nsGreen;

      // Draw Traffic Lights
      // North Light
      drawTrafficLight(ctx, 215, 125, nsGreen);
      // South Light
      drawTrafficLight(ctx, 365, 275, nsGreen);
      // East Light
      drawTrafficLight(ctx, 365, 125, ewGreen);
      // West Light
      drawTrafficLight(ctx, 215, 275, ewGreen);

      // Normal Cars movement
      normalCars.forEach((car) => {
        if (car.dir === 'east') {
          // Eastbound stops if light is red before intersection
          if (!ewGreen && car.x > 180 && car.x < 240) {
            // stopped
          } else {
            car.x += car.vx;
            if (car.x > width + 40) car.x = -40;
          }
        } else if (car.dir === 'west') {
          if (!ewGreen && car.x < 420 && car.x > 360) {
            // stopped
          } else {
            car.x += car.vx;
            if (car.x < -40) car.x = width + 40;
          }
        } else if (car.dir === 'south') {
          if (!nsGreen && car.y > 90 && car.y < 150) {
            // stopped
          } else {
            car.y += car.vy;
            if (car.y > height + 40) car.y = -40;
          }
        }

        // Draw car
        ctx.fillStyle = car.color;
        ctx.beginPath();
        ctx.roundRect(car.x, car.y, 32, 18, 4);
        ctx.fill();
      });

      // Ambulance Logic
      if (ambulanceActive) {
        isAmbulancePassing = true;
        ambulanceY -= 3.5;

        // Draw Green Corridor Glow on Lane
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fillRect(240, 0, 60, height);

        // Emergency Vehicle Body
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.roundRect(260, ambulanceY, 28, 54, 6);
        ctx.fill();

        // White Cross on Roof
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(271, ambulanceY + 16, 6, 22);
        ctx.fillRect(264, ambulanceY + 24, 20, 6);

        // Flashing Strobe Lights (Red / Blue)
        const strobeColor = tick % 16 < 8 ? '#38bdf8' : '#ef4444';
        ctx.fillStyle = strobeColor;
        ctx.beginPath();
        ctx.arc(274, ambulanceY + 8, 5, 0, Math.PI * 2);
        ctx.fill();

        // Siren Wave Ring
        ctx.strokeStyle = strobeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(274, ambulanceY + 8, 12 + (tick % 18), 0, Math.PI * 2);
        ctx.stroke();

        setCorridorStats({
          status: 'EMERGENCY_GREEN_CORRIDOR_ACTIVE',
          timeSaved: Math.min(185, Math.floor((height - ambulanceY) * 0.45)),
          activePhase: 'NORTH_CORRIDOR_PRIORITY',
          speed: 68
        });

        if (ambulanceY < -70) {
          ambulanceY = height + 40;
          setAmbulanceActive(false);
          isAmbulancePassing = false;
          setCorridorStats({
            status: 'NORMAL_CYCLE',
            timeSaved: 185,
            activePhase: 'NORTH_SOUTH_GREEN',
            speed: 0
          });
        }
      } else {
        isAmbulancePassing = false;
        ambulanceY = height + 40;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen, ambulanceActive]);

  const drawTrafficLight = (ctx, x, y, isGreen) => {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(x - 6, y - 14, 12, 28, 3);
    ctx.fill();

    // Red light
    ctx.fillStyle = isGreen ? '#450a0a' : '#ef4444';
    ctx.beginPath();
    ctx.arc(x, y - 7, 4, 0, Math.PI * 2);
    ctx.fill();

    // Green light
    ctx.fillStyle = isGreen ? '#10b981' : '#022c22';
    ctx.beginPath();
    ctx.arc(x, y + 7, 4, 0, Math.PI * 2);
    ctx.fill();

    if (isGreen) {
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
    } else {
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 8;
    }
    ctx.shadowBlur = 0;
  };

  const handleTriggerDispatch = () => {
    if (playBlip) playBlip(880);
    setAmbulanceActive(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div
        className="modal-dialog glass-card traffic-sim-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Ambulance Traffic Control Simulator"
      >
        <div className="modal-header">
          <div className="ai-header-title-wrap">
            <div className="ai-avatar-pill" style={{ color: '#10b981', borderColor: '#10b981' }}>
              <i className="fa-solid fa-truck-medical" />
            </div>
            <div>
              <h3 className="modal-title">Ambulance Priority Green Corridor Simulator</h3>
              <p className="ai-subtitle">
                Live 2D Intersection Telemetry • Express.js & MongoDB Signal Prioritization Logic
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body traffic-modal-body">
          {/* Telemetry Dashboard */}
          <div className="telemetry-bar">
            <div className="telemetry-item">
              <span className="telemetry-label">System State</span>
              <span className={`telemetry-val ${ambulanceActive ? 'text-green animate-pulse' : 'text-cyan'}`}>
                {corridorStats.status}
              </span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Signal Wave</span>
              <span className="telemetry-val text-yellow">{corridorStats.activePhase}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Emergency Speed</span>
              <span className="telemetry-val">{corridorStats.speed} km/h</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Wait Time Saved</span>
              <span className="telemetry-val text-green">+{corridorStats.timeSaved}s</span>
            </div>
          </div>

          {/* 2D Canvas Viewport */}
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="traffic-canvas" />
          </div>

          <div className="sim-controls-row">
            <button
              className="btn btn-primary dispatch-btn"
              onClick={handleTriggerDispatch}
              disabled={ambulanceActive}
            >
              <i className="fa-solid fa-bolt" />
              {ambulanceActive ? 'Ambulance Transiting Corridor...' : 'Dispatch Emergency Ambulance (Spawn)'}
            </button>
            <span className="sim-instruction-hint">
              <i className="fa-solid fa-circle-info text-cyan" /> Watch cross-traffic automatically stop at RED as the automated green corridor clears the intersection.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
