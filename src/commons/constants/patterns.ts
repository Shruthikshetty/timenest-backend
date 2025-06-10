/**
 * @file Holds reusable validation regex patterns for the application.
 */

export const Patterns = {
  /**
   * Email validation pattern.
   * - Allows most valid email addresses (RFC 5322 compliant for most practical cases).
   * - Example: user@example.com
   */
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
