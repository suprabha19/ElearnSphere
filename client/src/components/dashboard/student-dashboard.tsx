import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/ui/course-card";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Trophy, 
  AlertCircle,
  TrendingUp,
  Play
} from "lucide-react";
import type { Course, Enrollment } from "@shared/schema";

export default function StudentDashboard() {
  const { user } = useAuth();

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["/api/enrollments/student"],
    enabled: !!user,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/student"],
    enabled: !!user,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["/api/recommendations"],
    enabled: !!user,
  });

  const { data: quizAttempts } = useQuery({
    queryKey: ["/api/quiz-attempts"],
    enabled: !!user,
  });

  if (enrollmentsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const recentEnrollments = enrollments?.slice(0, 2) || [];
  const recentQuizzes = quizAttempts?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="gradient-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-blue-100">
              Continue your learning journey and achieve your goals.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {stats?.enrolledCourses || 0}
            </div>
            <div className="text-blue-200 text-sm">Active Courses</div>
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
                {stats?.enrolledCourses || 0}
              </h3>
              <p className="text-gray-600 text-sm">Enrolled Courses</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.completedCourses || 0}
              </h3>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.hoursLearned || 0}
              </h3>
              <p className="text-gray-600 text-sm">Hours Learned</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats?.achievements || 0}
              </h3>
              <p className="text-gray-600 text-sm">Achievements</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          {recentEnrollments.length > 0 && (
            <Card className="dashboard-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment: any) => (
                    <div key={enrollment.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <img
                        src={enrollment.course?.thumbnailUrl || `https://ui-avatars.com/api/?name=${enrollment.course?.title}&background=3b82f6&color=fff`}
                        alt={enrollment.course?.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {enrollment.course?.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Lesson progress
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">
                              {enrollment.progress || 0}%
                            </span>
                          </div>
                          <Progress value={enrollment.progress || 0} className="mt-1" />
                        </div>
                      </div>
                      <Button className="btn-primary">
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* My Courses */}
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>My Courses</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {enrollments && enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrollments.slice(0, 4).map((enrollment: any) => (
                    <CourseCard 
                      key={enrollment.course.id} 
                      course={enrollment.course}
                      enrollment={enrollment}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No courses yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start your learning journey by enrolling in a course
                  </p>
                  <Button className="btn-primary">
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Quiz Results */}
          {recentQuizzes.length > 0 && (
            <Card className="dashboard-card">
              <CardHeader className="pb-4">
                <CardTitle>Recent Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentQuizzes.map((attempt: any) => (
                    <div key={attempt.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {attempt.quiz?.title}
                        </h3>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          attempt.score >= 80 ? 'bg-green-100 text-green-800' :
                          attempt.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {attempt.score >= 80 ? 'Passed' : 
                           attempt.score >= 60 ? 'Review' : 'Failed'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {attempt.course?.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className={`text-2xl font-bold ${
                          attempt.score >= 80 ? 'text-green-600' :
                          attempt.score >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {attempt.score}%
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>{attempt.timeSpent || 0} min</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <Card className="dashboard-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recommended for You
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Based on your learning history
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.slice(0, 3).map((course: Course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={course.thumbnailUrl || `https://ui-avatars.com/api/?name=${course.title}&background=3b82f6&color=fff`}
                        alt={course.title}
                        className="w-full h-20 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {course.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {course.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary">
                            ${course.price}
                          </span>
                          <Button size="sm" variant="outline" className="text-xs">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Deadlines */}
          <Card className="dashboard-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-4 text-gray-600">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No upcoming deadlines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
