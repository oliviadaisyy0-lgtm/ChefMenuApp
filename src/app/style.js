

import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#F5EBE0',
  accent: '#C026D3',
  textDark: '#3B2A20',
  textMuted: '#7A6A5D',
  cardBackground: '#FFFFFF',
  pillActiveBg: '#3B2A20',
  pillActiveText: '#FFFFFF',
  pillInactiveBg: '#FFFFFF',
  pillInactiveText: '#3B2A20',
  badgeBorder: '#C026D3',
  badgeText: '#C026D3',
  primaryButton: '#3B2A20',
  border: '#E8DFD3',
  required: '#D62828',
  successBg: '#E7F7EA',
  successBorder: '#2E9E4A',
  successText: '#1E7A34',
  placeholder: '#B4A99B',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background,
  },

  headerContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 8,
  },
  chefHatImage: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  completeMenuText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 14,
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: COLORS.pillInactiveBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabPillActive: {
    backgroundColor: COLORS.pillActiveBg,
    borderColor: COLORS.pillActiveBg,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.pillInactiveText,
  },
  tabPillTextActive: {
    color: COLORS.pillActiveText,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.textDark,
    marginHorizontal: 20,
    marginBottom: 10,
    opacity: 0.4,
  },
  activeFilterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginLeft: 20,
    marginBottom: 8,
  },

  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.successBg,
    borderWidth: 1,
    borderColor: COLORS.successBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 20,
    marginBottom: 12,
  },
  successBannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.successText,
    marginLeft: 6,
  },

  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    minHeight: 0,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyMessage: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 30,
  },

  menuCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuCardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
    paddingRight: 8,
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  menuItemDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 18,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: COLORS.badgeBorder,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  courseBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.badgeText,
  },

  addButtonWrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },
  addButton: {
    backgroundColor: COLORS.primaryButton,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  addScreenContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },
  addScreenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.textDark,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: COLORS.required,
  },
  multilineInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  pickerWrapperError: {
    borderColor: COLORS.required,
  },
  errorText: {
    color: COLORS.required,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: COLORS.primaryButton,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: COLORS.textDark,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '700',
  },
});

export { COLORS };
export default styles;