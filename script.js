// ==============================================
// APP STATE AND DATA
// ==============================================

// Water conservation challenges
const waterChallenges = [
    {
        id: 1,
        title: "5-Minute Shower Challenge",
        description: "Reduce your shower time to 5 minutes for a week",
        waterSaved: 100,
        duration: 7,
        proofType: "photo",
        difficulty: "easy",
        category: "personal"
    },
    {
        id: 2,
        title: "Fix That Leak",
        description: "Identify and fix a leaky faucet in your home",
        waterSaved: 200,
        duration: 14,
        proofType: "photo",
        difficulty: "medium",
        category: "home"
    },
    {
        id: 3,
        title: "Meatless Monday",
        description: "Go meatless for one day a week for a month (saves water used in meat production)",
        waterSaved: 300,
        duration: 30,
        proofType: "description",
        difficulty: "medium",
        category: "diet"
    },
    {
        id: 4,
        title: "Full Loads Only",
        description: "Only run your dishwasher and washing machine with full loads for 2 weeks",
        waterSaved: 150,
        duration: 14,
        proofType: "photo",
        difficulty: "easy",
        category: "home"
    },
    {
        id: 5,
        title: "Rainwater Harvesting",
        description: "Set up a simple rainwater collection system",
        waterSaved: 500,
        duration: 30,
        proofType: "photo",
        difficulty: "hard",
        category: "home"
    }
];

// Badges data
const badges = [
    { id: 1, name: "Water Saver", image: "💧", description: "Complete 5 challenges" },
    { id: 2, name: "Leak Fixer", image: "🔧", description: "Fix a leaky faucet" },
    { id: 3, name: "Shower Star", image: "🚿", description: "Complete the 5-minute shower challenge" },
    { id: 4, name: "Conservation Hero", image: "🏆", description: "Save over 1000 liters of water" }
];

// Quiz questions
const quizQuestions = [
    {
        question: "Which of the following is a traditional water conservation technique used in Rajasthan?",
        options: [
            "Desalination",
            "Rainwater harvesting",
            "Tank irrigation",
            "Tanka system"
        ],
        answer: 3,
        explanation: "Only about 1% of the Earth's water is freshwater available for human use. The rest is either saltwater in oceans or frozen in glaciers."
    },
    {
        question: "What is the primary source of drinking water in Bangalore?",
        options: [
            "River Cauvery",
            "Groundwater",
            " Rainwater",
            "River Krishna"
        ],
        answer: 0,
        explanation: "Washing a full load of laundry typically uses about 40 gallons of water, more than the other options."
    },
    {
        question: "Which Indian government initiative promotes water conservation and efficient use?",
        options: [
            " Jal Jeevan Mission",
            " Swachh Bharat Abhiyan",
            " Digital India",
            "Make in India"
        ],
        answer: 0,
        explanation: "A single leaky faucet can waste up to 3,000 gallons of water per year. Fixing leaks is the most effective way to reduce water waste."
    },
    {
        question: "Which of the following methods is commonly used in Bangalore apartments for water conservation?",
        options: [
            " Fog harvesting",
            "Desalination",
            "Sewage treatment plants (STPs)",
            "River linking"
        ],
        answer: 2,
        explanation: "Leaving the tap running while brushing can waste up to 8 gallons of water per brushing session."
    },
    {
        question: "What is the primary purpose of rainwater harvesting?",
        options: [
            " Increasing humidity",
            "Reducing electricity use",
            "Recharging groundwater",
            "Preventing air pollution"
        ],
        answer: 2,
        explanation: "Water conservation helps reduce energy use (from water heating/pumping), saves money, and preserves ecosystems. It does not increase pollution."
    },
    {
        question: "Which body is responsible for managing Bangalore's water supply??",
        options: [
            "BBMP",
            "BWSSB",
            "KPTCL",
            "BMTC"
        ],
        answer: 1,
        explanation: "About 65% of indoor household water use occurs in the bathroom, mainly from toilets, showers, and sinks."
    },
    {
        question: "What is the average per capita water availability in India as per the 2020 report?",
        options: [
            "3000 cubic meters",
            "1500 cubic meters",
            "1100 cubic meters",
            "500 cubic meters"
        ],
        answer: 2,
        explanation: "Modern dishwashers typically use less water (about 4-6 gallons per load) than hand washing, especially when run with full loads."
    },
    {
        question: "Which lake in Bangalore has been rejuvenated as a water conservation effort?",
        options: [
            "Ulsoor Lake",
            " Bellandur Lake",
            "Sankey Tank",
            "Hebbal Lake"
        ],
        answer: 2,
        explanation: "The average American uses about 80-100 gallons of water per day for drinking, cooking, bathing, and other household uses."
    },
    {
        question: "Which practice helps in reducing water wastage in agriculture?",
        options: [
            "Flood irrigation",
            "Sprinkler irrigation",
            "Manual watering",
            "Ponding"
        ],
        answer: 1,
        explanation: "Xeriscaping is landscaping designed to reduce or eliminate the need for irrigation, using drought-resistant plants and water-efficient designs."
    },
    {
        question: "What is the significance of the 'Catch the Rain' campaign?",
        options: [
            " To promote dam construction",
            "To promote rainwater harvesting",
            "To reduce rainfall",
            "To clean rivers"
        ],
        answer: 2,
        explanation: "Almonds require significantly more water to produce than the other options - about 1.1 gallons per almond!"
    }
];

// Teams data
let teams = [
    { id: 1, name: "Water Warriors", members: [], totalWaterSaved: 0 },
    { id: 2, name: "The Conservationists", members: [], totalWaterSaved: 0 },
    { id: 3, name: "Aqua Guardians", members: [], totalWaterSaved: 0 }
];

// User data
let users = [];

// Current page state
let currentPage = 'home';
let currentChallenge = null;
let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null);
let quizCompleted = false;

// ==============================================
// INITIALIZATION
// ==============================================

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage
    loadData();
    
    // Check authentication
    checkAuth();
    
    // Set up navigation
    setupNavigation();
    
    // Load the current page
    loadPage(currentPage);
    
    // Set up event listeners for modals
    setupModalListeners();
});

// Load data from localStorage
function loadData() {
    users = JSON.parse(localStorage.getItem('users')) || [];
    const storedTeams = JSON.parse(localStorage.getItem('teams'));
    if (storedTeams) {
        teams = storedTeams;
    } else {
        localStorage.setItem('teams', JSON.stringify(teams));
    }
}

// ==============================================
// AUTHENTICATION FUNCTIONS
// ==============================================

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && !['login', 'register'].includes(currentPage)) {
        // User is logged in
    } else if (!currentUser && !['home', 'login', 'register'].includes(currentPage)) {
        // Redirect to login if not on a public page
        navigateTo('login');
    }
}

// Handle login
function handleLogin(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', email);
        navigateTo('dashboard');
        return true;
    } else {
        alert('Invalid email or password');
        return false;
    }
}

// Handle registration
function handleRegister(name, email, password, confirmPassword) {
    // Validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }
    
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return false;
    }
    
    // Create new user
    const newUser = {
        name,
        email,
        password,
        joinedDate: new Date().toLocaleDateString(),
        totalWaterSaved: 0,
        completedChallenges: [],
        activeChallenges: [],
        badges: [],
        certificates: [],
        team: null
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', email);
    
    alert('Registration successful!');
    navigateTo('dashboard');
    return true;
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    navigateTo('home');
}

// Get current user
function getCurrentUser() {
    const currentUserEmail = localStorage.getItem('currentUser');
    if (!currentUserEmail) return null;
    
    return users.find(u => u.email === currentUserEmail);
}

// Update user data
function updateUserData(updatedUser) {
    const currentUserEmail = localStorage.getItem('currentUser');
    if (!currentUserEmail) return false;
    
    const userIndex = users.findIndex(u => u.email === currentUserEmail);
    
    if (userIndex === -1) return false;
    
    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// ==============================================
// PAGE NAVIGATION AND ROUTING
// ==============================================

// Set up navigation
function setupNavigation() {
    // This will be handled by the loadPage function
}

// Navigate to a page
function navigateTo(page) {
    currentPage = page;
    loadPage(page);
    window.scrollTo(0, 0);
}

// Load a page
function loadPage(page) {
    const header = document.getElementById('header');
    const mainContent = document.getElementById('main-content');
    
    // Update header
    header.innerHTML = `
        <h1>Water Conservation Challenge</h1>
        <nav>
            ${getNavLinks(page)}
        </nav>
    `;
    
    // Update main content based on page
    switch (page) {
        case 'home':
            mainContent.innerHTML = getHomePage();
            updateCommunityStats();
            break;
        case 'login':
            mainContent.innerHTML = getLoginPage();
            setupAuthListeners();
            break;
        case 'register':
            mainContent.innerHTML = getRegisterPage();
            setupAuthListeners();
            break;
        case 'dashboard':
            mainContent.innerHTML = getDashboardPage();
            updateDashboardStats();
            displayUserBadges();
            displayActiveChallenges();
            break;
        case 'challenges':
            mainContent.innerHTML = getChallengesPage();
            displayChallenges();
            break;
        case 'teams':
            mainContent.innerHTML = getTeamsPage();
            displayTeams();
            updateTeamLeaderboard();
            break;
        case 'quiz':
            mainContent.innerHTML = getQuizPage();
            setupQuizListeners();
            break;
        case 'profile':
            mainContent.innerHTML = getProfilePage();
            loadProfileData();
            displayCertificates();
            break;
        default:
            mainContent.innerHTML = getHomePage();
    }
}

// Get navigation links based on current page
function getNavLinks(currentPage) {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        return `
            <a href="#" class="${currentPage === 'home' ? 'active' : ''}" onclick="navigateTo('home')">Home</a>
            <a href="#" class="${currentPage === 'login' ? 'active' : ''}" onclick="navigateTo('login')">Login</a>
            <a href="#" class="${currentPage === 'register' ? 'active' : ''}" onclick="navigateTo('register')">Register</a>
        `;
    } else {
        return `
            <a href="#" class="${currentPage === 'home' ? 'active' : ''}" onclick="navigateTo('home')">Home</a>
            <a href="#" class="${currentPage === 'dashboard' ? 'active' : ''}" onclick="navigateTo('dashboard')">Dashboard</a>
            <a href="#" class="${currentPage === 'challenges' ? 'active' : ''}" onclick="navigateTo('challenges')">Challenges</a>
            <a href="#" class="${currentPage === 'teams' ? 'active' : ''}" onclick="navigateTo('teams')">Teams</a>
            <a href="#" class="${currentPage === 'quiz' ? 'active' : ''}" onclick="navigateTo('quiz')">Water Quiz</a>
            <a href="#" class="${currentPage === 'profile' ? 'active' : ''}" onclick="navigateTo('profile')">Profile</a>
            <a href="#" onclick="handleLogout()">Logout</a>
        `;
    }
}

// ==============================================
// PAGE TEMPLATES
// ==============================================

// Home page
function getHomePage() {
    return `
        <section class="hero">
            <h2>Save Water, Save Life</h2>
            <p>Join our community challenge to conserve water and earn rewards!</p>
            ${localStorage.getItem('currentUser') ? 
                '<a href="#" class="cta-button" onclick="navigateTo(\'dashboard\')">Go to Dashboard</a>' : 
                '<a href="#" class="cta-button" onclick="navigateTo(\'register\')">Join Now</a>'
            }
        </section>

        <section class="features">
            <div class="feature-card">
                <h3>Daily Challenges</h3>
                <p>Complete water-saving tasks and track your impact</p>
            </div>
            <div class="feature-card">
                <h3>Team Up</h3>
                <p>Join teams and compete on leaderboards</p>
            </div>
            <div class="feature-card">
                <h3>Earn Rewards</h3>
                <p>Get badges and certificates for your achievements</p>
            </div>
        </section>

        <section class="stats">
            <h2>Community Impact</h2>
            <div class="stat-cards">
                <div class="stat-card">
                    <h3>Total Water Saved</h3>
                    <p id="communityWaterSaved">0 liters</p>
                </div>
                <div class="stat-card">
                    <h3>Active Participants</h3>
                    <p id="activeParticipants">0</p>
                </div>
                <div class="stat-card">
                    <h3>Completed Challenges</h3>
                    <p id="communityChallenges">0</p>
                </div>
            </div>
        </section>
    `;
}

// Login page
function getLoginPage() {
    return `
        <div class="auth-container">
            <section class="auth-form">
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="auth-button">Login</button>
                </form>
                <p>Don't have an account? <a href="#" onclick="navigateTo('register')">Register here</a></p>
            </section>
        </div>
    `;
}

// Register page
function getRegisterPage() {
    return `
        <div class="auth-container">
            <section class="auth-form">
                <h2>Register</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="regName">Full Name</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="form-group">
                        <label for="regEmail">Email</label>
                        <input type="email" id="regEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="regPassword">Password</label>
                        <input type="password" id="regPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="regConfirmPassword">Confirm Password</label>
                        <input type="password" id="regConfirmPassword" required>
                    </div>
                    <button type="submit" class="auth-button">Register</button>
                </form>
                <p>Already have an account? <a href="#" onclick="navigateTo('login')">Login here</a></p>
            </section>
        </div>
    `;
}

// Dashboard page
function getDashboardPage() {
    return `
        <section class="welcome">
            <h2>Welcome, <span id="userName"></span>!</h2>
            <p>Your water conservation journey starts here</p>
        </section>

        <section class="user-stats">
            <h2>Your Stats</h2>
            <div class="stat-cards">
                <div class="stat-card">
                    <h3>Water Saved</h3>
                    <p id="totalWaterSaved">0 liters</p>
                </div>
                <div class="stat-card">
                    <h3>Completed Challenges</h3>
                    <p id="completedChallenges">0</p>
                </div>
                <div class="stat-card">
                    <h3>Current Team</h3>
                    <p id="currentTeam">None</p>
                </div>
                <div class="stat-card">
                    <h3>Your Badges</h3>
                    <p id="badgeCount">0</p>
                </div>
            </div>
        </section>

        <section class="active-challenges">
            <h2>Your Active Challenges</h2>
            <div id="activeChallengeList" class="challenge-list"></div>
        </section>

        <section class="badge-showcase">
            <h2>Your Badges</h2>
            <div id="userBadges" class="badges-container"></div>
        </section>
    `;
}

// Challenges page
function getChallengesPage() {
    return `
        <section class="challenge-header">
            <h2>Water Conservation Challenges</h2>
            <p>Complete challenges to save water and earn rewards!</p>
        </section>

        <section class="challenge-categories">
            <button class="category-btn active" data-category="all">All Challenges</button>
            <button class="category-btn" data-category="easy">Easy</button>
            <button class="category-btn" data-category="medium">Medium</button>
            <button class="category-btn" data-category="hard">Hard</button>
        </section>

        <section class="challenges-list">
            <div id="challengeList" class="challenge-list"></div>
        </section>
    `;
}

// Teams page
function getTeamsPage() {
    return `
        <section class="teams-header">
            <h2>Join a Team</h2>
            <p>Team up with others to multiply your water conservation impact!</p>
        </section>

        <section class="teams-list">
            <div id="teamList" class="team-cards"></div>
        </section>

        <section class="team-leaderboard">
            <h2>Team Leaderboard</h2>
            <table id="teamLeaderboard">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                        <th>Water Saved (liters)</th>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody id="leaderboardBody"></tbody>
            </table>
        </section>
    `;
}

// Quiz page
function getQuizPage() {
    return `
        <section class="quiz-container" id="quizContainer">
            <div class="quiz-intro" id="quizIntro">
                <h2>Water Conservation Knowledge Quiz</h2>
                <p>Test your knowledge about water conservation with this 10-question quiz.</p>
                <p>Score 80% or higher to earn a Water Conservation Expert certificate!</p>
                <button id="startQuizBtn" class="quiz-button">Start Quiz</button>
            </div>

            <div class="quiz-questions" id="quizQuestions" style="display: none;">
                <div class="quiz-header">
                    <h2 id="quizTitle">Water Conservation Quiz</h2>
                    <div class="quiz-progress">
                        Question <span id="currentQuestion">1</span> of 10
                    </div>
                </div>

                <div class="question-container">
                    <p id="questionText" class="question-text"></p>
                    <div id="optionsContainer" class="options-container"></div>
                </div>

                <div class="quiz-navigation">
                    <button id="prevQuestionBtn" class="quiz-nav-btn" disabled>Previous</button>
                    <button id="nextQuestionBtn" class="quiz-nav-btn">Next</button>
                </div>
            </div>

            <div class="quiz-results" id="quizResults" style="display: none;">
                <h2>Quiz Results</h2>
                <div class="result-card">
                    <p>You scored <span id="quizScore">0</span> out of 10</p>
                    <p id="quizFeedback"></p>
                    <div id="certificateEarned" style="display: none;">
                        <p>Congratulations! You've earned a Water Conservation Expert certificate!</p>
                        <button id="downloadCertBtn" class="quiz-button">Download Certificate</button>
                        <button id="viewCertBtn" class="quiz-button">View Certificate</button>
                    </div>
                    <button id="retakeQuizBtn" class="quiz-button">Retake Quiz</button>
                </div>
            </div>
        </section>
    `;
}

// Profile page
function getProfilePage() {
    return `
        <section class="profile-header">
            <h2>Your Profile</h2>
            <div class="profile-info">
                <div class="profile-avatar">
                    <div style="width: 150px; height: 150px; background-color: #3498db; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 60px;">👤</div>
                    <button id="changeAvatarBtn">Change Avatar</button>
                </div>
                <div class="profile-details">
                    <h3 id="profileName">[User Name]</h3>
                    <p>Member since: <span id="memberSince">[Date]</span></p>
                    <p>Email: <span id="profileEmail">[Email]</span></p>
                </div>
            </div>
        </section>

        <section class="profile-stats">
            <h3>Your Conservation Stats</h3>
            <div class="stat-cards">
                <div class="stat-card">
                    <h4>Total Water Saved</h4>
                    <p id="profileWaterSaved">0 liters</p>
                </div>
                <div class="stat-card">
                    <h4>Completed Challenges</h4>
                    <p id="profileChallenges">0</p>
                </div>
                <div class="stat-card">
                    <h4>Badges Earned</h4>
                    <p id="profileBadges">0</p>
                </div>
            </div>
        </section>

        <section class="profile-achievements">
            <h3>Your Certificates</h3>
            <div id="certificateList" class="certificates-container">
                <!-- Certificates will be added here dynamically -->
            </div>
        </section>
    `;
}

// ==============================================
// CHALLENGES FUNCTIONALITY
// ==============================================

// Display all challenges
function displayChallenges() {
    const challengeList = document.getElementById('challengeList');
    if (!challengeList) return;
    
    challengeList.innerHTML = '';
    
    const category = document.querySelector('.category-btn.active').dataset.category;
    
    waterChallenges.forEach(challenge => {
        if (category === 'all' || challenge.difficulty === category) {
            const challengeCard = document.createElement('div');
            challengeCard.className = 'challenge-card';
            challengeCard.innerHTML = `
                <h3>${challenge.title}</h3>
                <p>${challenge.description}</p>
                <p><strong>Water saved:</strong> ${challenge.waterSaved} liters</p>
                <p><strong>Duration:</strong> ${challenge.duration} days</p>
                <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
                <button class="accept-btn" data-id="${challenge.id}">Accept Challenge</button>
            `;
            challengeList.appendChild(challengeCard);
        }
    });
    
    // Add event listeners to accept buttons
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            startChallenge(parseInt(this.dataset.id));
        });
    });
}

// Display active challenges
function displayActiveChallenges() {
    const activeChallengeList = document.getElementById('activeChallengeList');
    if (!activeChallengeList) return;
    
    const user = getCurrentUser();
    
    if (!user || !user.activeChallenges || user.activeChallenges.length === 0) {
        activeChallengeList.innerHTML = '<p>You have no active challenges. <a href="#" onclick="navigateTo(\'challenges\')">Browse challenges</a> to get started!</p>';
        return;
    }
    
    activeChallengeList.innerHTML = '';
    
    user.activeChallenges.forEach(challengeId => {
        const challenge = waterChallenges.find(c => c.id === challengeId);
        if (challenge) {
            const challengeCard = document.createElement('div');
            challengeCard.className = 'challenge-card';
            challengeCard.innerHTML = `
                <h3>${challenge.title}</h3>
                <p>${challenge.description}</p>
                <p><strong>Water saved:</strong> ${challenge.waterSaved} liters</p>
                <button class="complete-btn" data-id="${challenge.id}">Complete Challenge</button>
            `;
            activeChallengeList.appendChild(challengeCard);
        }
    });
    
    // Add event listeners to complete buttons
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showProofModal(parseInt(this.dataset.id));
        });
    });
}

// Start a new challenge
function startChallenge(challengeId) {
    const user = getCurrentUser();
    if (!user) return;
    
    const challenge = waterChallenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    // Check if already active
    if (user.activeChallenges.includes(challengeId)) {
        alert('You already have this challenge active!');
        return;
    }
    
    // Add to active challenges
    user.activeChallenges.push(challengeId);
    updateUserData(user);
    
    alert(`You've started the "${challenge.title}" challenge!`);
    displayActiveChallenges();
}

// Show proof submission modal
function showProofModal(challengeId) {
    currentChallenge = waterChallenges.find(c => c.id === challengeId);
    if (!currentChallenge) return;
    
    document.getElementById('challengeTitle').textContent = currentChallenge.title;
    const proofContainer = document.getElementById('proofContainer');
    proofContainer.innerHTML = '';
    
    if (currentChallenge.proofType === 'photo') {
        proofContainer.innerHTML = `
            <p>Upload a photo as proof:</p>
            <input type="file" id="proofPhoto" accept="image/*">
            <p>Brief description (optional):</p>
            <textarea id="proofDesc" placeholder="Describe how you completed this challenge"></textarea>
        `;
    } else {
        proofContainer.innerHTML = `
            <p>Describe how you completed this challenge:</p>
            <textarea id="proofDesc" required placeholder="Provide details about how you completed this challenge"></textarea>
        `;
    }
    
    document.getElementById('proofModal').style.display = 'block';
}

// Submit proof for a challenge
function submitProof() {
    if (!currentChallenge) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    // Get proof description
    const proofDesc = document.getElementById('proofDesc').value;
    if (!proofDesc && currentChallenge.proofType !== 'photo') {
        alert('Please provide a description of how you completed the challenge');
        return;
    }
    
    // In a real app, you would upload the photo to a server
    // Here we'll just simulate it
    const proofPhoto = currentChallenge.proofType === 'photo' ? 
        (document.getElementById('proofPhoto').files[0] ? 'photo_uploaded.jpg' : null) : 
        null;
    
    if (currentChallenge.proofType === 'photo' && !proofPhoto) {
        alert('Please upload a photo as proof');
        return;
    }
    
    // Update user data
    // Remove from active challenges
    user.activeChallenges = user.activeChallenges.filter(id => id !== currentChallenge.id);
    
    // Add to completed challenges
    user.completedChallenges.push({
        challengeId: currentChallenge.id,
        completedDate: new Date().toLocaleDateString(),
        proofDesc,
        proofPhoto
    });
    
    // Add water saved
    user.totalWaterSaved += currentChallenge.waterSaved;
    
    // Check for badges
    checkForBadges(user);
    
    // Save updated user data
    updateUserData(user);
    
    // Close modal and refresh displays
    document.getElementById('proofModal').style.display = 'none';
    displayActiveChallenges();
    updateDashboardStats();
    
    alert(`Congratulations! You've completed the "${currentChallenge.title}" challenge and saved ${currentChallenge.waterSaved} liters of water!`);
}

// Check if user earned any badges
function checkForBadges(user) {
    const earnedBadges = [];
    
    // Water Saver badge (complete 5 challenges)
    if (user.completedChallenges.length >= 5 && !user.badges.includes(1)) {
        earnedBadges.push(1);
    }
    
    // Leak Fixer badge (complete challenge 2)
    if (user.completedChallenges.some(c => c.challengeId === 2) && !user.badges.includes(2)) {
        earnedBadges.push(2);
    }
    
    // Shower Star badge (complete challenge 1)
    if (user.completedChallenges.some(c => c.challengeId === 1) && !user.badges.includes(3)) {
        earnedBadges.push(3);
    }
    
    // Conservation Hero badge (save 1000 liters)
    if (user.totalWaterSaved >= 1000 && !user.badges.includes(4)) {
        earnedBadges.push(4);
    }
    
    // Add earned badges to user
    if (earnedBadges.length > 0) {
        earnedBadges.forEach(badgeId => {
            if (!user.badges.includes(badgeId)) {
                user.badges.push(badgeId);
                showBadgeNotification(badgeId);
            }
        });
        
        updateUserData(user);
    }
}

// Show badge notification
function showBadgeNotification(badgeId) {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <h3>New Badge Earned!</h3>
        <p>You've earned the <strong>${badge.name}</strong> badge: ${badge.description}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ==============================================
// TEAMS FUNCTIONALITY
// ==============================================

// Display all teams
function displayTeams() {
    const teamList = document.getElementById('teamList');
    if (!teamList) return;
    
    teamList.innerHTML = '';
    
    const user = getCurrentUser();
    
    teams.forEach(team => {
        const isMember = team.members.includes(user?.email);
        const isOnTeam = user && user.team === team.name;
        
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <h3>${team.name}</h3>
            <p>Members: ${team.members.length}</p>
            <p>Total Water Saved: ${team.totalWaterSaved} liters</p>
            ${isOnTeam ? 
                '<p class="team-status">Current Team</p>' : 
                `<button class="join-btn" data-id="${team.id}" ${isMember ? 'disabled' : ''}>
                    ${isMember ? 'Already Joined' : 'Join Team'}
                </button>`
            }
        `;
        
        teamList.appendChild(teamCard);
    });
    
    // Add event listeners to join buttons
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            joinTeam(parseInt(this.dataset.id));
        });
    });
}

// Join a team
function joinTeam(teamId) {
    const user = getCurrentUser();
    if (!user) return;
    
    const teamIndex = teams.findIndex(t => t.id === teamId);
    if (teamIndex === -1) return;
    
    // Remove from any other team first
    teams.forEach(t => {
        t.members = t.members.filter(member => member !== user.email);
    });
    
    // Add to new team
    if (!teams[teamIndex].members.includes(user.email)) {
        teams[teamIndex].members.push(user.email);
    }
    
    // Update user's team
    user.team = teams[teamIndex].name;
    
    // Save data
    localStorage.setItem('teams', JSON.stringify(teams));
    updateUserData(user);
    
    // Update displays
    displayTeams();
    updateTeamLeaderboard();
    updateDashboardStats();
    
    alert(`You've joined ${teams[teamIndex].name}!`);
}

// Update team leaderboard
function updateTeamLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;
    
    // Calculate team totals
    teams.forEach(team => {
        team.totalWaterSaved = team.members.reduce((total, memberEmail) => {
            const member = users.find(u => u.email === memberEmail);
            return total + (member ? member.totalWaterSaved : 0);
        }, 0);
    });
    
    // Sort teams by water saved (descending)
    const sortedTeams = [...teams].sort((a, b) => b.totalWaterSaved - a.totalWaterSaved);
    
    // Update leaderboard
    leaderboardBody.innerHTML = '';
    
    sortedTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.totalWaterSaved}</td>
            <td>${team.members.length}</td>
        `;
        leaderboardBody.appendChild(row);
    });
    
    // Save updated teams data
    localStorage.setItem('teams', JSON.stringify(teams));
}

// ==============================================
// QUIZ FUNCTIONALITY
// ==============================================

// Set up quiz event listeners
function setupQuizListeners() {
    document.getElementById('startQuizBtn')?.addEventListener('click', startQuiz);
    document.getElementById('prevQuestionBtn')?.addEventListener('click', prevQuestion);
    document.getElementById('nextQuestionBtn')?.addEventListener('click', nextQuestion);
    document.getElementById('viewCertBtn')?.addEventListener('click', viewCertificate);
    document.getElementById('downloadCertBtn')?.addEventListener('click', viewCertificate); // Same as view for this demo
    document.getElementById('retakeQuizBtn')?.addEventListener('click', retakeQuiz);
    document.getElementById('printCertBtn')?.addEventListener('click', printCertificate);
}

// Start the quiz
function startQuiz() {
    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    displayQuestion(currentQuestionIndex);
}

// Display a question
function displayQuestion(index) {
    if (index < 0 || index >= quizQuestions.length) return;
    
    const question = quizQuestions[index];
    document.getElementById('questionText').textContent = question.question;
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = `option ${userAnswers[index] === i ? 'selected' : ''}`;
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index, i));
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('prevQuestionBtn').disabled = index === 0;
    document.getElementById('nextQuestionBtn').textContent = index === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next';
}

// Select an answer
function selectAnswer(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;
    displayQuestion(questionIndex);
}

// Go to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

// Go to next question or submit quiz
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        submitQuiz();
    }
}

// Submit the quiz
function submitQuiz() {
    // Calculate score
    let score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });
    
    // Display results
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    document.getElementById('quizScore').textContent = score;
    
    // Provide feedback
    if (score >= 8) {
        document.getElementById('quizFeedback').textContent = 'Excellent! You have great knowledge of water conservation.';
        document.getElementById('certificateEarned').style.display = 'block';
        
        // Award certificate
        awardCertificate(score);
    } else if (score >= 5) {
        document.getElementById('quizFeedback').textContent = 'Good job! You know quite a bit about water conservation.';
    } else {
        document.getElementById('quizFeedback').textContent = 'Keep learning! Check out our resources to improve your water conservation knowledge.';
    }
    
    quizCompleted = true;
}

// Award certificate
function awardCertificate(score) {
    const user = getCurrentUser();
    if (!user) return;
    
    const certificate = {
        title: 'Water Conservation Expert',
        score: `${score}/10`,
        date: new Date().toLocaleDateString()
    };
    
    user.certificates.push(certificate);
    updateUserData(user);
}

// View certificate
function viewCertificate() {
    const score = parseInt(document.getElementById('quizScore').textContent);
    const user = getCurrentUser();
    
    if (user) {
        document.getElementById('certificateName').textContent = user.name;
        document.getElementById('certificateScore').textContent = score;
        document.getElementById('certificateDate').textContent = new Date().toLocaleDateString();
        document.getElementById('certificateModal').style.display = 'block';
    }
}

// Print certificate
function printCertificate() {
    const printContent = document.getElementById('certificateContent').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

// Retake quiz
function retakeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = Array(quizQuestions.length).fill(null);
    quizCompleted = false;
    
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizIntro').style.display = 'block';
}

// ==============================================
// PROFILE FUNCTIONALITY
// ==============================================

// Load profile data
function loadProfileData() {
    const user = getCurrentUser();
    if (!user) return;
    
    if (document.getElementById('profileName')) {
        document.getElementById('profileName').textContent = user.name;
    }
    
    if (document.getElementById('profileEmail')) {
        document.getElementById('profileEmail').textContent = user.email;
    }
    
    if (document.getElementById('memberSince')) {
        document.getElementById('memberSince').textContent = user.joinedDate || 'Unknown';
    }
    
    if (document.getElementById('profileWaterSaved')) {
        document.getElementById('profileWaterSaved').textContent = `${user.totalWaterSaved} liters`;
    }
    
    if (document.getElementById('profileChallenges')) {
        document.getElementById('profileChallenges').textContent = user.completedChallenges.length;
    }
    
    if (document.getElementById('profileBadges')) {
        document.getElementById('profileBadges').textContent = user.badges.length;
    }
}

// Display certificates
function displayCertificates() {
    const certificateList = document.getElementById('certificateList');
    if (!certificateList) return;
    
    const user = getCurrentUser();
    if (!user || !user.certificates || user.certificates.length === 0) {
        certificateList.innerHTML = '<p>You haven\'t earned any certificates yet.</p>';
        return;
    }
    
    certificateList.innerHTML = '';
    
    user.certificates.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'certificate-card';
        certCard.innerHTML = `
            <h4>${cert.title}</h4>
            <p>Score: ${cert.score}</p>
            <p>Date Earned: ${cert.date}</p>
            <button class="view-cert-btn" data-index="${index}">View Certificate</button>
        `;
        certificateList.appendChild(certCard);
    });
    
    // Add event listeners to view certificate buttons
    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            viewProfileCertificate(parseInt(this.dataset.index));
        });
    });
}

// View certificate from profile
function viewProfileCertificate(index) {
    const user = getCurrentUser();
    if (!user || !user.certificates || !user.certificates[index]) return;
    
    const cert = user.certificates[index];
    
    // Set certificate content
    document.getElementById('certificateName').textContent = user.name;
    document.getElementById('certificateScore').textContent = cert.score;
    document.getElementById('certificateDate').textContent = cert.date;
    
    // Show modal
    document.getElementById('certificateModal').style.display = 'block';
}

// ==============================================
// DASHBOARD FUNCTIONALITY
// ==============================================

// Update dashboard stats
function updateDashboardStats() {
    const user = getCurrentUser();
    if (!user) return;
    
    if (document.getElementById('totalWaterSaved')) {
        document.getElementById('totalWaterSaved').textContent = `${user.totalWaterSaved} liters`;
    }
    
    if (document.getElementById('completedChallenges')) {
        document.getElementById('completedChallenges').textContent = user.completedChallenges.length;
    }
    
    if (document.getElementById('currentTeam')) {
        document.getElementById('currentTeam').textContent = user.team || 'None';
    }
    
    if (document.getElementById('badgeCount')) {
        document.getElementById('badgeCount').textContent = user.badges.length;
    }
    
    if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = user.name;
    }
}

// Display user badges
function displayUserBadges() {
    const userBadges = document.getElementById('userBadges');
    if (!userBadges) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    userBadges.innerHTML = '';
    
    user.badges.forEach(badgeId => {
        const badge = badges.find(b => b.id === badgeId);
        if (badge) {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge';
            badgeElement.innerHTML = `
                <div style="font-size: 40px;">${badge.image}</div>
                <p>${badge.name}</p>
            `;
            userBadges.appendChild(badgeElement);
        }
    });
    
    if (user.badges.length === 0) {
        userBadges.innerHTML = '<p>You haven\'t earned any badges yet. Complete challenges to earn badges!</p>';
    }
}

// ==============================================
// COMMUNITY STATS
// ==============================================

// Update community statistics
function updateCommunityStats() {
    // Calculate total water saved
    const totalWaterSaved = users.reduce((total, user) => total + (user.totalWaterSaved || 0), 0);
    
    // Update DOM elements
    document.getElementById('communityWaterSaved').textContent = `${totalWaterSaved} liters`;
    document.getElementById('activeParticipants').textContent = users.length;
    
    // Calculate total completed challenges
    const totalChallenges = users.reduce((total, user) => total + (user.completedChallenges ? user.completedChallenges.length : 0), 0);
    document.getElementById('communityChallenges').textContent = totalChallenges;
}

// ==============================================
// MODAL FUNCTIONALITY
// ==============================================

// Set up modal event listeners
function setupModalListeners() {
    // Close modals when clicking the X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('proofModal').style.display = 'none';
            document.getElementById('certificateModal').style.display = 'none';
        });
    });
    
    // Submit proof button
    document.getElementById('submitProofBtn')?.addEventListener('click', submitProof);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('proofModal')) {
            document.getElementById('proofModal').style.display = 'none';
        }
        if (event.target === document.getElementById('certificateModal')) {
            document.getElementById('certificateModal').style.display = 'none';
        }
    });
}

// ==============================================
// AUTHENTICATION EVENT LISTENERS
// ==============================================

// Set up authentication event listeners
function setupAuthListeners() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            handleLogin(email, password);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            handleRegister(name, email, password, confirmPassword);
        });
    }
}

// ==============================================
// CHALLENGES EVENT LISTENERS
// ==============================================

// Set up challenges event listeners
function setupChallengeListeners() {
    // Filter challenges by category
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayChallenges();
        });
    });
}

// ==============================================
// GLOBAL FUNCTIONS FOR HTML ACCESS
// ==============================================

// Make functions available to HTML onclick attributes
window.navigateTo = navigateTo;
window.handleLogout = handleLogout;
window.startChallenge = startChallenge;
window.showProofModal = showProofModal;
window.submitProof = submitProof;
window.viewCertificate = viewCertificate;
window.printCertificate = printCertificate;