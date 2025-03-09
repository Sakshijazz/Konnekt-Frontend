import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="lg:flex items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold mb-6">
                Your Gateway to Seamless Banking
              </h1>
              <p className="text-lg mb-8">
                Experience the future of banking with our innovative platform.
                Manage your finances, track transactions, and achieve your
                financial goals with ease.
              </p>
              <Button
                className="bg-white text-indigo-600 hover:bg-indigo-100 font-bold py-3 px-6 rounded-full"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://source.unsplash.com/800x600/?finance"
                alt="Finance Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section - REPLACING the Pricing section */}
      <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Banking Features
            </h2>
            <p className="text-lg text-gray-600">
              Our platform provides everything you need to manage your finances
              with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
              <p className="text-gray-600">
                Advanced encryption and multi-factor authentication keep your
                financial data secure at all times.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Financial Insights</h3>
              <p className="text-gray-600">
                Get personalized recommendations and analytics to help you make
                better financial decisions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Seamless Integration</h3>
              <p className="text-gray-600">
                Connect all your financial accounts in one place for a complete
                view of your financial health.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition-colors"
            >
              Explore All Features
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already experiencing the benefits
            of our platform.
          </p>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full"
            onClick={() => navigate("/register")}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your Banking Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
