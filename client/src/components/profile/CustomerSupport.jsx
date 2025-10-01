import React, { useState } from 'react';
import { apiFetch } from '../../api/apiHelper'; // Use the reliable fetch helper

const CustomerSupport = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/support', {
        method: 'POST',
        body: JSON.stringify({ subject, message }),
      });
      setSuccess('Your support request has been submitted successfully!');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="support-container">
      <h2>Customer Support</h2>
      <p>Have an issue or a question? Fill out the form below and we'll get back to you.</p>
      
      <div className="profile-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="e.g., Issue with my last order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Please describe your issue in detail..."
            ></textarea>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSupport;