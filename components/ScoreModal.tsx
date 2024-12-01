import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert, Keyboard } from 'react-native';
import { useScoreStore } from '../stores/scoreStore';



interface ScoreModalProps {
  isVisible: boolean;
  onClose: () => void;
  score: number;
}

const getRiskLevel = (score: number) => {
  if (score >= 23) return { text: 'Sin riesgo', color: '#4CAF50' };
  if (score >= 21) return { text: 'Riesgo leve', color: '#FFC107' };
  if (score >= 16) return { text: 'Riesgo moderado', color: '#FF9800' };
  return { text: 'Riesgo alto', color: '#F44336' };
};

const optionTitles: Record<string, string> = {
  cfg: 'Condición física general',
  e_mental: 'Estado mental',
  mobility: 'Movilidad',
  activity: 'Actividad',
  nutrition: 'Nutrición',
  humidity: 'Humedad'
};

const ScoreModal = ({ isVisible, onClose, score }: ScoreModalProps) => {
  const [showPatientData, setShowPatientData] = useState(false);
  const [patientData, setPatientData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    diagnosis: '',
    gestationalAge: '',
    daysOfLife: ''
  });
  const [dataSent, setDataSent] = useState(false);
  const { scores } = useScoreStore();
  const risk = getRiskLevel(score);
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const validateFields = () => {
    const fields = [
      { name: 'ID del Paciente', value: patientData.id },
      { name: 'Nombre', value: patientData.firstName },
      { name: 'Apellido', value: patientData.lastName },
      { name: 'Diagnóstico', value: patientData.diagnosis },
      { name: 'Edad gestacional', value: patientData.gestationalAge },
      { name: 'Días de vida', value: patientData.daysOfLife }
    ];

    const emptyFields = fields.filter(field => !field.value.trim());
    if (emptyFields.length > 0) {
      Alert.alert(
        'Campos incompletos',
        `Por favor complete los siguientes campos:\n${emptyFields.map(f => `- ${f.name}`).join('\n')}`,
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!dataSent) {
      setShowPatientData(true);
    } else {
      Alert.alert(
        'Datos ya enviados',
        'Los datos de esta evaluación ya fueron guardados.',
        [{ text: 'OK', onPress: onClose }]
      );
    }
  };

  const handleBack = () => {
    setShowPatientData(false);
  };

  const handleSendData = () => {
    if (dataSent) {
      Alert.alert(
        'Datos ya enviados',
        'Los datos de esta evaluación ya fueron guardados.',
        [{ text: 'OK', onPress: onClose }]
      );
      return;
      Keyboard.dismiss();
    }

    if (!validateFields()) {
      return;
    }

    // Aquí iría la lógica para enviar los datos
    console.log('Enviando datos...', {
      patientData,
      scores,
      totalScore: score,
      riskLevel: risk.text,
      evaluationDate: currentDate
    });

    setDataSent(true);
    Alert.alert(
      'Éxito',
      'Los datos han sido guardados correctamente.',
      [{ text: 'OK', onPress: onClose }]
    );
  };

  const renderScoreSummary = () => (
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Evaluación Completa</Text>
      
      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>Puntuación Total</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={styles.scoreMax}>de 24 puntos</Text>
      </View>

      <View style={styles.riskSection}>
        <Text style={styles.riskLabel}>Nivel de Riesgo</Text>
        <Text style={[styles.riskValue, { color: risk.color }]}>{risk.text}</Text>
      </View>

      <Text style={styles.question}>¿Desea guardar estos datos?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.sendButton]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPatientDataForm = () => (
    <ScrollView style={styles.formScrollView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Datos del Paciente</Text>
        
        <Text style={styles.dateText}>Fecha de evaluación: {currentDate}</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ID del Paciente *</Text>
            <TextInput
              style={styles.input}
              value={patientData.id}
              onChangeText={(text) => setPatientData({...patientData, id: text})}
              placeholder="Ingrese ID"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre *</Text>
            <TextInput
              style={styles.input}
              value={patientData.firstName}
              onChangeText={(text) => setPatientData({...patientData, firstName: text})}
              placeholder="Ingrese nombre"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Apellido *</Text>
            <TextInput
              style={styles.input}
              value={patientData.lastName}
              onChangeText={(text) => setPatientData({...patientData, lastName: text})}
              placeholder="Ingrese apellido"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Diagnóstico *</Text>
            <TextInput
              style={styles.input}
              value={patientData.diagnosis}
              onChangeText={(text) => setPatientData({...patientData, diagnosis: text})}
              placeholder="Ingrese diagnóstico"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Edad gestacional *</Text>
              <TextInput
                style={styles.input}
                value={patientData.gestationalAge}
                onChangeText={(text) => setPatientData({...patientData, gestationalAge: text})}
                placeholder="Semanas"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Días de vida *</Text>
              <TextInput
                style={styles.input}
                value={patientData.daysOfLife}
                onChangeText={(text) => setPatientData({...patientData, daysOfLife: text})}
                placeholder="Días"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.selectedOptionsContainer}>
            <Text style={styles.selectedOptionsTitle}>Resumen de la Evaluación:</Text>
            <Text style={styles.totalScore}>Puntaje: {score} puntos</Text>
            <Text style={[styles.riskLevel, { color: risk.color }]}>
              Nivel de Riesgo: {risk.text}
            </Text>
            <Text style={styles.selectedOptionsSubtitle}>Opciones Seleccionadas:</Text>
            {Object.entries(scores).map(([category, value]) => (
              <Text key={category} style={styles.selectedOption}>
                {optionTitles[category]}: {value}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.sendButton]}
            onPress={handleSendData}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        {!showPatientData ? renderScoreSummary() : renderPatientDataForm()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formScrollView: {
    flex: 1,
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  scoreMax: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  riskSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  riskLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  riskValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  inputGroup: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  selectedOptionsContainer: {
    width: '100%',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  selectedOptionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 12,
  },
  totalScore: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  riskLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedOptionsSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 8,
  },
  selectedOption: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    minWidth: 120,
  },
  sendButton: {
    backgroundColor: '#3498DB',
  },
  closeButton: {
    backgroundColor: '#F44336',
  },
  backButton: {
    backgroundColor: '#666666',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ScoreModal;