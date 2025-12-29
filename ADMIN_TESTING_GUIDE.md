# Admin Panel Testing Guide

## Prerequisites
1. MongoDB connection is working
2. Backend server is running on port 5000
3. Frontend dev server is running on port 5173
4. At least one admin account exists

## Creating an Admin Account

### Via Signup Form:
1. Navigate to `/signup`
2. Fill in the form:
   - Full Name: "Admin User"
   - Email: "admin@test.com"
   - Password: (minimum 8 characters)
   - Role: Select "ADMIN"
   - Secret Code: "myAdmin456" (from .env)
3. Click "Sign Up"
4. Should see success message

### Via Database (if needed):
```javascript
// In MongoDB, update a user's role to ADMIN
db.users.updateOne(
  { email: "user@test.com" },
  { $set: { role: "ADMIN" } }
)
```

## Test Checklist

### 1. Authentication & Authorization ✓
- [ ] Login with admin credentials
- [ ] Verify redirect to `/admin-dashboard`
- [ ] Verify admin sidebar appears
- [ ] Logout and verify redirect to login
- [ ] Try accessing `/admin-dashboard` without login (should redirect)
- [ ] Try accessing with non-admin account (should show 403 error)

### 2. Admin Dashboard Home ✓
**URL**: `/admin-dashboard` or `/admin-dashboard/home`

Expected to see:
- [ ] Platform statistics cards (6 cards):
  - Total Users
  - Students
  - Instructors
  - Total Courses
  - Enrollments
  - Quizzes
- [ ] All statistics show correct numbers
- [ ] Recent Activities section displays recent enrollments and course creations
- [ ] Activities show proper timestamps

### 3. User Management ✓
**URL**: `/admin-dashboard/users`

#### View Users
- [ ] Table displays all users
- [ ] Shows: Name, Email, Role, Join Date, Actions
- [ ] Role badges have correct colors:
  - Admin: Red background
  - Instructor: Blue background
  - Student: Green background

#### Filter & Search
- [ ] "All Roles" dropdown works
- [ ] Filter by "Students" shows only students
- [ ] Filter by "Instructors" shows only instructors
- [ ] Filter by "Admins" shows only admins
- [ ] Search box filters by name
- [ ] Search box filters by email
- [ ] Filters work together correctly

#### Edit User
- [ ] Click edit icon opens modal
- [ ] Modal shows current user data
- [ ] Can edit Full Name
- [ ] Can edit Email
- [ ] Can change Role
- [ ] "Save Changes" updates user successfully
- [ ] Toast notification appears on success
- [ ] Table refreshes with new data
- [ ] "Cancel" closes modal without saving

#### Delete User
- [ ] Click delete icon shows confirmation dialog
- [ ] "Cancel" in dialog does nothing
- [ ] "OK" deletes the user
- [ ] Toast notification appears on success
- [ ] Table refreshes without deleted user
- [ ] Cannot delete own account (should show error)

### 4. Course Management ✓
**URL**: `/admin-dashboard/courses`

#### View Courses
- [ ] Courses display in grid layout (3 columns on large screens)
- [ ] Each card shows:
  - Course image (if available)
  - Course title
  - Description (truncated)
  - Category badge
  - Student count
  - Instructor name and email
  - Delete button

#### Statistics
- [ ] "Total Courses" card shows correct count
- [ ] "Total Materials" card shows sum of all materials
- [ ] "Categories" card shows unique category count

#### Filter & Search
- [ ] "All Categories" dropdown shows all categories
- [ ] Filter by category works correctly
- [ ] Search box filters by title
- [ ] Search box filters by description
- [ ] Filters work together correctly

#### Delete Course
- [ ] Click "Delete" shows confirmation dialog
- [ ] "Cancel" does nothing
- [ ] "OK" deletes the course
- [ ] Toast notification appears on success
- [ ] Grid refreshes without deleted course

### 5. Analytics ✓
**URL**: `/admin-dashboard/analytics`

#### Key Metrics
- [ ] "Total Users" card displays correctly
- [ ] "Total Courses" card displays correctly
- [ ] "Enrollments" card displays correctly
- [ ] "Avg Enrollment" card shows calculated average

#### User Distribution
- [ ] Shows bar chart visualization
- [ ] Students bar (green)
- [ ] Instructors bar (blue)
- [ ] Admins bar (red)
- [ ] Bars scale correctly based on values

#### Platform Engagement
- [ ] Shows total enrollments with progress bar (purple)
- [ ] Shows total courses with progress bar (orange)
- [ ] Shows total quizzes with progress bar (pink)

#### Platform Statistics
- [ ] "Student-Instructor Ratio" calculates correctly
- [ ] "Courses per Instructor" calculates correctly
- [ ] Both metrics update with real data

### 6. Settings ✓
**URL**: `/admin-dashboard/settings`

#### General Settings
- [ ] Platform Name field shows current value
- [ ] Platform Email field shows current value
- [ ] Can edit both fields

#### Registration Settings
- [ ] "Allow Registration" toggle works
- [ ] Toggle reflects current state
- [ ] "Email Verification" toggle works
- [ ] Toggle reflects current state

#### Course Limits
- [ ] "Max Courses per Instructor" accepts numeric input
- [ ] "Max Students per Course" accepts numeric input
- [ ] Both fields validate minimum value of 1

#### Save Functionality
- [ ] "Save Settings" button works
- [ ] Toast notification appears on success
- [ ] Settings are logged to console

### 7. Navigation & UI ✓
- [ ] All sidebar links work correctly
- [ ] Active link is highlighted
- [ ] Topbar displays user information
- [ ] Logout button works from sidebar
- [ ] Responsive design works on mobile
- [ ] No console errors appear
- [ ] All icons render correctly

### 8. Backend API Endpoints ✓

Test with curl or Postman:

#### Get Statistics
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/stats
```
Expected: JSON with stats object

#### Get All Users
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/users
```
Expected: Array of user objects

#### Get All Courses
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/courses
```
Expected: Array of course objects

#### Update User
```bash
curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Updated Name","role":"INSTRUCTOR"}' \
  http://localhost:5000/api/admin/users/USER_ID
```
Expected: Success message and updated user

#### Delete User
```bash
curl -X DELETE -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/users/USER_ID
```
Expected: Success message

#### Delete Course
```bash
curl -X DELETE -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/courses/COURSE_ID
```
Expected: Success message

### 9. Security Tests ✓
- [ ] Cannot access admin endpoints without token (401 error)
- [ ] Cannot access admin endpoints with student token (403 error)
- [ ] Cannot access admin endpoints with instructor token (403 error)
- [ ] Admin token works for all admin endpoints
- [ ] CORS is properly configured
- [ ] Password fields are not returned in API responses

### 10. Error Handling ✓
- [ ] Network errors show appropriate messages
- [ ] 404 errors handled gracefully
- [ ] Invalid data shows validation errors
- [ ] Empty states display correctly (no users, no courses)
- [ ] Loading states appear while fetching data

## Common Issues & Solutions

### Issue: "Unauthorized" error
**Solution**: Ensure JWT token is valid and stored in localStorage

### Issue: "Forbidden" error
**Solution**: Verify user has ADMIN role in database

### Issue: Data not loading
**Solution**: Check MongoDB connection and backend console for errors

### Issue: Filters not working
**Solution**: Clear browser cache and reload

### Issue: Toast notifications not appearing
**Solution**: Verify react-toastify is properly imported in App.jsx

## Performance Checks
- [ ] Dashboard loads within 2 seconds
- [ ] User list with 100+ users loads quickly
- [ ] Course grid with 50+ courses loads quickly
- [ ] No memory leaks during navigation
- [ ] API responses are fast (<500ms for most endpoints)

## Browser Compatibility
Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Final Verification
- [ ] All features work as expected
- [ ] No console errors or warnings
- [ ] UI is responsive across devices
- [ ] All permissions are correctly enforced
- [ ] Data persistence works correctly
- [ ] Documentation is accurate and complete
