import React, { useState } from 'react';

const CustomerSupport = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ subject, message });
    alert('Your support request has been submitted!');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="support-container">
      <h2>Customer Support</h2>
      <p>Have an issue or a question? Fill out the form below and we'll get back to you.</p>
      
      {/* This wrapper helps us style the form's layout */}
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
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSupport;