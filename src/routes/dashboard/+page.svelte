<script lang="ts">
    import { goto } from '$app/navigation';
    import { dashboardData } from '$lib/stores.svelte';
    import { icons } from '$lib/icons';

    let selectedTimeframe = $state('7d');
    let selectedSurvey = $state('all');

    const timeframes = [
        { value: '1d', label: 'Last 24 hours' },
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '90d', label: 'Last 90 days' }
    ];

    function viewSurveyDetails(surveyId: number) {
        goto(`/survey/${surveyId}`);
    }

    function createNewSurvey() {
        goto('/create-survey');
    }
</script>

<svelte:head>
    <title>Dashboard - DataCollect Pro</title>
</svelte:head>

<main class="container">
    <header class="dashboard-header">
        <div class="header-content">
            <h1>Dashboard</h1>
            <p>Monitor your surveys and track performance</p>
        </div>
        <button class="create-btn" onclick={createNewSurvey}>
            + Create Survey
        </button>
    </header>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon">{@html icons.dashboard}</div>
            <div class="stat-content">
                <h3>Total Surveys</h3>
                <p class="stat-number">{dashboardData.totalSurveys}</p>
                <span class="stat-change positive">+2 this month</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">{@html icons.responses}</div>
            <div class="stat-content">
                <h3>Total Responses</h3>
                <p class="stat-number">{dashboardData.totalResponses}</p>
                <span class="stat-change positive">+45 this week</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">{@html icons.earnings}</div>
            <div class="stat-content">
                <h3>Total Earnings</h3>
                <p class="stat-number">${dashboardData.totalEarnings.toLocaleString()}</p>
                <span class="stat-change positive">+$156.25 this week</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">{@html icons.active}</div>
            <div class="stat-content">
                <h3>Active Surveys</h3>
                <p class="stat-number">{dashboardData.activeSurveys}</p>
                <span class="stat-change neutral">No change</span>
            </div>
        </div>
    </div>

    <div class="dashboard-content">
        <div class="content-section">
            <div class="section-header">
                <h2>Recent Surveys</h2>
                <div class="filters">
                    <select bind:value={selectedTimeframe} class="filter-select">
                        {#each timeframes as timeframe}
                            <option value={timeframe.value}>{timeframe.label}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="surveys-table">
                <div class="table-header">
                    <div class="table-cell">Survey Title</div>
                    <div class="table-cell">Responses</div>
                    <div class="table-cell">Completion Rate</div>
                    <div class="table-cell">Avg. Time</div>
                    <div class="table-cell">Status</div>
                    <div class="table-cell">Actions</div>
                </div>

                {#each dashboardData.recentSurveys as survey}
                    <div class="table-row">
                        <div class="table-cell">
                            <div class="survey-info">
                                <h4>{survey.title}</h4>
                                <span class="survey-id">ID: {survey.id}</span>
                            </div>
                        </div>
                        <div class="table-cell">
                            <div class="response-info">
                                <span class="response-count">{survey.responses}/{survey.maxResponses}</span>
                                <div class="progress-bar">
                                    <div 
                                        class="progress-fill" 
                                        style="width: {(survey.responses / survey.maxResponses) * 100}%"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div class="table-cell">
                            <span class="completion-rate">{survey.completionRate}%</span>
                        </div>
                        <div class="table-cell">
                            <span class="avg-time">{survey.avgTime}</span>
                        </div>
                        <div class="table-cell">
                            <span class="status-badge {survey.status}">{survey.status}</span>
                        </div>
                        <div class="table-cell">
                            <button 
                                class="view-btn"
                                onclick={() => viewSurveyDetails(survey.id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="content-section">
            <h2>Recent Responses</h2>
            <div class="responses-list">
                {#each dashboardData.recentResponses as response}
                    <div class="response-item">
                        <div class="response-info">
                            <h4>{response.surveyTitle}</h4>
                            <p>Participant: {response.participant}</p>
                            <span class="response-time">{response.completedAt}</span>
                        </div>
                        <div class="response-reward">
                            <span class="reward-amount">{response.reward}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
            <button class="action-btn" onclick={createNewSurvey}>
                <span class="action-icon">{@html icons.create}</span>
                <span>Create New Survey</span>
            </button>
            <button class="action-btn" onclick={() => goto('/surveys')}>
                <span class="action-icon">{@html icons.surveys}</span>
                <span>Browse All Surveys</span>
            </button>
            <button class="action-btn" onclick={() => goto('/profile')}>
                <span class="action-icon">{@html icons.settings}</span>
                <span>Account Preferences</span>
            </button>
            <button class="action-btn" onclick={() => goto('/analytics')}>
                <span class="action-icon">{@html icons.trend}</span>
                <span>View Analytics</span>
            </button>
        </div>
    </div>
</main>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .header-content h1 {
        font-size: 2.5rem;
        color: #374151;
        margin-bottom: 0.5rem;
    }

    .header-content p {
        color: #6b7280;
        font-size: 1.1rem;
    }

    .create-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .create-btn:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }

    .stat-card {
        background: white;
        border-radius: 0.75rem;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .stat-icon {
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f3f4f6;
        border-radius: 0.5rem;
    }

    .stat-content h3 {
        margin: 0 0 0.5rem 0;
        color: #6b7280;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .stat-number {
        margin: 0 0 0.25rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #374151;
    }

    .stat-change {
        font-size: 0.875rem;
        font-weight: 500;
    }

    .stat-change.positive {
        color: #059669;
    }

    .stat-change.negative {
        color: #dc2626;
    }

    .stat-change.neutral {
        color: #6b7280;
    }

    .dashboard-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .content-section {
        background: white;
        border-radius: 0.75rem;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .section-header h2 {
        margin: 0;
        color: #374151;
    }

    .filter-select {
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        background: white;
    }

    .surveys-table {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .table-header {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
        background: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
    }

    .table-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
        border-bottom: 1px solid #e5e7eb;
        transition: background-color 0.2s;
    }

    .table-row:hover {
        background: #f9fafb;
    }

    .table-row:last-child {
        border-bottom: none;
    }

    .table-cell {
        padding: 1rem;
        display: flex;
        align-items: center;
    }

    .table-header .table-cell {
        font-weight: 600;
        color: #111827;
        font-size: 0.875rem;
    }

    .survey-info h4 {
        margin: 0 0 0.25rem 0;
        color: #111827;
    }

    .survey-id {
        font-size: 0.75rem;
        color: #6b7280;
    }

    .response-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .response-count {
        font-weight: 500;
        color: #111827;
    }

    .progress-bar {
        width: 100%;
        height: 0.25rem;
        background: #e5e7eb;
        border-radius: 0.125rem;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #059669);
        transition: width 0.3s ease;
    }

    .completion-rate {
        font-weight: 500;
        color: #111827;
    }

    .avg-time {
        color: #6b7280;
    }

    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: capitalize;
    }

    .status-badge.active {
        background: #d1fae5;
        color: #065f46;
    }

    .status-badge.paused {
        background: #fef3c7;
        color: #92400e;
    }

    .status-badge.completed {
        background: #dbeafe;
        color: #1e40af;
    }

    .view-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        color: #111827;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .view-btn:hover {
        background: #e5e7eb;
    }

    .responses-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .response-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background: #f9fafb;
    }

    .response-info h4 {
        margin: 0 0 0.25rem 0;
        color: #111827;
        font-size: 0.875rem;
    }

    .response-info p {
        margin: 0 0 0.25rem 0;
        color: #6b7280;
        font-size: 0.75rem;
    }

    .response-time {
        font-size: 0.75rem;
        color: #9ca3af;
    }

    .reward-amount {
        font-weight: 600;
        color: #059669;
    }

    .quick-actions {
        background: white;
        border-radius: 0.75rem;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
    }

    .quick-actions h2 {
        margin: 0 0 1.5rem 0;
        color: #111827;
    }

    .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.5rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .action-btn:hover {
        background: #f3f4f6;
        transform: translateY(-2px);
    }

    .action-icon {
        font-size: 1.5rem;
    }

    .action-btn span:last-child {
        font-weight: 500;
        color: #111827;
    }

    :global(body) {
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #111827;
    }

    @media (max-width: 768px) {
        .dashboard-content {
            grid-template-columns: 1fr;
        }

        .table-header,
        .table-row {
            grid-template-columns: 1fr;
        }

        .table-cell {
            padding: 0.5rem;
        }

        .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }
    }
</style> 