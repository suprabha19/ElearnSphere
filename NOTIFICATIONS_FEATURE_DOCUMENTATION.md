# Basic Notifications Feature Documentation

## Overview
The Basic Notifications feature provides real-time notifications to users about important events in the platform, helping students stay informed about course updates, new materials, and other activities.

## Features

### Notification Types
- ✅ **COURSE_ENROLLED** - Confirmation when a student enrolls in a course
- ✅ **NEW_MATERIAL** - Alert when new materials are added to enrolled courses
- ✅ **COURSE_UPDATED** - Notification when course details are modified
- ✅ **NEW_QUIZ** - Alert when a new quiz is available
- ✅ **QUIZ_GRADED** - Notification when quiz results are ready
- ✅ **NEW_REVIEW** - Notification for instructors when courses receive new reviews
- ✅ **REVIEW_RESPONSE** - Alert when instructor responds to a review
- ✅ **GENERAL** - General system notifications

### User Features
- ✅ **Real-time notifications** in navigation bell icon
- ✅ **Unread count badge** showing number of new notifications
- ✅ **Notification dropdown** with recent notifications (max 10)
- ✅ **Full notifications page** with filtering and management
- ✅ **Mark as read** individual or all notifications
- ✅ **Delete notifications** individually or all read ones
- ✅ **Auto-refresh** every 30 seconds in bell dropdown
- ✅ **Click to navigate** to related content

## Technical Implementation

### Backend (API)

#### Database Schema
```javascript
// Notification Model
{
  user: ObjectId (ref: User),
  type: String (enum: 8 types),
  title: String,
  message: String,
  relatedCourse: ObjectId (ref: Course),
  relatedQuiz: ObjectId (ref: Quiz),
  link: String (URL),
  read: Boolean (default: false),
  createdAt: Date,
  timestamps: true
}

// Indexed fields for performance
Index: { user: 1, read: 1, createdAt: -1 }
```

#### API Endpoints

##### 1. Get Notifications
```
GET /api/notifications
Headers: Authorization: ******
Query params:
  - limit (default: 20)
  - skip (default: 0)
  - unreadOnly (true/false)

Response: {
  notifications: [...],
  unreadCount: 5,
  total: 23
}
```

##### 2. Mark Notification as Read
```
PUT /api/notifications/:id/read
Headers: Authorization: ******

Response: {
  message: "Notification marked as read",
  notification: { ... }
}
```

##### 3. Mark All as Read
```
PUT /api/notifications/mark-all-read
Headers: Authorization: ******

Response: {
  message: "All notifications marked as read"
}
```

##### 4. Delete Notification
```
DELETE /api/notifications/:id
Headers: Authorization: ******

Response: {
  message: "Notification deleted"
}
```

##### 5. Delete All Read Notifications
```
DELETE /api/notifications/clear-read
Headers: Authorization: ******

Response: {
  message: "All read notifications deleted"
}
```

#### Helper Functions

```javascript
// Create single notification
createNotification(userId, {
  type: "COURSE_ENROLLED",
  title: "Successfully Enrolled",
  message: "You have enrolled in React Basics",
  relatedCourse: courseId,
  link: "/courses/123"
});

// Create bulk notifications (multiple users)
createBulkNotifications([userId1, userId2, ...], {
  type: "NEW_MATERIAL",
  title: "New Material Added",
  message: "New video uploaded to React Basics",
  relatedCourse: courseId,
  link: "/courses/123"
});
```

#### Notification Triggers

**1. Course Enrollment**
- **When**: Student enrolls in a course
- **Recipient**: The enrolling student
- **Type**: COURSE_ENROLLED
- **Location**: `courseController.js` - `enrollCourse()`

**2. New Material Added**
- **When**: Instructor uploads course material
- **Recipients**: All enrolled students
- **Type**: NEW_MATERIAL
- **Location**: `courseController.js` - `addCourseMaterial()`

**Future Triggers** (can be added):
- New quiz created → enrolled students
- Quiz graded → student who took quiz
- Course updated → enrolled students
- New review → course instructor
- Review response → review author

### Frontend (UI Components)

#### 1. NotificationBell Component
**Location:** `/src/components/NotificationBell.jsx`

**Features:**
- Bell icon with unread count badge
- Dropdown showing last 10 notifications
- Color-coded notification types
- Auto-refresh every 30 seconds
- Mark as read on click
- Individual delete option
- "Mark all as read" button
- Link to full notifications page

**Usage:**
```jsx
import NotificationBell from "../components/NotificationBell";

// In navigation/topbar
<NotificationBell />
```

**Integration:**
Already integrated in `/src/pages/Topbar.jsx`

#### 2. NotificationsPage Component
**Location:** `/src/pages/NotificationsPage.jsx`

**Features:**
- Full list of all notifications
- Filter by: All, Unread, Read
- Unread count display
- Mark all as read button
- Delete individual notifications
- Delete all read notifications
- Click notification to navigate
- Time ago display
- Color-coded by type
- Loading states

**Usage:**
```jsx
import NotificationsPage from "./pages/NotificationsPage";

// Add to router
<Route path="/notifications" element={<NotificationsPage />} />
```

#### Notification Colors by Type
```javascript
COURSE_ENROLLED: Green (success)
NEW_MATERIAL: Blue (info)
NEW_QUIZ: Purple (interactive)
QUIZ_GRADED: Yellow (attention)
NEW_REVIEW: Pink (feedback)
GENERAL: Gray (neutral)
```

## User Experience Flow

### Receiving a Notification
1. Event occurs (e.g., instructor adds material)
2. Backend creates notification(s) in database
3. Frontend auto-refreshes (30s interval) or on page load
4. Bell icon shows updated unread count
5. User clicks bell to see dropdown
6. New notification appears with colored badge

### Reading a Notification
1. User clicks on notification
2. Notification marked as read
3. User navigates to related content (if link exists)
4. Unread count updates
5. Notification styling changes to "read" state

### Managing Notifications
1. User clicks "View all notifications" from dropdown
2. Full page shows with filters
3. Can filter by All/Unread/Read
4. Can mark all as read
5. Can delete individual notifications
6. Can clear all read notifications

## Code Examples

### Backend: Creating a Notification

```javascript
import { createNotification } from "./notificationController.js";

// In any controller
await createNotification(userId, {
  type: "COURSE_ENROLLED",
  title: "Successfully Enrolled",
  message: `You have enrolled in ${course.title}`,
  relatedCourse: courseId,
  link: `/courses/${courseId}`,
});
```

### Backend: Bulk Notifications

```javascript
import { createBulkNotifications } from "./notificationController.js";

// Notify all enrolled students
const course = await Course.findById(courseId);
await createBulkNotifications(course.students, {
  type: "NEW_MATERIAL",
  title: "New Course Material",
  message: `New material "${material.title}" added to ${course.title}`,
  relatedCourse: courseId,
  link: `/courses/${courseId}`,
});
```

### Frontend: Fetching Notifications

```javascript
const fetchNotifications = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(
    "http://localhost:5000/api/notifications?limit=10",
    {
      headers: { Authorization: `****** },
    }
  );
  setNotifications(res.data.notifications);
  setUnreadCount(res.data.unreadCount);
};
```

## Testing the Feature

### Manual Testing Steps

1. **Setup:**
   - Start backend: `cd BACKEND/elearnsphere && npm start`
   - Start frontend: `npm run dev`
   - Login as a student

2. **Test Enrollment Notification:**
   - Enroll in a course
   - Check bell icon for unread count
   - Click bell to see notification
   - Verify notification details
   - Click notification to navigate

3. **Test New Material Notification:**
   - Login as instructor
   - Add material to a course with enrolled students
   - Logout and login as enrolled student
   - Check for new material notification

4. **Test Mark as Read:**
   - Click on a notification
   - Verify it's marked as read
   - Check unread count decreases

5. **Test Mark All as Read:**
   - Have multiple unread notifications
   - Click "Mark all as read"
   - Verify all are marked read

6. **Test Delete:**
   - Delete individual notification
   - Verify it's removed

7. **Test Full Page:**
   - Click "View all notifications"
   - Test filters (All, Unread, Read)
   - Test "Clear read" button

### API Testing with curl

```bash
# Get notifications
curl http://localhost:5000/api/notifications \
  -H "Authorization: ******"

# Get only unread
curl "http://localhost:5000/api/notifications?unreadOnly=true" \
  -H "Authorization: ******"

# Mark as read
curl -X PUT http://localhost:5000/api/notifications/{id}/read \
  -H "Authorization: ******"

# Mark all as read
curl -X PUT http://localhost:5000/api/notifications/mark-all-read \
  -H "Authorization: ******"

# Delete notification
curl -X DELETE http://localhost:5000/api/notifications/{id} \
  -H "Authorization: ******"

# Delete all read
curl -X DELETE http://localhost:5000/api/notifications/clear-read \
  -H "Authorization: ******"
```

## Performance Considerations

1. **Indexing**: Database indexed on `{user, read, createdAt}` for fast queries
2. **Pagination**: Default limit of 20, can be adjusted
3. **Auto-refresh**: 30-second interval (adjustable)
4. **Bulk Operations**: Uses `insertMany` for bulk notifications
5. **Lazy Loading**: Notifications page supports pagination

## Security

1. **Authentication**: All endpoints require JWT token
2. **Authorization**: Users can only access their own notifications
3. **Validation**: Input validation on all endpoints
4. **No XSS**: Links are sanitized when rendered

## Future Enhancements

Potential improvements:

1. **WebSocket Integration**: Real-time push notifications without polling
2. **Email Notifications**: Send important notifications via email
3. **Push Notifications**: Browser push notifications when tab is inactive
4. **Notification Preferences**: Let users choose which notifications they want
5. **Digest Mode**: Option to receive daily/weekly digest instead of individual
6. **Rich Notifications**: Support for images, action buttons
7. **Notification Groups**: Group similar notifications together
8. **Sound Alerts**: Optional sound when new notification arrives
9. **Desktop Notifications**: System-level notifications

## Files Created/Modified

### Backend (5 files):
- `BACKEND/elearnsphere/src/models/Notification.js` - New model
- `BACKEND/elearnsphere/src/controllers/notificationController.js` - New controller
- `BACKEND/elearnsphere/src/routes/notificationRoutes.js` - New routes
- `BACKEND/elearnsphere/index.js` - Added notification routes
- `BACKEND/elearnsphere/src/controllers/courseController.js` - Added triggers

### Frontend (3 files):
- `src/components/NotificationBell.jsx` - New component (280 lines)
- `src/pages/NotificationsPage.jsx` - New page (400 lines)
- `src/pages/Topbar.jsx` - Integrated NotificationBell

### Documentation (1 file):
- `NOTIFICATIONS_FEATURE_DOCUMENTATION.md` - This file

## Troubleshooting

### Common Issues

**Issue:** Notifications not appearing
- **Solution:** Check backend console for errors, verify notification was created in database

**Issue:** Unread count not updating
- **Solution:** Wait for 30s auto-refresh or reload page, check network tab for API calls

**Issue:** "Authorization failed" error
- **Solution:** Ensure JWT token is valid and not expired, re-login if necessary

**Issue:** Notifications showing for wrong user
- **Solution:** Check userId in notification creation, verify JWT token payload

**Issue:** Dropdown not closing on outside click
- **Solution:** Check that dropdownRef is properly attached to the dropdown element

## Conclusion

The Basic Notifications feature is now fully functional, providing users with timely updates about platform activities. The implementation is scalable and can easily be extended with more notification types and delivery methods in the future.
