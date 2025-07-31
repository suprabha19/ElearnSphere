import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  CreditCard,
  Tag
} from "lucide-react";
import type { CartItem, Course } from "@shared/schema";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItemWithCourse extends CartItem {
  course: Course;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["/api/cart"],
    enabled: !!user && user.role === 'student' && isOpen,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (courseId: string) => {
      return await apiRequest("DELETE", `/api/cart/${courseId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Removed from cart",
        description: "Course has been removed from your cart.",
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
        description: "Failed to remove course from cart.",
        variant: "destructive",
      });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (data: { courseIds: string[]; couponCode?: string }) => {
      return await apiRequest("POST", "/api/cart/checkout", data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments/student"] });
      toast({
        title: "Purchase Successful",
        description: "You have successfully enrolled in the courses!",
        variant: "default",
      });
      onClose();
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
        title: "Payment Failed",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const items: CartItemWithCourse[] = cartItems || [];
  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.course.price || '0');
    return total + price;
  }, 0);

  const handleRemoveFromCart = (courseId: string) => {
    removeFromCartMutation.mutate(courseId);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const courseIds = items.map(item => item.courseId);
    checkoutMutation.mutate({ courseIds });
  };

  const handleContinueShopping = () => {
    onClose();
  };

  if (!user || user.role !== 'student') {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            {items.length > 0 ? `${items.length} course${items.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="loading-spinner"></div>
            </div>
          ) : items.length > 0 ? (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.course.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.course.title)}&background=3b82f6&color=fff&size=120`}
                    alt={item.course.title}
                    className="h-16 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.course.title}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {item.course.category}
                    </p>
                    <p className="text-lg font-semibold text-primary mt-1">
                      ${item.course.price}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item.courseId)}
                    disabled={removeFromCartMutation.isPending}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Browse our courses and add them to your cart to get started.
              </p>
              <Button onClick={handleContinueShopping} className="btn-primary">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            {/* Coupon Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter coupon code" 
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Tag className="h-4 w-4 mr-1" />
                  Apply
                </Button>
              </div>
            </div>

            <Separator />

            {/* Pricing Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
                className="w-full btn-primary"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {checkoutMutation.isPending ? "Processing..." : "Proceed to Checkout"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleContinueShopping}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500">
              30-day money-back guarantee
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
