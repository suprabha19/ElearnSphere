# Progress Tracking Feature Documentation

## Overview
The Progress Tracking feature allows students to track their completion status through course materials, view progress statistics, and monitor their learning journey across all enrolled courses.

## Features

### For Students
- ✅ **Track material completion** - Mark materials as complete/incomplete
- ✅ **View progress percentage** - See completion percentage for each course
- ✅ **Progress dashboard** - Overview of all courses with statistics
- ✅ **Material checklist** - Interactive checklist for course materials
- ✅ **Progress visualization** - Color-coded progress bars
- ✅ **Statistics** - Total courses, completed, in progress, average completion
- ✅ **Quick access** - Progress bars on course cards

### Automatic Features
- ✅ **Auto-initialization** - Progress created when student views course
- ✅ **Auto-update** - Progress recalculates when materials change
- ✅ **Last accessed tracking** - Tracks when student last viewed course
- ✅ **Completion percentage** - Automatically calculated based on completed materials

## Technical Implementation

### Backend (API)

#### Database Schema
```javascript
// Progress Model
{
  student: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  completedMaterials: [
    {
      materialId: ObjectId,
      completedAt: Date
    }
  ],
  totalMaterials: Number,
  completionPercentage: Number (0-100),
  lastAccessedAt: Date,
  startedAt: Date,
  timestamps: true
}

// Indexed fields for performance
Index: { student: 1, course: 1 } (unique)
Index: { student: 1, completionPercentage: -1 }
```

#### API Endpoints

##### 1. Get Course Progress
```
GET /api/progress/course/:courseId
Headers: Authorization: ******

Response: {
  progress: {
    student: "userId",
    course: "courseId",
    completedMaterials: [...],
    totalMaterials: 10,
    completionPercentage: 60,
    lastAccessedAt: "2024-01-20T...",
    startedAt: "2024-01-15T..."
  },
  courseMaterials: [...]
}
```

**Auto-creation**: If no progress exists, it's automatically created.

##### 2. Mark Material as Complete
```
POST /api/progress/course/:courseId/material/:materialId/complete
Headers: Authorization: ******

Response: {
  message: "Material marked as complete",
  progress: { ... },
  completionPercentage: 70
}
```

**Validations:**
- User must be enrolled in the course
- Material must exist in the course
- Prevents duplicate completion entries

##### 3. Mark Material as Incomplete
```
POST /api/progress/course/:courseId/material/:materialId/incomplete
Headers: Authorization: ******

Response: {
  message: "Material marked as incomplete",
  progress: { ... },
  completionPercentage: 60
}
```

##### 4. Get All Progress
```
GET /api/progress
Headers: Authorization: ******

Response: {
  progressList: [
    {
      _id: "progressId",
      course: {
        title: "React Basics",
        description: "...",
        image: "/uploads/...",
        category: "Programming"
      },
      completionPercentage: 75,
      completedMaterials: [...],
      totalMaterials: 12
    },
    ...
  ],
  totalCourses: 5,
  averageCompletion: 65
}
```

##### 5. Get Progress Statistics
```
GET /api/progress/stats
Headers: Authorization: ******

Response: {
  stats: {
    totalCourses: 5,
    completedCourses: 2,
    inProgressCourses: 2,
    notStartedCourses: 1,
    totalMaterialsCompleted: 45,
    averageCompletion: 65
  }
}
```

##### 6. Reset Course Progress
```
DELETE /api/progress/course/:courseId/reset
Headers: Authorization: ******

Response: {
  message: "Progress reset successfully",
  progress: { ... }
}
```

**Use case**: Student wants to restart a course from the beginning.

### Frontend (UI Components)

#### 1. ProgressBar Component
**Location:** `/src/components/ProgressBar.jsx`

**Features:**
- Reusable progress bar with customizable height and color
- Shows percentage completion
- Smooth animations
- Optional percentage text display

**Usage:**
```jsx
import ProgressBar from "../components/ProgressBar";

<ProgressBar 
  percentage={75} 
  showPercentage={true} 
  height="h-4"
  color="bg-blue-600"
/>
```

**Props:**
- `percentage` (number): 0-100
- `showPercentage` (boolean): Show text below bar
- `height` (string): Tailwind height class (default: "h-2")
- `color` (string): Tailwind color class (default: "bg-blue-600")

#### 2. CourseProgress Page
**Location:** `/src/pages/student/CourseProgress.jsx`

**Features:**
- Displays all materials in a course
- Interactive checkboxes to mark complete/incomplete
- Shows material type icons (video, PDF, image)
- Progress bar with statistics
- Color-coded completed materials (green background)
- Material type badges

**Route:** `/student/courses/:courseId/progress`

**Key Functions:**
```javascript
// Fetch progress data
fetchProgress();

// Toggle material completion
toggleMaterialComplete(materialId, isCompleted);

// Check if material is completed
isMaterialCompleted(materialId);
```

#### 3. ProgressDashboard Page
**Location:** `/src/pages/student/ProgressDashboard.jsx`

**Features:**
- Statistics cards (Total, Completed, In Progress, Average)
- Overall progress bar
- List of all enrolled courses with progress
- Course thumbnails
- Quick actions (View Progress, View Course)
- Empty state with call-to-action

**Route:** `/student/progress` or `/progress`

**Statistics Display:**
- Total Courses (blue)
- Completed Courses (green)
- In Progress (yellow)
- Average Completion (purple)

#### 4. AllCourses Integration
**Location:** `/src/pages/AllCourses.jsx`

**Enhancement:**
- Fetches progress data for all courses
- Displays progress bar on each course card
- Shows current completion percentage
- Updates when progress changes

## User Experience Flow

### Viewing Course Progress
1. Student navigates to course details
2. Clicks "View Progress" or similar link
3. CourseProgress page loads with all materials
4. Student sees checklist with completion status
5. Can click checkboxes to mark materials complete

### Marking Materials Complete
1. Student views course material (video, PDF, etc.)
2. Clicks checkbox next to material
3. API marks material as complete
4. Progress bar updates instantly
5. Completion percentage recalculates
6. Checkbox shows green checkmark

### Viewing Progress Dashboard
1. Student navigates to progress dashboard
2. Sees overall statistics at top
3. Scrolls through list of all courses
4. Views progress for each course
5. Can click to view detailed progress or course

### Progress on Course Cards
1. Student browses courses
2. Sees progress bar on enrolled courses
3. Quickly identifies which courses to continue
4. Progress updates reflect real-time completion

## Code Examples

### Backend: Calculate Progress

```javascript
// Automatic calculation in Progress model
progressSchema.methods.calculateProgress = function () {
  if (this.totalMaterials === 0) {
    this.completionPercentage = 0;
  } else {
    this.completionPercentage = Math.round(
      (this.completedMaterials.length / this.totalMaterials) * 100
    );
  }
  return this.completionPercentage;
};

// Usage in controller
progress.calculateProgress();
await progress.save();
```

### Backend: Mark Material Complete

```javascript
export const markMaterialComplete = async (req, res) => {
  const { courseId, materialId } = req.params;
  const studentId = req.user.id;

  // Find or create progress
  let progress = await Progress.findOne({
    student: studentId,
    course: courseId,
  });

  if (!progress) {
    progress = await Progress.create({
      student: studentId,
      course: courseId,
      totalMaterials: course.materials.length,
      completedMaterials: [{ materialId, completedAt: new Date() }],
    });
  } else {
    // Add to completed if not already there
    const alreadyCompleted = progress.completedMaterials.some(
      m => m.materialId.toString() === materialId
    );
    if (!alreadyCompleted) {
      progress.completedMaterials.push({ materialId, completedAt: new Date() });
    }
  }

  progress.calculateProgress();
  await progress.save();

  res.json({ progress, completionPercentage: progress.completionPercentage });
};
```

### Frontend: Toggle Material

```javascript
const toggleMaterialComplete = async (materialId, isCompleted) => {
  const token = localStorage.getItem("token");
  const endpoint = isCompleted ? "incomplete" : "complete";
  
  await axios.post(
    `http://localhost:5000/api/progress/course/${courseId}/material/${materialId}/${endpoint}`,
    {},
    { headers: { Authorization: `****** } }
  );

  fetchProgress(); // Refresh progress data
};
```

## Testing the Feature

### Manual Testing Steps

1. **Setup:**
   - Start backend and frontend
   - Login as a student
   - Enroll in a course with materials

2. **Test Progress Creation:**
   - Navigate to a course
   - View course materials
   - Check that progress is automatically created
   - Verify progress shows 0% initially

3. **Test Marking Complete:**
   - Click checkbox next to a material
   - Verify checkmark appears
   - Verify progress bar updates
   - Verify percentage increases
   - Check material has green background

4. **Test Marking Incomplete:**
   - Click checkbox again
   - Verify checkmark disappears
   - Verify progress decreases

5. **Test Progress Dashboard:**
   - Navigate to progress dashboard
   - Verify statistics are correct
   - Check all enrolled courses appear
   - Verify progress bars match course progress

6. **Test Course Cards:**
   - Browse courses page
   - Verify enrolled courses show progress bars
   - Check percentages match actual progress

### API Testing with curl

```bash
# Get course progress
curl http://localhost:5000/api/progress/course/{courseId} \
  -H "Authorization: ******"

# Mark material complete
curl -X POST http://localhost:5000/api/progress/course/{courseId}/material/{materialId}/complete \
  -H "Authorization: ******"

# Mark material incomplete
curl -X POST http://localhost:5000/api/progress/course/{courseId}/material/{materialId}/incomplete \
  -H "Authorization: ******"

# Get all progress
curl http://localhost:5000/api/progress \
  -H "Authorization: ******"

# Get statistics
curl http://localhost:5000/api/progress/stats \
  -H "Authorization: ******"

# Reset progress
curl -X DELETE http://localhost:5000/api/progress/course/{courseId}/reset \
  -H "Authorization: ******"
```

## Performance Considerations

1. **Database Indexing**: Compound index on `{student, course}` for fast lookups
2. **Caching**: Consider caching progress data on frontend for 30s-1min
3. **Batch Updates**: Materials marked in sequence use single progress update
4. **Lazy Loading**: Progress dashboard paginates for users with many courses
5. **Auto-sync**: Progress auto-updates when materials are added/removed from course

## Security

1. **Enrollment Check**: Only enrolled students can view/update progress
2. **Material Validation**: Verifies material exists in course before marking complete
3. **User Isolation**: Students can only access their own progress
4. **Authorization**: All endpoints require JWT authentication
5. **Data Integrity**: Unique index prevents duplicate progress records

## Future Enhancements

Potential improvements:

1. **Time Tracking**: Track time spent on each material
2. **Streaks**: Track consecutive days of learning
3. **Milestones**: Badges for reaching 25%, 50%, 75%, 100%
4. **Reminders**: Notify students to continue incomplete courses
5. **Certificates**: Auto-generate certificates at 100% completion
6. **Learning Path**: Suggest next materials based on progress
7. **Peer Comparison**: Anonymous comparison with other students
8. **Export Progress**: Download progress report as PDF
9. **Goals**: Set weekly/monthly learning goals
10. **Analytics**: Detailed time-series progress charts

## Integration with Other Features

### Notifications
- Notify student when reaching milestones (25%, 50%, 75%, 100%)
- Remind students of incomplete courses

### Certificates
- Trigger certificate generation at 100% completion
- Require 100% progress to download certificate

### Reviews
- Encourage reviews when course is 100% complete
- Show completion status in review submission

## Files Created/Modified

### Backend (4 files):
- `BACKEND/elearnsphere/src/models/Progress.js` - New model
- `BACKEND/elearnsphere/src/controllers/progressController.js` - New controller (6 functions)
- `BACKEND/elearnsphere/src/routes/progressRoutes.js` - New routes
- `BACKEND/elearnsphere/index.js` - Added progress routes

### Frontend (4 files):
- `src/components/ProgressBar.jsx` - Reusable component (30 lines)
- `src/pages/student/CourseProgress.jsx` - Detailed progress page (240 lines)
- `src/pages/student/ProgressDashboard.jsx` - Statistics dashboard (280 lines)
- `src/pages/AllCourses.jsx` - Added progress bars to course cards

### Documentation (1 file):
- `PROGRESS_TRACKING_DOCUMENTATION.md` - This file

## Troubleshooting

### Common Issues

**Issue:** Progress not showing
- **Solution:** Ensure student is enrolled in the course, check API endpoint response

**Issue:** Progress percentage not updating
- **Solution:** Check that `calculateProgress()` is called after marking materials, verify totalMaterials count

**Issue:** "Not enrolled in this course" error
- **Solution:** Student must enroll in course before accessing progress

**Issue:** Materials not appearing
- **Solution:** Verify course has materials, check courseMaterials in API response

**Issue:** Progress resets unexpectedly
- **Solution:** Check for duplicate progress records, verify unique index on model

## Conclusion

The Progress Tracking feature provides students with clear visibility into their learning journey, helping them stay motivated and organized. The implementation is efficient, secure, and provides a solid foundation for future enhancements like certificates and achievements.
