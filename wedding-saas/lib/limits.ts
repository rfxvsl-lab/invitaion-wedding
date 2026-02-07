
export const GUEST_LIMITS = {
    free: 20,
    basic: 100,
    premium: 500,
    exclusive: 1000
};

export const getGuestLimit = (tier: string): number => {
    return GUEST_LIMITS[tier as keyof typeof GUEST_LIMITS] || GUEST_LIMITS.free;
};
