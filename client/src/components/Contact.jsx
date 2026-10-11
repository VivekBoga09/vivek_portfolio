import React, { useState } from 'react';

export default function Contact({ copyToClipboard, showToast, playBlip }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gmailDirectUrl, setGmailDirectUrl] = useState('');
  const [mailtoUri, setMailtoUri] = useState('');
  const [sentViaSmtp, setSentViaSmtp] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject.';
    if (!formData.message.trim()) errs.message = 'Please provide a message.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      playBlip(320);
      return;
    }

    setIsSubmitting(true);
    playBlip(680);

    const emailSubject = `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`;
    const emailBody = `Dear Boga Vivek,\n\n${formData.message}\n\n---\nSent by: ${formData.name}\nEmail: ${formData.email}\nReceived via: Boga Vivek MERN Portfolio`;
    const fallbackGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vivekboga2006@gmail.com&su=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    const fallbackMailto = `mailto:vivekboga2006@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    try {
      // POST to MERN Backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        const gUrl = result.gmailDirectUrl || fallbackGmailUrl;
        const mUri = result.mailtoUri || fallbackMailto;
        setGmailDirectUrl(gUrl);
        setMailtoUri(mUri);
        setSentViaSmtp(!!result.emailSentViaSmtp);

        if (result.emailSentViaSmtp) {
          showToast('Message sent directly to Boga Vivek via Gmail SMTP!');
        } else {
          showToast('Saved to MongoDB! Opening Gmail to confirm & send...');
          setTimeout(() => {
            window.open(gUrl, '_blank');
          }, 600);
        }
        playBlip(880);
      } else {
        throw new Error(result.error || 'Server submission failed');
      }
    } catch (err) {
      console.warn('API error, executing client Gmail fallback:', err);
      setIsSubmitted(true);
      setGmailDirectUrl(fallbackGmailUrl);
      setMailtoUri(fallbackMailto);
      setSentViaSmtp(false);
      showToast('Opening Gmail Web with your pre-filled message...');
      window.open(fallbackGmailUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// Let's Connect</span>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Interested in offering an internship, collaborating on a project, or exploring technical opportunities? My inbox is always open!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Methods */}
          <div className="contact-info-col">
            <div className="glass-card contact-detail-card">
              <h3 className="card-heading">
                <i className="fa-solid fa-paper-plane" /> Contact Channels
              </h3>

              <div className="contact-methods">
                {/* Email */}
                <div className="c-method-item">
                  <div className="c-icon">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div className="c-text">
                    <span className="c-label">Direct Email</span>
                    <a href="mailto:vivekboga2006@gmail.com" className="c-val">
                      vivekboga2006@gmail.com
                    </a>
                  </div>
                  <button
                    className="copy-pill-btn"
                    onClick={() => copyToClipboard('vivekboga2006@gmail.com', 'Email')}
                    title="Copy Email"
                  >
                    <i className="fa-regular fa-copy" />
                  </button>
                </div>

                {/* Phone */}
                <div className="c-method-item">
                  <div className="c-icon">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="c-text">
                    <span className="c-label">Phone / WhatsApp</span>
                    <a href="tel:+918121714172" className="c-val">
                      +91-8121714172
                    </a>
                  </div>
                  <button
                    className="copy-pill-btn"
                    onClick={() => copyToClipboard('+918121714172', 'Phone')}
                    title="Copy Phone"
                  >
                    <i className="fa-regular fa-copy" />
                  </button>
                </div>

                {/* Location */}
                <div className="c-method-item">
                  <div className="c-icon">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div className="c-text">
                    <span className="c-label">Base Location</span>
                    <span className="c-val">Hyderabad, Telangana, India (IST / UTC+5:30)</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="c-method-item">
                  <div className="c-icon">
                    <i className="fa-brands fa-linkedin" />
                  </div>
                  <div className="c-text">
                    <span className="c-label">LinkedIn</span>
                    <a
                      href="https://linkedin.com/in/vivekboga"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-val"
                    >
                      linkedin.com/in/vivekboga
                    </a>
                  </div>
                  <a
                    href="https://linkedin.com/in/vivekboga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ext-btn"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </div>

                {/* GitHub */}
                <div className="c-method-item">
                  <div className="c-icon">
                    <i className="fa-brands fa-github" />
                  </div>
                  <div className="c-text">
                    <span className="c-label">GitHub</span>
                    <a
                      href="https://github.com/VivekBoga09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-val"
                    >
                      github.com/VivekBoga09
                    </a>
                  </div>
                  <a
                    href="https://github.com/VivekBoga09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ext-btn"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </div>
              </div>

              {/* Status Banner */}
              <div className="availability-card">
                <div className="avail-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div className="avail-text">
                  <strong>Current Status:</strong> Actively interviewing for 2025/2026 Software Development Engineer (SDE) internships. Available for remote or in-person roles in Hyderabad & across India.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="contact-form-col">
            <div className="glass-card contact-form-card">
              <h3 className="card-heading">
                <i className="fa-solid fa-comment-dots" /> Send a Direct Message
              </h3>
              <p className="form-intro">
                Submissions are processed through the MERN Express REST API and stored directly in the database.
              </p>

              {!isSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Your Name <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-user" />
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="e.g. Satya Nadella"
                          required
                        />
                      </div>
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Your Email <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-at" />
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="e.g. recruiter@company.com"
                          required
                        />
                      </div>
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject / Purpose <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <i className="fa-solid fa-bookmark" />
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. SDE Internship Opportunity"
                        required
                      />
                    </div>
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Message <span className="req">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control textarea"
                      rows="5"
                      placeholder="Hi Vivek, we came across your portfolio and were impressed by your MERN projects and LeetCode rating..."
                      required
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  <div className="gmail-quick-hint">
                    <i className="fa-brands fa-google text-red" /> Prefer sending directly from your Gmail?{' '}
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=vivekboga2006@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan underline"
                    >
                      Open Gmail Web Compose
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin" /> Processing & Connecting to Gmail...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane" /> Send Message via Gmail & Database
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="form-success-banner">
                  <div className="success-icon">
                    <i className="fa-solid fa-circle-check text-green" />
                  </div>
                  <div className="success-content">
                    <h4>{sentViaSmtp ? 'Delivered via Gmail SMTP!' : 'Message Stored in Database!'}</h4>
                    <p>
                      {sentViaSmtp
                        ? 'Your message was successfully transmitted directly to vivekboga2006@gmail.com via Gmail SMTP and saved in MongoDB.'
                        : 'Your message has been safely saved into Vivek\'s portfolio database. Click below to verify or deliver directly from your Gmail account:'}
                    </p>

                    <div className="success-action-buttons" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                      {gmailDirectUrl && (
                        <a
                          href={gmailDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fa-brands fa-google" /> Send via Gmail Web
                        </a>
                      )}
                      {mailtoUri && (
                        <a href={mailtoUri} className="btn btn-secondary btn-sm">
                          <i className="fa-solid fa-envelope" /> Default Mail App
                        </a>
                      )}
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                      >
                        Send Another
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
