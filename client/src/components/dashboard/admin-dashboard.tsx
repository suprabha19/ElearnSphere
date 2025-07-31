import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  CheckCircle,
  BarChart3,
  Shield,
  AlertTriangle
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/admin"],
    enabled: !!user && user.role === 'admin',
  });

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Admin Dashboard 👑
            </h1>
            <p className="text-purple-100">
              Manage the entire platform and ensure smooth operations.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {stats?.totalUsers || 0}
            </div>
            <div className="text-purple-200 text-sm">Total Users</div>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.totalUsers || 0}
              </h3>
              <p className="text-gray-600 text-sm">Total Users</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.totalCourses || 0}
              </h3>
              <p className="text-gray-600 text-sm">Active Courses</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ${stats?.platformRevenue || '0'}
              </h3>
              <p className="text-gray-600 text-sm">Platform Revenue</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.monthlyGrowth || 0}%
              </h3>
              <p className="text-gray-600 text-sm">Monthly Growth</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Button className="btn-primary p-6 h-auto text-left flex flex-col items-start">
          <UserCheck className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">User Management</h3>
          <p className="text-blue-100 text-sm">Approve & manage users</p>
        </Button>

        <Button className="btn-secondary p-6 h-auto text-left flex flex-col items-start">
          <CheckCircle className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Course Approvals</h3>
          <p className="text-green-100 text-sm">Review pending courses</p>
        </Button>

        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 h-auto text-left flex flex-col items-start">
          <BarChart3 className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-yellow-100 text-sm">Platform performance</p>
        </Button>

        <Button className="bg-red-600 hover:bg-red-700 text-white p-6 h-auto text-left flex flex-col items-start">
          <Shield className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Security</h3>
          <p className="text-red-100 text-sm">Manage 2FA & backups</p>
        </Button>
      </div>

      {/* Pending Approvals */}
      <Card className="dashboard-card">
        <CardHeader className="pb-6">
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pending approvals
            </h3>
            <p className="text-gray-600">
              All courses and instructor applications are up to date
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="dashboard-card">
          <CardHeader className="pb-6">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Platform is running smoothly
                  </p>
                  <p className="text-xs text-gray-500">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-6">
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Server Status
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Database
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Payment Gateway
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Payment Management */}
      <Card className="dashboard-card">
        <CardHeader className="pb-6">
          <CardTitle>Global Payment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Total Revenue
              </h3>
              <div className="text-2xl font-bold text-green-600">
                ${stats?.platformRevenue || '0'}
              </div>
              <p className="text-sm text-green-600 mt-1">All time</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                This Month
              </h3>
              <div className="text-2xl font-bold text-blue-600">
                ${stats?.monthlyRevenue || '0'}
              </div>
              <p className="text-sm text-blue-600 mt-1">
                +{stats?.monthlyGrowth || 0}% from last month
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Pending Payouts
              </h3>
              <div className="text-2xl font-bold text-amber-600">
                ${stats?.pendingPayouts || '0'}
              </div>
              <p className="text-sm text-amber-600 mt-1">
                {stats?.pendingPayoutCount || 0} pending requests
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Refund Requests
              </h3>
              <div className="text-2xl font-bold text-purple-600">
                {stats?.refundRequests || 0}
              </div>
              <p className="text-sm text-purple-600 mt-1">Awaiting review</p>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button className="btn-secondary">
              Process Payouts
            </Button>
            <Button className="btn-primary">
              Manage Discounts
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Payment Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
