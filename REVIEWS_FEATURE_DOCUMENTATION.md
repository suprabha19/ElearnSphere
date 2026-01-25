# Course Reviews and Ratings Feature Documentation

## Overview
The Course Reviews and Ratings feature allows enrolled students to rate and review courses, helping other students make informed decisions and providing feedback to instructors.

## Features

### For Students
- ✅ **Rate courses** with a 5-star rating system
- ✅ **Write detailed reviews** with comments
- ✅ **Edit reviews** after submission
- ✅ **Delete reviews** if needed
- ✅ **View all reviews** for any course
- ✅ **See average ratings** on course listings

### Business Rules
- Only **enrolled students** can submit reviews
- Each student can submit **one review per course**
- Reviews can be **edited or deleted** by the author
- Average rating is **automatically calculated** when reviews are added, updated, or deleted

## Technical Implementation

### Backend (API)

#### Database Schema
```javascript
// Added to Course model
{
  reviews: [
    {
      user: ObjectId (ref: User),
      rating: Number (1-5),
      comment: String,
      createdAt: Date,
      updatedAt: Date
    }
  ],
  averageRating: Number (default: 0),
  totalReviews: Number (default: 0)
}
```

#### API Endpoints

##### 1. Add Review
```
POST /api/courses/:id/reviews
Headers: Authorization: Bearer <token>
Body: { rating: 1-5, comment: "..." }

Response: {
  message: "Review added successfully",
  review: { ... },
  averageRating: 4.5,
  totalReviews: 10
}
```

**Validations:**
- User must be authenticated
- User must be enrolled in the course
- User must not have reviewed before
- Rating must be between 1 and 5
- Comment is required

##### 2. Get Reviews
```
GET /api/courses/:id/reviews
Headers: Authorization: Bearer <token>

Response: {
  reviews: [{ user, rating, comment, createdAt, ... }],
  averageRating: 4.5,
  totalReviews: 10
}
```

##### 3. Update Review
```
PUT /api/courses/:courseId/reviews/:reviewId
Headers: Authorization: Bearer <token>
Body: { rating: 4, comment: "Updated review" }

Response: {
  message: "Review updated successfully",
  review: { ... },
  averageRating: 4.3
}
```

**Validations:**
- User must own the review
- Rating must be between 1 and 5 (if provided)

##### 4. Delete Review
```
DELETE /api/courses/:courseId/reviews/:reviewId
Headers: Authorization: Bearer <token>

Response: {
  message: "Review deleted successfully",
  averageRating: 4.2,
  totalReviews: 9
}
```

**Authorization:**
- Review owner can delete their review
- Admin can delete any review

### Frontend (UI Components)

#### 1. ReviewForm Component
**Location:** `/src/components/ReviewForm.jsx`

**Features:**
- Interactive 5-star rating selector with hover effects
- Textarea for review comment (min 10 characters)
- Character counter
- Supports both new reviews and editing
- Cancel button for edit mode

**Usage:**
```jsx
<ReviewForm
  onSubmit={handleSubmitReview}
  existingReview={userReview} // Optional, for editing
  onCancel={() => setEditingReview(false)} // Optional
/>
```

#### 2. ReviewList Component
**Location:** `/src/components/ReviewList.jsx`

**Features:**
- Displays average rating summary with large rating display
- Lists all reviews with user info, rating stars, and comments
- Edit/delete buttons for own reviews
- Formatted dates with edit indicators
- User avatars with initials

**Usage:**
```jsx
<ReviewList
  reviews={reviews}
  currentUserId={currentUserId}
  onEdit={handleEditReview}
  onDelete={handleDeleteReview}
  averageRating={averageRating}
  totalReviews={totalReviews}
/>
```

#### 3. Integration in CourseDetails
**Location:** `/src/pages/student/CourseDetails.jsx`

The CourseDetails page now includes:
- Review form section (for enrolled students only)
- Reviews list section
- Automatic review fetching on page load
- Edit/delete functionality

**Flow:**
1. Student enrolls in course
2. Reviews section becomes visible
3. If no review exists, show review form
4. After submitting, review appears in list
5. Edit/delete buttons available on own review

#### 4. Rating Display on Course Cards
**Location:** `/src/pages/AllCourses.jsx`

Course cards now show:
- Star rating visualization
- Average rating number (e.g., 4.5)
- Total review count (e.g., "(12 reviews)")

## User Experience Flow

### Submitting a Review
1. Student enrolls in a course
2. Navigates to course details page
3. Scrolls to Reviews section
4. Clicks on stars to select rating (1-5)
5. Writes review comment (minimum 10 characters)
6. Clicks "Submit Review"
7. Review appears in the list
8. Average rating updates automatically

### Editing a Review
1. Student sees their review in the list
2. Clicks edit icon (pencil)
3. Review form appears with existing data
4. Makes changes to rating/comment
5. Clicks "Update Review"
6. Review updates in the list
7. Shows "(edited)" indicator

### Deleting a Review
1. Student clicks delete icon (trash)
2. Confirmation dialog appears
3. Confirms deletion
4. Review removed from list
5. Average rating recalculates

## Code Examples

### Adding a Review (Frontend)
```javascript
const handleSubmitReview = async (reviewData) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/api/courses/${courseId}/reviews`,
      reviewData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Review submitted successfully!");
    fetchReviews(); // Refresh reviews list
  } catch (err) {
    alert(err.response?.data?.message || "Failed to submit review");
  }
};
```

### Backend Controller Logic
```javascript
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const courseId = req.params.id;
  const userId = req.user.id;

  // Validate enrollment
  const user = await User.findById(userId);
  if (!user.enrolledCourses.some(id => id.toString() === courseId)) {
    return res.status(403).json({ 
      message: "You must be enrolled to review this course" 
    });
  }

  // Check for duplicate
  const course = await Course.findById(courseId);
  const existingReview = course.reviews.find(
    r => r.user.toString() === userId
  );
  if (existingReview) {
    return res.status(400).json({ 
      message: "You have already reviewed this course" 
    });
  }

  // Add review
  course.reviews.push({ user: userId, rating, comment });
  
  // Calculate average
  const totalRating = course.reviews.reduce((sum, r) => sum + r.rating, 0);
  course.averageRating = totalRating / course.reviews.length;
  course.totalReviews = course.reviews.length;
  
  await course.save();
  res.status(201).json({ review, averageRating, totalReviews });
};
```

## Testing the Feature

### Manual Testing Steps

1. **Setup:**
   - Start backend server: `cd BACKEND/elearnsphere && npm start`
   - Start frontend: `npm run dev`

2. **Test Adding Review:**
   - Login as a student
   - Enroll in a course
   - Navigate to course details
   - Submit a review with rating and comment
   - Verify review appears in list
   - Verify average rating updates

3. **Test Duplicate Prevention:**
   - Try to submit another review
   - Should show error: "You have already reviewed this course"

4. **Test Edit:**
   - Click edit icon on your review
   - Change rating/comment
   - Click update
   - Verify changes saved

5. **Test Delete:**
   - Click delete icon
   - Confirm deletion
   - Verify review removed
   - Verify average rating recalculates

6. **Test Enrollment Check:**
   - Try to review without enrolling
   - Should show error: "You must be enrolled to review this course"

### API Testing with curl

```bash
# Add review
curl -X POST http://localhost:5000/api/courses/{courseId}/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Great course!"}'

# Get reviews
curl http://localhost:5000/api/courses/{courseId}/reviews \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update review
curl -X PUT http://localhost:5000/api/courses/{courseId}/reviews/{reviewId} \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating": 4, "comment": "Updated review"}'

# Delete review
curl -X DELETE http://localhost:5000/api/courses/{courseId}/reviews/{reviewId} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Security Considerations

1. **Authentication:** All endpoints require JWT token
2. **Authorization:** Users can only edit/delete their own reviews (except admins)
3. **Enrollment Check:** Prevents non-enrolled users from reviewing
4. **Duplicate Prevention:** One review per student per course
5. **Input Validation:** Rating range (1-5), comment required, minimum length

## Future Enhancements

Potential improvements for future versions:

1. **Helpful Votes:** Allow users to mark reviews as helpful
2. **Review Responses:** Let instructors respond to reviews
3. **Review Moderation:** Admin interface to moderate inappropriate reviews
4. **Rich Text:** Support formatted text in comments
5. **Image Attachments:** Allow students to attach screenshots
6. **Review Filtering:** Filter by rating, date, helpful votes
7. **Verified Purchase:** Badge for students who completed the course
8. **Review Analytics:** Dashboard showing review trends over time

## Troubleshooting

### Common Issues

**Issue:** "You must be enrolled to review this course"
- **Solution:** Enroll in the course first before submitting a review

**Issue:** "You have already reviewed this course"
- **Solution:** Edit your existing review instead of creating a new one

**Issue:** Reviews not showing
- **Solution:** Check browser console for errors, verify API endpoint is accessible

**Issue:** Average rating not updating
- **Solution:** Check backend logs, verify calculation logic in controller

**Issue:** Can't edit/delete review
- **Solution:** Ensure you're logged in as the review author, check JWT token validity

## Files Modified

### Backend
- `BACKEND/elearnsphere/src/models/Course.js` - Added reviews schema
- `BACKEND/elearnsphere/src/controllers/courseController.js` - Added 4 controller functions
- `BACKEND/elearnsphere/src/routes/courseRoutes.js` - Added 4 new routes

### Frontend
- `src/components/ReviewForm.jsx` - New component (124 lines)
- `src/components/ReviewList.jsx` - New component (135 lines)
- `src/pages/student/CourseDetails.jsx` - Integrated reviews (70+ lines added)
- `src/pages/AllCourses.jsx` - Added rating display (20 lines added)

## Conclusion

The Course Reviews and Ratings feature is now fully functional, providing students with a way to share their experiences and helping other students make informed course selections. The implementation follows best practices for security, user experience, and code organization.
