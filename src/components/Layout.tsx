import React from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="flex-grow pt-20" role="main">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
