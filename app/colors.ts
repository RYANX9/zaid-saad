// =============================================================================
// COLORS.TS - Extended Creative Theme Palette Library
// =============================================================================

export type ThemeType =
  | 'dark'
  | 'cream'
  | 'retro'
  | 'midnight'
  | 'neon'
  | 'forest'
  | 'sakura'
  | 'cyberpunk'
  | 'sandstorm'
  | 'aqua'
  | 'royal'
  | 'mono'
  | 'sunset'
  | 'velvet'
  | 'ice';

export interface Theme {
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accentLight: string;
  accentDark: string;
}

export const themes: Record<ThemeType, Theme> = {
  dark: {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceHover: '#252525',
    border: '#2a2a2a',
    textPrimary: '#ffffff',
    textSecondary: '#d4d4d4',
    textTertiary: '#a3a3a3',
    accentLight: '#525252',
    accentDark: '#404040',
  },

  cream: {
    background: '#faf8f5',
    surface: '#f5f1eb',
    surfaceHover: '#ebe7e0',
    border: '#2a2a2a',
    textPrimary: '#2c2420',
    textSecondary: '#4a443f',
    textTertiary: '#6b6560',
    accentLight: '#c9c3bb',
    accentDark: '#b5afa7',
  },

  retro: {
    background: '#0e3b43',
    surface: '#14565f',
    surfaceHover: '#1b6b74',
    border: '#f28f3b',
    textPrimary: '#fdf3e7',
    textSecondary: '#e8d9c9',
    textTertiary: '#cdb8a4',
    accentLight: '#f7b267',
    accentDark: '#f4845f',
  },

  midnight: {
    background: '#0b132b',
    surface: '#1c2541',
    surfaceHover: '#3a506b',
    border: '#5bc0be',
    textPrimary: '#ffffff',
    textSecondary: '#d6e0f0',
    textTertiary: '#a9b7c6',
    accentLight: '#6fffe9',
    accentDark: '#38a3a5',
  },

  neon: {
    background: '#090014',
    surface: '#15002b',
    surfaceHover: '#1f0045',
    border: '#ff00c8',
    textPrimary: '#e0e0ff',
    textSecondary: '#bcbcff',
    textTertiary: '#9b9bff',
    accentLight: '#00f0ff',
    accentDark: '#ff007f',
  },

  forest: {
    background: '#0b2e13',
    surface: '#184d24',
    surfaceHover: '#246f34',
    border: '#b4d49b',
    textPrimary: '#f6fdf2',
    textSecondary: '#d0e7c2',
    textTertiary: '#a8cfa2',
    accentLight: '#b5d99c',
    accentDark: '#7ba870',
  },

  sakura: {
    background: '#fff1f3',
    surface: '#ffe4e9',
    surfaceHover: '#ffd1da',
    border: '#ffb6c1',
    textPrimary: '#2f1a1c',
    textSecondary: '#4a2a2c',
    textTertiary: '#7b5558',
    accentLight: '#ff88aa',
    accentDark: '#ff5c8a',
  },

  cyberpunk: {
    background: '#080808',
    surface: '#101010',
    surfaceHover: '#181818',
    border: '#ff0090',
    textPrimary: '#f2f2f2',
    textSecondary: '#cfcfcf',
    textTertiary: '#999999',
    accentLight: '#00ffe0',
    accentDark: '#ff00aa',
  },

  sandstorm: {
    background: '#fdf5e6',
    surface: '#f8e7c4',
    surfaceHover: '#f2d7a6',
    border: '#d1b272',
    textPrimary: '#3e2e1e',
    textSecondary: '#5a4630',
    textTertiary: '#7c6b56',
    accentLight: '#e4c380',
    accentDark: '#d39b46',
  },

  aqua: {
    background: '#e0f7fa',
    surface: '#b2ebf2',
    surfaceHover: '#80deea',
    border: '#4dd0e1',
    textPrimary: '#004d40',
    textSecondary: '#00695c',
    textTertiary: '#00796b',
    accentLight: '#26c6da',
    accentDark: '#00acc1',
  },

  royal: {
    background: '#0d1b2a',
    surface: '#1b263b',
    surfaceHover: '#415a77',
    border: '#778da9',
    textPrimary: '#e0e1dd',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    accentLight: '#a2c3ff',
    accentDark: '#4a6fa5',
  },

  mono: {
    background: '#ffffff',
    surface: '#f0f0f0',
    surfaceHover: '#e0e0e0',
    border: '#d4d4d4',
    textPrimary: '#111111',
    textSecondary: '#333333',
    textTertiary: '#555555',
    accentLight: '#999999',
    accentDark: '#777777',
  },

  sunset: {
    background: '#3b0a45',
    surface: '#5a189a',
    surfaceHover: '#7b2cbf',
    border: '#fcbf49',
    textPrimary: '#fff6e8',
    textSecondary: '#f3d9b1',
    textTertiary: '#e0b866',
    accentLight: '#f77f00',
    accentDark: '#d62828',
  },

  velvet: {
    background: '#1e0f1e',
    surface: '#3c1a3c',
    surfaceHover: '#542454',
    border: '#a44fa4',
    textPrimary: '#f5e1f5',
    textSecondary: '#d6b5d6',
    textTertiary: '#b984b9',
    accentLight: '#e05ee0',
    accentDark: '#b93eb9',
  },

  ice: {
    background: '#e6f7ff',
    surface: '#cceeff',
    surfaceHover: '#b3e5fc',
    border: '#81d4fa',
    textPrimary: '#022c43',
    textSecondary: '#03506f',
    textTertiary: '#2f89fc',
    accentLight: '#4fc3f7',
    accentDark: '#0288d1',
  },
};

// The full theme cycle for rotation:
export const themeCycle: ThemeType[] = [
  'dark',
  'cream',
  'retro',
  'midnight',
  'neon',
  'forest',
  'sakura',
  'cyberpunk',
  'sandstorm',
  'aqua',
  'royal',
  'mono',
  'sunset',
  'velvet',
  'ice',
];
