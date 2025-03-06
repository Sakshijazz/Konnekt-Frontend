
import { useEffect } from "react";

// This component will inject our HTML, CSS and JavaScript into the React app
const Index = () => {
  useEffect(() => {
    // Insert the HTML content directly into the DOM
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bankify - Your Digital Banking Solution</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
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
          </style>
        </head>
        <body>
          <!-- Navigation -->
          <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
            <div class="container">
              <a class="navbar-brand fw-bold text-primary" href="#">Bankify</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="#features">Features</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#testimonials">Testimonials</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#pricing">Pricing</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact">Contact</a>
                  </li>
                  <li class="nav-item ms-lg-3">
                    <a class="btn btn-primary rounded-pill px-4" href="#" id="loginBtn">Login</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <!-- Hero Section -->
          <section class="hero-section">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-6 text-lg-start text-center">
                  <h1 class="hero-title">Banking Made Simple</h1>
                  <p class="hero-subtitle">Manage your finances with ease, anytime, anywhere.</p>
                  <button class="btn btn-get-started" id="getStartedBtn">Get Started</button>
                </div>
                <div class="col-lg-6 mt-5 mt-lg-0 text-center">
                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Banking App Preview" class="mobile-app-img">
                </div>
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section class="features-section" id="features">
            <div class="container">
              <div class="text-center mb-5">
                <h2 class="fw-bold">Why Choose Bankify?</h2>
                <p class="text-muted">Discover the features that make us different</p>
              </div>
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="feature-card">
                    <div class="feature-icon">💳</div>
                    <h3>Easy Payments</h3>
                    <p>Send money to anyone, anywhere with just a few taps. No hidden fees, no complications.</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure Banking</h3>
                    <p>Your security is our priority. Advanced encryption and authentication protect your data.</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Financial Insights</h3>
                    <p>Gain valuable insights into your spending habits and make informed financial decisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Testimonials Section -->
          <section class="testimonial-section" id="testimonials">
            <div class="container">
              <div class="text-center mb-5">
                <h2 class="fw-bold">What Our Customers Say</h2>
                <p class="text-muted">Join thousands of satisfied customers</p>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div class="testimonial-card">
                    <div class="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" class="testimonial-avatar" alt="Customer">
                      <div>
                        <h5 class="mb-0">Sarah Johnson</h5>
                        <small class="text-muted">Small Business Owner</small>
                      </div>
                    </div>
                    <p>"Bankify has transformed how I manage my business finances. The user interface is intuitive and the mobile app is simply amazing!"</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="testimonial-card">
                    <div class="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" class="testimonial-avatar" alt="Customer">
                      <div>
                        <h5 class="mb-0">Michael Torres</h5>
                        <small class="text-muted">Software Developer</small>
                      </div>
                    </div>
                    <p>"The budgeting tools and spending insights have helped me save more than I ever thought possible. Highly recommended!"</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="testimonial-card">
                    <div class="d-flex align-items-center mb-3">
                      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" class="testimonial-avatar" alt="Customer">
                      <div>
                        <h5 class="mb-0">Emily Chen</h5>
                        <small class="text-muted">Graduate Student</small>
                      </div>
                    </div>
                    <p>"As a student, I love how easy Bankify makes tracking my expenses. The automatic categorization feature is a game-changer!"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Pricing Section -->
          <section class="bg-light py-5" id="pricing">
            <div class="container">
              <div class="text-center mb-5">
                <h2 class="fw-bold">Simple, Transparent Pricing</h2>
                <p class="text-muted">Choose the plan that fits your needs</p>
              </div>
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-body text-center p-5">
                      <h3 class="card-title">Basic</h3>
                      <div class="my-3">
                        <span class="display-4 fw-bold">$0</span>
                        <span class="text-muted">/month</span>
                      </div>
                      <ul class="list-unstyled text-start">
                        <li class="mb-2">✅ Free transfers</li>
                        <li class="mb-2">✅ Basic financial insights</li>
                        <li class="mb-2">✅ Mobile app access</li>
                        <li class="mb-2 text-muted">❌ Advanced budgeting tools</li>
                        <li class="mb-2 text-muted">❌ Priority support</li>
                      </ul>
                      <button class="btn btn-outline-primary w-100 mt-3">Get Started</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card h-100 border-primary">
                    <div class="card-body text-center p-5">
                      <div class="badge bg-primary mb-2">Most Popular</div>
                      <h3 class="card-title">Premium</h3>
                      <div class="my-3">
                        <span class="display-4 fw-bold">$5</span>
                        <span class="text-muted">/month</span>
                      </div>
                      <ul class="list-unstyled text-start">
                        <li class="mb-2">✅ Unlimited transfers</li>
                        <li class="mb-2">✅ Advanced financial insights</li>
                        <li class="mb-2">✅ Mobile app access</li>
                        <li class="mb-2">✅ Advanced budgeting tools</li>
                        <li class="mb-2 text-muted">❌ Priority support</li>
                      </ul>
                      <button class="btn btn-primary w-100 mt-3">Get Started</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-body text-center p-5">
                      <h3 class="card-title">Business</h3>
                      <div class="my-3">
                        <span class="display-4 fw-bold">$15</span>
                        <span class="text-muted">/month</span>
                      </div>
                      <ul class="list-unstyled text-start">
                        <li class="mb-2">✅ Unlimited transfers</li>
                        <li class="mb-2">✅ Business financial insights</li>
                        <li class="mb-2">✅ Mobile app access</li>
                        <li class="mb-2">✅ Advanced budgeting tools</li>
                        <li class="mb-2">✅ Priority support</li>
                      </ul>
                      <button class="btn btn-outline-primary w-100 mt-3">Get Started</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="cta-section">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                  <h2 class="fw-bold mb-4">Ready to transform your banking experience?</h2>
                  <p class="mb-4">Join thousands of satisfied customers who have switched to Bankify.</p>
                  <button class="btn btn-get-started" id="joinNowBtn">Join Now</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section class="py-5" id="contact">
            <div class="container">
              <div class="row">
                <div class="col-lg-6 mx-auto">
                  <div class="card shadow">
                    <div class="card-body p-5">
                      <h3 class="text-center mb-4">Contact Us</h3>
                      <form id="contactForm">
                        <div class="mb-3">
                          <label for="name" class="form-label">Name</label>
                          <input type="text" class="form-control" id="name" required>
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">Email</label>
                          <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                          <label for="message" class="form-label">Message</label>
                          <textarea class="form-control" id="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Send Message</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer>
            <div class="container">
              <div class="row g-4">
                <div class="col-lg-4">
                  <h4 class="text-white mb-4">Bankify</h4>
                  <p class="text-white-50">Making banking simple, secure, and accessible for everyone. Your trusted financial partner.</p>
                </div>
                <div class="col-lg-2">
                  <h5 class="text-white mb-4">Company</h5>
                  <ul class="list-unstyled">
                    <li class="mb-2"><a href="#" class="footer-link">About Us</a></li>
                    <li class="mb-2"><a href="#" class="footer-link">Careers</a></li>
                    <li class="mb-2"><a href="#" class="footer-link">News</a></li>
                    <li class="mb-2"><a href="#" class="footer-link">Partners</a></li>
                  </ul>
                </div>
                <div class="col-lg-2">
                  <h5 class="text-white mb-4">Resources</h5>
                  <ul class="list-unstyled">
                    <li class="mb-2"><a href="#" class="footer-link">Blog</a></li>
                    <li class="mb-2"><a href="#" class="footer-link">Help Center</a></li>
                    <li class="mb-2"><a href="#" class="footer-link">Guides</a></li>
                    <li class="mb-2"><a href="#" class="footer-link">API Docs</a></li>
                  </ul>
                </div>
                <div class="col-lg-4">
                  <h5 class="text-white mb-4">Stay Connected</h5>
                  <p class="text-white-50">Subscribe to our newsletter for updates</p>
                  <div class="input-group mb-3">
                    <input type="email" class="form-control" placeholder="Your email address">
                    <button class="btn btn-primary" type="button">Subscribe</button>
                  </div>
                </div>
              </div>
              <hr class="mt-5 border-white-50">
              <div class="row">
                <div class="col-md-6 text-center text-md-start">
                  <p class="text-white-50 mb-0">© 2023 Bankify. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                  <a href="#" class="footer-link me-3">Privacy Policy</a>
                  <a href="#" class="footer-link me-3">Terms of Service</a>
                  <a href="#" class="footer-link">Security</a>
                </div>
              </div>
            </div>
          </footer>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
          <script>
            // Simple JavaScript functionality
            document.addEventListener('DOMContentLoaded', function() {
              // Button click handlers
              const getStartedBtn = document.getElementById('getStartedBtn');
              const joinNowBtn = document.getElementById('joinNowBtn');
              const loginBtn = document.getElementById('loginBtn');
              const contactForm = document.getElementById('contactForm');
              
              // Get Started button
              if (getStartedBtn) {
                getStartedBtn.addEventListener('click', function() {
                  alert('Thanks for your interest! Sign up would be implemented here.');
                });
              }
              
              // Join Now button
              if (joinNowBtn) {
                joinNowBtn.addEventListener('click', function() {
                  alert('Thanks for your interest! Account creation would be implemented here.');
                });
              }
              
              // Login button
              if (loginBtn) {
                loginBtn.addEventListener('click', function() {
                  alert('Login functionality would be implemented here.');
                });
              }
              
              // Contact form submission
              if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                  e.preventDefault();
                  const name = document.getElementById('name').value;
                  const email = document.getElementById('email').value;
                  const message = document.getElementById('message').value;
                  
                  console.log('Form submission:', { name, email, message });
                  alert('Thank you for your message, ' + name + '! We will get back to you soon.');
                  contactForm.reset();
                });
              }
              
              // Smooth scrolling for anchor links
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                  if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }
                });
              });
            });
          </script>
        </body>
        </html>
      `;
    }

    // Clean up when component unmounts
    return () => {
      // We're letting the HTML page take over, so nothing to clean up
    };
  }, []);

  return null; // This component doesn't render anything directly
};

export default Index;

