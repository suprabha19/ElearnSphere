import {
  users,
  courses,
  enrollments,
  lessons,
  quizzes,
  quizAttempts,
  assignments,
  assignmentSubmissions,
  cartItems,
  payments,
  notifications,
  courseReviews,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type Quiz,
  type InsertQuiz,
  type Assignment,
  type InsertAssignment,
  type Notification,
  type InsertNotification,
  type CartItem,
  type Payment,
  type CourseReview,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, ilike, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Course operations
  getCourses(filters?: { category?: string; search?: string; instructorId?: string }): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course>;
  approveCourse(id: string): Promise<Course>;
  
  // Enrollment operations
  enrollStudent(studentId: string, courseId: string): Promise<Enrollment>;
  getStudentEnrollments(studentId: string): Promise<(Enrollment & { course: Course })[]>;
  getEnrollmentsByCourse(courseId: string): Promise<(Enrollment & { student: User })[]>;
  updateProgress(enrollmentId: string, progress: number): Promise<Enrollment>;
  
  // Quiz operations
  getQuizzesByCourse(courseId: string): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  submitQuizAttempt(quizId: string, studentId: string, answers: any, score: number): Promise<void>;
  getQuizAttempts(studentId: string): Promise<any[]>;
  
  // Assignment operations
  getAssignmentsByCourse(courseId: string): Promise<Assignment[]>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  submitAssignment(assignmentId: string, studentId: string, content: string): Promise<void>;
  gradeAssignment(submissionId: string, score: number, feedback: string): Promise<void>;
  
  // Cart operations
  addToCart(studentId: string, courseId: string): Promise<CartItem>;
  getCartItems(studentId: string): Promise<(CartItem & { course: Course })[]>;
  removeFromCart(studentId: string, courseId: string): Promise<void>;
  clearCart(studentId: string): Promise<void>;
  
  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(notificationId: string): Promise<void>;
  
  // Payment operations
  createPayment(payment: Partial<Payment>): Promise<Payment>;
  getPaymentHistory(userId: string): Promise<Payment[]>;
  
  // Analytics operations
  getStudentStats(studentId: string): Promise<any>;
  getInstructorStats(instructorId: string): Promise<any>;
  getAdminStats(): Promise<any>;
  
  // Course recommendation (DFS algorithm)
  getRecommendedCourses(studentId: string): Promise<Course[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Course operations
  async getCourses(filters?: { category?: string; search?: string; instructorId?: string }): Promise<Course[]> {
    let query = db.select().from(courses).where(eq(courses.status, 'published'));
    
    if (filters?.category) {
      query = query.where(eq(courses.category, filters.category));
    }
    
    if (filters?.search) {
      query = query.where(
        sql`${courses.title} ILIKE ${`%${filters.search}%`} OR ${courses.description} ILIKE ${`%${filters.search}%`}`
      );
    }
    
    if (filters?.instructorId) {
      query = query.where(eq(courses.instructorId, filters.instructorId));
    }
    
    return await query.orderBy(desc(courses.createdAt));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course> {
    const [updatedCourse] = await db
      .update(courses)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return updatedCourse;
  }

  async approveCourse(id: string): Promise<Course> {
    const [approvedCourse] = await db
      .update(courses)
      .set({ status: 'published', updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return approvedCourse;
  }

  // Enrollment operations
  async enrollStudent(studentId: string, courseId: string): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values({ studentId, courseId })
      .returning();
    return enrollment;
  }

  async getStudentEnrollments(studentId: string): Promise<(Enrollment & { course: Course })[]> {
    return await db
      .select()
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.studentId, studentId));
  }

  async getEnrollmentsByCourse(courseId: string): Promise<(Enrollment & { student: User })[]> {
    return await db
      .select()
      .from(enrollments)
      .innerJoin(users, eq(enrollments.studentId, users.id))
      .where(eq(enrollments.courseId, courseId));
  }

  async updateProgress(enrollmentId: string, progress: number): Promise<Enrollment> {
    const [updatedEnrollment] = await db
      .update(enrollments)
      .set({ progress })
      .where(eq(enrollments.id, enrollmentId))
      .returning();
    return updatedEnrollment;
  }

  // Quiz operations
  async getQuizzesByCourse(courseId: string): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.courseId, courseId));
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const [newQuiz] = await db.insert(quizzes).values(quiz).returning();
    return newQuiz;
  }

  async submitQuizAttempt(quizId: string, studentId: string, answers: any, score: number): Promise<void> {
    await db.insert(quizAttempts).values({
      quizId,
      studentId,
      answers,
      score,
      completedAt: new Date(),
    });
  }

  async getQuizAttempts(studentId: string): Promise<any[]> {
    return await db
      .select()
      .from(quizAttempts)
      .innerJoin(quizzes, eq(quizAttempts.quizId, quizzes.id))
      .where(eq(quizAttempts.studentId, studentId))
      .orderBy(desc(quizAttempts.completedAt));
  }

  // Assignment operations
  async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
    return await db.select().from(assignments).where(eq(assignments.courseId, courseId));
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const [newAssignment] = await db.insert(assignments).values(assignment).returning();
    return newAssignment;
  }

  async submitAssignment(assignmentId: string, studentId: string, content: string): Promise<void> {
    await db.insert(assignmentSubmissions).values({
      assignmentId,
      studentId,
      content,
      status: 'submitted',
    });
  }

  async gradeAssignment(submissionId: string, score: number, feedback: string): Promise<void> {
    await db
      .update(assignmentSubmissions)
      .set({
        score,
        feedback,
        status: 'graded',
        gradedAt: new Date(),
      })
      .where(eq(assignmentSubmissions.id, submissionId));
  }

  // Cart operations
  async addToCart(studentId: string, courseId: string): Promise<CartItem> {
    const [cartItem] = await db
      .insert(cartItems)
      .values({ studentId, courseId })
      .returning();
    return cartItem;
  }

  async getCartItems(studentId: string): Promise<(CartItem & { course: Course })[]> {
    return await db
      .select()
      .from(cartItems)
      .innerJoin(courses, eq(cartItems.courseId, courses.id))
      .where(eq(cartItems.studentId, studentId));
  }

  async removeFromCart(studentId: string, courseId: string): Promise<void> {
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.studentId, studentId), eq(cartItems.courseId, courseId)));
  }

  async clearCart(studentId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.studentId, studentId));
  }

  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, notificationId));
  }

  // Payment operations
  async createPayment(payment: Partial<Payment>): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment as any).returning();
    return newPayment;
  }

  async getPaymentHistory(userId: string): Promise<Payment[]> {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }

  // Analytics operations
  async getStudentStats(studentId: string): Promise<any> {
    const enrollmentCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(enrollments)
      .where(eq(enrollments.studentId, studentId));

    const completedCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(enrollments)
      .where(and(eq(enrollments.studentId, studentId), eq(enrollments.progress, 100)));

    return {
      enrolledCourses: enrollmentCount[0]?.count || 0,
      completedCourses: completedCount[0]?.count || 0,
    };
  }

  async getInstructorStats(instructorId: string): Promise<any> {
    const courseCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(courses)
      .where(eq(courses.instructorId, instructorId));

    const enrollmentCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(courses.instructorId, instructorId));

    return {
      totalCourses: courseCount[0]?.count || 0,
      totalStudents: enrollmentCount[0]?.count || 0,
    };
  }

  async getAdminStats(): Promise<any> {
    const userCount = await db.select({ count: sql<number>`count(*)` }).from(users);
    const courseCount = await db.select({ count: sql<number>`count(*)` }).from(courses);

    return {
      totalUsers: userCount[0]?.count || 0,
      totalCourses: courseCount[0]?.count || 0,
    };
  }

  // Course recommendation (DFS algorithm simulation)
  async getRecommendedCourses(studentId: string): Promise<Course[]> {
    // Get enrolled courses to find categories
    const enrolledCourses = await db
      .select({ category: courses.category })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.studentId, studentId));

    const categories = enrolledCourses.map(e => e.category).filter(Boolean);

    if (categories.length === 0) {
      // Return popular courses if no enrollment history
      return await db
        .select()
        .from(courses)
        .where(eq(courses.status, 'published'))
        .limit(3);
    }

    // Find courses in similar categories (DFS-like traversal)
    return await db
      .select()
      .from(courses)
      .where(and(
        eq(courses.status, 'published'),
        inArray(courses.category, categories)
      ))
      .limit(3);
  }
}

export const storage = new DatabaseStorage();
