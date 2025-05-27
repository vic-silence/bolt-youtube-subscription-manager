// Array of theme colors
const themeColors = [
  '#3B82F6', // blue
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#F97316', // orange
  '#10B981', // emerald
  '#14B8A6', // teal
  '#06B6D4', // cyan
  '#F59E0B', // amber
  '#EF4444', // red
  '#6366F1', // indigo
];

// Generate a random color from the theme colors
export const generateRandomColor = (): string => {
  return themeColors[Math.floor(Math.random() * themeColors.length)];
};

// Get a color for a theme name, consistently
export const getThemeColor = (themeName: string): string => {
  // Simple hash function to get a consistent index
  const hash = themeName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const index = Math.abs(hash) % themeColors.length;
  return themeColors[index];
};

// Get a contrasting text color (black or white) based on background color
export const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};