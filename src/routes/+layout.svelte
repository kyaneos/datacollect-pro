<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { userProfile } from '$lib/stores.svelte';
    import { icons } from '$lib/icons';
    
    let sidebarOpen = $state(false);
    let userMenuOpen = $state(false);
    let sidebarCollapsed = $state(false);
    
    const navigationItems = [
        { path: '/', label: 'Home', icon: icons.home, showInSidebar: true },
        { path: '/surveys', label: 'Surveys', icon: icons.surveys, showInSidebar: true },
        { path: '/create-survey', label: 'Create Survey', icon: icons.create, showInSidebar: true },
        { path: '/dashboard', label: 'Dashboard', icon: icons.dashboard, showInSidebar: true },
        { path: '/profile', label: 'Profile', icon: icons.profile, showInSidebar: true }
    ];
    
    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
    
    function toggleSidebarCollapse() {
        sidebarCollapsed = !sidebarCollapsed;
    }
    
    function toggleUserMenu() {
        userMenuOpen = !userMenuOpen;
    }
    
    function navigateTo(path: string) {
        goto(path);
        sidebarOpen = false;
        userMenuOpen = false;
    }
    
    function closeSidebar() {
        sidebarOpen = false;
        userMenuOpen = false;
    }
    
    // Close sidebar when clicking outside
    function handleOverlayClick() {
        closeSidebar();
    }
    
    // Show sidebar on all pages
    let showSidebar = $derived(true);
</script>

<svelte:head>
    <title>DataCollect Pro</title>
</svelte:head>

{#if showSidebar}
    <!-- Mobile menu button -->
    <button 
        class="mobile-menu-btn" 
        onclick={toggleSidebar}
        onkeydown={(e) => e.key === 'Enter' && toggleSidebar()}
        aria-label="Toggle navigation menu"
        aria-expanded={sidebarOpen}
    >
        <span class="hamburger" aria-hidden="true"></span>
    </button>
    
    <!-- Overlay for mobile -->
    {#if sidebarOpen}
        <div 
            class="sidebar-overlay" 
            onclick={handleOverlayClick}
            onkeydown={(e) => e.key === 'Escape' && handleOverlayClick()}
            role="button"
            tabindex="0"
            aria-label="Close navigation menu"
        ></div>
    {/if}
    
    <!-- Sidebar -->
    <aside class="sidebar {sidebarOpen ? 'open' : ''} {sidebarCollapsed ? 'collapsed' : ''}">
        <div class="sidebar-header">
            <div class="logo">
                <span class="logo-icon" aria-hidden="true">
                    {@html icons.dashboard}
                </span>
                <span class="logo-text {sidebarCollapsed ? 'hidden' : ''}">DataCollect Pro</span>
            </div>
            <div class="header-actions">
                <button 
                    class="collapse-btn" 
                    onclick={toggleSidebarCollapse} 
                    onkeydown={(e) => e.key === 'Enter' && toggleSidebarCollapse()}
                    aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {@html sidebarCollapsed ? icons.chevronRight : icons.chevronLeft}
                </button>
                <button 
                    class="close-btn" 
                    onclick={closeSidebar}
                    onkeydown={(e) => e.key === 'Enter' && closeSidebar()}
                    aria-label="Close sidebar"
                >
                    {@html icons.close}
                </button>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            {#each navigationItems.filter(item => item.showInSidebar) as item}
                <a 
                    href={item.path}
                    class="nav-item {$page.url.pathname === item.path ? 'active' : ''}"
                    onclick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                    onkeydown={(e) => e.key === 'Enter' && navigateTo(item.path)}
                    title={sidebarCollapsed ? item.label : ''}
                    aria-label={item.label}
                >
                    <span class="nav-icon" aria-hidden="true">{@html item.icon}</span>
                    <span class="nav-label {sidebarCollapsed ? 'hidden' : ''}">{item.label}</span>
                </a>
            {/each}
        </nav>
        
        <div class="sidebar-footer {sidebarCollapsed ? 'collapsed' : ''}">
            <div class="user-info">
                <div class="user-avatar">
                    {userProfile.name.charAt(0).toUpperCase()}
                </div>
                <div class="user-details {sidebarCollapsed ? 'hidden' : ''}">
                    <div class="user-name">{userProfile.name || 'User'}</div>
                    <div class="user-role">{userProfile.role}</div>
                </div>
                {#if !sidebarCollapsed}
                    <button 
                        class="user-menu-btn" 
                        onclick={toggleUserMenu}
                        onkeydown={(e) => e.key === 'Enter' && toggleUserMenu()}
                        aria-label="Toggle user menu"
                        aria-expanded={userMenuOpen}
                    >
                        <span class="dropdown-arrow {userMenuOpen ? 'up' : ''}" aria-hidden="true">
                            {@html icons.dropdown}
                        </span>
                    </button>
                {/if}
            </div>
            
            {#if userMenuOpen}
                <div class="user-menu">
                    <a 
                        href="/profile" 
                        class="user-menu-item" 
                        onclick={(e) => { e.preventDefault(); navigateTo('/profile'); }}
                        onkeydown={(e) => e.key === 'Enter' && navigateTo('/profile')}
                        aria-label="Go to profile settings"
                    >
                        <span class="menu-icon" aria-hidden="true">{@html icons.settings}</span>
                        Settings
                    </a>
                    <div class="user-menu-divider"></div>
                    <button 
                        class="user-menu-item logout-btn"
                        onkeydown={(e) => e.key === 'Enter' && console.log('Logout clicked')}
                        aria-label="Logout from application"
                    >
                        <span class="menu-icon" aria-hidden="true">{@html icons.logout}</span>
                        Logout
                    </button>
                </div>
            {/if}
        </div>
    </aside>
    
    <!-- Main content wrapper -->
    <div class="main-content {sidebarOpen ? 'sidebar-open' : ''} {sidebarCollapsed ? 'sidebar-collapsed' : ''}">
        <slot />
    </div>
{/if}

<style>
    /* Mobile menu button */
    .mobile-menu-btn {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 1000;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.75rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }
    

    
    .mobile-menu-btn:hover {
        background: #1d4ed8;
    }
    
    .hamburger {
        width: 20px;
        height: 2px;
        background: white;
        position: relative;
        transition: all 0.3s;
    }
    
    .hamburger::before,
    .hamburger::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        background: white;
        transition: all 0.3s;
    }
    
    .hamburger::before {
        top: -6px;
    }
    
    .hamburger::after {
        bottom: -6px;
    }
    
    /* Sidebar */
    .sidebar {
        position: fixed;
        top: 0;
        left: -280px;
        width: 280px;
        height: 100vh;
        background: white;
        border-right: 1px solid #e5e7eb;
        z-index: 1001;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }
    
    .sidebar.open {
        left: 0;
    }
    
    .sidebar.collapsed {
        width: 70px;
    }
    
    .sidebar.collapsed .nav-item {
        justify-content: center;
        padding: 0.75rem;
    }
    
    .sidebar.collapsed .user-info {
        justify-content: center;
        padding: 0.5rem;
    }
    
    /* Overlay */
    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    
    /* Sidebar header */
    .sidebar-header {
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .header-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .collapse-btn {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.2s;
        font-size: 0.875rem;
    }
    
    .collapse-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .logo-icon {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .logo-icon svg {
        width: 1.5rem;
        height: 1.5rem;
    }
    
    .logo-text {
        font-weight: 600;
        color: #111827;
        font-size: 1.125rem;
        transition: opacity 0.3s ease;
    }
    
    .logo-text.hidden {
        opacity: 0;
        width: 0;
        overflow: hidden;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.2s;
    }
    
    .close-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    /* Sidebar navigation */
    .sidebar-nav {
        flex: 1;
        padding: 1rem 0;
        overflow-y: auto;
    }
    
    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.5rem;
        color: #374151;
        text-decoration: none;
        transition: all 0.2s;
        border-left: 3px solid transparent;
    }
    
    .nav-item:hover {
        background: #f9fafb;
        color: #111827;
        border-left-color: #d1d5db;
    }
    
    .nav-item.active {
        background: #eff6ff;
        color: #2563eb;
        border-left-color: #2563eb;
        font-weight: 500;
    }
    
    .nav-icon {
        font-size: 1.25rem;
        width: 1.5rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .nav-icon svg {
        width: 1.25rem;
        height: 1.25rem;
    }
    
    .nav-label {
        font-size: 0.875rem;
        font-weight: 500;
        transition: opacity 0.3s ease;
    }
    
    .nav-label.hidden {
        opacity: 0;
        width: 0;
        overflow: hidden;
    }
    
    /* Sidebar footer */
    .sidebar-footer {
        padding: 1rem 1.5rem;
        border-top: 1px solid #e5e7eb;
        position: relative;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
    }
    
    .user-info:hover {
        background: #f9fafb;
    }
    
    .user-avatar {
        width: 2.5rem;
        height: 2.5rem;
        background: #2563eb;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
    }
    
    .user-details {
        flex: 1;
        min-width: 0;
        transition: opacity 0.3s ease;
    }
    
    .user-details.hidden {
        opacity: 0;
        width: 0;
        overflow: hidden;
    }
    
    .user-name {
        font-weight: 500;
        color: #111827;
        font-size: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .user-role {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: capitalize;
    }
    
    .user-menu-btn {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.2s;
    }
    
    .user-menu-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .dropdown-arrow {
        font-size: 0.75rem;
        transition: transform 0.2s;
    }
    
    .dropdown-arrow.up {
        transform: rotate(180deg);
    }
    
    /* User menu dropdown */
    .user-menu {
        position: absolute;
        bottom: 100%;
        left: 1.5rem;
        right: 1.5rem;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-bottom: 0.5rem;
        z-index: 10;
    }
    
    .user-menu-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        color: #374151;
        text-decoration: none;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.875rem;
    }
    
    .user-menu-item:hover {
        background: #f9fafb;
        color: #111827;
    }
    
    .user-menu-divider {
        height: 1px;
        background: #e5e7eb;
        margin: 0.25rem 0;
    }
    
    .logout-btn {
        color: #dc2626;
    }
    
    .logout-btn:hover {
        background: #fef2f2;
        color: #b91c1c;
    }
    
    .menu-icon {
        font-size: 1rem;
        width: 1rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .menu-icon svg {
        width: 1rem;
        height: 1rem;
    }
    
    /* Main content */
    .main-content {
        margin-left: 0;
        transition: margin-left 0.3s ease;
        min-height: 100vh;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    .main-content.sidebar-open {
        margin-left: 280px;
    }
    
    .main-content.sidebar-collapsed {
        margin-left: 70px;
    }
    

    
    /* Responsive design */
    @media (max-width: 768px) {
        .main-content.sidebar-open {
            margin-left: 0;
        }
        
        .main-content.sidebar-collapsed {
            margin-left: 0;
        }
        

        
        .sidebar {
            left: -100%;
            width: 100%;
        }
        
        .sidebar.open {
            left: 0;
        }
        
        .sidebar.collapsed {
            width: 100%;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-btn {
            display: none;
        }
        
        .sidebar {
            left: 0;
        }
        
        .main-content {
            margin-left: 280px;
        }
        
        .close-btn {
            display: none;
        }
    }
</style> 