import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import { router } from 'expo-router';
import { useScoreStore } from '../stores/scoreStore';

interface Option {
  id: number;
  title: string;
  value: number;
  description?: string;
}

const optionsData: Record<string, Option[]> = {
    cfg: [
        { id: 1, title: 'EG ≤ 28 semanas', value: 1 , description: ''},
        { id: 2, title: 'EG > 28 ≤ 33 semanas ', value: 2 , description: ''},
        { id: 3, title: 'EG > 33 ≤ 38 semanas', value: 3 , description: ''},
        { id: 4, title: 'EG > 38 semanas hasta postérmino', value: 4 , description: ''},
      ],
      e_mental: [
        { id: 1, title: 'Completamente limitada', value: 1 , description: 'No responde a estímulos dolorosos, no se estremece ni aprieta los puños, ni gime ni aumenta la tensión arterial o la frecuencia cardíaca, debido a una disminución del nivel de conciencia o a sedación.'},
        { id: 2, title: 'Muy limitada', value: 2, description: 'Responde únicamente a estímulos dolorosos (se estremece, aprieta los puños, gime, aumenta la tensión arterial o la frecuencia cardíaca).' },
        { id: 3, title: 'Ligeramente limitada', value: 3, description: 'Letárgico'},
        { id: 4, title: 'Sin alteración', value: 4 , description: 'Limitado/a a la cama.'},
      ],
    mobility: [
      { id: 1, title: 'Completamente inmóvil', value: 1, description: 'No es capaz de realizar ni siquiera pequeños cambios en la posición del cuerpo o de las extremidades sin ayuda.Ej: Relajante muscular.' },
      { id: 2, title: 'Muy limitado', value: 2 , description: 'Ocasionalmente realiza pequeños cambios en la posición del cuerpo o de las extremidades, pero es incapaz de realizar cambios frecuentes o de forma independiente.'},
      { id: 3, title: 'Ligeramente limitado', value: 3 , description: 'Frecuentemente realiza pequeños cambios en la posición del cuerpo o las extremidades de forma independiente.'},
      { id: 4, title: 'Sin limitaciones', value: 4 , description: 'Realiza cambios importantes en la posición del cuerpo, con frecuencia y sin ayuda. Ej:girar la cabeza.'},
    ],
    activity: [
      { id: 1, title: 'Completamente encamado', value: 1, description: 'En servocuna en cuidados intensivos.' },
      { id: 2, title: 'Encamado', value: 2 , description: 'En incubadora de doble pared en cuidados intensivos.'},
      { id: 3, title: 'Ligeramente limitada', value: 3 , description: 'En incubadora de pared simple o doble en cuidados intermedios.'},
      { id: 4, title: 'Sin limitaciones', value: 4 , description: 'En una cuna abierta.'},
    ],
    nutrition: [
      { id: 1, title: 'Muy deficiente', value: 1 , description: 'Ayunado y/o con líquidos intravenosos (NPT, PHP).'},
      { id: 2, title: 'Inadecuada', value: 2 , description: 'Recibe menos de la cantidad óptima de dieta líquida para crecer (Leche humana, leche de formula) y/o complementada con líquidos intravenosos (NPT, PHP).'},
      { id: 3, title: 'Adecuada', value: 3 , description: 'Alimentación por sonda (enteral) que cumple con las necesidades nutricionales para el crecimiento.'},
      { id: 4, title: 'Excelente', value: 4 , description: 'Alimentación con pecho/biberón en cada toma que cumple con los requerimientos nutricionales para el crecimiento.'},
    ],
    humidity: [
      { id: 1, title: 'Constantemente húmeda', value: 1 , description: 'La piel está mojada/húmeda cada vez que se mueve o gira al neonato.'},
      { id: 2, title: 'Muy húmeda', value: 2 , description: 'La piel está húmeda con frecuencia, pero no siempre. Las sábanas deben cambiarse al menos tres veces al día.'},
      { id: 3, title: 'Ocasionalmente húmeda', value: 3 , description: 'La piel está húmeda de manera ocasional. Requiere un cambio adicional de sábanas aproximadamente una vez por día.'},
      { id: 4, title: 'Raramente húmeda', value: 4 , description: 'La piel está habitualmente seca. Se requiere un cambio de sábanas solo cada 24 horas'},
    ],
  
};

const OptionsScreen = ({ title,  category }: { title: string, category: string }) => {
  const { setScore, scores } = useScoreStore();
  const options = optionsData[category] || [];

  const handleSelect = (value: number) => {
    const isComplete = setScore(category, value);
    if (isComplete) {
      router.replace({
        pathname: '/(tabs)',
        params: { showModal: 'true', timestamp: Date.now() }
      });
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              scores[category] === option.value && styles.selectedOption
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                scores[category] === option.value && styles.selectedOptionText
              ]}
            >
              {option.title}
            </Text>
            <Text style={styles.optionDescription}>
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C1F7A',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#219B9D',
  },
  selectedOption: {
    backgroundColor: '#219B9D',
  },
  optionText: {
    fontSize: 16,
    color: '#FF7849',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  optionDescription: {
    fontSize: 14,
    color: '#898121',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default OptionsScreen;