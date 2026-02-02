/**
 * Admin utilities for god mode access
 * Provides unrestricted access to all features for admin users
 */

const ADMIN_EMAILS = ['mhmmadridho64@gmail.com'];

/**
 * Check if an email belongs to an admin user
 */
export function isAdmin(email?: string | null): boolean {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Get effective subscription plan with admin override
 * Admin users always get 'exclusive' tier access
 */
export function getEffectivePlan(
    userPlan: string,
    userEmail?: string | null
): string {
    return isAdmin(userEmail) ? 'exclusive' : userPlan;
}

/**
 * Check if user has access to a specific tier
 */
export function hasTierAccess(
    requiredTier: 'free' | 'basic' | 'premium' | 'exclusive',
    userPlan: string,
    userEmail?: string | null
): boolean {
    // Admin always has access
    if (isAdmin(userEmail)) return true;

    const tierHierarchy = {
        free: 0,
        basic: 1,
        premium: 2,
        exclusive: 3
    };

    return tierHierarchy[userPlan as keyof typeof tierHierarchy] >=
        tierHierarchy[requiredTier];
}
