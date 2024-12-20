"use client"; // Enables client-side interactivity

import React, { useState } from 'react';

export default function RegisterPage() {
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error messages

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed.');
        return;
      }

      // Redirect to login after successful registration
      window.location.href = '/login';
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card auth-card">
        {/* Header */}
        <div className="card-header text-center">
          <i className="fas fa-user-plus auth-icon"></i>
          <h2>Create Account</h2>
        </div>

        {/* Body */}
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <i className="fas fa-user me-2"></i>Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope me-2"></i>Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-2"></i>Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              <i className="fas fa-user-plus me-2"></i>Register
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="auth-footer text-center">
          <p className="mb-0">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
