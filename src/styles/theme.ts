/**
 * College Management ERP - Theme Tokens
 * Inspired by CampusOne Student Portal reference design
 */

export const themeTokens = {
  colors: {
    sidebar: {
      background: '#0F172A',
      backgroundHover: '#1E293B',
      activeItem: '#1E293B',
      text: '#94A3B8',
      textActive: '#FFFFFF',
      border: '#1E293B',
    },
    canvas: {
      background: '#F8FAFC',
      card: '#FFFFFF',
      border: '#F1F5F9',
    },
    accents: {
      purple: {
        bg: '#F5F3FF',
        border: '#DDD6FE',
        header: '#E9D5FF',
        badge: '#7C3AED',
      },
      yellow: {
        bg: '#FFFBEB',
        border: '#FDE68A',
        header: '#FEF3C7',
        badge: '#D97706',
      },
      cyan: {
        bg: '#F0F9FF',
        border: '#BAE6FD',
        header: '#E0F2FE',
        badge: '#0284C7',
      },
      mint: {
        bg: '#F0FDF4',
        border: '#BBF7D0',
        header: '#DCFCE7',
        badge: '#16A34A',
      },
    },
    status: {
      completed: {
        bg: '#DCFCE7',
        text: '#15803D',
      },
      upcoming: {
        bg: '#E0F2FE',
        text: '#0369A1',
      },
      inProgress: {
        bg: '#F3E8FF',
        text: '#6B21A8',
      },
      notStarted: {
        bg: '#FFEDD5',
        text: '#C2410C',
      },
      notSubmitted: {
        bg: '#FEF3C7',
        text: '#B45309',
      },
    },
  },
} as const;

export default themeTokens;
