// User profile data
const userProfileState = $state({
    id: null as string | null,
    name: '',
    email: '',
    role: 'participant' as 'participant' | 'researcher',
    institution: '',
    department: '',
    joinDate: new Date().toISOString(),
    totalSurveys: 0,
    totalEarnings: 0,
    completedSurveys: 0,
    preferences: {
        emailNotifications: true,
        surveyAlerts: true,
        marketingEmails: false,
        dataSharing: true
    },
    demographics: {
        age: '',
        gender: '',
        education: '',
        location: '',
        researchInterests: [] as string[]
    }
});

// Surveys data
const surveysState = $state([
    {
        id: 1,
        title: "Consumer Behavior Study",
        description: "Help us understand how people make purchasing decisions",
        duration: "10-15 minutes",
        reward: "$2.50",
        category: "Psychology",
        participants: 45,
        maxParticipants: 100,
        tags: ["consumer", "behavior", "psychology"],
        createdBy: "researcher_1",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Social Media Usage Patterns",
        description: "Research on how people use social media platforms",
        duration: "8-12 minutes",
        reward: "$1.75",
        category: "Technology",
        participants: 78,
        maxParticipants: 150,
        tags: ["social media", "technology", "behavior"],
        createdBy: "researcher_2",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Remote Work Productivity",
        description: "Study on productivity and work-life balance in remote settings",
        duration: "15-20 minutes",
        reward: "$3.00",
        category: "Business",
        participants: 23,
        maxParticipants: 80,
        tags: ["remote work", "productivity", "business"],
        createdBy: "researcher_3",
        createdAt: new Date().toISOString()
    }
]);

// Survey responses data
const surveyResponsesState = $state<Record<number, any[]>>({});

// Dashboard data
const dashboardDataState = $state({
    totalSurveys: 0,
    totalResponses: 0,
    totalEarnings: 0,
    activeSurveys: 0,
    recentSurveys: [] as any[],
    recentResponses: [] as any[]
});

// Export getters for the state
export const userProfile = userProfileState;
export const surveys = surveysState;
export const surveyResponses = surveyResponsesState;
export const dashboardData = dashboardDataState;

// Helper functions
export function updateUserProfile(updates: Partial<typeof userProfileState>) {
    Object.assign(userProfileState, updates);
    saveToLocalStorage('userProfile', userProfileState);
}

export function addSurvey(survey: any) {
    const newId = Math.max(...surveysState.map((s: any) => s.id)) + 1;
    const newSurvey = { ...survey, id: newId, createdAt: new Date().toISOString() };
    surveysState.push(newSurvey);
    saveToLocalStorage('surveys', surveysState);
    updateDashboardData();
}

export function addSurveyResponse(surveyId: number, response: any) {
    if (!surveyResponsesState[surveyId]) {
        surveyResponsesState[surveyId] = [];
    }
    surveyResponsesState[surveyId].push(response);
    saveToLocalStorage('surveyResponses', surveyResponsesState);
    updateDashboardData();
}

export function updateDashboardData() {
    const userSurveys = surveysState.filter((s: any) => s.createdBy === userProfileState.id);
    const userResponses = Object.values(surveyResponsesState).flat();
    
    Object.assign(dashboardDataState, {
        totalSurveys: userSurveys.length,
        totalResponses: userResponses.length,
        totalEarnings: userResponses.reduce((sum: number, r: any) => sum + (parseFloat(r.reward?.replace('$', '') || '0')), 0),
        activeSurveys: userSurveys.filter((s: any) => s.participants < s.maxParticipants).length,
        recentSurveys: userSurveys.slice(-5),
        recentResponses: userResponses.slice(-5)
    });
    saveToLocalStorage('dashboardData', dashboardDataState);
}

// Local storage helpers
function saveToLocalStorage(key: string, data: any) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function loadFromLocalStorage(key: string, defaultValue: any) {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    }
    return defaultValue;
}

// Initialize data from localStorage
export function initializeData() {
    const storedUserProfile = loadFromLocalStorage('userProfile', userProfileState);
    const storedSurveys = loadFromLocalStorage('surveys', surveysState);
    const storedSurveyResponses = loadFromLocalStorage('surveyResponses', surveyResponsesState);
    const storedDashboardData = loadFromLocalStorage('dashboardData', dashboardDataState);
    
    Object.assign(userProfileState, storedUserProfile);
    surveysState.splice(0, surveysState.length, ...storedSurveys);
    Object.assign(surveyResponsesState, storedSurveyResponses);
    Object.assign(dashboardDataState, storedDashboardData);
    
    updateDashboardData();
} 