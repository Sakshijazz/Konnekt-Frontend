import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardGlass } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRightIcon,
  CheckCircle2,
  ShieldCheck,
  BarChart2,
  Smartphone,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
      title: "Bank-Grade Security",
      description:
        "Advanced encryption and multi-factor authentication keep your financial data secure at all times.",
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-green-600" />,
      title: "Smart Financial Insights",
      description:
        "Get personalized recommendations and analytics to help you make better financial decisions.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Seamless Integration",
      description:
        "Connect all your financial accounts in one place for a complete view of your financial health.",
    },
  ];

  const testimonials = [
    {
      quote:
        "This platform completely changed how I manage my finances. The insights are invaluable!",
      author: "Sarah J., Small Business Owner",
      rating: 5,
    },
    {
      quote:
        "I've tried many banking apps, but this one stands out with its simplicity and powerful features.",
      author: "Michael T., Software Engineer",
      rating: 5,
    },
    {
      quote:
        "The security features give me peace of mind, especially with today's online threats.",
      author: "Elena R., Financial Advisor",
      rating: 4,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="lg:flex lg:gap-4 items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold mb-6 animate-fade-in">
                Your Gateway to Seamless Banking
              </h1>
              <p className="text-lg mb-8">
                Experience the future of banking with our innovative platform.
                Manage your finances, track transactions, and achieve your
                financial goals with ease.
              </p>
              <div className="flex gap-3">
                <Button
                  className="bg-white text-indigo-600 hover:bg-indigo-100 font-bold py-3 px-6 rounded-full transition-all hover:shadow-lg"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/20 font-bold py-3 px-6 rounded-full"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400"
                  alt="Finance Illustration"
                  className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-indigo-600 font-bold">24/7 Support</div>
                  <div className="text-gray-500 text-sm">
                    We're always here to help
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Financial Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive banking solutions tailored to your needs
            </p>
          </div>

          <Tabs
            defaultValue="personal"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="personal">Personal Banking</TabsTrigger>
              <TabsTrigger value="business">Business Banking</TabsTrigger>
              <TabsTrigger value="wealth">Wealth Management</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Personal Banking Solutions
                </h3>
                <p className="text-gray-600 mb-4">
                  Our personal banking services are designed to help you manage
                  your day-to-day finances with ease and confidence.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-start gap-3">
                    <ArrowDownLeft className="text-green-500 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium">Easy Deposits</h4>
                      <p className="text-sm text-gray-600">
                        Deposit funds quickly from anywhere, anytime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowUpRight className="text-red-500 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium">Secure Withdrawals</h4>
                      <p className="text-sm text-gray-600">
                        Access your money when you need it most
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowLeftRight className="text-blue-500 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium">Seamless Transfers</h4>
                      <p className="text-sm text-gray-600">
                        Move money between accounts in seconds
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart2 className="text-purple-500 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium">Financial Insights</h4>
                      <p className="text-sm text-gray-600">
                        Track your spending and saving patterns
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="business">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Business Banking Solutions
                </h3>
                <p className="text-gray-600 mb-4">
                  Powerful tools to help your business grow and manage finances
                  efficiently.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
                    <span>
                      Dedicated business accounts with enhanced features
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
                    <span>Payroll management and automated payments</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
                    <span>Business loans with competitive rates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
                    <span>Detailed financial reporting and insights</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="wealth">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  Wealth Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert guidance to help you grow and protect your wealth.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Investment Advisory
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Personalized investment strategies tailored to your
                      financial goals
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Retirement Planning
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Secure your future with our comprehensive retirement plans
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Estate Planning
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Protect your assets and ensure your legacy
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Tax Optimization
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Minimize tax burden with strategic financial planning
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features section */}
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
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200 shadow-lg p-8 transform transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition-colors"
              onClick={() => navigate("/register")}
            >
              Explore All Features <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <CardGlass key={index} className="p-6">
                <CardContent className="pt-4">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-800 italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.author}</p>
                </CardContent>
              </CardGlass>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the benefits of
            our platform. Getting started takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-full"
              onClick={() => navigate("/register")}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/20 font-bold py-3 px-6 rounded-full"
              onClick={() => navigate("/login")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Your Banking Platform</h3>
              <p className="text-gray-400">
                Making financial management simple, secure, and seamless for
                everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-3">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-3">Stay Connected</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2024 Your Banking Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
