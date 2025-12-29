# Admin Panel Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js installed (v14 or higher)
- MongoDB connection available
- Backend and Frontend code cloned

### Step 1: Setup Backend
```bash
cd BACKEND/elearnsphere
npm install
npm start
```
✅ Backend should start on http://localhost:5000

### Step 2: Setup Frontend
```bash
# In root directory
npm install
npm run dev
```
✅ Frontend should start on http://localhost:5173

### Step 3: Create Admin Account

#### Option A: Via Signup Form (Recommended)
1. Navigate to http://localhost:5173/signup
2. Fill in the registration form:
   - **Full Name**: Your Admin Name
   - **Email**: admin@example.com
   - **Password**: YourSecurePassword123 (min 8 characters)
   - **Role**: Select "ADMIN" from dropdown
   - **Secret Code**: `myAdmin456` (from .env file)
3. Click "Sign Up"
4. You should see "Signup successful" message

#### Option B: Via Database (For existing users)
```javascript
// Connect to MongoDB and run:
db.users.updateOne(
  { email: "yourexisting@email.com" },
  { $set: { role: "ADMIN" } }
)
```

### Step 4: Login as Admin
1. Navigate to http://localhost:5173/login
2. Enter your admin email and password
3. Click "Login"
4. ✅ You will be automatically redirected to `/admin-dashboard`

## 📋 Admin Panel Overview

Once logged in, you'll see the Admin Dashboard with a sidebar containing:

### 🏠 Dashboard
View platform-wide statistics and recent activities

**What you can do:**
- Monitor total users, courses, and enrollments
- See breakdown by user type (students, instructors, admins)
- Track recent platform activities
- View real-time metrics

### 👥 User Management
Manage all users on the platform

**What you can do:**
- View all users in a sortable table
- Filter users by role (Student, Instructor, Admin)
- Search users by name or email
- Edit user information (name, email, role)
- Delete users (except yourself)
- See when users joined

**Quick Actions:**
- 🔍 Use search box to find specific users
- 🎯 Filter by role to see specific user types
- ✏️ Click edit icon to modify user details
- 🗑️ Click delete icon to remove users

### 📚 Course Management
View and manage all courses on the platform

**What you can do:**
- View all courses in a visual grid
- Filter courses by category
- Search courses by title or description
- See course details (instructor, students, materials)
- Delete any course from the platform
- View course statistics

**Quick Actions:**
- 🔍 Search for specific courses
- 📑 Filter by category
- 🗑️ Delete inappropriate or outdated courses
- 👁️ Monitor course popularity and enrollment

### 📊 Analytics
View detailed platform analytics and insights

**What you can do:**
- See user distribution (students vs instructors vs admins)
- Track platform engagement metrics
- View calculated statistics (ratios, averages)
- Monitor enrollment trends
- Analyze course distribution

**Key Metrics:**
- Total Users, Courses, Enrollments
- Average enrollments per course
- Student-Instructor ratio
- Courses per instructor

### ⚙️ Settings
Configure platform-wide settings

**What you can do:**
- Update platform name and email
- Toggle user registration on/off
- Enable/disable email verification
- Set course limits per instructor
- Set student limits per course

## 🎯 Common Tasks

### Task 1: Find and Edit a User
1. Go to **User Management**
2. Use search box to find the user
3. Click the ✏️ edit icon
4. Update the information
5. Click "Save Changes"

### Task 2: Delete Inappropriate Course
1. Go to **Course Management**
2. Search or filter to find the course
3. Click "Delete" button on the course card
4. Confirm deletion

### Task 3: Promote User to Instructor
1. Go to **User Management**
2. Find the student user
3. Click ✏️ edit icon
4. Change Role to "INSTRUCTOR"
5. Click "Save Changes"

### Task 4: Monitor Platform Growth
1. Go to **Dashboard** or **Analytics**
2. View statistics cards
3. Check recent activities feed
4. Review user distribution charts

## 🔒 Security Best Practices

1. **Keep Admin Credentials Secure**
   - Use strong passwords (min 8 characters)
   - Don't share admin credentials
   - Change passwords regularly

2. **Limit Admin Accounts**
   - Only create admin accounts when necessary
   - Review admin users regularly
   - Remove unused admin accounts

3. **Monitor Activities**
   - Check recent activities regularly
   - Review new user registrations
   - Monitor course creations

4. **Be Careful with Deletions**
   - Double-check before deleting users
   - Consider data export before bulk deletions
   - Remember: Deletions are permanent

## ⚠️ Important Notes

- **Cannot Delete Yourself**: The system prevents you from deleting your own admin account
- **JWT Tokens**: Your login session is stored in browser localStorage
- **Permissions**: Only ADMIN role can access admin panel
- **Real-time Updates**: Most changes are reflected immediately

## 🐛 Troubleshooting

### Issue: Cannot login as admin
**Solution**: 
1. Verify role is set to "ADMIN" in database
2. Check JWT_SECRET matches between .env and code
3. Clear browser localStorage and try again

### Issue: "Unauthorized" or "Forbidden" error
**Solution**:
1. Check if JWT token is valid
2. Verify user role is ADMIN
3. Re-login to get fresh token

### Issue: Data not loading
**Solution**:
1. Check MongoDB connection
2. Verify backend is running on port 5000
3. Check browser console for errors
4. Verify CORS settings allow localhost:5173

### Issue: Changes not saving
**Solution**:
1. Check network tab for API errors
2. Verify backend routes are working
3. Check MongoDB write permissions
4. Look for validation errors in response

## 📞 Need Help?

- Check the comprehensive guides:
  - `ADMIN_PANEL_README.md` - Features and API documentation
  - `ADMIN_TESTING_GUIDE.md` - Testing procedures
  - `ADMIN_ARCHITECTURE.md` - System architecture

## 🎉 You're All Set!

You now have full administrative access to the ElearnSphere platform. Use the admin panel to manage users, oversee courses, and keep the platform running smoothly.

**Remember**: With great power comes great responsibility! 🦸‍♂️
