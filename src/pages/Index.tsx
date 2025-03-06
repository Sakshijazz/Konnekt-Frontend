import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="bankify-landing">
      <header>
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90">
              Bankify
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link to="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link>
            <Link to="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="#contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigate("/login")} 
              variant="outline"
              className="flex items-center"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90 text-white flex items-center"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start text-center">
              <h1 className="hero-title">Banking Made Simple</h1>
              <p className="hero-subtitle">Manage your finances with ease, anytime, anywhere.</p>
              <Button onClick={() => navigate("/register")} className="btn-get-started">Get Started</Button>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Banking App Preview" className="mobile-app-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Bankify?</h2>
            <p className="text-muted">Discover the features that make us different</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">💳</div>
                <h3>Easy Payments</h3>
                <p>Send money to anyone, anywhere with just a few taps. No hidden fees, no complications.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Banking</h3>
                <p>Your security is our priority. Advanced encryption and authentication protect your data.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Financial Insights</h3>
                <p>Gain valuable insights into your spending habits and make informed financial decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section" id="testimonials">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Customers Say</h2>
            <p className="text-muted">Join thousands of satisfied customers</p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="testimonial-card">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" className="testimonial-avatar" alt="Customer" />
                  <div>
                    <h5 className="mb-0">Sarah Johnson</h5>
                    <small className="text-muted">Small Business Owner</small>
                  </div>
                </div>
                <p>"Bankify has transformed how I manage my business finances. The user interface is intuitive and the mobile app is simply amazing!"</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-card">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" className="testimonial-avatar" alt="Customer" />
                  <div>
                    <h5 className="mb-0">Michael Torres</h5>
                    <small className="text-muted">Software Developer</small>
                  </div>
                </div>
                <p>"The budgeting tools and spending insights have helped me save more than I ever thought possible. Highly recommended!"</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-card">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" className="testimonial-avatar" alt="Customer" />
                  <div>
                    <h5 className="mb-0">Emily Chen</h5>
                    <small className="text-muted">Graduate Student</small>
                  </div>
                </div>
                <p>"As a student, I love how easy Bankify makes tracking my expenses. The automatic categorization feature is a game-changer!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5" id="pricing">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted">Choose the plan that fits your needs</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-5">
                  <h3 className="card-title">Basic</h3>
                  <div className="my-3">
                    <span className="display-4 fw-bold">$0</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="list-unstyled text-start">
                    <li className="mb-2">✅ Free transfers</li>
                    <li className="mb-2">✅ Basic financial insights</li>
                    <li className="mb-2">✅ Mobile app access</li>
                    <li className="mb-2 text-muted">❌ Advanced budgeting tools</li>
                    <li className="mb-2 text-muted">❌ Priority support</li>
                  </ul>
                  <button className="btn btn-outline-primary w-100 mt-3">Get Started</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-primary">
                <div className="card-body text-center p-5">
                  <div className="badge bg-primary mb-2">Most Popular</div>
                  <h3 className="card-title">Premium</h3>
                  <div className="my-3">
                    <span className="display-4 fw-bold">$5</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="list-unstyled text-start">
                    <li className="mb-2">✅ Unlimited transfers</li>
                    <li className="mb-2">✅ Advanced financial insights</li>
                    <li className="mb-2">✅ Mobile app access</li>
                    <li className="mb-2">✅ Advanced budgeting tools</li>
                    <li className="mb-2 text-muted">❌ Priority support</li>
                  </ul>
                  <button className="btn btn-primary w-100 mt-3">Get Started</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-5">
                  <h3 className="card-title">Business</h3>
                  <div className="my-3">
                    <span className="display-4 fw-bold">$15</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="list-unstyled text-start">
                    <li className="mb-2">✅ Unlimited transfers</li>
                    <li className="mb-2">✅ Business financial insights</li>
                    <li className="mb-2">✅ Mobile app access</li>
                    <li className="mb-2">✅ Advanced budgeting tools</li>
                    <li className="mb-2">✅ Priority support</li>
                  </ul>
                  <button className="btn btn-outline-primary w-100 mt-3">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4">Ready to transform your banking experience?</h2>
              <p className="mb-4">Join thousands of satisfied customers who have switched to Bankify.</p>
              <Button onClick={() => navigate("/register")} className="btn btn-get-started">Join Now</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="card shadow">
                <div className="card-body p-5">
                  <h3 className="text-center mb-4">Contact Us</h3>
                  <form id="contactForm">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea className="form-control" id="message" rows={5} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h4 className="text-white mb-4">Bankify</h4>
              <p className="text-white-50">Making banking simple, secure, and accessible for everyone. Your trusted financial partner.</p>
            </div>
            <div className="col-lg-2">
              <h5 className="text-white mb-4">Company</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">About Us</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Careers</a></li>
                <li className="mb-2"><a href="#" className="footer-link">News</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Partners</a></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h5 className="text-white mb-4">Resources</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Blog</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Help Center</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Guides</a></li>
                <li className="mb-2"><a href="#" className="footer-link">API Docs</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5 className="text-white mb-4">Stay Connected</h5>
              <p className="text-white-50">Subscribe to our newsletter for updates</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email address" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="mt-5 border-white-50" />
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-white-50 mb-0">© 2023 Bankify. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="footer-link me-3">Privacy Policy</a>
              <a href="#" className="footer-link me-3">Terms of Service</a>
              <a href="#" className="footer-link">Security</a>
            </div>
          </div>
        </div>
      </footer>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      
      <style>
        {`
        :root {
          --primary-color: #0d6efd;
          --secondary-color: #6c757d;
          --light-color: #f8f9fa;
          --dark-color: #212529;
          --success-color: #28a745;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #0d6efd 0%, #0099ff 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .features-section {
          padding: 80px 0;
          background-color: var(--light-color);
        }
        
        .feature-card {
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          background-color: white;
          height: 100%;
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        
        .testimonial-section {
          background-color: white;
          padding: 80px 0;
        }
        
        .testimonial-card {
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          margin: 20px 0;
        }
        
        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }
        
        .cta-section {
          background: linear-gradient(90deg, #0d6efd 0%, #0099ff 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }
        
        footer {
          background-color: var(--dark-color);
          color: white;
          padding: 40px 0;
        }
        
        .footer-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
        }
        
        .footer-link:hover {
          color: white;
        }
        
        .navbar-custom {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .btn-get-started {
          padding: 12px 30px;
          font-weight: 600;
          border-radius: 30px;
          background-color: white;
          color: var(--primary-color);
          border: none;
          transition: all 0.3s ease;
        }
        
        .btn-get-started:hover {
          background-color: rgba(255,255,255,0.9);
          transform: scale(1.05);
        }
        
        .mobile-app-img {
          max-width: 80%;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Index;
