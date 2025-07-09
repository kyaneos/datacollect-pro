<script lang="ts">
    import { goto } from '$app/navigation';
    import { icons } from '$lib/icons';

    let surveyTitle = $state('');
    let surveyDescription = $state('');
    let surveyCategory = $state('Psychology');
    let surveyDuration = $state('10-15 minutes');
    let surveyReward = $state('$2.50');
    let maxParticipants = $state(100);
    let questions = $state([
        {
            id: 1,
            type: 'multiple_choice',
            question: '',
            options: [''],
            required: true
        }
    ]);

    let currentStep = $state(1);
    let isSubmitting = $state(false);

    const categories = ['Psychology', 'Technology', 'Business', 'Health', 'Education', 'Social Sciences'];
    const questionTypes = [
        { value: 'multiple_choice', label: 'Multiple Choice' },
        { value: 'text', label: 'Text Response' },
        { value: 'rating', label: 'Rating Scale' },
        { value: 'checkbox', label: 'Checkbox (Multiple Select)' }
    ];

    function addQuestion() {
        const newId = Math.max(...questions.map(q => q.id)) + 1;
        questions = [...questions, {
            id: newId,
            type: 'multiple_choice',
            question: '',
            options: [''],
            required: true
        }];
    }

    function removeQuestion(index: number) {
        if (questions.length > 1) {
            questions = questions.filter((_, i) => i !== index);
        }
    }

    function updateQuestion(index: number, field: string, value: any) {
        questions[index] = { ...questions[index], [field]: value };
        questions = [...questions];
    }

    function addOption(questionIndex: number) {
        questions[questionIndex].options = [...questions[questionIndex].options, ''];
        questions = [...questions];
    }

    function removeOption(questionIndex: number, optionIndex: number) {
        if (questions[questionIndex].options.length > 1) {
            questions[questionIndex].options = questions[questionIndex].options.filter((_, i) => i !== optionIndex);
            questions = [...questions];
        }
    }

    function updateOption(questionIndex: number, optionIndex: number, value: string) {
        questions[questionIndex].options[optionIndex] = value;
        questions = [...questions];
    }

    function nextStep() {
        if (currentStep < 3) {
            currentStep++;
        }
    }

    function previousStep() {
        if (currentStep > 1) {
            currentStep--;
        }
    }

    function canProceed() {
        if (currentStep === 1) {
            return surveyTitle.trim() && surveyDescription.trim();
        }
        if (currentStep === 2) {
            return questions.every(q => q.question.trim() && 
                (q.type !== 'multiple_choice' && q.type !== 'checkbox' || q.options.every(opt => opt.trim())));
        }
        return true;
    }

    async function publishSurvey() {
        isSubmitting = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would send the survey data to your backend
        console.log('Publishing survey:', {
            title: surveyTitle,
            description: surveyDescription,
            category: surveyCategory,
            duration: surveyDuration,
            reward: surveyReward,
            maxParticipants,
            questions
        });
        
        // Redirect to dashboard
        goto('/dashboard');
    }
</script>

<svelte:head>
    <title>Create Survey - DataCollect Pro</title>
</svelte:head>

<main class="container">
    <header class="page-header">
        <h1>Create New Survey</h1>
        <p>Design and publish your research survey</p>
    </header>

    <div class="steps-indicator">
        <div class="step {currentStep >= 1 ? 'active' : ''}">
            <span class="step-number">1</span>
            <span class="step-label">Basic Info</span>
        </div>
        <div class="step-line"></div>
        <div class="step {currentStep >= 2 ? 'active' : ''}">
            <span class="step-number">2</span>
            <span class="step-label">Questions</span>
        </div>
        <div class="step-line"></div>
        <div class="step {currentStep >= 3 ? 'active' : ''}">
            <span class="step-number">3</span>
            <span class="step-label">Review & Publish</span>
        </div>
    </div>

    <div class="form-container">
        {#if currentStep === 1}
            <div class="step-content">
                <h2>Survey Information</h2>
                
                <div class="form-group">
                    <label for="title">Survey Title *</label>
                    <input 
                        id="title"
                        type="text" 
                        bind:value={surveyTitle}
                        placeholder="Enter survey title..."
                        class="form-input"
                    />
                </div>

                <div class="form-group">
                    <label for="description">Description *</label>
                    <textarea 
                        id="description"
                        bind:value={surveyDescription}
                        placeholder="Describe what your survey is about..."
                        rows="4"
                        class="form-input"
                    ></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" bind:value={surveyCategory} class="form-input">
                            {#each categories as category}
                                <option value={category}>{category}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="duration">Estimated Duration</label>
                        <input 
                            id="duration"
                            type="text" 
                            bind:value={surveyDuration}
                            placeholder="e.g., 10-15 minutes"
                            class="form-input"
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="reward">Reward per Participant</label>
                        <input 
                            id="reward"
                            type="text" 
                            bind:value={surveyReward}
                            placeholder="e.g., $2.50"
                            class="form-input"
                        />
                    </div>

                    <div class="form-group">
                        <label for="participants">Max Participants</label>
                        <input 
                            id="participants"
                            type="number" 
                            bind:value={maxParticipants}
                            min="1"
                            class="form-input"
                        />
                    </div>
                </div>
            </div>

        {:else if currentStep === 2}
            <div class="step-content">
                <h2>Survey Questions</h2>
                
                {#each questions as question, questionIndex}
                    <div class="question-card">
                        <div class="question-header">
                            <h3>Question {questionIndex + 1}</h3>
                            <button 
                                class="remove-btn"
                                on:click={() => removeQuestion(questionIndex)}
                                disabled={questions.length === 1}
                            >
                                <span class="icon" aria-hidden="true">{@html icons.delete}</span>
                            </button>
                        </div>

                        <div class="form-group">
                            <label>Question Text *</label>
                            <input 
                                type="text" 
                                bind:value={question.question}
                                placeholder="Enter your question..."
                                class="form-input"
                            />
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Question Type</label>
                                <select 
                                    bind:value={question.type}
                                    class="form-input"
                                >
                                    {#each questionTypes as type}
                                        <option value={type.value}>{type.label}</option>
                                    {/each}
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        bind:checked={question.required}
                                    />
                                    Required question
                                </label>
                            </div>
                        </div>

                        {#if question.type === 'multiple_choice' || question.type === 'checkbox'}
                            <div class="form-group">
                                <label>Options *</label>
                                {#each question.options as option, optionIndex}
                                    <div class="option-row">
                                        <input 
                                            type="text" 
                                            bind:value={question.options[optionIndex]}
                                            placeholder="Option {optionIndex + 1}"
                                            class="form-input option-input"
                                        />
                                        <button 
                                            class="remove-option-btn"
                                            on:click={() => removeOption(questionIndex, optionIndex)}
                                            disabled={question.options.length === 1}
                                        >
                                            <span class="icon" aria-hidden="true">{@html icons.close}</span>
                                        </button>
                                    </div>
                                {/each}
                                <button 
                                    class="add-option-btn"
                                    on:click={() => addOption(questionIndex)}
                                >
                                    + Add Option
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}

                <button class="add-question-btn" on:click={addQuestion}>
                    + Add Question
                </button>
            </div>

        {:else if currentStep === 3}
            <div class="step-content">
                <h2>Review & Publish</h2>
                
                <div class="review-card">
                    <h3>Survey Preview</h3>
                    
                    <div class="preview-section">
                        <h4>{surveyTitle}</h4>
                        <p>{surveyDescription}</p>
                        
                        <div class="preview-meta">
                            <span>Category: {surveyCategory}</span>
                            <span>Duration: {surveyDuration}</span>
                            <span>Reward: {surveyReward}</span>
                            <span>Max Participants: {maxParticipants}</span>
                        </div>
                    </div>

                    <div class="preview-questions">
                        <h4>Questions ({questions.length})</h4>
                        {#each questions as question, index}
                            <div class="preview-question">
                                <p><strong>{index + 1}. {question.question}</strong></p>
                                {#if question.type === 'multiple_choice'}
                                    <p class="preview-options">Multiple choice options: {question.options.join(', ')}</p>
                                {:else if question.type === 'checkbox'}
                                    <p class="preview-options">Checkbox options: {question.options.join(', ')}</p>
                                {:else if question.type === 'rating'}
                                    <p class="preview-options">Rating scale question</p>
                                {:else}
                                    <p class="preview-options">Text response</p>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="publish-section">
                    <h3>Ready to Publish?</h3>
                    <p>Your survey will be available to participants once published. You can edit it later from your dashboard.</p>
                </div>
            </div>
        {/if}

        <div class="navigation">
            <button 
                class="nav-btn prev-btn" 
                on:click={previousStep}
                disabled={currentStep === 1}
            >
                <span class="icon" aria-hidden="true">{@html icons.chevronLeft}</span> Previous
            </button>

            {#if currentStep === 3}
                <button 
                    class="nav-btn publish-btn" 
                    on:click={publishSurvey}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Publishing...' : 'Publish Survey'}
                </button>
            {:else}
                <button 
                    class="nav-btn next-btn" 
                    on:click={nextStep}
                    disabled={!canProceed()}
                >
                    Next <span class="icon" aria-hidden="true">{@html icons.chevronRight}</span>
                </button>
            {/if}
        </div>
    </div>
</main>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .page-header h1 {
        font-size: 2.5rem;
        color: #374151;
        margin-bottom: 0.5rem;
    }

    .page-header p {
        color: #6b7280;
        font-size: 1.1rem;
    }

    .steps-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;
    }

    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .step-number {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #e5e7eb;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        transition: all 0.3s;
    }

    .step.active .step-number {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .step-label {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
    }

    .step.active .step-label {
        color: #374151;
    }

    .step-line {
        width: 4rem;
        height: 2px;
        background: #e5e7eb;
        margin: 0 1rem;
    }

    .form-container {
        background: white;
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
    }

    .step-content h2 {
        color: #374151;
        margin-bottom: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
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

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .question-card {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .question-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .question-header h3 {
        margin: 0;
        color: #374151;
    }

    .remove-btn {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .remove-btn:hover:not(:disabled) {
        opacity: 1;
    }

    .remove-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .option-row {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .option-input {
        flex: 1;
    }

    .remove-option-btn {
        width: 2rem;
        height: 2rem;
        border: 1px solid #d1d5db;
        background: white;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .remove-option-btn:hover:not(:disabled) {
        background: #f3f4f6;
    }

    .remove-option-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .add-option-btn, .add-question-btn {
        background: #f3f4f6;
        border: 1px dashed #d1d5db;
        color: #6b7280;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;
    }

    .add-option-btn:hover, .add-question-btn:hover {
        background: #e5e7eb;
        color: #374151;
    }

    .add-question-btn {
        width: 100%;
        padding: 1rem;
        font-size: 1rem;
        margin-top: 1rem;
    }

    .review-card {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 2rem;
    }

    .preview-section {
        margin-bottom: 2rem;
    }

    .preview-section h4 {
        color: #374151;
        margin-bottom: 0.5rem;
    }

    .preview-meta {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .preview-meta span {
        background: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .preview-question {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .preview-question:last-child {
        border-bottom: none;
    }

    .preview-options {
        color: #6b7280;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .publish-section {
        text-align: center;
        padding: 2rem;
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 0.5rem;
    }

    .publish-section h3 {
        color: #0369a1;
        margin-bottom: 0.5rem;
    }

    .publish-section p {
        color: #0c4a6e;
        margin: 0;
    }

    .navigation {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #e5e7eb;
    }

    .nav-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .prev-btn {
        background: #f3f4f6;
        color: #374151;
    }

    .prev-btn:hover:not(:disabled) {
        background: #e5e7eb;
    }

    .next-btn, .publish-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .next-btn:hover:not(:disabled),
    .publish-btn:hover:not(:disabled) {
        opacity: 0.9;
    }

    .nav-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    body {
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
</style> 