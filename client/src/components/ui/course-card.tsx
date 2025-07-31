import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  ShoppingCart,
  CheckCircle
} from "lucide-react";
import type { Course, Enrollment } from "@shared/schema";
import { Link } from "wouter";

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
  showEnrollButton?: boolean;
  showProgress?: boolean;
}

export default function CourseCard({ 
  course, 
  enrollment, 
  showEnrollButton = true, 
  showProgress = false 
}: CourseCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const enrollMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/enrollments", { courseId: course.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments/student"] });
      toast({
        title: "Success",
        description: "Successfully enrolled in the course!",
        variant: "default",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to enroll in course. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/cart", { courseId: course.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Success",
        description: "Course added to cart!",
        variant: "default",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add course to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEnroll = async () => {
    if (!user) {
      window.location.href = "/api/login";
      return;
    }
    
    setIsEnrolling(true);
    await enrollMutation.mutateAsync();
    setIsEnrolling(false);
  };

  const handleAddToCart = () => {
    if (!user) {
      window.location.href = "/api/login";
      return;
    }
    
    addToCartMutation.mutate();
  };

  const isEnrolled = !!enrollment;
  const canEnroll = user?.role === 'student' && !isEnrolled;
  const progress = enrollment?.progress || 0;

  return (
    <Card className="course-card group">
      <div className="relative">
        <img
          src={course.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=3b82f6&color=fff&size=400`}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.difficulty && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-white/90 text-gray-700"
          >
            {course.difficulty}
          </Badge>
        )}
        {isEnrolled && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Enrolled
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Course Title and Category */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {course.title}
            </h3>
            {course.category && (
              <Badge variant="outline" className="mt-2">
                {course.category}
              </Badge>
            )}
          </div>

          {/* Course Description */}
          {course.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {course.shortDescription}
            </p>
          )}

          {/* Course Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {course.lessonsCount && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessonsCount} lessons</span>
              </div>
            )}
            {course.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{Math.round(course.duration / 60)}h</span>
              </div>
            )}
          </div>

          {/* Progress Bar (for enrolled students) */}
          {showProgress && isEnrolled && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div>
              {course.price ? (
                <span className="text-2xl font-bold text-primary">
                  ${course.price}
                </span>
              ) : (
                <span className="text-2xl font-bold text-secondary">
                  Free
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isEnrolled ? (
                <Link href={`/courses/${course.id}`}>
                  <Button className="btn-primary">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                </Link>
              ) : canEnroll ? (
                <div className="flex items-center gap-2">
                  {course.price && parseFloat(course.price) > 0 ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={addToCartMutation.isPending}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Cart
                      </Button>
                      <Button
                        onClick={handleEnroll}
                        disabled={isEnrolling || enrollMutation.isPending}
                        className="btn-primary"
                      >
                        {isEnrolling ? "Enrolling..." : "Buy Now"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleEnroll}
                      disabled={isEnrolling || enrollMutation.isPending}
                      className="btn-primary"
                    >
                      {isEnrolling ? "Enrolling..." : "Enroll Free"}
                    </Button>
                  )}
                </div>
              ) : showEnrollButton ? (
                <Link href={`/courses/${course.id}`}>
                  <Button variant="outline">
                    View Details
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
