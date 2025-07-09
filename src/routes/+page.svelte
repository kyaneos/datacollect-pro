<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { initializeData } from '$lib/stores.svelte';

    // Initialize data on app load
    initializeData();
</script>

<svelte:head>
    <title>DataCollect Pro - Online Research Platform</title>
</svelte:head>

<main class="container">
    <header class="hero">
        <h1>DataCollect Pro</h1>
        <p>Professional online data collection platform for researchers</p>
    </header>

    <nav class="nav-grid">
        <button class="nav-card" onclick={() => goto('/surveys')}>
            <h3>Take Surveys</h3>
            <p>Participate in research studies and earn rewards</p>
        </button>
        
        <button class="nav-card" onclick={() => goto('/create-survey')}>
            <h3>Create Survey</h3>
            <p>Design and publish your research surveys</p>
        </button>
        
        <button class="nav-card" onclick={() => goto('/dashboard')}>
            <h3>Dashboard</h3>
            <p>View your survey results and analytics</p>
        </button>
        
        <button class="nav-card" onclick={() => goto('/profile')}>
            <h3>Profile</h3>
            <p>Manage your account and preferences</p>
        </button>
    </nav>

    <section class="features">
        <h2>Why Choose DataCollect Pro?</h2>
        <div class="feature-grid">
            <div class="feature">
                <h3>High-Quality Data</h3>
                <p>Advanced screening and validation ensure reliable responses</p>
            </div>
            <div class="feature">
                <h3>Fast Results</h3>
                <p>Get responses from qualified participants quickly</p>
            </div>
            <div class="feature">
                <h3>Secure & Private</h3>
                <p>Your data is protected with enterprise-grade security</p>
            </div>
            <div class="feature">
                <h3>Mobile Friendly</h3>
                <p>Surveys work perfectly on all devices</p>
            </div>
        </div>
    </section>
</main>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .hero {
        text-align: center;
        margin-bottom: 3rem;
        padding: 4rem 0;
        background: #1f2937;
        color: white;
        border-radius: 0.75rem;
    }

    .hero h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    .hero p {
        font-size: 1.25rem;
        opacity: 0.9;
        color: #d1d5db;
    }

    .nav-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }

    .nav-card {
        background: white;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
        border: 1px solid #e5e7eb;
        text-align: left;
        cursor: pointer;
        font-family: inherit;
    }

    .nav-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-color: #2563eb;
    }

    .nav-card h3 {
        margin-bottom: 0.75rem;
        color: #111827;
        font-size: 1.25rem;
        font-weight: 600;
    }

    .nav-card p {
        color: #6b7280;
        margin: 0;
        line-height: 1.5;
    }

    .features {
        margin-top: 4rem;
    }

    .features h2 {
        text-align: center;
        margin-bottom: 3rem;
        color: #111827;
        font-size: 2.25rem;
        font-weight: 700;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
    }

    .feature {
        background: white;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        transition: transform 0.2s ease;
    }

    .feature:hover {
        transform: translateY(-1px);
    }

    .feature h3 {
        margin-bottom: 1rem;
        color: #111827;
        font-size: 1.125rem;
        font-weight: 600;
    }

    .feature p {
        color: #6b7280;
        margin: 0;
        line-height: 1.6;
    }

    :global(body) {
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #111827;
    }
</style>