import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface EvaluationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

// Reemplaza REEL_ID con el ID de tu Reel de Instagram
const REEL_ID = 'TU_ID_DEL_REEL';
const CONTENT_URL = `https://www.instagram.com/reel/${'CxyzABCdefGHI'}/embed`;
const REDIRECT_URL = `https://www.instagram.com/reel/${'CxyzABCdefGHI'}`;

// HTML personalizado para mejorar la visualización del Reel
const CUSTOM_HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <style>
        body { margin: 0; padding: 0; background: black; }
        .instagram-media {
          max-width: 100% !important;
          width: 100% !important;
          min-width: auto !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      </style>
    </head>
    <body>
      <blockquote 
        class="instagram-media" 
        data-instgrm-permalink="${REDIRECT_URL}"
        data-instgrm-version="14"
      >
      </blockquote>
      <script async src="https://www.instagram.com/embed.js"></script>
    </body>
  </html>
`;

const EvaluationModal = ({ isVisible, onClose }: EvaluationModalProps) => {
  const handleRedirect = async () => {
    try {
      await Linking.openURL(REDIRECT_URL);
      onClose();
    } catch (error) {
      console.error('Error al abrir Instagram:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.webViewContainer}>
            <WebView
              source={{ html: CUSTOM_HTML }}
              style={styles.webView}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.redirectButton]}
              onPress={handleRedirect}
            >
              <Text style={styles.buttonText}>Ver en Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webViewContainer: {
    width: '100%',
    height: 600,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  webView: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    minWidth: 120,
  },
  redirectButton: {
    backgroundColor: '#4C4B16',
  },
  closeButton: {
    backgroundColor: '#666666',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default EvaluationModal;