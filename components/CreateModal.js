import React, { useState } from 'react';
import { Modal, View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CreateModal({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('dir');

  const handleCreate = () => {
    if (title.trim()) {
      onSubmit(title.trim(), type);
      setTitle('');
      setType('dir');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <TextInput
            placeholder="Назва"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <View style={styles.toggle}>
            <TouchableOpacity onPress={() => setType('dir')}>
              <Text style={type === 'dir' ? styles.selected : styles.normal}>📁 Папка</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType('file')}>
              <Text style={type === 'file' ? styles.selected : styles.normal}>📄 Файл</Text>
            </TouchableOpacity>
          </View>
          <Button title="Створити" onPress={handleCreate} />
          <Button title="Скасувати" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  dialog: { backgroundColor: '#fff', padding: 20, margin: 20, borderRadius: 12 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  toggle: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  selected: { fontWeight: 'bold', color: '#007aff' },
  normal: { color: 'gray' },
});
