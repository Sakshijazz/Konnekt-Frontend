
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  CreditCard, 
  Smartphone,
  MailCheck,
  EyeOff,
  PlusCircle
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    loginNotifications: true
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    transactions: true,
    marketing: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    showBalance: false,
    activityTracking: true,
    dataSharing: false
  });
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load saved settings if available
    const savedSecuritySettings = localStorage.getItem("securitySettings");
    if (savedSecuritySettings) {
      setSecuritySettings(JSON.parse(savedSecuritySettings));
    }
    
    const savedNotificationSettings = localStorage.getItem("notificationSettings");
    if (savedNotificationSettings) {
      setNotificationSettings(JSON.parse(savedNotificationSettings));
    }
    
    const savedPrivacySettings = localStorage.getItem("privacySettings");
    if (savedPrivacySettings) {
      setPrivacySettings(JSON.parse(savedPrivacySettings));
    }
  }, [navigate]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    
    toast.success("Profile updated successfully");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would typically validate and change password in a real app
    toast.success("Password changed successfully");
  };
  
  const handleSecuritySettingChange = (key: string, value: boolean) => {
    const updatedSettings = { ...securitySettings, [key]: value };
    setSecuritySettings(updatedSettings);
    localStorage.setItem("securitySettings", JSON.stringify(updatedSettings));
    toast.success(`Setting updated successfully`);
  };
  
  const handleNotificationSettingChange = (key: string, value: boolean) => {
    const updatedSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(updatedSettings);
    localStorage.setItem("notificationSettings", JSON.stringify(updatedSettings));
    toast.success(`Setting updated successfully`);
  };
  
  const handlePrivacySettingChange = (key: string, value: boolean) => {
    const updatedSettings = { ...privacySettings, [key]: value };
    setPrivacySettings(updatedSettings);
    localStorage.setItem("privacySettings", JSON.stringify(updatedSettings));
    toast.success(`Setting updated successfully`);
  };
  
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (confirmDelete) {
      // Clear all localStorage items
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("userCards");
      localStorage.removeItem("userAccounts");
      localStorage.removeItem("userTransactions");
      localStorage.removeItem("selectedCardAccounts");
      localStorage.removeItem("securitySettings");
      localStorage.removeItem("notificationSettings");
      localStorage.removeItem("privacySettings");
      
      toast.success("Account deleted successfully");
      
      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
              <EyeOff className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={user.username || ""} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email || ""} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={user.firstName || ""} 
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={user.lastName || ""} 
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={user.phone || ""} 
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={user.address || ""} 
                        onChange={(e) => setUser({...user, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Change Password</Button>
                </form>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      id="2fa" 
                      checked={securitySettings.twoFactor}
                      onCheckedChange={(checked) => handleSecuritySettingChange('twoFactor', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Login Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications for new logins</p>
                    </div>
                    <Switch 
                      id="loginNotifications" 
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={(checked) => handleSecuritySettingChange('loginNotifications', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how we contact you
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive account updates via email</p>
                    </div>
                    <Switch 
                      id="emailNotifications" 
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) => handleNotificationSettingChange('email', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-500">Receive account updates via text message</p>
                    </div>
                    <Switch 
                      id="smsNotifications" 
                      checked={notificationSettings.sms}
                      onCheckedChange={(checked) => handleNotificationSettingChange('sms', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Transaction Alerts</h4>
                      <p className="text-sm text-gray-500">Receive alerts for transactions</p>
                    </div>
                    <Switch 
                      id="transactionAlerts" 
                      checked={notificationSettings.transactions}
                      onCheckedChange={(checked) => handleNotificationSettingChange('transactions', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                    </div>
                    <Switch 
                      id="marketingCommunications" 
                      checked={notificationSettings.marketing}
                      onCheckedChange={(checked) => handleNotificationSettingChange('marketing', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Manage your payment methods and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 bg-white shadow-sm hover:shadow-md transition-all"
                    onClick={() => navigate("/add-card")}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Your Payment Methods</h4>
                    <div className="space-y-2">
                      {/* Get cards from localStorage */}
                      {JSON.parse(localStorage.getItem("userCards") || "[]").map((card) => (
                        <div key={card.id} className="p-4 border rounded-lg flex items-center justify-between bg-white shadow-sm">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-10 w-10 rounded-md flex items-center justify-center"
                              style={{ background: card.color }}
                            >
                              <CreditCard className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{card.bank || card.type} Card</p>
                              <p className="text-sm text-gray-500">Ending in {card.number.slice(-4)}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Set as Default</Button>
                        </div>
                      ))}
                      
                      {JSON.parse(localStorage.getItem("userCards") || "[]").length === 0 && (
                        <div className="p-6 border rounded-lg text-center bg-gray-50">
                          <p className="text-gray-500 mb-2">You don't have any payment methods yet</p>
                          <Button 
                            onClick={() => navigate("/add-card")}
                            className="flex items-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-700"
                          >
                            <PlusCircle size={16} />
                            Add Your First Card
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your privacy and data preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Show Account Balance</h4>
                      <p className="text-sm text-gray-500">Display account balance without requiring authentication</p>
                    </div>
                    <Switch 
                      id="showBalance" 
                      checked={privacySettings.showBalance}
                      onCheckedChange={(checked) => handlePrivacySettingChange('showBalance', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Activity Tracking</h4>
                      <p className="text-sm text-gray-500">Allow us to track your activity for better service</p>
                    </div>
                    <Switch 
                      id="activityTracking" 
                      checked={privacySettings.activityTracking}
                      onCheckedChange={(checked) => handlePrivacySettingChange('activityTracking', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium">Data Sharing</h4>
                      <p className="text-sm text-gray-500">Share your data with trusted partners</p>
                    </div>
                    <Switch 
                      id="dataSharing" 
                      checked={privacySettings.dataSharing}
                      onCheckedChange={(checked) => handlePrivacySettingChange('dataSharing', checked)}
                    />
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-700 mb-2">Danger Zone</h4>
                    <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <Button 
                      variant="destructive" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
