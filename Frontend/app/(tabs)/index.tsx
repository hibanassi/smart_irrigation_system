import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'http://192.168.11.110:8080';

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);

  const loadData = async () => {
    try {
      const sensorResponse = await fetch(
        `${API_URL}/api/sensor/latest`
      );
      const sensorJson = await sensorResponse.json();
      setSensorData(sensorJson);

      const configResponse = await fetch(
        `${API_URL}/api/config`
      );
      const configJson = await configResponse.json();
      setConfig(configJson);
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible de se connecter au serveur.'
      );
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendCommand = async (endpoint: string) => {
    try {
      await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
      });

      loadData();
    } catch (error) {
      Alert.alert('Erreur', 'Commande non envoyée.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        🌱 Système d'Irrigation
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          🌡 Température
        </Text>

        <Text style={styles.value}>
          {sensorData?.temperature ?? '--'} °C
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          💧 Humidité du sol
        </Text>

        <Text style={styles.value}>
          {sensorData?.soilMoisture ?? '--'} %
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          🚰 Pompe
        </Text>

        <Text style={styles.value}>
          {config?.pumpStatus ?? '--'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          🔄 Mode automatique
        </Text>

        <Text style={styles.value}>
          {config?.autoMode ? 'Activé' : 'Désactivé'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.onButton]}
        onPress={() => sendCommand('/api/pump/on')}>
        <Text style={styles.buttonText}>
          Allumer la pompe
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.offButton]}
        onPress={() => sendCommand('/api/pump/off')}>
        <Text style={styles.buttonText}>
          Éteindre la pompe
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.autoButton]}
        onPress={() =>
          sendCommand('/api/auto/enable')
        }>
        <Text style={styles.buttonText}>
          Activer Auto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.manualButton]}
        onPress={() =>
          sendCommand('/api/auto/disable')
        }>
        <Text style={styles.buttonText}>
          Désactiver Auto
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    color: '#666',
  },

  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  button: {
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },

  onButton: {
    backgroundColor: '#4CAF50',
  },

  offButton: {
    backgroundColor: '#F44336',
  },

  autoButton: {
    backgroundColor: '#2196F3',
  },

  manualButton: {
    backgroundColor: '#FF9800',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});