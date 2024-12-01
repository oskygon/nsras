import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '../../components/HomeStyles';
import ScoreModal from '../../components/ScoreModal';
import ScorePanel from '../../components/ScorePanel';
import { useScoreStore } from '../../stores/scoreStore';


export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { totalScore, scores, resetScores } = useScoreStore();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.showModal === 'true' && params.timestamp) {
      setModalVisible(true);
    }
  }, [params.showModal, params.timestamp]);

  const handleNavigateToOptions = (title: string, category: string) => {
    router.push({
      pathname: '/options',
      params: { title, category }
    });
  };

  const handleShowScore = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleReset = () => {
    resetScores();
    setModalVisible(false);
  };

  const isAllCategoriesScored = () => {
    const requiredCategories = ['cfg','e_mental','mobility', 'activity', 'nutrition', 'humidity'];
    return requiredCategories.every(category => scores[category] !== undefined);
  };

  const hasAnyScore = () => {
    return Object.keys(scores).length > 0;
  };

  const getTotalCategories = () => 6;
  const getCompletedCategories = () => Object.keys(scores).length;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ESCALA NSRAS</Text>
      {/* <Text style={styles.sectionTitle}>Evaluación riesgo de lesiones de la piel </Text> */}
        <Text style={styles.headerSubtitle}>Desde el nacimiento hasta 30 días</Text>
        
        {hasAnyScore() && !isAllCategoriesScored() && (
          <TouchableOpacity 
            style={styles.resetButtonHeader} 
            onPress={handleReset}
          >
            <Text style={styles.resetButtonHeaderText}>Reiniciar Evaluación</Text>
          </TouchableOpacity>
        )}
      </View>

      {hasAnyScore() && (
        <ScorePanel
          score={totalScore}
          totalOptions={getTotalCategories()}
          completedOptions={getCompletedCategories()}
        />
      )}

      <View style={styles.section}>
        


        <TouchableOpacity 
          style={[
            styles.button,
            scores['cfg'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Condición física general', 'cfg')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="weight-lifter" size={24} color={scores['cfg'] ? "#FFFFFF" : "#347928"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['cfg'] ? styles.scoredButtonText : null
              ]}>
                Condición física general {scores['cfg'] ? `(${scores['cfg']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['cfg'] ? styles.scoredButtonDescription : null
              ]}>
                Condición física general
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.button,
            scores['e_mental'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Estado mental', 'e_mental')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="brain" size={24} color={scores['e_mental'] ? "#FFFFFF" : "#EB5B00"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['e_mental'] ? styles.scoredButtonText : null
              ]}>
                Estado mental {scores['e_mental'] ? `(${scores['e_mental']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['e_mental'] ? styles.scoredButtonDescription : null
              ]}>
                Estado mental
              </Text>
            </View>
          </View>
        </TouchableOpacity>



        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['mobility'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Movilidad', 'mobility')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="run-fast" size={24} color={scores['mobility'] ? "#FFFFFF" : "#219B9D"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['mobility'] ? styles.scoredButtonText : null
              ]}>
                Movilidad {scores['mobility'] ? `(${scores['mobility']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['mobility'] ? styles.scoredButtonDescription : null
              ]}>
                Capacidad para cambiar y controlar la posición del cuerpo
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['activity'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Actividad', 'activity')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="human-handsup" size={24} color={scores['activity'] ? "#FFFFFF" : "#22177A"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['activity'] ? styles.scoredButtonText : null
              ]}>
                Actividad {scores['activity'] ? `(${scores['activity']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['activity'] ? styles.scoredButtonDescription : null
              ]}>
                Nivel de actividad física y frecuencia de movimientos
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        
      

      
            <TouchableOpacity 
              style={[
                styles.button,
                scores['nutrition'] ? styles.scoredButton : null
              ]}
              onPress={() => handleNavigateToOptions('Nutrición', 'nutrition')}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons name="baby-bottle" size={24} color={scores['nutrition'] ? "#FFFFFF" : "#FCCD2A"} />
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.buttonText,
                    scores['nutrition'] ? styles.scoredButtonText : null
                  ]}>
                    Nutrición {scores['nutrition'] ? `(${scores['nutrition']})` : ''}
                  </Text>
                  <Text style={[
                    styles.buttonDescription,
                    scores['nutrition'] ? styles.scoredButtonDescription : null
                  ]}>
                    Patrón habitual de consumo alimentario
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['humidity'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Humedad', 'humidity')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="water" size={24} color={scores['humidity'] ? "#FFFFFF" : "#00CED1"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['humidity'] ? styles.scoredButtonText : null
              ]}>
                Humedad {scores['humidity'] ? `(${scores['humidity']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['humidity'] ? styles.scoredButtonDescription : null
              ]}>
                Nivel de exposición de la piel a la humedad
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        
        
        

        {isAllCategoriesScored() && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity 
              style={styles.showScoreButton} 
              onPress={handleShowScore}
            >
              <Text style={styles.showScoreButtonText}>Ver Puntuación</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reiniciar Evaluación</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScoreModal 
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        score={totalScore}
      />
    </ScrollView>
  );
}