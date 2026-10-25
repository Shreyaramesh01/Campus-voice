/**
 * CAMPUS VOICE — College Announcement Portal
 * Day 1 — Engineering Excellence Bootcamp
 * GEC Hassan × Ahlya Technologies
 *
 * Role-Based Architecture:
 * - Student: Login with Name, USN, Email. CAN view & vote. "Post Announcement" button is REMOVED.
 * - Lecturer: Login with Name, Email, Phone. CAN post announcements, timetables & notices.
 * - No guest mode: users must log in to access the portal.
 */

// LocalStorage Keys
const ANNOUNCEMENTS_KEY = 'campus_voice_announcements_v3';
const USER_KEY = 'campus_voice_logged_in_user';
const VOTES_KEY = 'campus_voice_user_votes_v3';

// College Fest Dates: May 2nd, 3rd, and 4th
const FEST_DATES = 'May 2nd, 3rd & 4th, 2027';

// Initial Announcements Dataset
const INITIAL_ANNOUNCEMENTS = [
  {
    id: '1',
    category: 'Academic',
    baseCategory: 'Academic',
    branch: 'CSE',
    title: 'CSE 5th Sem: Internal Assessment Timetable',
    description: 'The First Internal Assessment for 5th Semester Computer Science students commences on May 11th. Find the complete subject-wise schedule, timings, and hall allocation below.',
    author: 'Dr. Suresh Kumar (CSE Department)',
    dateTime: '25 October 2026 • 10:30 AM',
    votes: 84,
    timetable: [
      { date: '11 May 2027', time: '09:30 AM - 11:00 AM', code: '21CS51', subject: 'Management & Entrepreneurship for IT', room: 'LH-101 to LH-104' },
      { date: '11 May 2027', time: '02:00 PM - 03:30 PM', code: '21CS52', subject: 'Computer Networks & Protocols', room: 'LH-101 to LH-104' },
      { date: '12 May 2027', time: '09:30 AM - 11:00 AM', code: '21CS53', subject: 'Database Management Systems (DBMS)', room: 'LH-201 to LH-204' },
      { date: '12 May 2027', time: '02:00 PM - 03:30 PM', code: '21CS54', subject: 'Theory of Computation & Automata', room: 'LH-201 to LH-204' },
      { date: '13 May 2027', time: '09:30 AM - 11:00 AM', code: '21CS55', subject: 'Principles of Artificial Intelligence', room: 'LH-301 to LH-304' }
    ],
    instructions: '1. Identity card and college hall tickets are strictly mandatory.\n2. No mobile phones, smartwatches, or programmable devices inside examination halls.\n3. Students must occupy seats 15 minutes before exam commencement.\n4. Seating charts will be displayed at Block A foyer at 8:45 AM.'
  },
  {
    id: '2',
    category: 'Academic',
    baseCategory: 'Academic',
    branch: 'ECE',
    title: 'ECE 5th Sem: Internal Assessment Timetable',
    description: 'Official First Internal Assessment schedule for Electronics & Communication Engineering. Timings, subject codes, and permitted calculator regulations.',
    author: 'Prof. Anitha Rao (ECE Department)',
    dateTime: '25 October 2026 • 11:00 AM',
    votes: 49,
    timetable: [
      { date: '11 May 2027', time: '09:30 AM - 11:00 AM', code: '21EC51', subject: 'Digital Signal Processing (DSP)', room: 'EC-Block 201-204' },
      { date: '11 May 2027', time: '02:00 PM - 03:30 PM', code: '21EC52', subject: 'Electromagnetic Waves & Antennas', room: 'EC-Block 201-204' },
      { date: '12 May 2027', time: '09:30 AM - 11:00 AM', code: '21EC53', subject: 'Microcontrollers & Embedded Systems', room: 'EC-Block 301-304' },
      { date: '12 May 2027', time: '02:00 PM - 03:30 PM', code: '21EC54', subject: 'Analog & Digital Communication', room: 'EC-Block 301-304' }
    ],
    instructions: '1. Scientific calculators (fx-991MS / fx-82ES) are allowed for DSP and EM Waves only.\n2. Graph sheets will be provided by invigilators.\n3. Late entry beyond 15 minutes after start time will not be entertained.'
  },
  {
    id: '3',
    category: 'Events',
    baseCategory: 'Events',
    branch: 'All Branches',
    title: 'Annual College Fest: SAMBHRAMA (May 2nd, 3rd, 4th)',
    description: 'GEC Hassan proudly announces SAMBHRAMA 2027 — the 3-days annual mega cultural & tech festival taking place on May 2nd, May 3rd, and May 4th! Complete event lineup inside.',
    author: 'Student Cultural Committee & Faculty Convener',
    dateTime: '25 October 2026 • 11:30 AM',
    votes: 112,
    festSchedule: [
      { day: 'Day 1: May 2nd, 2027', time: '09:30 AM', event: 'Grand Inauguration & Traditional Lamp Lighting', venue: 'Main Auditorium' },
      { day: 'Day 1: May 2nd, 2027', time: '11:00 AM', event: '24-Hour Inter-Collegiate Hackathon Kickoff', venue: 'CS Lab 1 & 2' },
      { day: 'Day 1: May 2nd, 2027', time: '02:00 PM', event: 'Classical & Western Solo/Group Dance Preliminary', venue: 'Open Air Theatre (OAT)' },
      { day: 'Day 2: May 3rd, 2027', time: '10:00 AM', event: 'RoboWars & Drone Obstacle Championship', venue: 'Campus Central Grounds' },
      { day: 'Day 2: May 3rd, 2027', time: '01:00 PM', event: 'LAN Gaming Arena (Valorant, BGMI, FIFA)', venue: 'Server Center Lab' },
      { day: 'Day 2: May 3rd, 2027', time: '05:30 PM', event: 'Battle of the Bands (Rock & Fusion Night)', venue: 'Main Fest Stage' },
      { day: 'Day 3: May 4th, 2027', time: '02:00 PM', event: 'Choreo Night & Fashion Walk Showcase', venue: 'Main Fest Stage' },
      { day: 'Day 3: May 4th, 2027', time: '05:30 PM', event: 'Valedictory & Prize Distribution Ceremony', venue: 'Main Fest Stage' },
      { day: 'Day 3: May 4th, 2027', time: '07:00 PM', event: 'Celebrity Musical Concert & EDM DJ Night', venue: 'Campus Grounds' }
    ],
    instructions: 'Event registrations open on the student portal. College ID card is mandatory for entry on all 3 days (May 2, 3, 4). Outside passes will be issued via Cultural Secretary.'
  },
  {
    id: '4',
    category: 'Placement',
    baseCategory: 'Placement',
    branch: 'CSE',
    title: 'Infosys & TCS Campus Drive — 2027 Batch',
    description: 'On-campus recruitment drive for 2027 passing out batch. Eligible branches: CSE, ISE, ECE. Package: ₹3.6 LPA to ₹7.5 LPA. Verify documents and register before Friday.',
    author: 'Prof. B. Manjunath (Placement Officer)',
    dateTime: '24 October 2026 • 02:15 PM',
    votes: 62,
    placementDetails: [
      { label: 'Companies', val: 'Infosys (Specialist Programmer) & TCS (Ninja/Digital)' },
      { label: 'Eligible Branches', val: 'CSE, ISE, ECE (60% or 6.5 CGPA with no active backlogs)' },
      { label: 'Package Offered', val: '₹3.6 LPA (Standard) up to ₹7.5 LPA (Specialist Programmer)' },
      { label: 'Selection Process', val: 'Round 1: Online Aptitude & Coding Test | Round 2: Technical Interview | Round 3: HR Interview' },
      { label: 'Drive Date', val: 'Pre-placement talk on 18 May 2027 at 10:00 AM in Seminar Hall' }
    ],
    instructions: 'Submit two hard copies of updated resumes and all semester mark sheets to the Placement Office (Room 108).'
  },
  {
    id: '5',
    category: 'Events',
    baseCategory: 'Events',
    branch: 'All Branches',
    title: 'Kannada Rajyotsava Celebration (November 1st)',
    description: 'GEC Hassan cordially invites all students, faculty, and staff to celebrate the 71st Karnataka Rajyotsava on November 1st. Cultural events, Janapada dance, and Kannada symposium.',
    author: 'Kannada Sangha & Cultural Committee',
    dateTime: '25 October 2026 • 09:30 AM',
    votes: 75,
    eventTimeline: [
      { time: '08:30 AM', item: 'Hoisting of the Karnataka Flag (Haladi-Kempu) by Principal' },
      { time: '09:00 AM', item: 'Naada Geethe (Jaya Bharata Jananiya Tanujate) & Welcome Address' },
      { time: '10:00 AM', item: 'Janapada Folk Dance (Dollu Kunitha & Veeragase) Performances' },
      { time: '12:00 PM', item: 'Honoring of Kannada Sahitya & Student Essay/Poetry Laureates' },
      { time: '01:00 PM', item: 'Traditional Karnataka Festive Lunch (Habba Oota) for All' },
      { time: '02:30 PM', item: 'Yakshagana Cultural Play: Karnataka Veera Charitre' }
    ],
    instructions: 'All students are encouraged to wear traditional attire. Classes remain suspended for the celebration.'
  },
  {
    id: '6',
    category: 'Important Notice',
    baseCategory: 'Important Notice',
    branch: 'All Branches',
    title: 'Mandatory Examination Fee & Hall Ticket Clearance',
    description: 'All students appearing for the upcoming semester examinations must verify course registrations and complete fee clearance to download official hall tickets.',
    author: 'Examination Cell Registrar',
    dateTime: '25 October 2026 • 09:00 AM',
    votes: 35,
    instructions: 'Hall tickets will be verified at the entrance of each examination hall. Carry your college ID card.'
  },
  {
    id: '7',
    category: 'Clubs',
    baseCategory: 'Clubs',
    branch: 'All Branches',
    title: 'Coding Club: Git, GitHub & Open Source Bootcamp',
    description: 'Hands-on practical workshop covering Git version control, branching strategies, and submitting pull requests. Laptops configured with VS Code are required.',
    author: 'Student Open Source Club & Faculty Advisor',
    dateTime: '25 October 2026 • 04:00 PM',
    votes: 38,
    workshopInfo: [
      { label: 'Workshop Venue', val: 'Computer Lab 3 (Block B, 2nd Floor)' },
      { label: 'Date & Time', val: 'Wednesday, 28 October 2026 • 4:30 PM to 6:30 PM' },
      { label: 'Prerequisites', val: 'Basic familiarity with code editor, Git CLI installed on laptop' },
      { label: 'Hands-on Deliverable', val: 'Fork, clone, create branch, resolve merge conflicts, submit PR' }
    ],
    instructions: 'Limited to 60 seats on first-come-first-served basis. E-certificates issued upon PR merge.'
  }
];

// College Events Year Calendar Dataset
const COLLEGE_CALENDAR_EVENTS = [
  {
    id: 'cal-1',
    month: 'January',
    monthShort: 'JAN',
    date: '26 January 2027',
    duration: '1 Day Event',
    title: 'Republic Day Celebration',
    type: 'national',
    category: 'National Festival',
    description: 'National festival celebrated with tri-color flag hoisting by Principal, NCC march past, patriotic songs, and sweet distribution at Campus Grounds.'
  },
  {
    id: 'cal-2',
    month: 'March',
    monthShort: 'MAR',
    date: '18 March 2027',
    duration: '1 Day Event',
    title: 'TechSpark — National Robotics & Project Expo',
    type: 'tech',
    category: 'Technical Symposium',
    description: 'Inter-collegiate project exhibition, Robo-war, circuit debugging, and startup pitch competitions across engineering branches.'
  },
  {
    id: 'cal-3',
    month: 'May',
    monthShort: 'MAY',
    date: '02, 03 & 04 May 2027',
    duration: '3 Days Fest',
    title: 'SAMBHRAMA — Annual College Fest (May 2nd, 3rd, 4th)',
    type: 'fest',
    category: 'College Mega Fest (Events)',
    description: 'Grand 3-days annual cultural & technical festival! May 2nd: Inauguration & Hackathon; May 3rd: Battle of the Bands & Gaming; May 4th: Choreo Night, Award Ceremony, Celebrity Concert & EDM Night.'
  },
  {
    id: 'cal-4',
    month: 'August',
    monthShort: 'AUG',
    date: '15 August 2027',
    duration: '1 Day Event',
    title: 'Independence Day',
    type: 'national',
    category: 'National Festival',
    description: 'Ceremonial parade, address by College Dean, felicitation of academic toppers, and inter-branch cultural performances.'
  },
  {
    id: 'cal-5',
    month: 'September',
    monthShort: 'SEP',
    date: '05 September 2027',
    duration: '1 Day Event',
    title: 'Teachers\' Day Felicitation',
    type: 'national',
    category: 'National Observance',
    description: 'Special tribute program honoring faculty members and mentors with student-led entertainment activities.'
  },
  {
    id: 'cal-6',
    month: 'September',
    monthShort: 'SEP',
    date: '15 September 2027',
    duration: '1 Day Event',
    title: 'National Engineers\' Day',
    type: 'national',
    category: 'National Observance',
    description: 'Tribute to Sir M. Visvesvaraya with keynotes from industry leaders, engineering hackathons, and innovation awards.'
  },
  {
    id: 'cal-7',
    month: 'October',
    monthShort: 'OCT',
    date: '02 October 2027',
    duration: '1 Day Event',
    title: 'Gandhi Jayanti',
    type: 'national',
    category: 'National Festival',
    description: 'Swachh Campus cleanliness drive and non-violence pledge ceremony organized by NSS unit.'
  },
  {
    id: 'cal-8',
    month: 'November',
    monthShort: 'NOV',
    date: '01 November 2027',
    duration: '1 Day Event',
    title: 'Kannada Rajyotsava (Karnataka Statehood Day)',
    type: 'fest',
    category: 'College Cultural Event (Events)',
    description: 'Grand 1-day state celebration under Events. Kannada flag hoisting, Janapada folk dance performances, classical music, Yakshagana, and traditional Habba Oota.'
  }
];

// Category Styles
const CATEGORY_STYLES = {
  'Academic': { badge: 'bg-blue-50 text-blue-700 border-blue-200', indicator: 'bg-blue-500' },
  'Events': { badge: 'bg-purple-50 text-purple-700 border-purple-200', indicator: 'bg-purple-500' },
  'Placement': { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', indicator: 'bg-emerald-500' },
  'Clubs': { badge: 'bg-amber-50 text-amber-700 border-amber-200', indicator: 'bg-amber-500' },
  'Important Notice': { badge: 'bg-rose-50 text-rose-700 border-rose-200', indicator: 'bg-rose-500' }
};

// Application State
let announcements = [];
let currentCategory = 'All';
let currentBranch = 'All';
let currentSearch = '';
let currentSort = 'most-voted';
let loggedInUser = null;
let userVotedIds = new Set();
let activeModalAnnouncement = null;
let editingAnnouncementId = null;

// DOM Selectors
const announcementGrid = document.getElementById('announcementGrid');
const emptyCategoryState = document.getElementById('emptyCategoryState');
const searchErrorMessage = document.getElementById('searchErrorMessage');
const failedSearchQuery = document.getElementById('failedSearchQuery');
const resetSearchBtn = document.getElementById('resetSearchBtn');
const resultsSummaryBar = document.getElementById('resultsSummaryBar');
const resultsCount = document.getElementById('resultsCount');

// Controls
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const sortMenuBtn = document.getElementById('sortMenuBtn');
const sortDropdownMenu = document.getElementById('sortDropdownMenu');
const currentSortLabel = document.getElementById('currentSortLabel');
const categoryFilterContainer = document.getElementById('categoryFilterContainer');
const branchFilterContainer = document.getElementById('branchFilterContainer');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const brandLogoBtn = document.getElementById('brandLogoBtn');

// Modals
const announcementModal = document.getElementById('announcementModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const announcementForm = document.getElementById('announcementForm');

// Modal Elements for Edit / Post Switching
const modalHeader = document.getElementById('modalHeader');
const modalIconBox = document.getElementById('modalIconBox');
const modalHeading = document.getElementById('modalHeading');
const modalSubheading = document.getElementById('modalSubheading');
const submitAnnouncementBtn = document.getElementById('submitAnnouncementBtn');
const editAnnouncementIdInput = document.getElementById('editAnnouncementId');

// Announcement Details Modal
const announcementDetailModal = document.getElementById('announcementDetailModal');
const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
const closeDetailModalBottomBtn = document.getElementById('closeDetailModalBottomBtn');
const detailCategoryBadge = document.getElementById('detailCategoryBadge');
const detailBranchBadge = document.getElementById('detailBranchBadge');
const detailPriorityBadge = document.getElementById('detailPriorityBadge');
const detailTitle = document.getElementById('detailTitle');
const detailAuthor = document.getElementById('detailAuthor');
const detailDateTime = document.getElementById('detailDateTime');
const detailDescription = document.getElementById('detailDescription');
const detailVoteBtn = document.getElementById('detailVoteBtn');
const detailVoteCount = document.getElementById('detailVoteCount');
const detailVoteActionText = document.getElementById('detailVoteActionText');
const detailStructuredSection = document.getElementById('detailStructuredSection');
const detailInstructionsSection = document.getElementById('detailInstructionsSection');
const detailInstructions = document.getElementById('detailInstructions');
const detailEditBtn = document.getElementById('detailEditBtn');
const detailDeleteBtn = document.getElementById('detailDeleteBtn');

// Calendar
const calendarModal = document.getElementById('calendarModal');
const openCalendarBtn = document.getElementById('openCalendarBtn');
const heroCalendarLink = document.getElementById('heroCalendarLink');
const closeCalendarBtn = document.getElementById('closeCalendarBtn');
const closeCalendarBottomBtn = document.getElementById('closeCalendarBottomBtn');
const calendarEventsContainer = document.getElementById('calendarEventsContainer');

// User Auth & Role Banner
const userProfileContainer = document.getElementById('userProfileContainer');
const mobileUserSection = document.getElementById('mobileUserSection');
const userRoleBanner = document.getElementById('userRoleBanner');
const resetDataBtn = document.getElementById('resetDataBtn');

/**
 * App Entry Point
 * Note: No guest appearance is needed. If user is not logged in, redirect to login.html immediately.
 */
function init() {
  loadUserData();

  if (!loggedInUser) {
    // Force authentication: no guest mode
    window.location.href = 'login.html';
    return;
  }

  loadVotesData();
  loadAnnouncements();
  setupEventListeners();
  renderAuthHeader();
  renderCalendar('all');
  render();
}

/**
 * 1. User Authentication & Role Detection (Student vs Lecturer)
 */
function loadUserData() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    loggedInUser = raw ? JSON.parse(raw) : null;
    
    if (loggedInUser) {
      if (!loggedInUser.role) {
        loggedInUser.role = loggedInUser.usn ? 'student' : 'lecturer';
      }

      if (loggedInUser.role === 'student' && loggedInUser.usn) {
        const usnUpper = loggedInUser.usn.toUpperCase();
        if (usnUpper.includes('CS')) loggedInUser.detectedBranch = 'CSE';
        else if (usnUpper.includes('IS')) loggedInUser.detectedBranch = 'ISE';
        else if (usnUpper.includes('EC')) loggedInUser.detectedBranch = 'ECE';
        else if (usnUpper.includes('ME')) loggedInUser.detectedBranch = 'ME';
        else if (usnUpper.includes('CV')) loggedInUser.detectedBranch = 'CV';
        else if (usnUpper.includes('AI')) loggedInUser.detectedBranch = 'AI&ML';
        else loggedInUser.detectedBranch = 'All';
      } else if (loggedInUser.role === 'lecturer') {
        loggedInUser.detectedBranch = loggedInUser.department || 'All';
      }
    }
  } catch {
    loggedInUser = null;
  }
}

function loadVotesData() {
  try {
    const raw = localStorage.getItem(VOTES_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    userVotedIds = new Set(arr);
  } catch {
    userVotedIds = new Set();
  }
}

function saveVotesData() {
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify(Array.from(userVotedIds)));
  } catch (err) {
    console.error('Failed to save votes:', err);
  }
}

/**
 * Update UI Role Permissions:
 * - If Student: REMOVE the "Post Announcement" button completely.
 * - If Lecturer: SHOW the "Post Announcement" button.
 */
function updateRolePermissionsUI() {
  const isLecturer = loggedInUser && loggedInUser.role === 'lecturer';
  const isStudent = loggedInUser && loggedInUser.role === 'student';

  if (isLecturer) {
    openModalBtn.classList.remove('hidden');
    openModalBtn.classList.add('inline-flex');
  } else {
    // For Student login, remove the post announcement button
    openModalBtn.classList.add('hidden');
    openModalBtn.classList.remove('inline-flex');
  }

  // Update top role banner (Pills on right removed as requested in pictures 2 & 3)
  if (userRoleBanner) {
    if (isLecturer) {
      userRoleBanner.className = 'p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center shadow-sm transition-all';
      userRoleBanner.innerHTML = `
        <div class="flex items-center gap-2 font-medium">
          <span class="p-1 rounded-lg bg-emerald-200 text-emerald-900 font-bold text-sm">👨‍🏫</span>
          <span>Logged in as <strong>Lecturer: ${escapeHtml(loggedInUser.name)}</strong> (${escapeHtml(loggedInUser.department || 'Faculty')}) &bull; Phone: ${escapeHtml(loggedInUser.phone || '')}</span>
        </div>
      `;
      userRoleBanner.classList.remove('hidden');
    } else if (isStudent) {
      userRoleBanner.className = 'p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center shadow-sm transition-all';
      userRoleBanner.innerHTML = `
        <div class="flex items-center gap-2 font-medium">
          <span class="p-1 rounded-lg bg-indigo-200 text-indigo-900 font-bold text-sm">🎓</span>
          <span>Logged in as <strong>Student: ${escapeHtml(loggedInUser.name)}</strong> &bull; USN: <strong class="font-mono text-indigo-900">${escapeHtml(loggedInUser.usn)}</strong> &bull; Branch: ${escapeHtml(loggedInUser.detectedBranch || 'All')}</span>
        </div>
      `;
      userRoleBanner.classList.remove('hidden');
    } else {
      userRoleBanner.classList.add('hidden');
    }
  }
}

function renderAuthHeader() {
  updateRolePermissionsUI();

  if (loggedInUser) {
    if (loggedInUser.role === 'lecturer') {
      userProfileContainer.innerHTML = `
        <div class="flex items-center gap-2 bg-emerald-50 border border-emerald-300 py-1.5 px-3 rounded-xl text-xs">
          <div class="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            👨‍🏫
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-slate-800 leading-tight">${escapeHtml(loggedInUser.name)}</span>
            <span class="text-[10px] text-emerald-800 font-bold uppercase flex items-center">
              Lecturer &bull; ${escapeHtml(loggedInUser.department || 'Faculty')}
            </span>
          </div>
          <button id="logoutBtn" title="Logout" class="ml-1.5 text-slate-400 hover:text-rose-600 p-1 rounded transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      `;

      mobileUserSection.innerHTML = `
        <div class="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg font-bold">
          Lecturer: ${escapeHtml(loggedInUser.department || 'Faculty')}
        </div>
      `;
    } else {
      // Student
      const branchTag = loggedInUser.detectedBranch && loggedInUser.detectedBranch !== 'All' 
        ? `<span class="bg-indigo-600 text-white px-1.5 py-0.2 rounded font-extrabold text-[9px] ml-1">${loggedInUser.detectedBranch}</span>` 
        : '';

      userProfileContainer.innerHTML = `
        <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-200 py-1.5 px-3 rounded-xl text-xs">
          <div class="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            🎓
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-slate-800 leading-tight">${escapeHtml(loggedInUser.name)}</span>
            <span class="text-[10px] font-mono text-indigo-700 font-semibold uppercase flex items-center">
              ${escapeHtml(loggedInUser.usn)} ${branchTag}
            </span>
          </div>
          <button id="logoutBtn" title="Logout" class="ml-1.5 text-slate-400 hover:text-rose-600 p-1 rounded transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      `;

      mobileUserSection.innerHTML = `
        <div class="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg font-mono font-bold">
          ${escapeHtml(loggedInUser.usn)}
        </div>
      `;
    }

    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  }
}

function handleLogout() {
  if (confirm('Log out from Campus Voice?')) {
    localStorage.removeItem(USER_KEY);
    loggedInUser = null;
    window.location.href = 'login.html';
  }
}

/**
 * 2. Announcements Storage Management
 */
function loadAnnouncements() {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_KEY);
    if (raw) {
      announcements = JSON.parse(raw);
    } else {
      announcements = JSON.parse(JSON.stringify(INITIAL_ANNOUNCEMENTS));
      saveAnnouncements();
    }
  } catch {
    announcements = JSON.parse(JSON.stringify(INITIAL_ANNOUNCEMENTS));
  }

  announcements.forEach(item => {
    if ((item.title || '').toLowerCase().includes('kannada rajyotsava')) {
      item.category = 'Events';
      item.baseCategory = 'Events';
    }
    if (!item.baseCategory) {
      item.baseCategory = item.category || 'Academic';
    }
  });
}

function saveAnnouncements() {
  try {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  } catch (err) {
    console.error('Failed to save announcements:', err);
  }
}

/**
 * 3. Dynamic Voting & Category Shift Logic
 */
function applyDynamicVotingPromotion() {
  let maxVotes = 0;
  announcements.forEach(a => {
    const v = a.votes || 0;
    if (v > maxVotes) maxVotes = v;
  });

  announcements.forEach(a => {
    if (!a.baseCategory) {
      a.baseCategory = a.category || 'Academic';
    }

    const isTopVoted = (a.votes || 0) > 0 && (a.votes || 0) === maxVotes;
    a.isTopVoted = isTopVoted;

    if (isTopVoted) {
      a.category = 'Important Notice';
      a.isShiftedToImportant = (a.baseCategory !== 'Important Notice');
    } else {
      a.category = a.baseCategory;
      a.isShiftedToImportant = false;
    }
  });

  return maxVotes;
}

function handleVote(announcementId) {
  const item = announcements.find(a => a.id === announcementId);
  if (!item) return;

  if (userVotedIds.has(announcementId)) {
    item.votes = Math.max(0, (item.votes || 0) - 1);
    userVotedIds.delete(announcementId);
  } else {
    item.votes = (item.votes || 0) + 1;
    userVotedIds.add(announcementId);
  }

  applyDynamicVotingPromotion();

  saveVotesData();
  saveAnnouncements();

  if (activeModalAnnouncement) {
    const updated = announcements.find(a => a.id === activeModalAnnouncement.id);
    if (updated) {
      activeModalAnnouncement = updated;
      openAnnouncementDetails(updated);
    }
  }

  render();
}

/**
 * 4. Filtering, Searching & Dynamic Sorting Logic
 */
function getFilteredAndSortedAnnouncements() {
  const maxVotes = applyDynamicVotingPromotion();

  let list = announcements.filter(item => {
    if (currentCategory === 'All') return true;

    if (currentCategory.toLowerCase() === 'important notice') {
      return (item.category && item.category.toLowerCase() === 'important notice') || item.isShiftedToImportant;
    }

    return (item.category && item.category.toLowerCase() === currentCategory.toLowerCase()) ||
           (item.baseCategory && item.baseCategory.toLowerCase() === currentCategory.toLowerCase());
  });

  if (currentBranch !== 'All') {
    list = list.filter(item => {
      const b = (item.branch || 'All Branches').toUpperCase();
      return b === 'ALL BRANCHES' || b === 'ALL' || b === currentBranch.toUpperCase();
    });
  }

  const q = currentSearch.trim().toLowerCase();
  if (q) {
    list = list.filter(item => {
      const matchTitle = (item.title || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      const matchBaseCat = (item.baseCategory || '').toLowerCase().includes(q);
      const matchAuthor = (item.author || '').toLowerCase().includes(q);
      const matchBranch = (item.branch || '').toLowerCase().includes(q);

      let matchSubject = false;
      if (item.timetable) {
        matchSubject = item.timetable.some(t => 
          (t.subject || '').toLowerCase().includes(q) || 
          (t.code || '').toLowerCase().includes(q)
        );
      }
      return matchTitle || matchDesc || matchCat || matchBaseCat || matchAuthor || matchBranch || matchSubject;
    });
  }

  list.sort((a, b) => {
    const votesA = a.votes || 0;
    const votesB = b.votes || 0;

    if (currentSort === 'most-voted') {
      if (votesB !== votesA) return votesB - votesA;
      return (b.id || '').localeCompare(a.id || '');
    } else if (currentSort === 'az') {
      return (a.title || '').localeCompare(b.title || '');
    } else if (currentSort === 'za') {
      return (b.title || '').localeCompare(a.title || '');
    } else if (currentSort === 'newest') {
      return (b.id || '').localeCompare(a.id || '');
    } else if (currentSort === 'oldest') {
      return (a.id || '').localeCompare(b.id || '');
    }
    return 0;
  });

  return { list, maxVotes, searchFailed: q.length > 0 && list.length === 0 };
}

/**
 * 5. Main Render Function
 */
function render() {
  const { list, maxVotes, searchFailed } = getFilteredAndSortedAnnouncements();

  if (searchFailed) {
    announcementGrid.innerHTML = '';
    searchErrorMessage.classList.remove('hidden');
    failedSearchQuery.textContent = currentSearch;
    emptyCategoryState.classList.add('hidden');
    resultsSummaryBar.classList.add('hidden');
    return;
  }

  searchErrorMessage.classList.add('hidden');
  resultsSummaryBar.classList.remove('hidden');

  if (list.length === 0) {
    announcementGrid.innerHTML = '';
    emptyCategoryState.classList.remove('hidden');
    resultsCount.textContent = `0 announcements found`;
    return;
  }

  emptyCategoryState.classList.add('hidden');
  resultsCount.textContent = `Showing ${list.length} announcement${list.length === 1 ? '' : 's'}`;

  announcementGrid.innerHTML = '';
  list.forEach(item => {
    const isTopVoted = (item.votes || 0) > 0 && item.votes === maxVotes;
    const card = createAnnouncementCard(item, isTopVoted);
    announcementGrid.appendChild(card);
  });
}

/**
 * 6. Announcement Card Element
 */
function createAnnouncementCard(item, isTopVoted) {
  const card = document.createElement('article');
  const hasVoted = userVotedIds.has(item.id);
  const votes = item.votes || 0;
  const branchText = item.branch || 'All Branches';
  const isLecturer = loggedInUser && loggedInUser.role === 'lecturer';

  if (isTopVoted) {
    card.className = "bg-gradient-to-b from-red-50/80 via-white to-white rounded-2xl p-6 shadow-md shadow-red-200 border-2 border-red-500 ring-2 ring-red-400/40 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-0.5";
  } else {
    card.className = "bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/90 transition-all duration-200 flex flex-col justify-between relative group cursor-pointer hover:-translate-y-0.5";
  }

  const activeCategory = item.isShiftedToImportant ? 'Important Notice' : item.category;
  const catStyle = CATEGORY_STYLES[activeCategory] || {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    indicator: 'bg-slate-400'
  };

  const isSpecificBranch = branchText !== 'All Branches' && branchText !== 'All';
  const branchBadgeClass = isSpecificBranch
    ? 'bg-indigo-100 text-indigo-800 font-bold border border-indigo-200'
    : 'bg-slate-100 text-slate-600 border border-slate-200';

  card.innerHTML = `
    <div>
      ${isTopVoted ? `
        <div class="mb-3.5 -mx-6 -mt-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white px-4 py-1.5 flex items-center justify-between text-xs font-bold tracking-wide shadow-sm">
          <div class="flex items-center gap-1.5">
            <span>🔥</span>
            <span>#1 MOST VOTED &bull; SHIFTED TO IMPORTANT NOTICES</span>
          </div>
          <span class="bg-white/20 text-white px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase">
            ${votes} Votes
          </span>
        </div>
      ` : ''}

      <!-- Top Row: Category Badge + Branch Badge + Upvote Action -->
      <div class="flex items-center justify-between gap-2 mb-3">
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${catStyle.badge}">
            <span class="w-1.5 h-1.5 rounded-full ${catStyle.indicator}"></span>
            ${escapeHtml(activeCategory)}
          </span>

          ${item.isShiftedToImportant ? `
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
              Shifted (Most Voted)
            </span>
          ` : ''}

          <span class="px-2 py-0.5 rounded-md text-[11px] ${branchBadgeClass}">
            ${escapeHtml(branchText)}
          </span>
        </div>

        <div class="flex items-center gap-1.5">
          <!-- Upvote Action Button -->
          <button data-vote-id="${item.id}" 
                  class="card-vote-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition shadow-sm ${
                    hasVoted 
                      ? 'bg-red-600 text-white shadow-red-200 hover:bg-red-700' 
                      : isTopVoted 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }" 
                  title="${hasVoted ? 'Click to remove vote' : 'Vote for this announcement to move to top priority and shift to Important column'}">
            <svg class="w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span class="vote-count">${votes}</span>
            <span class="text-[10px] uppercase">${hasVoted ? 'Voted' : 'Vote'}</span>
          </button>

          <!-- Edit Announcement Option -->
          <button data-edit-id="${item.id}" 
                  class="card-edit-btn inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-semibold ${
                    isLecturer 
                      ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-sm' 
                      : 'text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200'
                  } transition" 
                  title="${isLecturer ? 'Edit this announcement' : 'Lecturer privileges required to edit'}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>

          <!-- Delete Announcement Option -->
          <button data-delete-id="${item.id}" 
                  class="card-delete-btn inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-semibold ${
                    isLecturer 
                      ? 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 shadow-sm' 
                      : 'text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200'
                  } transition" 
                  title="${isLecturer ? 'Delete this announcement' : 'Lecturer privileges required to delete'}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      <!-- Title -->
      <h4 class="text-lg sm:text-xl font-bold ${isTopVoted ? 'text-red-950 font-extrabold' : 'text-slate-900 group-hover:text-indigo-600'} transition-colors mb-2 leading-snug">
        ${escapeHtml(item.title)}
      </h4>

      <!-- Description preview -->
      <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
        ${escapeHtml(item.description)}
      </p>

      <!-- View Details Hint -->
      <div class="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
        <span>Click to get complete details</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="pt-3 border-t ${isTopVoted ? 'border-red-200' : 'border-slate-100'} flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-1.5">
      <span class="font-medium ${isTopVoted ? 'text-red-800' : 'text-slate-500'} flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        ${escapeHtml(item.author || 'Campus Administration')}
      </span>

      <span class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ${escapeHtml(item.dateTime)}
      </span>
    </div>
  `;

  const cardVoteBtn = card.querySelector('.card-vote-btn');
  cardVoteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleVote(item.id);
  });

  const editBtn = card.querySelector('.card-edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditModal(item);
    });
  }

  const deleteBtn = card.querySelector('.card-delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleDeleteAnnouncement(item);
    });
  }

  card.addEventListener('click', () => {
    openAnnouncementDetails(item);
  });

  return card;
}

/**
 * 7. OPEN ANNOUNCEMENT DETAILS MODAL
 */
function openAnnouncementDetails(item) {
  activeModalAnnouncement = item;

  const activeCategory = item.isShiftedToImportant ? 'Important Notice' : item.category;
  const catStyle = CATEGORY_STYLES[activeCategory] || { badge: 'bg-slate-100 text-slate-700 border-slate-200' };
  
  if (item.isShiftedToImportant) {
    detailCategoryBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-rose-50 text-rose-700 border-rose-200';
    detailCategoryBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Important Notice (Shifted from ${item.baseCategory} by Student Votes)`;
  } else {
    detailCategoryBadge.className = `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${catStyle.badge}`;
    detailCategoryBadge.textContent = item.category;
  }

  detailBranchBadge.textContent = `Branch: ${item.branch || 'All Branches'}`;

  const { maxVotes } = getFilteredAndSortedAnnouncements();
  const isTopVoted = (item.votes || 0) > 0 && item.votes === maxVotes;
  if (isTopVoted) {
    detailPriorityBadge.classList.remove('hidden');
    detailPriorityBadge.textContent = '🔥 TOP PRIORITY (IMPORTANT SECTION)';
  } else {
    detailPriorityBadge.classList.add('hidden');
  }

  detailTitle.textContent = item.title;
  detailAuthor.textContent = item.author || 'Campus Administration';
  detailDateTime.textContent = item.dateTime;
  detailDescription.textContent = item.description;

  updateModalVoteButton(item);
  renderStructuredDetails(item);

  if (item.instructions) {
    detailInstructionsSection.classList.remove('hidden');
    detailInstructions.textContent = item.instructions;
  } else {
    detailInstructionsSection.classList.add('hidden');
  }

  // Hook up Edit & Delete buttons inside the detail modal
  if (detailEditBtn) {
    detailEditBtn.onclick = () => {
      closeAnnouncementDetails();
      openEditModal(item);
    };
  }
  if (detailDeleteBtn) {
    detailDeleteBtn.onclick = () => {
      handleDeleteAnnouncement(item);
    };
  }

  announcementDetailModal.classList.remove('hidden');
}

function updateModalVoteButton(item) {
  const hasVoted = userVotedIds.has(item.id);
  detailVoteCount.textContent = item.votes || 0;
  detailVoteActionText.textContent = hasVoted ? 'Voted' : 'Vote';

  if (hasVoted) {
    detailVoteBtn.className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm bg-red-600 text-white hover:bg-red-700';
  } else {
    detailVoteBtn.className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm bg-indigo-600 text-white hover:bg-indigo-700';
  }
}

/**
 * Render structured table for Timetable, Fest schedule, Placement, or Event
 */
function renderStructuredDetails(item) {
  detailStructuredSection.innerHTML = '';

  // 1. Academic Internal Assessment Timetable
  if (item.timetable && item.timetable.length > 0) {
    const tableContainer = document.createElement('div');
    tableContainer.className = 'overflow-hidden rounded-xl border border-slate-200 shadow-sm';
    
    let tableHtml = `
      <div class="bg-indigo-900 text-white px-4 py-2.5 flex items-center justify-between">
        <h5 class="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <span>📅</span>
          <span>Official Internal Assessment Timetable (${escapeHtml(item.branch || 'All Branches')})</span>
        </h5>
        <span class="text-[11px] bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded font-mono font-bold">5th Semester</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
          <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th class="py-2.5 px-3">Date</th>
              <th class="py-2.5 px-3">Time Slot</th>
              <th class="py-2.5 px-3">Subject Code</th>
              <th class="py-2.5 px-3">Subject Name</th>
              <th class="py-2.5 px-3">Room / Venue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
    `;

    item.timetable.forEach(row => {
      tableHtml += `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">${escapeHtml(row.date)}</td>
          <td class="py-2.5 px-3 whitespace-nowrap text-indigo-700 font-medium">${escapeHtml(row.time)}</td>
          <td class="py-2.5 px-3 font-mono font-bold text-slate-800">${escapeHtml(row.code)}</td>
          <td class="py-2.5 px-3 font-medium text-slate-800">${escapeHtml(row.subject)}</td>
          <td class="py-2.5 px-3 text-slate-600 whitespace-nowrap">${escapeHtml(row.room)}</td>
        </tr>
      `;
    });

    tableHtml += `</tbody></table></div>`;
    tableContainer.innerHTML = tableHtml;
    detailStructuredSection.appendChild(tableContainer);
  }

  // 2. Fest Schedule (SAMBHRAMA May 2nd, 3rd, 4th)
  if (item.festSchedule && item.festSchedule.length > 0) {
    const festContainer = document.createElement('div');
    festContainer.className = 'overflow-hidden rounded-xl border border-amber-300 shadow-sm';
    
    let festHtml = `
      <div class="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2.5 flex items-center justify-between">
        <h5 class="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <span>🎉</span>
          <span>College Fest Program: May 2nd, 3rd &amp; 4th (3 Days)</span>
        </h5>
        <span class="text-[11px] bg-black/20 text-white px-2 py-0.5 rounded font-bold">SAMBHRAMA 2027</span>
      </div>
      <div class="divide-y divide-slate-100 bg-white">
    `;

    item.festSchedule.forEach(sch => {
      festHtml += `
        <div class="p-3 hover:bg-amber-50/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <div>
            <span class="font-bold text-amber-900 block sm:inline mr-2">${escapeHtml(sch.day)} &bull; ${escapeHtml(sch.time)}</span>
            <span class="font-medium text-slate-800">${escapeHtml(sch.event)}</span>
          </div>
          <span class="text-slate-500 text-[11px] bg-slate-100 px-2 py-0.5 rounded sm:self-center">${escapeHtml(sch.venue)}</span>
        </div>
      `;
    });

    festHtml += `</div>`;
    festContainer.innerHTML = festHtml;
    detailStructuredSection.appendChild(festContainer);
  }

  // 3. Placement Details
  if (item.placementDetails && item.placementDetails.length > 0) {
    const placeContainer = document.createElement('div');
    placeContainer.className = 'rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 text-xs space-y-2';
    let placeHtml = `<h5 class="font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5"><span>💼</span> Placement Drive Specifications</h5>`;
    item.placementDetails.forEach(d => {
      placeHtml += `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-b border-emerald-100/60 last:border-b-0">
          <span class="font-semibold text-emerald-800">${escapeHtml(d.label)}:</span>
          <span class="sm:col-span-2 text-slate-700">${escapeHtml(d.val)}</span>
        </div>
      `;
    });
    placeContainer.innerHTML = placeHtml;
    detailStructuredSection.appendChild(placeContainer);
  }

  // 4. Kannada Rajyotsava (November 1st) Event Itinerary
  if (item.eventTimeline && item.eventTimeline.length > 0) {
    const rajContainer = document.createElement('div');
    rajContainer.className = 'rounded-xl border border-purple-200 bg-purple-50/30 p-4 text-xs space-y-2';
    let rajHtml = `<h5 class="font-bold text-purple-900 uppercase tracking-wider mb-2 flex items-center gap-1.5"><span>🚩</span> Kannada Rajyotsava (November 1st) Events Itinerary</h5>`;
    item.eventTimeline.forEach(t => {
      rajHtml += `
        <div class="flex items-center gap-3 py-1 border-b border-purple-100/60 last:border-b-0">
          <span class="font-mono font-bold text-purple-700 min-w-[70px]">${escapeHtml(t.time)}</span>
          <span class="text-slate-800 font-medium">${escapeHtml(t.item)}</span>
        </div>
      `;
    });
    rajContainer.innerHTML = rajHtml;
    detailStructuredSection.appendChild(rajContainer);
  }

  // 5. Club Workshop Info
  if (item.workshopInfo && item.workshopInfo.length > 0) {
    const clubContainer = document.createElement('div');
    clubContainer.className = 'rounded-xl border border-amber-200 bg-amber-50/30 p-4 text-xs space-y-2';
    let clubHtml = `<h5 class="font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5"><span>💻</span> Workshop Agenda &amp; Prerequisites</h5>`;
    item.workshopInfo.forEach(w => {
      clubHtml += `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-b border-amber-100/60 last:border-b-0">
          <span class="font-semibold text-amber-800">${escapeHtml(w.label)}:</span>
          <span class="sm:col-span-2 text-slate-700">${escapeHtml(w.val)}</span>
        </div>
      `;
    });
    clubContainer.innerHTML = clubHtml;
    detailStructuredSection.appendChild(clubContainer);
  }
}

function closeAnnouncementDetails() {
  announcementDetailModal.classList.add('hidden');
  activeModalAnnouncement = null;
}

/**
 * 8. Calendar View Modal Rendering
 */
function renderCalendar(filterType = 'all') {
  const filteredEvents = filterType === 'all'
    ? COLLEGE_CALENDAR_EVENTS
    : COLLEGE_CALENDAR_EVENTS.filter(e => {
        if (filterType === 'fest') return e.type === 'fest';
        if (filterType === 'rajyotsava') return e.title.toLowerCase().includes('rajyotsava');
        if (filterType === 'national') return e.type === 'national';
        return true;
      });

  calendarEventsContainer.innerHTML = '';

  filteredEvents.forEach(evt => {
    const isMegaFest = evt.type === 'fest' && evt.title.includes('Fest');
    const isRajyotsava = evt.title.includes('Rajyotsava');

    let borderBadgeStyle = 'border-slate-200 bg-white';
    let pillStyle = 'bg-slate-100 text-slate-700';

    if (isMegaFest) {
      borderBadgeStyle = 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-300';
      pillStyle = 'bg-amber-600 text-white font-bold';
    } else if (isRajyotsava) {
      borderBadgeStyle = 'border-purple-300 bg-purple-50/50 ring-1 ring-purple-200';
      pillStyle = 'bg-purple-600 text-white font-bold';
    } else if (evt.type === 'national') {
      borderBadgeStyle = 'border-indigo-200 bg-indigo-50/30';
      pillStyle = 'bg-indigo-600 text-white font-medium';
    }

    const eventCard = document.createElement('div');
    eventCard.className = `p-4 sm:p-5 rounded-2xl border ${borderBadgeStyle} shadow-sm flex flex-col sm:flex-row sm:items-start gap-4 transition-all`;

    eventCard.innerHTML = `
      <div class="flex-shrink-0 w-24 text-center py-2 px-1 rounded-xl bg-slate-900 text-white shadow-sm">
        <span class="block text-[11px] uppercase tracking-wider font-semibold text-indigo-300">${evt.monthShort}</span>
        <span class="block text-lg sm:text-xl font-extrabold text-white">${evt.date.split(' ')[0]}</span>
        <span class="block text-[10px] text-slate-400 mt-0.5">${evt.duration}</span>
      </div>

      <div class="flex-grow">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="text-xs px-2.5 py-0.5 rounded-full ${pillStyle}">
            ${escapeHtml(evt.category)}
          </span>
          <span class="text-xs text-slate-500 font-medium">${escapeHtml(evt.date)}</span>
          ${isMegaFest ? '<span class="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">May 2nd, 3rd, 4th</span>' : ''}
          ${isRajyotsava ? '<span class="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Events</span>' : ''}
        </div>

        <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1">
          ${escapeHtml(evt.title)}
        </h4>

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ${escapeHtml(evt.description)}
        </p>
      </div>
    `;

    calendarEventsContainer.appendChild(eventCard);
  });
}

/**
 * 9. Add New Announcement Submission (RESTRICTED TO LECTURERS)
 */
function handleFormSubmit(e) {
  e.preventDefault();

  if (!loggedInUser || loggedInUser.role !== 'lecturer') {
    alert('Access Restricted: Only Lecturers have publishing & editing privileges.');
    return;
  }

  const category = document.getElementById('categoryInput').value;
  const branch = document.getElementById('branchInput').value;
  const title = document.getElementById('titleInput').value.trim();
  const description = document.getElementById('descriptionInput').value.trim();
  const author = document.getElementById('authorInput').value.trim() 
    || `${loggedInUser.name} (${loggedInUser.department || 'Faculty'})`;

  if (!title || !description) {
    alert('Please provide a title and description.');
    return;
  }

  const now = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const dateTimeFormatted = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} • ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

  if (editingAnnouncementId) {
    // Update existing announcement
    const idx = announcements.findIndex(a => a.id === editingAnnouncementId);
    if (idx !== -1) {
      announcements[idx].title = title;
      announcements[idx].description = description;
      announcements[idx].category = category;
      announcements[idx].baseCategory = category;
      announcements[idx].branch = branch;
      announcements[idx].author = author;
      announcements[idx].dateTime = `${dateTimeFormatted} (Edited)`;

      saveAnnouncements();
      closeAnnouncementModal();
      render();

      if (activeModalAnnouncement && activeModalAnnouncement.id === editingAnnouncementId) {
        openAnnouncementDetails(announcements[idx]);
      }
    }
  } else {
    // Create new announcement
    const newCard = {
      id: Date.now().toString(),
      category,
      baseCategory: category,
      branch,
      title,
      description,
      author,
      dateTime: dateTimeFormatted,
      votes: 1
    };

    userVotedIds.add(newCard.id);
    saveVotesData();

    announcements.unshift(newCard);
    saveAnnouncements();

    closeAnnouncementModal();
    setCategory('All');
    setBranch('All');
  }
}

/**
 * 10. Event Listeners Setup
 */
function setupEventListeners() {
  brandLogoBtn.addEventListener('click', () => {
    setCategory('All');
    setBranch('All');
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.add('hidden');
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    if (currentSearch.trim().length > 0) {
      clearSearchBtn.classList.remove('hidden');
    } else {
      clearSearchBtn.classList.add('hidden');
    }
    render();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.add('hidden');
    searchInput.focus();
    render();
  });

  resetSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.add('hidden');
    render();
  });

  sortMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sortDropdownMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!sortDropdownMenu.contains(e.target) && e.target !== sortMenuBtn) {
      sortDropdownMenu.classList.add('hidden');
    }
  });

  const sortOptions = document.querySelectorAll('.sort-option');
  sortOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const sortType = opt.getAttribute('data-sort');
      currentSort = sortType;

      const labels = {
        'most-voted': '🔥 Most Voted (Top Priority)',
        'az': 'Title: A → Z',
        'za': 'Title: Z → A',
        'newest': 'Newest First',
        'oldest': 'Oldest First'
      };
      currentSortLabel.textContent = labels[sortType] || 'Sort';
      sortDropdownMenu.classList.add('hidden');
      render();
    });
  });

  categoryFilterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-btn');
    if (btn) setCategory(btn.getAttribute('data-category'));
  });

  branchFilterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.branch-btn');
    if (btn) setBranch(btn.getAttribute('data-branch'));
  });

  clearFiltersBtn.addEventListener('click', () => {
    setCategory('All');
    setBranch('All');
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.add('hidden');
  });

  closeDetailModalBtn.addEventListener('click', closeAnnouncementDetails);
  closeDetailModalBottomBtn.addEventListener('click', closeAnnouncementDetails);
  announcementDetailModal.addEventListener('click', (e) => {
    if (e.target === announcementDetailModal) closeAnnouncementDetails();
  });

  detailVoteBtn.addEventListener('click', () => {
    if (activeModalAnnouncement) {
      handleVote(activeModalAnnouncement.id);
    }
  });

  const openCal = () => calendarModal.classList.remove('hidden');
  const closeCal = () => calendarModal.classList.add('hidden');
  openCalendarBtn.addEventListener('click', openCal);
  heroCalendarLink.addEventListener('click', openCal);
  closeCalendarBtn.addEventListener('click', closeCal);
  closeCalendarBottomBtn.addEventListener('click', closeCal);
  calendarModal.addEventListener('click', (e) => {
    if (e.target === calendarModal) closeCal();
  });

  const calFilterButtons = document.querySelectorAll('.cal-filter-btn');
  calFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      calFilterButtons.forEach(b => {
        b.className = 'cal-filter-btn px-3 py-1 rounded-lg font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-xs';
      });
      btn.className = 'cal-filter-btn px-3 py-1 rounded-lg font-medium bg-indigo-600 text-white text-xs';
      renderCalendar(btn.getAttribute('data-cal-filter'));
    });
  });

  openModalBtn.addEventListener('click', openAnnouncementModal);
  closeModalBtn.addEventListener('click', closeAnnouncementModal);
  cancelModalBtn.addEventListener('click', closeAnnouncementModal);
  announcementForm.addEventListener('submit', handleFormSubmit);
  announcementModal.addEventListener('click', (e) => {
    if (e.target === announcementModal) closeAnnouncementModal();
  });

  resetDataBtn.addEventListener('click', () => {
    if (confirm('Reset announcements to default college sample data?')) {
      announcements = JSON.parse(JSON.stringify(INITIAL_ANNOUNCEMENTS));
      userVotedIds.clear();
      saveVotesData();
      saveAnnouncements();
      setCategory('All');
      setBranch('All');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAnnouncementModal();
      closeCal();
      closeAnnouncementDetails();
    }
  });
}

function setCategory(category) {
  currentCategory = category;
  categoryFilterContainer.querySelectorAll('.category-btn').forEach(btn => {
    const isMatch = btn.getAttribute('data-category').toLowerCase() === category.toLowerCase();
    btn.className = isMatch
      ? 'category-btn px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 bg-indigo-600 text-white shadow-sm'
      : 'category-btn px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 bg-white text-slate-600 hover:bg-slate-100 border border-slate-200';
  });
  render();
}

function setBranch(branch) {
  currentBranch = branch;
  branchFilterContainer.querySelectorAll('.branch-btn').forEach(btn => {
    const isMatch = btn.getAttribute('data-branch').toLowerCase() === branch.toLowerCase();
    btn.className = isMatch
      ? 'branch-btn px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-sm transition'
      : 'branch-btn px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 transition';
  });
  render();
}

function openEditModal(item) {
  if (!loggedInUser || loggedInUser.role !== 'lecturer') {
    if (confirm('Editing announcements requires Lecturer privileges. Would you like to switch to Lecturer login?')) {
      window.location.href = 'login.html';
    }
    return;
  }

  editingAnnouncementId = item.id;

  if (modalHeading) modalHeading.textContent = 'Edit Announcement';
  if (modalSubheading) modalSubheading.textContent = `Update details for: ${item.title}`;
  if (submitAnnouncementBtn) submitAnnouncementBtn.textContent = 'Save Changes';
  if (modalHeader) {
    modalHeader.className = 'flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/70 transition-colors';
  }
  if (modalIconBox) {
    modalIconBox.className = 'w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center transition-colors';
  }
  if (editAnnouncementIdInput) editAnnouncementIdInput.value = item.id;

  const titleInput = document.getElementById('titleInput');
  const categoryInput = document.getElementById('categoryInput');
  const branchInput = document.getElementById('branchInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const authorInput = document.getElementById('authorInput');

  if (titleInput) titleInput.value = item.title || '';
  if (categoryInput) categoryInput.value = item.baseCategory || item.category || 'Academic';
  if (branchInput) branchInput.value = item.branch || 'All Branches';
  if (descriptionInput) descriptionInput.value = item.description || '';
  if (authorInput) authorInput.value = item.author || `${loggedInUser.name} (${loggedInUser.department || 'Faculty'})`;

  announcementModal.classList.remove('hidden');
  if (titleInput) titleInput.focus();
}

function handleDeleteAnnouncement(item) {
  if (!loggedInUser || loggedInUser.role !== 'lecturer') {
    if (confirm('Deleting announcements requires Lecturer privileges. Would you like to switch to Lecturer login?')) {
      window.location.href = 'login.html';
    }
    return;
  }

  if (confirm(`Lecturer Action: Are you sure you want to delete announcement "${item.title}"? This cannot be undone.`)) {
    announcements = announcements.filter(a => a.id !== item.id);
    userVotedIds.delete(item.id);
    saveVotesData();
    saveAnnouncements();
    
    if (activeModalAnnouncement && activeModalAnnouncement.id === item.id) {
      closeAnnouncementDetails();
    }
    
    render();
  }
}

function openAnnouncementModal() {
  if (!loggedInUser || loggedInUser.role !== 'lecturer') {
    alert('Access Restricted: Only Lecturers have authority to post announcements.');
    window.location.href = 'login.html';
    return;
  }

  editingAnnouncementId = null;

  if (modalHeading) modalHeading.textContent = 'Post Announcement';
  if (modalSubheading) modalSubheading.textContent = 'Faculty / Lecturer Publishing Desk';
  if (submitAnnouncementBtn) submitAnnouncementBtn.textContent = 'Publish Announcement';
  if (modalHeader) {
    modalHeader.className = 'flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/60 transition-colors';
  }
  if (modalIconBox) {
    modalIconBox.className = 'w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors';
  }
  if (editAnnouncementIdInput) editAnnouncementIdInput.value = '';

  announcementForm.reset();

  const authorInput = document.getElementById('authorInput');
  if (authorInput) {
    authorInput.value = `${loggedInUser.name} (${loggedInUser.department || 'Faculty'})`;
  }

  const branchInput = document.getElementById('branchInput');
  if (branchInput && loggedInUser.department && loggedInUser.department !== 'General') {
    branchInput.value = loggedInUser.department;
  }

  announcementModal.classList.remove('hidden');
  document.getElementById('titleInput').focus();
}

function closeAnnouncementModal() {
  announcementModal.classList.add('hidden');
  announcementForm.reset();
  editingAnnouncementId = null;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' })[m]);
}

document.addEventListener('DOMContentLoaded', init);
