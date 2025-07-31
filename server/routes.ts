import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertCourseSchema, insertQuizSchema, insertAssignmentSchema, insertNotificationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const { category, search, instructor } = req.query;
      const courses = await storage.getCourses({
        category: category as string,
        search: search as string,
        instructorId: instructor as string,
      });
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post('/api/courses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
        return res.status(403).json({ message: "Only instructors and admins can create courses" });
      }

      const courseData = insertCourseSchema.parse({
        ...req.body,
        instructorId: userId,
        status: user.role === 'admin' ? 'published' : 'pending',
      });

      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  app.patch('/api/courses/:id/approve', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Only admins can approve courses" });
      }

      const course = await storage.approveCourse(req.params.id);
      res.json(course);
    } catch (error) {
      console.error("Error approving course:", error);
      res.status(500).json({ message: "Failed to approve course" });
    }
  });

  // Enrollment routes
  app.post('/api/enrollments', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const { courseId } = req.body;

      const enrollment = await storage.enrollStudent(studentId, courseId);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error enrolling student:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });

  app.get('/api/enrollments/student', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const enrollments = await storage.getStudentEnrollments(studentId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.patch('/api/enrollments/:id/progress', isAuthenticated, async (req: any, res) => {
    try {
      const { progress } = req.body;
      const enrollment = await storage.updateProgress(req.params.id, progress);
      res.json(enrollment);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Quiz routes
  app.get('/api/courses/:courseId/quizzes', isAuthenticated, async (req, res) => {
    try {
      const quizzes = await storage.getQuizzesByCourse(req.params.courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.post('/api/courses/:courseId/quizzes', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
        return res.status(403).json({ message: "Only instructors and admins can create quizzes" });
      }

      const quizData = insertQuizSchema.parse({
        ...req.body,
        courseId: req.params.courseId,
      });

      const quiz = await storage.createQuiz(quizData);
      res.status(201).json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Failed to create quiz" });
    }
  });

  app.post('/api/quizzes/:id/submit', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const { answers, score } = req.body;

      await storage.submitQuizAttempt(req.params.id, studentId, answers, score);
      res.status(201).json({ message: "Quiz submitted successfully" });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(500).json({ message: "Failed to submit quiz" });
    }
  });

  app.get('/api/quiz-attempts', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const attempts = await storage.getQuizAttempts(studentId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  // Assignment routes
  app.get('/api/courses/:courseId/assignments', isAuthenticated, async (req, res) => {
    try {
      const assignments = await storage.getAssignmentsByCourse(req.params.courseId);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });

  app.post('/api/courses/:courseId/assignments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
        return res.status(403).json({ message: "Only instructors and admins can create assignments" });
      }

      const assignmentData = insertAssignmentSchema.parse({
        ...req.body,
        courseId: req.params.courseId,
      });

      const assignment = await storage.createAssignment(assignmentData);
      res.status(201).json(assignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  // Cart routes
  app.get('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const cartItems = await storage.getCartItems(studentId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const { courseId } = req.body;

      const cartItem = await storage.addToCart(studentId, courseId);
      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.delete('/api/cart/:courseId', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      await storage.removeFromCart(studentId, req.params.courseId);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  // Notification routes
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch('/api/notifications/:id/read', isAuthenticated, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  // Payment routes
  app.get('/api/payments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const payments = await storage.getPaymentHistory(userId);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Analytics routes
  app.get('/api/analytics/student', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const stats = await storage.getStudentStats(studentId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching student analytics:", error);
      res.status(500).json({ message: "Failed to fetch student analytics" });
    }
  });

  app.get('/api/analytics/instructor', isAuthenticated, async (req: any, res) => {
    try {
      const instructorId = req.user.claims.sub;
      const user = await storage.getUser(instructorId);
      
      if (!user || user.role !== 'instructor') {
        return res.status(403).json({ message: "Access denied" });
      }

      const stats = await storage.getInstructorStats(instructorId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching instructor analytics:", error);
      res.status(500).json({ message: "Failed to fetch instructor analytics" });
    }
  });

  app.get('/api/analytics/admin', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }

      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin analytics:", error);
      res.status(500).json({ message: "Failed to fetch admin analytics" });
    }
  });

  // Course recommendations
  app.get('/api/recommendations', isAuthenticated, async (req: any, res) => {
    try {
      const studentId = req.user.claims.sub;
      const recommendations = await storage.getRecommendedCourses(studentId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
