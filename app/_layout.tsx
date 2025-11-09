import React, { useEffect, useState } from 'react';
import { Modal, NativeEventEmitter, NativeModules, Text, TouchableOpacity, View } from 'react-native';

export default function ScamAlertListener() {
  const [scamUrl, setScamUrl] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Correct emitter source
    const eventEmitter = new NativeEventEmitter(NativeModules.DeviceEventManagerModule);
    const sub = eventEmitter.addListener('ScamUrlDetected', (data) => {
      console.log('🚨 Scam URL Detected:', data);
      setScamUrl(data.url);
    });

    return () => sub.remove();
  }, []);

  return (
    <Modal visible={!!scamUrl} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            width: '80%',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red', marginBottom: 10 }}>
            ⚠️ Scam URL Detected!
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>{scamUrl}</Text>
          <TouchableOpacity
            onPress={() => setScamUrl(null)}
            style={{
              backgroundColor: '#f33',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
