<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { icons } from '$lib/icons';

    // Get survey ID from URL
    let surveyId = $derived(parseInt($page.params.id));

    // Mock survey data - in a real app, this would be fetched from an API
    let surveyData: Record<number, any> = $state({
        1: {
            id: 1,
            title: "Consumer Behavior Study",
            description: "Help us understand how people make purchasing decisions",
            questions: [
                {
                    id: 1,
                    type: "multiple_choice",
                    question: "How often do you shop online?",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
                    required: true
                },
                {
                    id: 2,
                    type: "text",
                    question: "What factors influence your purchasing decisions the most?",
                    placeholder: "Please describe your decision-making process...",
                    required: true
                },
                {
                    id: 3,
                    type: "rating",
                    question: "How important is price when making a purchase?",
                    scale: 5,
                    labels: ["Not important", "Very important"],
                    required: true
                },
                {
                    id: 4,
                    type: "checkbox",
                    question: "Which of the following do you consider when shopping? (Select all that apply)",
                    options: ["Price", "Quality", "Brand reputation", "Customer reviews", "Convenience", "Sustainability"],
                    required: true
                }
            ]
        },
        2: {
            id: 2,
            title: "Social Media Usage Patterns",
            description: "Research on how people use social media platforms",
            questions: [
                {
                    id: 1,
                    type: "multiple_choice",
                    question: "Which social media platform do you use most frequently?",
                    options: ["Facebook", "Instagram", "Twitter", "TikTok", "LinkedIn", "YouTube", "Other"],
                    required: true
                },
                {
                    id: 2,
                    type: "rating",
                    question: "How many hours per day do you spend on social media?",
                    scale: 5,
                    labels: ["Less than 1 hour", "More than 5 hours"],
                    required: true
                }
            ]
        }
    });

    let currentQuestion = $state(0);
    let answers: Record<number, any> = $state({});
    let isSubmitting = $state(false);
    let showThankYou = $state(false);

    let survey = $derived(surveyData[surveyId]);
    let currentQuestionData = $derived(survey?.questions[currentQuestion]);

    function handleAnswer(value: any) {
        answers[currentQuestionData.id] = value;
    }

    function nextQuestion() {
        if (currentQuestion < survey.questions.length - 1) {
            currentQuestion++;
        }
    }

    function previousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
        }
    }

    function canProceed() {
        if (!currentQuestionData) return false;
        if (!currentQuestionData.required) return true;
        
        const answer = answers[currentQuestionData.id];
        if (!answer) return false;
        
        if (currentQuestionData.type === 'checkbox') {
            return Array.isArray(answer) && answer.length > 0;
        }
        
        return true;
    }

    async function submitSurvey() {
        isSubmitting = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would send the answers to your backend
        console.log('Survey answers:', answers);
        
        showThankYou = true;
        isSubmitting = false;
    }

    function goHome() {
        goto('/');
    }

    // Check if survey exists
    let surveyExists = $derived(!!survey);
</script>

<svelte:head>
    <title>{survey?.title || 'Survey'} - DataCollect Pro</title>
</svelte:head>

{#if !survey}
    <div class="error-container">
        <h1>Survey Not Found</h1>
        <p>The survey you're looking for doesn't exist.</p>
        <button class="home-btn" on:click={goHome}>Return to Home</button>
    </div>
{:else if showThankYou}
    <div class="thank-you">
        <div class="thank-you-content">
            <h1>🎉 Thank You!</h1>
            <p>Your responses have been recorded successfully.</p>
            <p>You will receive your reward of $2.50 within 24 hours.</p>
            <button class="home-btn" on:click={goHome}>Return to Home</button>
        </div>
    </div>
{:else}
    <main class="survey-container">
        <header class="survey-header">
            <h1>{survey.title}</h1>
            <p>{survey.description}</p>
            <div class="progress-indicator">
                Question {currentQuestion + 1} of {survey.questions.length}
                <div class="progress-bar">
                    <div 
                        class="progress-fill" 
                        style="width: {((currentQuestion + 1) / survey.questions.length) * 100}%"
                    ></div>
                </div>
            </div>
        </header>

        <div class="question-container">
            {#if currentQuestionData}
                <div class="question">
                    <h2>{currentQuestionData.question}</h2>
                    {#if currentQuestionData.required}
                        <span class="required">* Required</span>
                    {/if}

                    {#if currentQuestionData.type === 'multiple_choice'}
                        <div class="options">
                            {#each currentQuestionData.options as option}
                                <label class="option">
                                    <input 
                                        type="radio" 
                                        name="q{currentQuestionData.id}" 
                                        value={option}
                                        bind:group={answers[currentQuestionData.id]}
                                        on:change={() => handleAnswer(option)}
                                    />
                                    <span class="option-text">{option}</span>
                                </label>
                            {/each}
                        </div>

                    {:else if currentQuestionData.type === 'text'}
                        <textarea 
                            placeholder={currentQuestionData.placeholder}
                            bind:value={answers[currentQuestionData.id]}
                            rows="4"
                            class="text-input"
                        ></textarea>

                    {:else if currentQuestionData.type === 'rating'}
                        <div class="rating-container">
                            <div class="rating-labels">
                                <span>{currentQuestionData.labels[0]}</span>
                                <span>{currentQuestionData.labels[1]}</span>
                            </div>
                            <div class="rating-options">
                                {#each Array(currentQuestionData.scale) as _, i}
                                    <label class="rating-option">
                                        <input 
                                            type="radio" 
                                            name="q{currentQuestionData.id}" 
                                            value={i + 1}
                                            bind:group={answers[currentQuestionData.id]}
                                            on:change={() => handleAnswer(i + 1)}
                                        />
                                        <span class="rating-number">{i + 1}</span>
                                    </label>
                                {/each}
                            </div>
                        </div>

                    {:else if currentQuestionData.type === 'checkbox'}
                        <div class="options">
                            {#each currentQuestionData.options as option}
                                <label class="option">
                                    <input 
                                        type="checkbox" 
                                        value={option}
                                        bind:group={answers[currentQuestionData.id]}
                                        on:change={() => handleAnswer(answers[currentQuestionData.id] || [])}
                                    />
                                    <span class="option-text">{option}</span>
                                </label>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>

        <div class="navigation">
            <button 
                class="nav-btn prev-btn" 
                on:click={previousQuestion}
                disabled={currentQuestion === 0}
            >
                <span class="icon" aria-hidden="true">{@html icons.chevronLeft}</span> Previous
            </button>

            {#if currentQuestion === survey.questions.length - 1}
                <button 
                    class="nav-btn submit-btn" 
                    on:click={submitSurvey}
                    disabled={!canProceed() || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                </button>
            {:else}
                <button 
                    class="nav-btn next-btn" 
                    on:click={nextQuestion}
                    disabled={!canProceed()}
                >
                    Next <span class="icon" aria-hidden="true">{@html icons.chevronRight}</span>
                </button>
            {/if}
        </div>
    </main>
{/if}

<style>
    .survey-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
        background: white;
    }

    .survey-header {
        text-align: center;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .survey-header h1 {
        font-size: 2rem;
        color: #374151;
        margin-bottom: 0.5rem;
    }

    .survey-header p {
        color: #6b7280;
        margin-bottom: 2rem;
    }

    .progress-indicator {
        margin-top: 1rem;
    }

    .progress-bar {
        width: 100%;
        height: 0.5rem;
        background: #e5e7eb;
        border-radius: 0.25rem;
        margin-top: 0.5rem;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s ease;
    }

    .question-container {
        margin-bottom: 3rem;
    }

    .question h2 {
        font-size: 1.5rem;
        color: #374151;
        margin-bottom: 0.5rem;
    }

    .required {
        color: #ef4444;
        font-size: 0.875rem;
        margin-left: 0.5rem;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: border-color 0.2s, background-color 0.2s;
    }

    .option:hover {
        border-color: #667eea;
        background-color: #f8fafc;
    }

    .option input[type="radio"],
    .option input[type="checkbox"] {
        margin: 0;
    }

    .option-text {
        font-size: 1rem;
        color: #374151;
    }

    .text-input {
        width: 100%;
        padding: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-family: inherit;
        resize: vertical;
        margin-top: 1.5rem;
    }

    .text-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .rating-container {
        margin-top: 1.5rem;
    }

    .rating-labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .rating-options {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }

    .rating-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .rating-option input[type="radio"] {
        display: none;
    }

    .rating-number {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #d1d5db;
        border-radius: 50%;
        font-weight: 500;
        transition: all 0.2s;
    }

    .rating-option input[type="radio"]:checked + .rating-number {
        background: #667eea;
        color: white;
        border-color: #667eea;
    }

    .navigation {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
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

    .next-btn, .submit-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .next-btn:hover:not(:disabled),
    .submit-btn:hover:not(:disabled) {
        opacity: 0.9;
    }

    .nav-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .thank-you {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .thank-you-content {
        text-align: center;
        padding: 3rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        backdrop-filter: blur(10px);
    }

    .thank-you-content h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .thank-you-content p {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        opacity: 0.9;
    }

    .home-btn {
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: white;
        color: #667eea;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .home-btn:hover {
        transform: translateY(-2px);
    }

    .error-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        padding: 2rem;
    }

    .error-container h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .error-container p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    body {
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
</style> 