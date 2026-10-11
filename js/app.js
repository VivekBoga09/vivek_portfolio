/**
 * Boga Vivek - Portfolio Interactive Engine (js/app.js)
 * Implements Photo/3D Avatar Toggle, Theme & Sound Controls, 3D Tilt,
 * Modals, Direct Gmail Integration, and Particle Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Audio Synthesizer (Web Audio API)
  // -------------------------------------------------------------
  let soundEnabled = true;
  let audioCtx = null;

  function playBlip(freq = 520, duration = 0.05) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  if (soundBtn && soundIcon) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIcon.className = 'fa-solid fa-volume-high';
        playBlip(750);
        showToast('UI Sound Effects: Enabled 🔊');
      } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        showToast('UI Sound Effects: Muted 🔇');
      }
    });
  }

  // -------------------------------------------------------------
  // 2. Toast Notification Helper
  // -------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // -------------------------------------------------------------
  // 3. Theme Toggle Engine
  // -------------------------------------------------------------
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themes = ['cyberpunk', 'matrix', 'obsidian', 'light'];
  let currentThemeIdx = 0;

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      playBlip(620);
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const newTheme = themes[currentThemeIdx];
      document.documentElement.setAttribute('data-theme', newTheme);
      showToast(`Switched theme to: ${newTheme.toUpperCase()}`);
      if (themeIcon) {
        themeIcon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  }

  // -------------------------------------------------------------
  // 4. Hero Avatar: Real Photo vs 3D Avatar Toggle (Placed on Top)
  // -------------------------------------------------------------
  const photoSwitchReal = document.getElementById('photo-switch-real');
  const photoSwitchAvatar = document.getElementById('photo-switch-avatar');
  const heroAvatarImg = document.getElementById('hero-avatar-img');

  if (photoSwitchReal && photoSwitchAvatar && heroAvatarImg) {
    photoSwitchReal.addEventListener('click', () => {
      playBlip(600);
      photoSwitchReal.classList.add('active');
      photoSwitchAvatar.classList.remove('active');
      heroAvatarImg.src = 'assets/images/linkedin_photo.jpg';
      heroAvatarImg.alt = 'Boga Vivek - Real Portrait';
      showToast('Switched to Real Portrait 📸');
    });

    photoSwitchAvatar.addEventListener('click', () => {
      playBlip(650);
      photoSwitchAvatar.classList.add('active');
      photoSwitchReal.classList.remove('active');
      heroAvatarImg.src = 'assets/images/avatar.jpg';
      heroAvatarImg.alt = 'Boga Vivek - 3D Rendered Avatar';
      showToast('Switched to 3D Avatar ✨');
    });
  }

  // -------------------------------------------------------------
  // 5. 3D Card Tilt Effect on Mouse Move
  // -------------------------------------------------------------
  const avatarCard = document.getElementById('avatar-card');
  if (avatarCard) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -12;
      const rotY = ((x - centerX) / centerX) * 12;
      avatarCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // -------------------------------------------------------------
  // 6. Interactive Cursor Glow
  // -------------------------------------------------------------
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  }

  // -------------------------------------------------------------
  // 7. Dynamic Typing Effect
  // -------------------------------------------------------------
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const roles = [
      'Full-Stack MERN Web Applications',
      'High-Performance Backend Microservices',
      'Autonomous Web Automations & Bots',
      'Competitive Coding & DSA Solutions',
      'Smart Smart Green Corridor Systems'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 30 : 60;
      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }
      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // -------------------------------------------------------------
  // 8. Modals Manager (Resume & Projects)
  // -------------------------------------------------------------
  const openResumeBtns = [
    document.getElementById('open-resume-btn'),
    document.getElementById('hero-resume-btn')
  ].filter(Boolean);

  const modalResume = document.getElementById('modal-resume');

  openResumeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playBlip(700);
      if (modalResume) modalResume.classList.add('active');
    });
  });

  // Generic Modal Close
  document.querySelectorAll('[data-close]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      const modalId = closeBtn.getAttribute('data-close');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        playBlip(400);
        targetModal.classList.remove('active');
      }
    });
  });

  // Close modals on clicking outside backdrop
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        playBlip(400);
        backdrop.classList.remove('active');
      }
    });
  });

  // Close modals with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach((modal) => {
        modal.classList.remove('active');
      });
    }
  });

  // Project cards with modal trigger buttons
  document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        playBlip(700);
        modal.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------
  // 9. Contact Form & Direct Gmail Integration
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formSuccessBanner = document.getElementById('form-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      playBlip(800);

      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || '';
      const message = document.getElementById('contact-message')?.value || '';

      const submitBtn = document.getElementById('submit-form-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending & Preparing Gmail...';
      }

      // Try sending to MERN API backend
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });
      } catch (err) {
        console.log('[Contact Form] Operating in offline mode:', err);
      }

      // Prepare Direct Gmail Compose URL
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vivekboga2006@gmail.com&su=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Hi Vivek,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Boga Vivek Portfolio`
      )}`;

      // Open Gmail Web Compose in a new tab
      window.open(gmailUrl, '_blank');

      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'flex';
      }

      showToast('Opening Gmail Web Compose with pre-filled message! ✉️');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Dispatched';
      }
      contactForm.reset();
    });
  }

  // -------------------------------------------------------------
  // 10. Scroll Progress Bar & Back to Top
  // -------------------------------------------------------------
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playBlip(600);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------
  // 11. Interactive Ambient Particle Canvas
  // -------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(99, 102, 241, 0.4)'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // -------------------------------------------------------------
  // 12. Save Resume as PDF / Print Engine (Isolated Iframe, 0 Blank Pages)
  // -------------------------------------------------------------
  function printIsolatedResume() {
    playBlip(750);
    const resumeEl = document.getElementById('printable-resume');
    if (!resumeEl) {
      window.print();
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Boga_Vivek_Resume</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #0f172a;
              background: #ffffff;
              padding: 10mm 14mm;
              font-size: 9.5pt;
              line-height: 1.35;
              width: 100%;
            }
            @page {
              size: A4 portrait;
              margin: 8mm 12mm;
            }
            .res-header {
              border-bottom: 2pt solid #0f172a;
              padding-bottom: 6pt;
              margin-bottom: 8pt;
            }
            .res-name {
              font-size: 20pt;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: 0.5px;
              margin-bottom: 2pt;
              line-height: 1.1;
            }
            .res-subtitle {
              font-size: 9.5pt;
              font-weight: 600;
              color: #334155;
              margin-bottom: 4pt;
            }
            .res-contact-bar {
              display: flex;
              flex-wrap: wrap;
              gap: 12pt;
              font-size: 8.5pt;
              color: #475569;
            }
            .res-contact-bar i {
              display: none;
            }
            .res-section {
              margin-bottom: 8pt;
              page-break-inside: avoid;
            }
            .res-section-title {
              font-size: 10pt;
              font-weight: 800;
              color: #0f172a;
              border-bottom: 1pt solid #cbd5e1;
              padding-bottom: 2pt;
              margin-bottom: 4pt;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .res-entry {
              margin-bottom: 6pt;
              page-break-inside: avoid;
            }
            .res-entry-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              font-size: 9pt;
              margin-bottom: 1.5pt;
            }
            .res-entry-header strong {
              color: #0f172a;
              font-weight: 700;
            }
            .res-entry-header em {
              color: #475569;
              font-style: italic;
            }
            .res-entry-right {
              text-align: right;
              font-size: 8.5pt;
            }
            .res-badge {
              background: #f1f5f9;
              color: #0f172a;
              border: 1pt solid #cbd5e1;
              padding: 1pt 5pt;
              border-radius: 3pt;
              font-size: 8pt;
              font-weight: 700;
            }
            .res-tech-line {
              font-size: 8pt;
              color: #475569;
              font-style: italic;
            }
            .res-bullets {
              padding-left: 14pt;
              margin-top: 2pt;
              margin-bottom: 3pt;
            }
            .res-bullets li {
              font-size: 8.2pt;
              line-height: 1.35;
              margin-bottom: 2pt;
              color: #1e293b;
            }
            .res-skills-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2.5pt;
              font-size: 8.2pt;
              line-height: 1.35;
            }
            .res-text {
              font-size: 8.2pt;
              line-height: 1.35;
              color: #1e293b;
            }
            a {
              color: #0f172a;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          ${resumeEl.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 3500);
    }, 400);
  }

  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', printIsolatedResume);
  }

  const printResFooterBtn = document.getElementById('print-res-footer-btn');
  if (printResFooterBtn) {
    printResFooterBtn.addEventListener('click', printIsolatedResume);
  }

  // -------------------------------------------------------------
  // 14. Auto-Scroll Showcase Tour Engine
  // -------------------------------------------------------------
  const autoScrollLaunchBtn = document.getElementById('auto-scroll-launch-btn');
  const autoScrollActiveBar = document.getElementById('auto-scroll-active-bar');
  const autoscrollToggleBtn = document.getElementById('autoscroll-toggle-btn');
  const autoscrollToggleIcon = document.getElementById('autoscroll-toggle-icon');
  const autoscrollToggleText = document.getElementById('autoscroll-toggle-text');
  const autoscrollSpeedBtn = document.getElementById('autoscroll-speed-btn');
  const autoscrollSpeedText = document.getElementById('autoscroll-speed-text');
  const autoscrollProgressText = document.getElementById('autoscroll-progress-text');
  const autoscrollStopBtn = document.getElementById('autoscroll-stop-btn');

  if (autoScrollLaunchBtn && autoScrollActiveBar) {
    let isAutoScrolling = false;
    let isAutoScrollPaused = false;
    let scrollSpeedIdx = 1; // 0: 0.8, 1: 1.6, 2: 3.2
    let autoScrollRaf = null;
    let userPauseTimer = null;
    let lastFrameTime = performance.now();

    const scrollSpeeds = [
      { label: '0.5x', val: 0.8 },
      { label: '1.0x', val: 1.6 },
      { label: '2.0x', val: 3.2 },
      { label: '3.0x', val: 4.8 },
      { label: '5.0x', val: 8.0 }
    ];

    function updateProgressBadge() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
        if (autoscrollProgressText) {
          autoscrollProgressText.textContent = `${pct}%`;
        }
      }
    }

    window.addEventListener('scroll', updateProgressBadge, { passive: true });

    function stepAutoScroll(now) {
      if (!isAutoScrolling || isAutoScrollPaused) {
        return;
      }

      const delta = now - lastFrameTime;
      lastFrameTime = now;

      const px = scrollSpeeds[scrollSpeedIdx].val * (delta / 16.67);
      window.scrollBy({ top: px, behavior: 'auto' });

      // Check bottom
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
      if (atBottom) {
        stopAutoScroll();
        playBlip(750);
        showToast('Auto-Scroll Showcase Finished! 🚀');
        return;
      }

      autoScrollRaf = requestAnimationFrame(stepAutoScroll);
    }

    function startAutoScroll() {
      isAutoScrolling = true;
      isAutoScrollPaused = false;
      lastFrameTime = performance.now();

      autoScrollLaunchBtn.style.display = 'none';
      autoScrollActiveBar.style.display = 'inline-flex';
      autoScrollActiveBar.classList.remove('paused');

      if (autoscrollToggleIcon) autoscrollToggleIcon.className = 'fa-solid fa-pause';
      if (autoscrollToggleText) autoscrollToggleText.textContent = 'Pause';

      playBlip(650);
      showToast('Auto-Scroll Tour Started ▶');

      if (autoScrollRaf) cancelAnimationFrame(autoScrollRaf);
      autoScrollRaf = requestAnimationFrame(stepAutoScroll);
    }

    function pauseAutoScroll(temporary = false) {
      isAutoScrollPaused = true;
      if (autoScrollRaf) cancelAnimationFrame(autoScrollRaf);

      autoScrollActiveBar.classList.add('paused');
      if (autoscrollToggleIcon) autoscrollToggleIcon.className = 'fa-solid fa-play text-cyan';
      if (autoscrollToggleText) autoscrollToggleText.textContent = 'Resume';

      if (temporary) {
        if (userPauseTimer) clearTimeout(userPauseTimer);
        userPauseTimer = setTimeout(() => {
          if (isAutoScrolling && isAutoScrollPaused) {
            resumeAutoScroll();
          }
        }, 3200);
      }
    }

    function resumeAutoScroll() {
      if (!isAutoScrolling) return;
      isAutoScrollPaused = false;
      lastFrameTime = performance.now();

      autoScrollActiveBar.classList.remove('paused');
      if (autoscrollToggleIcon) autoscrollToggleIcon.className = 'fa-solid fa-pause';
      if (autoscrollToggleText) autoscrollToggleText.textContent = 'Pause';

      if (autoScrollRaf) cancelAnimationFrame(autoScrollRaf);
      autoScrollRaf = requestAnimationFrame(stepAutoScroll);
    }

    function stopAutoScroll() {
      isAutoScrolling = false;
      isAutoScrollPaused = false;
      if (autoScrollRaf) cancelAnimationFrame(autoScrollRaf);
      if (userPauseTimer) clearTimeout(userPauseTimer);

      autoScrollActiveBar.style.display = 'none';
      autoScrollActiveBar.classList.remove('paused');
      autoScrollLaunchBtn.style.display = 'flex';
    }

    autoScrollLaunchBtn.addEventListener('click', startAutoScroll);

    if (autoscrollToggleBtn) {
      autoscrollToggleBtn.addEventListener('click', () => {
        playBlip(550);
        if (isAutoScrollPaused) {
          resumeAutoScroll();
        } else {
          pauseAutoScroll(false);
        }
      });
    }

    if (autoscrollSpeedBtn) {
      autoscrollSpeedBtn.addEventListener('click', () => {
        playBlip(600);
        scrollSpeedIdx = (scrollSpeedIdx + 1) % scrollSpeeds.length;
        if (autoscrollSpeedText) {
          autoscrollSpeedText.textContent = scrollSpeeds[scrollSpeedIdx].label;
        }
        if (scrollSpeedIdx >= 3) {
          autoscrollSpeedBtn.classList.add('speed-boost');
        } else {
          autoscrollSpeedBtn.classList.remove('speed-boost');
        }
      });
    }

    if (autoscrollStopBtn) {
      autoscrollStopBtn.addEventListener('click', () => {
        playBlip(400);
        stopAutoScroll();
        showToast('Auto-Scroll Stopped ⏹');
      });
    }

    // Auto-pause when user touches or scrolls with mouse wheel
    const handleUserScrollGesture = () => {
      if (isAutoScrolling && !isAutoScrollPaused) {
        pauseAutoScroll(true);
      }
    };

    window.addEventListener('wheel', handleUserScrollGesture, { passive: true });
    window.addEventListener('touchmove', handleUserScrollGesture, { passive: true });
  }

  console.log('[Boga Vivek Portfolio] Interactive engine loaded successfully.');
});
