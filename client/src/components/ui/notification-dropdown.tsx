import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  DollarSign,
  Users,
  MessageSquare,
  Trophy,
  Clock,
  X
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Notification } from "@shared/schema";

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose?: () => void;
}

export default function NotificationDropdown({ 
  notifications, 
  onClose 
}: NotificationDropdownProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return await apiRequest("PATCH", `/api/notifications/${notificationId}/read`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
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
    },
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course_enrollment':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'assignment_due':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'quiz_completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'payment_success':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'course_approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'new_student':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'course_review':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'system_alert':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'promotion':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: string, isRead: boolean) => {
    if (isRead) return "hover:bg-gray-50";
    
    switch (type) {
      case 'assignment_due':
        return "bg-orange-50 hover:bg-orange-100 border-l-4 border-orange-400";
      case 'quiz_completed':
        return "bg-green-50 hover:bg-green-100 border-l-4 border-green-400";
      case 'system_alert':
        return "bg-red-50 hover:bg-red-100 border-l-4 border-red-400";
      case 'achievement':
        return "bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-400";
      default:
        return "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-400";
    }
  };

  const handleMarkAsRead = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    markAsReadMutation.mutate(notificationId);
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const sortedNotifications = [...notifications].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 10); // Show only latest 10 notifications

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadNotifications.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadNotifications.length}
              </Badge>
            )}
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="max-h-96">
        {sortedNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${getNotificationBgColor(notification.type, notification.isRead)} cursor-pointer transition-colors`}
                onClick={() => !notification.isRead && handleMarkAsRead(notification.id, {} as React.MouseEvent)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="flex-shrink-0 ml-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              You're all caught up! We'll notify you when there's something new.
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {sortedNotifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full text-primary hover:text-blue-700 hover:bg-blue-50"
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
}
