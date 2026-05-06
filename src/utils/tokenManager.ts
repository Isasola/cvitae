// Token Manager - Handles recruiter token validation and Pro features
// Tokens are stored in localStorage and validated against a simple pattern

export interface TokenData {
  token: string;
  plan: "starter" | "pro";
  expiresAt: number;
  cvBatch: number; // Number of CV batches used
  maxBatches: number; // Max allowed batches
}

const STORAGE_KEY = "cvitae_recruiter_token";
const TOKEN_PATTERN = /^CVT-[A-Z0-9]{16}$/; // Format: CVT-XXXXXXXXXXXXXXXX

// Demo tokens for testing (valid for 24 hours)
const DEMO_TOKENS = {
  starter: "CVT-STARTER1234567", // 1 batch of 30 CVs
  pro: "CVT-PRO1234567890AB", // Unlimited batches
};

export const tokenManager = {
  // Generate a token (for admin/backend use)
  generateToken: (plan: "starter" | "pro"): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "CVT-";
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  },

  // Validate token format
  isValidTokenFormat: (token: string): boolean => {
    return TOKEN_PATTERN.test(token);
  },

  // Save token to localStorage
  saveToken: (token: string, plan: "starter" | "pro"): boolean => {
    if (!tokenManager.isValidTokenFormat(token)) {
      return false;
    }

    const tokenData: TokenData = {
      token,
      plan,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      cvBatch: 0,
      maxBatches: plan === "pro" ? 999 : 1, // Starter: 1 batch, Pro: unlimited
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokenData));
    return true;
  },

  // Get stored token
  getToken: (): TokenData | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      const tokenData: TokenData = JSON.parse(stored);

      // Check if expired
      if (tokenData.expiresAt < Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return tokenData;
    } catch {
      return null;
    }
  },

  // Check if user has valid token
  hasValidToken: (): boolean => {
    return tokenManager.getToken() !== null;
  },

  // Get token plan
  getTokenPlan: (): "starter" | "pro" | null => {
    const token = tokenManager.getToken();
    return token ? token.plan : null;
  },

  // Check if Pro plan
  isProPlan: (): boolean => {
    return tokenManager.getTokenPlan() === "pro";
  },

  // Check if can upload batch
  canUploadBatch: (): boolean => {
    const tokenData = tokenManager.getToken();
    if (!tokenData) return false;

    return tokenData.cvBatch < tokenData.maxBatches;
  },

  // Increment batch count
  incrementBatchCount: (): boolean => {
    const tokenData = tokenManager.getToken();
    if (!tokenData || !tokenManager.canUploadBatch()) {
      return false;
    }

    tokenData.cvBatch += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokenData));
    return true;
  },

  // Get remaining batches
  getRemainingBatches: (): number => {
    const tokenData = tokenManager.getToken();
    if (!tokenData) return 0;

    return tokenData.maxBatches - tokenData.cvBatch;
  },

  // Clear token
  clearToken: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Use demo token for testing
  useDemoToken: (plan: "starter" | "pro"): void => {
    const token = DEMO_TOKENS[plan];
    tokenManager.saveToken(token, plan);
  },

  // Get token expiration date
  getExpirationDate: (): Date | null => {
    const tokenData = tokenManager.getToken();
    return tokenData ? new Date(tokenData.expiresAt) : null;
  },

  // Get days remaining
  getDaysRemaining: (): number => {
    const expirationDate = tokenManager.getExpirationDate();
    if (!expirationDate) return 0;

    const daysMs = expirationDate.getTime() - Date.now();
    return Math.ceil(daysMs / (1000 * 60 * 60 * 24));
  },
};

export default tokenManager;
