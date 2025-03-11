
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (username.trim() && password.trim()) {
      try {
        // Send login data to the backend
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          username,
          password
        });
  
        if (response.status === 200 && response.data.token) {
          // Store JWT token, username, and authentication status in localStorage
          localStorage.setItem("jwtToken", response.data.token); // Store JWT token
          localStorage.setItem("user", JSON.stringify({ username })); // Store username
          localStorage.setItem("isAuthenticated", "true"); // Set authentication status
  
          toast.success("Login successful!");
          navigate("/dashboard"); // Redirect to dashboard
        }
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
      }
    } else {
      toast.error("Please enter both username and password");
    }
  };
    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to Bankify</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
