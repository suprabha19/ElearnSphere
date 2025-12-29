# Admin Panel Documentation

## Overview
This admin panel provides comprehensive management capabilities for the ElearnSphere platform, allowing administrators to manage users, courses, and monitor platform analytics.

## Features

### 1. Dashboard (Admin Home)
- **Platform Statistics**: View total users, students, instructors, courses, enrollments, and quizzes
- **Recent Activities**: Monitor recent enrollments and course creations
- **Visual Cards**: Color-coded statistics cards for quick insights

### 2. User Management
- **View All Users**: List all users with filtering by role (Student, Instructor, Admin)
- **Search Users**: Search by name or email
- **Edit Users**: Update user information including role changes
- **Delete Users**: Remove users from the platform (with safety check to prevent self-deletion)
- **User Details**: View creation date and role badges

### 3. Course Management
- **View All Courses**: Grid view of all courses with images
- **Filter Courses**: Filter by category or search by title/description
- **Course Statistics**: View total courses, materials, and categories
- **Delete Courses**: Remove any course from the platform
- **Instructor Info**: See which instructor created each course

### 4. Analytics
- **User Distribution**: Breakdown of users by role with visual bars
- **Platform Engagement**: Total enrollments, courses, and quizzes
- **Calculated Metrics**: 
  - Average enrollments per course
  - Student-instructor ratio
  - Courses per instructor

### 5. Settings
- **General Settings**: Configure platform name and email
- **Registration Settings**: Toggle user registration and email verification
- **Course Limits**: Set max courses per instructor and max students per course

## Backend API Endpoints

### Admin Routes (`/api/admin/*`)
All routes require admin authentication via JWT token.

#### Statistics
- `GET /api/admin/stats` - Get platform-wide statistics

#### User Management
- `GET /api/admin/users` - Get all users (with optional role and search filters)
- `GET /api/admin/users/:id` - Get specific user by ID
- `PUT /api/admin/users/:id` - Update user information
- `DELETE /api/admin/users/:id` - Delete user

#### Course Management
- `GET /api/admin/courses` - Get all courses (with optional filters)
- `DELETE /api/admin/courses/:id` - Delete any course

#### Activities
- `GET /api/admin/activities` - Get recent platform activities

## Frontend Routes

### Admin Dashboard (`/admin-dashboard`)
Protected route requiring ADMIN role.

- `/admin-dashboard` or `/admin-dashboard/home` - Dashboard home
- `/admin-dashboard/users` - User management
- `/admin-dashboard/courses` - Course management
- `/admin-dashboard/analytics` - Analytics page
- `/admin-dashboard/settings` - Platform settings

## Authentication & Authorization

### Middleware
- `protect` - Verifies JWT token
- `isAdmin` - Ensures user has ADMIN role

### Login Flow
1. User logs in with credentials
2. Backend verifies credentials and returns JWT token with role
3. Frontend stores token and role in localStorage
4. Login redirects admin users to `/admin-dashboard`

### Admin Account Creation
To create an admin account, use the signup form with:
- Role: ADMIN
- Secret Code: The value of `ADMIN_CODE` from `.env` file (default: "myAdmin456")

## Security Features

1. **Role-based Authorization**: All admin routes protected by `isAdmin` middleware
2. **JWT Authentication**: Token-based authentication for all API calls
3. **Self-deletion Prevention**: Admin cannot delete their own account
4. **Secret Code**: Admin creation requires secret code from environment variables

## Technologies Used

### Backend
- Node.js/Express
- MongoDB/Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React with React Router
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons
- React Toastify for notifications

## Color Scheme
- Primary: `#ce472c` (Coral Red)
- Hover: `#e44d30` (Lighter Red)
- Success: Green shades
- Info: Blue shades
- Warning: Orange/Yellow shades
- Danger: Red shades

## Usage Instructions

### For Developers

1. **Setup Backend**:
   ```bash
   cd BACKEND/elearnsphere
   npm install
   npm start
   ```

2. **Setup Frontend**:
   ```bash
   npm install
   npm run dev
   ```

3. **Create Admin Account**:
   - Go to signup page
   - Select ADMIN role
   - Enter the admin secret code from .env
   - Complete registration

4. **Access Admin Panel**:
   - Login with admin credentials
   - Automatically redirected to `/admin-dashboard`

### For Administrators

1. **User Management**:
   - View all users in the Users tab
   - Filter by role or search by name/email
   - Click edit icon to modify user details
   - Click delete icon to remove users

2. **Course Management**:
   - View all courses in grid format
   - Filter by category or search
   - Delete inappropriate or outdated courses

3. **Monitor Analytics**:
   - Check platform statistics regularly
   - Monitor user distribution
   - Track engagement metrics

4. **Configure Settings**:
   - Adjust platform settings as needed
   - Set appropriate limits for courses and students
   - Configure registration preferences

## File Structure

```
BACKEND/elearnsphere/src/
├── controllers/
│   └── adminController.js    # Admin business logic
├── routes/
│   └── adminRoutes.js         # Admin API routes
└── middleware/
    └── authMiddleware.js      # Auth & authorization (existing)

src/pages/admin/
├── AdminDashboard.jsx         # Main layout component
├── AdminSidebar.jsx           # Navigation sidebar
├── AdminHome.jsx              # Dashboard home page
├── UserManagement.jsx         # User management page
├── CourseManagement.jsx       # Course management page
├── Analytics.jsx              # Analytics page
└── Settings.jsx               # Settings page
```

## Future Enhancements

Potential features to add:
- Quiz management and moderation
- User activity logs
- Email notifications
- Advanced analytics with charts
- Bulk user operations
- Content reporting system
- Platform settings persistence
- Export data functionality
- User role approval workflow
