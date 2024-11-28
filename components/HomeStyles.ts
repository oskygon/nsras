import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F7FF',
  },
  header: {
    padding: 24,
    paddingTop: isSmallDevice ? 40 : 48,
    marginBottom: 20,
    backgroundColor: '#2C3E50',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 28 : 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: isSmallDevice ? 15 : 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  resetButtonHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  resetButtonHeaderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    transform: [{ scale: 1 }],
  },
  scoredButton: {
    backgroundColor: '#2C3E50',
    borderColor: '#2C3E50',
    transform: [{ scale: 1.02 }],
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C3E50',
    letterSpacing: 0.3,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    lineHeight: 18,
  },
  scoredButtonText: {
    color: '#FFFFFF',
  },
  scoredButtonDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  bottomButtonsContainer: {
    marginTop: 32,
    gap: 14,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  showScoreButton: {
    backgroundColor: '#3498DB',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  showScoreButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resetButton: {
    backgroundColor: '#E74C3C',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  categoryIconCfg: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  categoryIconEMental: {
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
  },
  categoryIconMobility: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
  },
  categoryIconActivity: {
    backgroundColor: 'rgba(241, 196, 15, 0.1)',
  },
  categoryIconNutrition: {
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
  },
  categoryIconHumidity: {
    backgroundColor: 'rgba(52, 73, 94, 0.1)',
  },
  scoreIndicator: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  scoreIndicatorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  scoredScoreIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  scoredScoreIndicatorText: {
    color: '#FFFFFF',
  },
});