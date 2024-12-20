import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'FinTech Banking',
  description: 'Manage your finances with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        {/* Header */}
        <header className="bg-primary text-white py-3 shadow">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="fas fa-wallet me-2"></i>
              <h1 className="h4 mb-0">FinTech Banking</h1>
            </div>
            <nav>
              <a href="/login" className="btn btn-outline-light me-2">
                <i className="fas fa-sign-in-alt me-2"></i>
                Login
              </a>
              <a href="/register" className="btn btn-light">
                <i className="fas fa-user-plus me-2"></i>
                Register
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow-1 container">{children}</main>

        {/* Footer */}
        <footer className="bg-primary text-white text-center py-3 mt-auto">
          <p className="mb-0">&copy; 2024 FinTech Banking. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
