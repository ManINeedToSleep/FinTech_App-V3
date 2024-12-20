export default function HomePage() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 text-center">
        <h2 className="text-primary">Welcome to FinTech Banking</h2>
        <p className="text-muted">
          Take control of your financial future with our powerful and intuitive finance management platform. Track your
          income, expenses, and savings all in one place.
        </p>
        <hr />
        <p className="text-secondary">Ready to start your journey to financial freedom?</p>
        <div className="mt-3 d-flex justify-content-center gap-2">
          <a href="/login" className="btn btn-primary">
            <i className="fas fa-sign-in-alt me-2"></i>
            Get Started
          </a>
          <a href="/register" className="btn btn-secondary">
            <i className="fas fa-user-plus me-2"></i>
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
