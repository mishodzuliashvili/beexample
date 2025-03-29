import "server-only";
import { getUser } from "./auth";
interface RateLimitOptions {
    windowMs: number;
    maxRequests: number;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5, // 5 requests per minute
};

export type RateLimitInfo = {
    remaining: number;
    resetInMs: number;
    isLimited: boolean;
    options: RateLimitOptions;
};

export function createRateLimitInfoSA(rateLimitter: any) {
    return async () => {
        try {
            // Get the authenticated user
            const currentUser = await getUser({});
            if (!currentUser) {
                return {
                    success: false,
                    error: "Not authenticated",
                };
            }

            const limitInfo = rateLimitter.getRateLimitInfo(currentUser.id);

            return {
                success: true,
                limitInfo,
            };
        } catch (error) {
            console.error("Failed to get rate limit info:", error);

            return {
                success: false,
                error: "Failed to get rate limit information",
            };
        }
    };
}

/**
 * Creates a standalone rate limiter with its own independent storage
 */
export function createRateLimiter(options: RateLimitOptions = DEFAULT_OPTIONS) {
    // Each rate limiter has its own independent map
    const rateLimitMap = new Map<
        string,
        { count: number; timestamp: number }
    >();

    return {
        /**
         * Check if the specified user is rate limited
         */
        check: (userId: string): boolean => {
            const now = Date.now();
            const userRateLimit = rateLimitMap.get(userId);

            if (!userRateLimit) {
                rateLimitMap.set(userId, { count: 1, timestamp: now });
                return false;
            }

            // Reset counter if window has passed
            if (now - userRateLimit.timestamp > options.windowMs) {
                rateLimitMap.set(userId, { count: 1, timestamp: now });
                return false;
            }

            // Increment counter
            // Hmmm think about this
            userRateLimit.count += 1;
            rateLimitMap.set(userId, userRateLimit);

            // Check if over limit
            return userRateLimit.count > options.maxRequests;
        },

        /**
         * Get complete rate limit information for a user
         */
        getRateLimitInfo: (userId: string): RateLimitInfo => {
            const now = Date.now();
            const userRateLimit = rateLimitMap.get(userId);

            if (!userRateLimit) {
                return {
                    remaining: options.maxRequests,
                    resetInMs: 0,
                    isLimited: false,
                    options,
                };
            }

            const timeElapsed = now - userRateLimit.timestamp;

            // If window has passed
            if (timeElapsed >= options.windowMs) {
                return {
                    remaining: options.maxRequests,
                    resetInMs: 0,
                    isLimited: false,
                    options,
                };
            }

            const remaining = Math.max(
                0,
                options.maxRequests - userRateLimit.count
            );
            const resetInMs = options.windowMs - timeElapsed;

            return {
                remaining,
                resetInMs,
                isLimited: remaining <= 0,
                options,
            };
        },
    };
}
