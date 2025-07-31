import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star,
  Plus,
  TrendingUp,
  MessageSquare,
  PlusCircle
} from "lucide-react";

export default function InstructorDashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/instructor"],
    enabled: !!user && user.role === 'instructor',
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses", { instructor: user?.id }],
    enabled: !!user && user.role === 'instructor',
  });

  if (statsLoading || coursesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Instructor Dashboard 🎓
            </h1>
            <p className="text-green-100">
              Manage your courses and guide your students to success.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {stats?.totalStudents || 0}
            </div>
            <div className="text-green-200 text-sm">Total Students</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.totalCourses || 0}
              </h3>
              <p className="text-gray-600 text-sm">My Courses</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.totalStudents || 0}
              </h3>
              <p className="text-gray-600 text-sm">Total Students</p>
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
                ${stats?.totalEarnings || '0'}
              </h3>
              <p className="text-gray-600 text-sm">Total Earnings</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.avgRating || '0'}
              </h3>
              <p className="text-gray-600 text-sm">Avg. Rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="btn-primary p-6 h-auto text-left flex flex-col items-start">
          <PlusCircle className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Create New Course</h3>
          <p className="text-blue-100 text-sm">Start building your next course</p>
        </Button>

        <Button className="btn-secondary p-6 h-auto text-left flex flex-col items-start">
          <TrendingUp className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
          <p className="text-green-100 text-sm">Track your course performance</p>
        </Button>

        <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-left flex flex-col items-start">
          <MessageSquare className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Student Messages</h3>
          <p className="text-purple-100 text-sm">Respond to student inquiries</p>
        </Button>
      </div>

      {/* Course Management */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <CardTitle>My Courses</CardTitle>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </CardHeader>
        <CardContent>
          {courses && courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course: any) => (
                    <tr key={course.id} className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-16 rounded-lg object-cover mr-4"
                            src={course.thumbnailUrl || `https://ui-avatars.com/api/?name=${course.title}&background=3b82f6&color=fff`}
                            alt={course.title}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {course.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {course.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.enrollmentCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`status-badge-${course.status}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Analytics
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first course to start teaching
              </p>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earnings Dashboard */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <CardTitle>Earnings Dashboard</CardTitle>
          <Button className="btn-secondary">
            Request Payout
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Total Earnings
              </h3>
              <div className="text-3xl font-bold text-green-600">
                ${stats?.totalEarnings || '0'}
              </div>
              <p className="text-sm text-green-600 mt-1">All time</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                This Month
              </h3>
              <div className="text-3xl font-bold text-blue-600">
                ${stats?.monthlyEarnings || '0'}
              </div>
              <p className="text-sm text-blue-600 mt-1">+15% from last month</p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Available for Payout
              </h3>
              <div className="text-3xl font-bold text-amber-600">
                ${stats?.availablePayout || '0'}
              </div>
              <p className="text-sm text-amber-600 mt-1">Ready to withdraw</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
