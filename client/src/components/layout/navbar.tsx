import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartSidebar from "@/components/ui/cart-sidebar";
import NotificationDropdown from "@/components/ui/notification-dropdown";
import { 
  Search, 
  Bell, 
  ShoppingCart, 
  User, 
  Settings, 
  Shield, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

export default function Navbar() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: notifications } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: !!user,
  });

  const { data: cartItems } = useQuery({
    queryKey: ["/api/cart"],
    enabled: !!user && user.role === 'student',
  });

  const unreadNotifications = notifications?.filter((n: any) => !n.isRead) || [];
  const cartCount = cartItems?.length || 0;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'student':
        return 'role-badge-student';
      case 'instructor':
        return 'role-badge-instructor';
      case 'admin':
        return 'role-badge-admin';
      default:
        return 'role-badge-student';
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">ElearnSphere</h1>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="nav-link">Dashboard</Link>
                  <Link href="/courses" className="nav-link">Courses</Link>
                  <Link href="/knowledge-base" className="nav-link">Knowledge Base</Link>
                  {(user?.role === 'instructor' || user?.role === 'admin') && (
                    <Link href="/analytics" className="nav-link">Analytics</Link>
                  )}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden sm:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search courses, instructors, topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2"
                >
                  <Bell className="h-5 w-5 text-gray-400" />
                  {unreadNotifications.length > 0 && (
                    <span className="notification-dot">
                      {unreadNotifications.length}
                    </span>
                  )}
                </Button>
                {showNotifications && (
                  <NotificationDropdown 
                    notifications={notifications || []}
                    onClose={() => setShowNotifications(false)}
                  />
                )}
              </div>

              {/* Cart (Student Only) */}
              {user?.role === 'student' && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCartSidebar(true)}
                    className="relative p-2"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-400" />
                    {cartCount > 0 && (
                      <span className="notification-dot bg-secondary">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 text-sm p-1">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=3b82f6&color=fff`}
                      alt="User avatar"
                    />
                    <span className="text-gray-700 font-medium hidden md:block">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <span className={getRoleBadgeClass(user?.role || 'student')}>
                        {user?.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Security & 2FA
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2"
                >
                  {showMobileMenu ? (
                    <X className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="nav-link">Dashboard</Link>
                <Link href="/courses" className="nav-link">Courses</Link>
                <Link href="/knowledge-base" className="nav-link">Knowledge Base</Link>
                {(user?.role === 'instructor' || user?.role === 'admin') && (
                  <Link href="/analytics" className="nav-link">Analytics</Link>
                )}
              </div>
              {/* Mobile Search */}
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      {user?.role === 'student' && (
        <CartSidebar 
          isOpen={showCartSidebar} 
          onClose={() => setShowCartSidebar(false)} 
        />
      )}
    </>
  );
}
