import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

export default function InfoModal({ visible, onClose, entry }) {
  if (!entry) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.bg}>
        <View style={styles.box}>
          <Text style={styles.title}>Деталі</Text>
          <Text>Назва: {entry.name}</Text>
          <Text>Тип: {entry.isFolder ? 'Папка' : 'Файл'}</Text>
          <Text>Розмір: {entry.size} Б</Text>
          <Text>Дата: {new Date(entry.mod * 1000).toLocaleString()}</Text>
          <Button title="Закрити" onPress={onClose} />
          <Button title="Видалити" color="red" onPress={() => {
            onClose();
            entry.onDelete?.();
          }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  box: { backgroundColor: '#fff', padding: 20, margin: 20, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
});
