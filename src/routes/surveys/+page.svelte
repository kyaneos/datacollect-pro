<script lang="ts">
    import { goto } from '$app/navigation';
    import { surveys } from '$lib/stores.svelte';
    import { icons } from '$lib/icons';

    let selectedCategory = $state('all');
    let searchQuery = $state('');

    let filteredSurveys = $derived(surveys.filter(survey => {
        const matchesCategory = selectedCategory === 'all' || survey.category === selectedCategory;
        const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            survey.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            survey.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    }));

    function takeSurvey(surveyId: number) {
        goto(`/survey/${surveyId}`);
    }

    const categories = ['all', 'Psychology', 'Technology', 'Business', 'Health', 'Education'];
</script>

<svelte:head>
    <title>Available Surveys - DataCollect Pro</title>
</svelte:head>

<main class="container">
    <header class="page-header">
        <h1>Available Surveys</h1>
        <p>Participate in research studies and earn rewards</p>
    </header>

    <div class="filters">
        <div class="search-box">
            <input 
                type="text" 
                placeholder="Search surveys..." 
                bind:value={searchQuery}
                class="search-input"
            />
        </div>
        
        <div class="category-filter">
            <select bind:value={selectedCategory} class="category-select">
                {#each categories as category}
                    <option value={category}>
                        {category === 'all' ? 'All Categories' : category}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    <div class="surveys-grid">
        {#each filteredSurveys as survey}
            <div class="survey-card">
                <div class="survey-header">
                    <h3>{survey.title}</h3>
                    <span class="category-badge">{survey.category}</span>
                </div>
                
                <p class="survey-description">{survey.description}</p>
                
                <div class="survey-meta">
                    <div class="meta-item">
                        <span class="icon" aria-hidden="true">{@html icons.timer}</span>
                        <span>{survey.duration}</span>
                    </div>
                    <div class="meta-item">
                        <span class="icon" aria-hidden="true">{@html icons.money}</span>
                        <span>{survey.reward}</span>
                    </div>
                    <div class="meta-item">
                        <span class="icon" aria-hidden="true">{@html icons.users}</span>
                        <span>{survey.participants}/{survey.maxParticipants}</span>
                    </div>
                </div>

                <div class="progress-bar">
                    <div 
                        class="progress-fill" 
                        style="width: {(survey.participants / survey.maxParticipants) * 100}%"
                    ></div>
                </div>

                <div class="tags">
                    {#each survey.tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>

                <button 
                    class="take-survey-btn"
                    onclick={() => takeSurvey(survey.id)}
                    disabled={survey.participants >= survey.maxParticipants}
                >
                    {survey.participants >= survey.maxParticipants ? 'Full' : 'Take Survey'}
                </button>
            </div>
        {/each}
    </div>

    {#if filteredSurveys.length === 0}
        <div class="no-results">
            <h3>No surveys found</h3>
            <p>Try adjusting your search or category filter</p>
        </div>
    {/if}
</main>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .page-header h1 {
        font-size: 2.5rem;
        color: #111827;
        margin-bottom: 0.5rem;
        font-weight: 700;
    }

    .page-header p {
        color: #6b7280;
        font-size: 1.1rem;
    }

    .filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .search-box {
        flex: 1;
        min-width: 250px;
    }

    .search-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 1rem;
    }

    .category-select {
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 1rem;
        background: white;
    }

    .surveys-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }

    .survey-card {
        background: white;
        border-radius: 0.75rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease;
    }

    .survey-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-color: #2563eb;
    }

    .survey-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .survey-header h3 {
        margin: 0;
        color: #111827;
        font-size: 1.25rem;
        font-weight: 600;
    }

    .category-badge {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .survey-description {
        color: #6b7280;
        margin-bottom: 1rem;
        line-height: 1.5;
    }

    .survey-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #6b7280;
        font-size: 0.875rem;
    }

    .progress-bar {
        width: 100%;
        height: 0.5rem;
        background: #e5e7eb;
        border-radius: 0.25rem;
        margin-bottom: 1rem;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #059669);
        transition: width 0.3s ease;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .tag {
        background: #f3f4f6;
        color: #374151;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
    }

    .take-survey-btn {
        width: 100%;
        padding: 0.75rem 1rem;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .take-survey-btn:hover:not(:disabled) {
        background: #1d4ed8;
        transform: translateY(-1px);
    }

    .take-survey-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        color: #6b7280;
    }

    :global(body) {
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #111827;
    }
</style> 