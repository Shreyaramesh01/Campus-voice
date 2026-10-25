# Campus Voice — College Announcement Portal

---

## 🎨 Branding & UI Updates
* **Official Logo & Tagline:** Integrated the official logo with the customized tagline `"One campus, one voice"` placed directly below the `Campus Voice` title, replacing the previous placeholder.
* **Streamlined UI & Card Action:** Updated card details trigger to `"Click to get complete details"` across all announcement cards.
* **Clean Action Buttons:** Removed the `+` plus symbol from the **Post Announcement** button (both in text and icon).
* **Strict Role Authentication:** Removed guest access mode (`Back to Campus Announcements as Guest View` removed); visitors must log in as either Student or Lecturer to access campus announcements.

---

## 🌟 Role-Based Portal Architecture (Student vs. Lecturer)

### 1. 🎓 Student Experience
* **Login Requirements:**
  1. **Student Full Name**
  2. **USN (University Seat Number)** (e.g. `4GH22CS085`)
  3. **Student Email Address** (e.g. `shreya.cs22@gechassan.ac.in`)
* **Role Permissions:**
  * **`Post Announcement` Button is REMOVED:** Students have view and voting privileges only; publishing is restricted to faculty.
  * **Priority Voting:** Can vote on announcements to dynamically elevate them to **Top Priority** and shift them into the **Important Notice** section.
  * **Branch Detection:** Student branch is auto-detected from their USN (e.g., `CS` &rarr; `CSE`) and displayed on their badge.

---

### 2. 👨‍🏫 Lecturer / Faculty Experience
* **Login Requirements:**
  1. **Lecturer Full Name** (e.g. `Dr. Suresh Kumar`)
  2. **Official Faculty Email Address** (e.g. `suresh.kumar@gechassan.ac.in`)
  3. **Phone Number** (e.g. `9876543210`)
  4. **Department / Branch Selection** (`CSE`, `ECE`, `ME`, `CV`, etc.)
* **Role Permissions:**
  * **`Post Announcement` Button is ACTIVE:** Lecturers have administrative publishing rights to post circulars, examination timetables, fest schedules, and placement notifications.
  * **Pre-Filled Sign-Off:** Author details and target department are auto-populated in the publishing modal with the lecturer's name and department.
  * **Edit & Delete Management:** Lecturers can edit any announcement (updating title, branch, category, description, sign-off) and delete notices directly from the card buttons or the detail modal.

---

## 🌟 Other Key Capabilities

### 3. 🚩 Kannada Rajyotsava in Events Section
- Categorized under **Events** (alongside the 3-day College Fest).
- Displays full event timeline: Flag hoisting at 8:30 AM, Naada Geethe, Janapada folk dance, Habba Oota festive lunch, and Yakshagana.

### 4. 🗳️ Dynamic Shift of Top-Voted Announcement to "Important Notice" Column
- The announcement with the highest number of student votes is **automatically shifted into the "Important Notice" section / column**.
- Highlighted in **Red** with: `🔥 #1 MOST VOTED • SHIFTED TO IMPORTANT NOTICES`.
- Easily accessible directly under the **"Important Notices"** category filter.

### 5. 📅 College Fest: May 2nd, 3rd, and 4th
- 3-Days Mega Fest **SAMBHRAMA** scheduled on **May 2nd, 3rd, and 4th, 2027**.
- Filterable year calendar with day-by-day programs (Hackathon, Battle of the Bands, Choreo Night, Celebrity Concert).

### 6. 🔍 Click-to-Open Structured Timetables
- Clicking any announcement card opens the **Detail Modal** displaying structured subject-wise tables (Subject codes, time slots, room allocations, rules).

---

## 📁 File Structure

```
Campus voice/
├── assets/
│   ├── logo-transparent.png        # Official logo with slogan removed & transparent background
│   └── logo-icon-transparent.png   # Standalone graduate icon with transparency
├── index.html                      # Main portal with branch filter, category tabs & modals
├── login.html                      # Clean dual-role authentication (Student vs Lecturer)
├── app.js                          # Dynamic role manager, voting, sorting & modal controllers
└── README.md                       # Complete project documentation
```

---

## 🚀 How to Test the Dual Roles

1. Open [login.html](file:///c:/Users/SHREYA/OneDrive/Desktop/Campus%20voice/login.html) in your browser.
2. **Test Student Role:**
   - Click the **"Student"** tab.
   - Click *"Auto-fill Demo Student"* and submit.
   - You will be redirected to [index.html](file:///c:/Users/SHREYA/OneDrive/Desktop/Campus%20voice/index.html).
   - Notice: The **`Post Announcement` button is completely hidden / removed**.
   - You can vote on announcements to push them to top priority.
3. **Test Lecturer Role:**
   - Click the logout icon in the top header or navigate to [login.html](file:///c:/Users/SHREYA/OneDrive/Desktop/Campus%20voice/login.html).
   - Click the **"Lecturer / Faculty"** tab.
   - Click *"Auto-fill Demo Lecturer"* and submit.
   - You will be redirected to [index.html](file:///c:/Users/SHREYA/OneDrive/Desktop/Campus%20voice/index.html).
   - Notice: The **`Post Announcement` button is now visible and active** (without any `+` symbol)!
   - Click it to post official notices, with the author pre-filled with the lecturer's credentials.
