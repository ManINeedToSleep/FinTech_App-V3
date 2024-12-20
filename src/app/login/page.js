"use client"; // This makes the component interactive

import React, { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error messages

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      // Redirect to dashboard if login is successful
      window.location.href = '/dashboard';
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card auth-card">
        {/* Header */}
        <div className="card-header text-center">
          <i className="fas fa-wallet auth-icon"></i>
          <h2>Welcome Back</h2>
        </div>

        {/* Body */}
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
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
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="auth-footer text-center">
          <p className="mb-0">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
