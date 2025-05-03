import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function TextEditorScreen({ route, navigation }) {
  const { filePath } = route.params;
  const [text, setText] = useState('');

  useEffect(() => {
    FileSystem.readAsStringAsync(filePath).then(setText);
  }, []);

  const handleSave = async () => {
    await FileSystem.writeAsStringAsync(filePath, text);
    Alert.alert('Збережено', 'Зміни у файлі збережено успішно');
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <Button title="💾 Зберегти" onPress={handleSave} />
      <TextInput
        multiline
        value={text}
        onChangeText={setText}
        style={styles.textBox}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: 16 },
  textBox: {
    flex: 1,
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 12,
    marginTop: 10,
    fontSize: 16,
    borderRadius: 8,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
});
