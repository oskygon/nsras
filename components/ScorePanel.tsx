import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScorePanelProps {
  score: number;
  totalOptions: number;
  completedOptions: number;
}

const getRiskLevel = (score: number) => {
  if (score >= 23) return { text: 'Sin riesgo', color: '#4CAF50' };
  if (score >= 21) return { text: 'Riesgo leve', color: '#FFC107' };
  if (score >= 16) return { text: 'Riesgo moderado', color: '#FF9800' };
  return { text: 'Riesgo alto', color: '#F44336' };
};

const ScorePanel = ({ score, totalOptions, completedOptions }: ScorePanelProps) => {
  const risk = getRiskLevel(score);
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleLabel}>Puntuación Actual</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={[styles.riskText, { color: risk.color }]}>{risk.text}</Text>
        <Text style={styles.progressText}>
          {completedOptions} de {totalOptions} categorías completadas
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressIndicator, 
            { 
              width: `${(completedOptions / totalOptions) * 100}%`, 
              backgroundColor: risk.color 
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    alignItems: 'center',
  },
  titleLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  riskText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 16,
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ScorePanel;