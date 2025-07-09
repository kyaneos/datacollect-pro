<script lang="ts">
    import { goto } from '$app/navigation';
    import { userProfile, updateUserProfile } from '$lib/stores.svelte';
    import { icons } from '$lib/icons';

    let isEditing = $state(false);
    let isSaving = $state(false);
    let activeTab = $state('profile');

    function saveProfile() {
        isSaving = true;
        // Simulate API call
        setTimeout(() => {
            isSaving = false;
            isEditing = false;
        }, 1000);
    }

    function cancelEdit() {
        isEditing = false;
    }

    function updatePreference(key: string, value: boolean) {
        updateUserProfile({
            preferences: { ...userProfile.preferences, [key]: value }
        });
    }

    const navigationItems = [
        { id: 'profile', label: 'Profile', icon: icons.profile },
        { id: 'preferences', label: 'Preferences', icon: icons.preferences },
        { id: 'demographics', label: 'Demographics', icon: icons.chart },
    ];
</script>

<svelte:head>
    <title>Profile - DataCollect Pro</title>
</svelte:head>

<main class="container">
    <header class="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your account and preferences</p>
    </header>

    <div class="profile-layout">
        <aside class="sidebar">
            <nav class="tab-nav">
                {#each navigationItems as item}
                    <button 
                        class="tab-btn {activeTab === item.id ? 'active' : ''}"
                        onclick={() => activeTab = item.id}
                    >
                        <span class="tab-icon">{@html item.icon}</span>
                        <span class="tab-label">{item.label}</span>
                    </button>
                {/each}
            </nav>

            <div class="user-summary">
                <div class="avatar">
                    {userProfile.name.charAt(0)}
                </div>
                <h3>{userProfile.name}</h3>
                <p>{userProfile.role}</p>
                <div class="stats">
                    <div class="stat">
                        <span class="stat-number">{userProfile.totalSurveys}</span>
                        <span class="stat-label">Surveys</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${userProfile.totalEarnings.toLocaleString()}</span>
                        <span class="stat-label">Earnings</span>
                    </div>
                </div>
            </div>
        </aside>

        <div class="content-area">
            {#if activeTab === 'profile'}
                <div class="tab-content">
                    <div class="content-header">
                        <h2>Profile Information</h2>
                        {#if !isEditing}
                            <button class="edit-btn" onclick={() => isEditing = true}>
                                Edit Profile
                            </button>
                        {/if}
                    </div>

                    <div class="profile-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    bind:value={userProfile.name}
                                    disabled={!isEditing}
                                    class="form-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    bind:value={userProfile.email}
                                    disabled={!isEditing}
                                    class="form-input"
                                />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="institution">Institution</label>
                                <input 
                                    id="institution"
                                    type="text" 
                                    bind:value={userProfile.institution}
                                    disabled={!isEditing}
                                    class="form-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="department">Department</label>
                                <input 
                                    id="department"
                                    type="text" 
                                    bind:value={userProfile.department}
                                    disabled={!isEditing}
                                    class="form-input"
                                />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="joinDate">Member Since</label>
                                <input 
                                    id="joinDate"
                                    type="text" 
                                    value={new Date(userProfile.joinDate).toLocaleDateString()}
                                    disabled
                                    class="form-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="role">Role</label>
                                <input 
                                    id="role"
                                    type="text" 
                                    value={userProfile.role}
                                    disabled
                                    class="form-input"
                                />
                            </div>
                        </div>

                        {#if isEditing}
                            <div class="form-actions">
                                <button class="save-btn" onclick={saveProfile} disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button class="cancel-btn" onclick={cancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>

            {:else if activeTab === 'preferences'}
                <div class="tab-content">
                    <h2>Notification Preferences</h2>
                    
                    <div class="preferences-list">
                        <div class="preference-item">
                            <div class="preference-info">
                                <h3>Email Notifications</h3>
                                <p>Receive email updates about your surveys and account</p>
                            </div>
                            <label class="toggle">
                                <input 
                                    type="checkbox" 
                                    bind:checked={userProfile.preferences.emailNotifications}
                                    onchange={() => updatePreference('emailNotifications', userProfile.preferences.emailNotifications)}
                                />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>

                        <div class="preference-item">
                            <div class="preference-info">
                                <h3>Survey Alerts</h3>
                                <p>Get notified when new surveys match your criteria</p>
                            </div>
                            <label class="toggle">
                                <input 
                                    type="checkbox" 
                                    bind:checked={userProfile.preferences.surveyAlerts}
                                    onchange={() => updatePreference('surveyAlerts', userProfile.preferences.surveyAlerts)}
                                />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>

                        <div class="preference-item">
                            <div class="preference-info">
                                <h3>Marketing Emails</h3>
                                <p>Receive promotional content and updates about new features</p>
                            </div>
                            <label class="toggle">
                                <input 
                                    type="checkbox" 
                                    bind:checked={userProfile.preferences.marketingEmails}
                                    onchange={() => updatePreference('marketingEmails', userProfile.preferences.marketingEmails)}
                                />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>

                        <div class="preference-item">
                            <div class="preference-info">
                                <h3>Data Sharing</h3>
                                <p>Allow your anonymized data to be used for research purposes</p>
                            </div>
                            <label class="toggle">
                                <input 
                                    type="checkbox" 
                                    bind:checked={userProfile.preferences.dataSharing}
                                    onchange={() => updatePreference('dataSharing', userProfile.preferences.dataSharing)}
                                />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

            {:else if activeTab === 'demographics'}
                <div class="tab-content">
                    <h2>Demographic Information</h2>
                    <p class="section-description">This information helps us match you with relevant surveys and improve our platform.</p>

                    <div class="demographics-grid">
                        <div class="demo-item">
                            <label>Age Range</label>
                            <span class="demo-value">{userProfile.demographics.age}</span>
                        </div>

                        <div class="demo-item">
                            <label>Gender</label>
                            <span class="demo-value">{userProfile.demographics.gender}</span>
                        </div>

                        <div class="demo-item">
                            <label>Education Level</label>
                            <span class="demo-value">{userProfile.demographics.education}</span>
                        </div>

                        <div class="demo-item">
                            <label>Location</label>
                            <span class="demo-value">{userProfile.demographics.location}</span>
                        </div>
                    </div>

                    <div class="interests-section">
                        <h3>Research Interests</h3>
                        <div class="interests-list">
                            {#each userProfile.demographics.researchInterests as interest}
                                <span class="interest-tag">{interest}</span>
                            {/each}
                        </div>
                    </div>
                </div>

            {:else if activeTab === 'security'}
                <div class="tab-content">
                    <h2>Security Settings</h2>
                    
                    <div class="security-actions">
                        <div class="security-item">
                            <div class="security-info">
                                <h3>Change Password</h3>
                                <p>Update your account password</p>
                            </div>
                            <button class="security-btn">Change Password</button>
                        </div>

                        <div class="security-item">
                            <div class="security-info">
                                <h3>Two-Factor Authentication</h3>
                                <p>Add an extra layer of security to your account</p>
                            </div>
                            <button class="security-btn">Enable 2FA</button>
                        </div>

                        <div class="security-item">
                            <div class="security-info">
                                <h3>Login History</h3>
                                <p>View recent login activity</p>
                            </div>
                            <button class="security-btn">View History</button>
                        </div>

                        <div class="security-item danger">
                            <div class="security-info">
                                <h3>Delete Account</h3>
                                <p>Permanently delete your account and all associated data</p>
                            </div>
                            <button class="security-btn danger">Delete Account</button>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .profile-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .profile-header h1 {
        font-size: 2.5rem;
        color: #374151;
        margin-bottom: 0.5rem;
    }

    .profile-header p {
        color: #6b7280;
        font-size: 1.1rem;
    }

    .profile-layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
    }

    .sidebar {
        background: white;
        border-radius: 0.75rem;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        height: fit-content;
    }

    .tab-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }

    .tab-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: none;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
    }

    .tab-btn:hover {
        background: #f3f4f6;
    }

    .tab-btn.active {
        background: #2563eb;
        color: white;
    }

    .tab-icon {
        font-size: 1.2rem;
    }

    .tab-label {
        font-weight: 500;
    }

    .user-summary {
        text-align: center;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
    }

    .avatar {
        width: 4rem;
        height: 4rem;
        background: #2563eb;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 auto 1rem;
    }

    .user-summary h3 {
        margin: 0 0 0.25rem 0;
        color: #374151;
    }

    .user-summary p {
        margin: 0 0 1rem 0;
        color: #6b7280;
        text-transform: capitalize;
    }

    .stats {
        display: flex;
        justify-content: space-around;
    }

    .stat {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-weight: 600;
        color: #374151;
        font-size: 1.1rem;
    }

    .stat-label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
    }

    .content-area {
        background: white;
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
    }

    .tab-content h2 {
        margin: 0 0 1.5rem 0;
        color: #374151;
    }

    .content-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .edit-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .edit-btn:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #374151;
        font-weight: 500;
    }

    .form-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    .form-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input:disabled {
        background: #f9fafb;
        color: #6b7280;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .save-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .save-btn:hover:not(:disabled) {
        background: #1d4ed8;
        transform: translateY(-1px);
    }

    .save-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .cancel-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .cancel-btn:hover {
        background: #e5e7eb;
    }

    .preferences-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .preference-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: #f9fafb;
    }

    .preference-info h3 {
        margin: 0 0 0.25rem 0;
        color: #374151;
        font-size: 1rem;
    }

    .preference-info p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }

    .toggle {
        position: relative;
        display: inline-block;
        width: 3rem;
        height: 1.5rem;
    }

    .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 1.5rem;
    }

    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 1.25rem;
        width: 1.25rem;
        left: 0.125rem;
        bottom: 0.125rem;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    .toggle input:checked + .toggle-slider {
        background-color: #2563eb;
    }

    .toggle input:checked + .toggle-slider:before {
        transform: translateX(1.5rem);
    }

    .section-description {
        color: #6b7280;
        margin-bottom: 2rem;
    }

    .demographics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .demo-item {
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: #f9fafb;
    }

    .demo-item label {
        display: block;
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }

    .demo-value {
        font-weight: 500;
        color: #374151;
    }

    .interests-section h3 {
        margin-bottom: 1rem;
        color: #374151;
    }

    .interests-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .interest-tag {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .security-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .security-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: #f9fafb;
    }

    .security-item.danger {
        border-color: #fecaca;
        background: #fef2f2;
    }

    .security-info h3 {
        margin: 0 0 0.25rem 0;
        color: #374151;
        font-size: 1rem;
    }

    .security-info p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
    }

    .security-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .security-btn:hover {
        background: #e5e7eb;
    }

    .security-btn.danger {
        background: #fee2e2;
        border-color: #fca5a5;
        color: #dc2626;
    }

    .security-btn.danger:hover {
        background: #fecaca;
    }

    :global(body) {
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #111827;
    }

    @media (max-width: 768px) {
        .profile-layout {
            grid-template-columns: 1fr;
        }

        .form-row {
            grid-template-columns: 1fr;
        }

        .security-item {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }
    }
</style> 