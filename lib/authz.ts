export const hasAnyRole = (roles: string[] | undefined, allowed: string[]) => roles?.some(r=>allowed.includes(r)) ?? false;
