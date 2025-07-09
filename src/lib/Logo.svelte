<script lang="ts">
    export let size: number = 32;
    export let showText: boolean = true;
    export let className: string = '';
</script>

<div class="logo {className}" style="--logo-size: {size}px">
    <svg width={size} height={size} viewBox="0 0 32 32" class="logo-svg">
        <title>DataCollect Pro</title>
        <defs>
            <linearGradient id="logoPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="logoSecondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
            </linearGradient>
        </defs>
        
        <!-- Background circle -->
        <circle cx="16" cy="16" r="15" fill="url(#logoPrimaryGradient)" stroke="#1e40af" stroke-width="1"/>
        
        <!-- Clipboard base -->
        <rect x="8" y="6" width="16" height="20" rx="2" fill="white" stroke="#e5e7eb" stroke-width="0.5"/>
        
        <!-- Clipboard top -->
        <rect x="12" y="4" width="8" height="4" rx="1" fill="url(#logoSecondaryGradient)"/>
        
        <!-- Data bars -->
        <rect x="10" y="10" width="2" height="8" fill="#10b981" rx="0.5"/>
        <rect x="13" y="10" width="2" height="12" fill="#3b82f6" rx="0.5"/>
        <rect x="16" y="10" width="2" height="6" fill="#f59e0b" rx="0.5"/>
        <rect x="19" y="10" width="2" height="10" fill="#ef4444" rx="0.5"/>
        
        <!-- Data points -->
        <circle cx="11" cy="20" r="0.5" fill="#10b981"/>
        <circle cx="14" cy="24" r="0.5" fill="#3b82f6"/>
        <circle cx="17" cy="18" r="0.5" fill="#f59e0b"/>
        <circle cx="20" cy="22" r="0.5" fill="#ef4444"/>
    </svg>
    
    {#if showText}
        <span class="logo-text">DataCollect Pro</span>
    {/if}
</div>

<style>
    .logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .logo-svg {
        flex-shrink: 0;
    }
    
    .logo-text {
        font-weight: 600;
        color: #111827;
        font-size: calc(var(--logo-size) * 0.6px);
        white-space: nowrap;
    }
    
    @media (max-width: 640px) {
        .logo-text {
            display: none;
        }
    }
</style> 