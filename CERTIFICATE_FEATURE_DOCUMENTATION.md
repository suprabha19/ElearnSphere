# Certificate Generation & Sequential Material Unlocking Documentation

## Overview
This feature implements a comprehensive certificate generation system combined with sequential material unlocking to ensure students complete course materials in order and cannot skip ahead. Videos include anti-cheat mechanisms to prevent forwarding without watching.

## Key Features

### Certificate Generation
- ✅ **Auto-generation** - Certificates automatically created when course reaches 100% completion
- ✅ **Unique certificate numbers** - Each certificate has a unique verification code
- ✅ **Verification system** - Public verification URL to validate certificates
- ✅ **Professional design** - Print-ready certificate with branding
- ✅ **Download/Print** - Students can download or print their certificates
- ✅ **Certificate management** - View all earned certificates in one place

### Sequential Material Unlocking
- ✅ **Linear progression** - Students must complete materials in order
- ✅ **First material unlocked** - First material always accessible
- ✅ **Lock next materials** - Subsequent materials locked until previous completed
- ✅ **Visual indicators** - Clear locked/unlocked/completed states
- ✅ **Progress tracking** - Real-time progress updates

### Video Anti-Cheat System
- ✅ **Watch time tracking** - Records actual watch time vs video duration
- ✅ **Prevent forwarding** - Users cannot seek ahead beyond watched portions
- ✅ **95% requirement** - Must watch 95% of video to mark complete
- ✅ **Watched segments** - Tracks which portions have been viewed
- ✅ **Auto-save progress** - Progress saved every 10 seconds
- ✅ **Resume capability** - Students can resume from where they left off

## Technical Implementation

### Backend

#### Database Schema

**Certificate Model:**
```javascript
{
  student: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  certificateNumber: String (unique), // Format: CERT-{timestamp}-{random}
  issuedDate: Date,
  completionDate: Date,
  grade: String (default: "Pass"),
  verificationUrl: String,
  timestamps: true
}

// Indexes
Index: { student: 1, course: 1 } (unique)
Index: { certificateNumber: 1 }
```

**Progress Model Updates:**
```javascript
{
  // Existing fields...
  completedMaterials: [
    {
      materialId: ObjectId,
      completedAt: Date,
      watchTime: Number, // seconds watched
      totalDuration: Number, // total video duration
      fullyWatched: Boolean, // 95%+ watched
    }
  ],
  videoWatchProgress: [
    {
      materialId: ObjectId,
      currentTime: Number, // current position in seconds
      duration: Number, // total duration
      watchedSegments: [
        { start: Number, end: Number }
      ],
      lastWatchedAt: Date,
    }
  ]
}

// New Methods
isMaterialUnlocked(materialIndex, courseMaterials)
getNextUnlockedMaterialIndex(courseMaterials)
```

#### API Endpoints

##### Certificate Endpoints

**1. Generate Certificate**
```
POST /api/certificates/generate/:courseId
Headers: Authorization: Bearer {token}

Response: {
  message: "Certificate generated successfully",
  certificate: {
    _id: "certificateId",
    certificateNumber: "CERT-xyz123-ABC456",
    issuedDate: "2024-01-20T...",
    student: { fullName: "John Doe", email: "..." },
    course: { title: "...", instructor: {...} }
  }
}

Errors:
- 400: "Certificate already generated" or "Course must be 100% complete"
- 404: "Course not found"
```

**Auto-trigger:** Automatically called when progress reaches 100%

**2. Get Certificate for Course**
```
GET /api/certificates/course/:courseId
Headers: Authorization: Bearer {token}

Response: {
  certificate: { ... }
}

Errors:
- 404: "Certificate not found"
```

**3. Get All Certificates**
```
GET /api/certificates
Headers: Authorization: Bearer {token}

Response: {
  certificates: [...],
  total: 5
}
```

**4. Get Certificate by ID**
```
GET /api/certificates/:id
Headers: Authorization: Bearer {token}

Response: {
  certificate: { ... }
}

Errors:
- 403: "Unauthorized" (not the owner)
- 404: "Certificate not found"
```

**5. Verify Certificate** (Public)
```
GET /api/certificates/verify/:certificateNumber

Response: {
  valid: true,
  certificate: {
    student: { fullName: "..." },
    course: { title: "...", instructor: {...} },
    issuedDate: "...",
    certificateNumber: "..."
  }
}

OR

{
  valid: false,
  message: "Certificate not found"
}
```

##### Progress Endpoints (New/Updated)

**6. Get Unlocked Materials**
```
GET /api/progress/course/:courseId/unlocked
Headers: Authorization: Bearer {token}

Response: {
  materials: [
    {
      _id: "materialId",
      title: "Introduction Video",
      type: "video",
      url: "/uploads/...",
      index: 0,
      isUnlocked: true,
      isCompleted: false,
      videoProgress: {
        currentTime: 120,
        duration: 600,
        watchedSegments: [...]
      }
    },
    {
      _id: "materialId2",
      title: "Lesson 2",
      index: 1,
      isUnlocked: false, // Locked until previous complete
      isCompleted: false,
      videoProgress: null
    }
  ],
  nextUnlockedIndex: 0
}
```

**7. Update Video Progress**
```
POST /api/progress/course/:courseId/material/:materialId/video-progress
Headers: Authorization: Bearer {token}
Body: {
  currentTime: 150,
  duration: 600,
  watchedSegments: [
    { start: 0, end: 150 }
  ]
}

Response: {
  message: "Video progress updated",
  videoProgress: { ... }
}
```

**Called:** Every 10 seconds while video is playing

**8. Mark Video Complete**
```
POST /api/progress/course/:courseId/material/:materialId/video-complete
Headers: Authorization: Bearer {token}
Body: {
  watchTime: 570, // total seconds watched
  totalDuration: 600 // video duration
}

Response: {
  message: "Material marked as complete",
  progress: { ... },
  completionPercentage: 50,
  certificateEligible: false
}

Errors:
- 403: "This material is locked. Complete previous materials first."
- 400: "Video must be watched at least 95% to mark as complete"
```

**Auto-trigger:** Auto-generates certificate if completion reaches 100%

### Frontend

#### Components

**1. VideoPlayer Component**
**Location:** `/src/components/VideoPlayer.jsx`

**Features:**
- Custom video controls
- Anti-cheat watch tracking
- Prevents seeking ahead
- Progress bar shows watched (green) vs unwatched portions
- Current position indicator (red)
- Auto-saves progress every 10 seconds
- Watch percentage display
- Completion indicator (95% threshold)

**Props:**
```javascript
<VideoPlayer 
  videoUrl="http://localhost:5000/uploads/video.mp4"
  courseId="courseId123"
  materialId="materialId456"
  onComplete={(data) => {
    // Called when video reaches 95% watched
    // data.certificateEligible: boolean
  }}
/>
```

**Anti-Cheat Mechanism:**
```javascript
// Prevents seeking ahead
const handleSeeking = () => {
  const current = video.currentTime;
  const maxWatchedTime = getMaxWatchedTime();
  
  // Allow backward seek, prevent forward beyond watched
  if (current > maxWatchedTime + 2) {
    video.currentTime = maxWatchedTime;
  }
};

// Track watched segments
const updateWatchedSegments = (current) => {
  // Records 1-second segments as watched
  // Merges adjacent segments
};

// Calculate watch percentage
const getWatchPercentage = () => {
  const totalWatched = watchedSegments.reduce(
    (sum, s) => sum + (s.end - s.start), 0
  );
  return (totalWatched / duration) * 100;
};
```

**2. CourseProgressSequential Component**
**Location:** `/src/pages/student/CourseProgressSequential.jsx`

**Features:**
- Two-column layout (materials list + viewer)
- Sequential unlocking UI
- Locked/unlocked/completed indicators
- Integrated VideoPlayer for videos
- PDF/image viewers for other materials
- Auto-certificate notification
- Link to certificate when earned

**Sequential Logic:**
- First material: Always unlocked
- Next material: Unlocked only if previous is completed
- Locked materials: Show lock icon, disabled click, explanation text
- Completed materials: Green background, checkmark icon

**Material States:**
```javascript
// Unlocked & Not Completed
<button className="bg-white border-gray-200 hover:border-gray-300">
  <VideoIcon /> Material Title
</button>

// Unlocked & Completed
<button className="bg-green-50 border-green-200">
  <CheckCircle className="text-green-600" /> Material Title
</button>

// Locked
<button className="bg-gray-100 cursor-not-allowed" disabled>
  <LockIcon className="text-gray-400" /> Material Title
  <p>Complete previous material to unlock</p>
</button>
```

**3. CertificateView Component**
**Location:** `/src/pages/student/CertificateView.jsx`

**Features:**
- Professional certificate design
- Student name, course title, date
- Instructor information
- Certificate number for verification
- Verification URL
- Print-ready styling
- Download/print button

**Design Elements:**
- Double border (yellow/gold)
- Certificate icon
- Large student name
- Course title
- Issue date
- Signature line
- Certificate number
- Verification badge (hidden in screen view)

**4. MyCertificates Component**
**Location:** `/src/pages/student/MyCertificates.jsx`

**Features:**
- Grid of earned certificates
- Certificate previews
- Issue dates
- Certificate numbers
- View/download actions
- Statistics (total, this year, last 30 days)
- Empty state with CTA

## User Flow

### Sequential Learning Flow

1. **Student enrolls in course**
   - Progress automatically created
   - First material unlocked
   - All other materials locked

2. **Student starts first material**
   - If video: VideoPlayer loads
   - Progress tracking begins
   - Can pause/resume
   - Cannot skip ahead

3. **Student watches video**
   - Progress saved every 10 seconds
   - Watched segments tracked (green)
   - Current position shown (red)
   - Watch percentage displayed

4. **Student tries to skip ahead**
   - Video jumps back to max watched time
   - Message: "Cannot seek ahead"

5. **Student completes 95% of video**
   - "Ready to complete" indicator shows
   - Video ends or student closes
   - API validates 95% watched
   - Material marked complete
   - Next material unlocks

6. **Student moves to next material**
   - Clicks on newly unlocked material
   - Previous materials remain accessible
   - New material loads in viewer

7. **Student completes all materials**
   - Progress reaches 100%
   - Certificate auto-generated
   - Notification created
   - Success message displayed
   - "View Certificate" button appears

8. **Student views certificate**
   - Navigates to certificate view
   - Sees professional certificate
   - Can download/print
   - Verification URL included

### Certificate Verification Flow

1. **External party receives certificate number**
2. **Visits verification URL**
3. **Enters certificate number**
4. **System validates** certificate
5. **Displays certificate details** (if valid)

## Code Examples

### Backend: Auto-Generate Certificate

```javascript
// In progressController.js - markVideoComplete function
if (progress.completionPercentage === 100) {
  const { autoGenerateCertificate } = await import("./certificateController.js");
  await autoGenerateCertificate(studentId, courseId);
}
```

### Backend: Sequential Unlocking Check

```javascript
// In Progress model
progressSchema.methods.isMaterialUnlocked = function (materialIndex, courseMaterials) {
  // First material always unlocked
  if (materialIndex === 0) return true;
  
  // Check if previous material completed
  const previousMaterialId = courseMaterials[materialIndex - 1]._id;
  const isCompleted = this.completedMaterials.some(
    (m) => m.materialId.toString() === previousMaterialId.toString() && 
           m.fullyWatched
  );
  return isCompleted;
};
```

### Backend: Validate Watch Time

```javascript
// In progressController.js - markVideoComplete
const watchPercentage = (watchTime / totalDuration) * 100;
if (watchPercentage < 95) {
  return res.status(400).json({
    message: "Video must be watched at least 95% to mark as complete",
    watchPercentage: Math.round(watchPercentage),
    required: 95,
  });
}
```

### Frontend: Anti-Cheat Seeking

```javascript
// In VideoPlayer.jsx
const handleSeeking = () => {
  const current = video.currentTime;
  const maxWatchedTime = getMaxWatchedTime();
  
  // Allow backward, prevent forward beyond watched
  if (current > maxWatchedTime + 2) { // 2 second buffer
    video.currentTime = maxWatchedTime;
  }
};
```

### Frontend: Sequential Material Click

```javascript
// In CourseProgressSequential.jsx
const handleMaterialClick = (material) => {
  if (!material.isUnlocked) {
    alert("This material is locked. Complete previous materials first.");
    return;
  }
  setSelectedMaterial(material);
};
```

## Testing

### Manual Testing Steps

1. **Test Sequential Unlocking:**
   - Enroll in a course with multiple materials
   - Verify only first material is accessible
   - Try clicking second material - should be locked
   - Complete first material
   - Verify second material unlocks

2. **Test Video Anti-Cheat:**
   - Start watching a video
   - Try to seek to 50% mark - should jump back
   - Watch to 30%
   - Close and reopen - should resume at 30%
   - Try to seek to 80% - should jump back to 30%

3. **Test Watch Percentage:**
   - Watch 50% of video
   - Check watch percentage shows ~50%
   - Try to mark complete - should fail (need 95%)
   - Watch to 95%
   - Should show "Ready to complete"
   - Mark complete - should succeed

4. **Test Certificate Generation:**
   - Complete all materials in a course
   - Verify certificate auto-generates
   - Check notification received
   - View certificate
   - Verify all details correct

5. **Test Certificate Verification:**
   - Copy certificate number
   - Visit verification URL
   - Verify certificate validates

### API Testing

```bash
# Get unlocked materials
curl http://localhost:5000/api/progress/course/{courseId}/unlocked \
  -H "Authorization: Bearer {token}"

# Update video progress
curl -X POST http://localhost:5000/api/progress/course/{courseId}/material/{materialId}/video-progress \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"currentTime": 150, "duration": 600, "watchedSegments": [{"start": 0, "end": 150}]}'

# Mark video complete (will fail if < 95%)
curl -X POST http://localhost:5000/api/progress/course/{courseId}/material/{materialId}/video-complete \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"watchTime": 570, "totalDuration": 600}'

# Generate certificate
curl -X POST http://localhost:5000/api/certificates/generate/{courseId} \
  -H "Authorization: Bearer {token}"

# Get all certificates
curl http://localhost:5000/api/certificates \
  -H "Authorization: Bearer {token}"

# Verify certificate (public)
curl http://localhost:5000/api/certificates/verify/{certificateNumber}
```

## Security & Anti-Cheat Measures

### Video Anti-Cheat
1. **Segment Tracking:** Records which portions of video have been watched
2. **Seek Prevention:** Cannot seek ahead beyond watched portions
3. **Server Validation:** Backend validates 95% watch requirement
4. **Watched Time Calculation:** Server calculates actual watch time from segments
5. **Progress Persistence:** Cannot restart to reset progress

### Certificate Security
1. **Unique Numbers:** Each certificate has unique verification code
2. **One Per Course:** Only one certificate per student per course
3. **100% Requirement:** Must complete all materials to earn
4. **Verification System:** Public API to validate certificates
5. **Immutable:** Certificates cannot be edited once generated

### Sequential Access
1. **Server-side Validation:** Backend enforces sequential order
2. **API Checks:** All endpoints verify material is unlocked
3. **Progress Dependency:** Next material requires previous completion
4. **Full Watch Required:** Videos need 95%+ watch for completion

## Performance Considerations

1. **Video Progress Saving:** Every 10 seconds (configurable)
2. **Watched Segments:** Merge adjacent segments to reduce data size
3. **Database Indexing:** Indexes on student/course for fast lookups
4. **Certificate Caching:** Consider caching certificate data
5. **Progress Calculation:** Calculated on-demand, not stored separately

## Future Enhancements

1. **PDF Certificates:** Generate downloadable PDF certificates
2. **Email Certificates:** Auto-email certificate on generation
3. **Certificate Templates:** Multiple certificate designs
4. **Blockchain Verification:** Store certificate hashes on blockchain
5. **Social Sharing:** Share certificates on LinkedIn, etc.
6. **Certificate Portfolio:** Public portfolio of earned certificates
7. **Instructor Signatures:** Digital signatures from instructors
8. **Grade Calculation:** Calculate grade based on quiz scores
9. **Transcript Generation:** Combined transcript of all certificates
10. **Advanced Anti-Cheat:** Eye tracking, tab switching detection

## Troubleshooting

**Issue:** Video won't play
- **Solution:** Check video URL is correct, file exists, CORS enabled

**Issue:** Can't seek in video
- **Solution:** Working as intended - anti-cheat prevents seeking ahead

**Issue:** Certificate not generating
- **Solution:** Verify 100% course completion, check all materials marked complete with fullyWatched=true

**Issue:** Material stays locked after completing previous
- **Solution:** Verify previous material marked with fullyWatched=true (95%+ watch for videos)

**Issue:** Watch percentage not increasing
- **Solution:** Check video is playing, progress saving every 10s, check network requests

**Issue:** Certificate verification fails
- **Solution:** Check certificate number is correct, certificate exists in database

## Files Created/Modified

### Backend (7 files):
- `BACKEND/elearnsphere/src/models/Certificate.js` - New certificate model
- `BACKEND/elearnsphere/src/models/Progress.js` - Updated with video tracking and sequential methods
- `BACKEND/elearnsphere/src/controllers/certificateController.js` - New (5 functions, 200+ lines)
- `BACKEND/elearnsphere/src/controllers/progressController.js` - Updated with video tracking (3 new functions)
- `BACKEND/elearnsphere/src/routes/certificateRoutes.js` - New certificate routes
- `BACKEND/elearnsphere/src/routes/progressRoutes.js` - Updated with video endpoints
- `BACKEND/elearnsphere/index.js` - Added certificate routes

### Frontend (4 files):
- `src/components/VideoPlayer.jsx` - New (350+ lines) - Anti-cheat video player
- `src/pages/student/CourseProgressSequential.jsx` - New (480+ lines) - Sequential learning UI
- `src/pages/student/CertificateView.jsx` - New (200+ lines) - Certificate display
- `src/pages/student/MyCertificates.jsx` - New (220+ lines) - Certificates list

### Documentation (1 file):
- `CERTIFICATE_FEATURE_DOCUMENTATION.md` - This file

## Conclusion

This certificate generation and sequential learning feature provides a complete solution for ensuring students properly complete courses before earning certificates. The anti-cheat video system prevents students from skipping ahead, while the sequential unlocking ensures a proper learning path. Certificates are professional, verifiable, and automatically generated when students complete 100% of course materials.
