import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import CreateModal from '../components/CreateModal';
import InfoModal from '../components/InfoModal';

const ROOT = FileSystem.documentDirectory + 'MacFolder/';

export default function HomeScreen({ navigation }) {
  const [currentPath, setCurrentPath] = useState(ROOT);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    const init = async () => {
      const dirInfo = await FileSystem.getInfoAsync(ROOT);
      if (!dirInfo.exists) await FileSystem.makeDirectoryAsync(ROOT, { intermediates: true });
      updateList(ROOT);
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      setStorage({ total, free, used: total - free });
    };
    init();
  }, []);

  const updateList = async (path) => {
    setCurrentPath(path);
    const dirContent = await FileSystem.readDirectoryAsync(path);
    setItems(dirContent);
  };

  const openEntry = async (name) => {
    const full = currentPath + name;
    const info = await FileSystem.getInfoAsync(full);
    if (info.isDirectory) updateList(full + '/');
    else if (name.endsWith('.txt')) navigation.navigate('TextEditor', { filePath: full });
  };

  const goUp = () => {
    if (currentPath !== ROOT) {
      const parent = currentPath.split('/').slice(0, -2).join('/') + '/';
      updateList(parent);
    }
  };

  const handleDelete = (name) => {
    Alert.alert('Видалення', `Видалити "${name}"?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'OK', onPress: async () => {
          const full = currentPath + name;
          const info = await FileSystem.getInfoAsync(full);
          await FileSystem.deleteAsync(info.isDirectory ? full + '/' : full, { idempotent: true });
          updateList(currentPath);
        }
      }
    ]);
  };

  const showInfo = async (name) => {
    const full = currentPath + name;
    const info = await FileSystem.getInfoAsync(full, { size: true });
    setSelectedItem({
      name,
      isFolder: info.isDirectory,
      size: info.size,
      mod: info.modificationTime,
      onDelete: () => handleDelete(name),
    });
    setInfoVisible(true);
  };

  const createNew = async (title, type) => {
    const fullPath = currentPath + title + (type === 'dir' ? '/' : '.txt');
    if (type === 'dir') await FileSystem.makeDirectoryAsync(fullPath);
    else await FileSystem.writeAsStringAsync(fullPath, '');
    setModalVisible(false);
    updateList(currentPath);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.pathTitle}>Папка: {currentPath.replace(ROOT, '') || 'MacFolder'}</Text>
      <Button title="⬅️ Назад" onPress={goUp} disabled={currentPath === ROOT} />

      {storage && (
        <View style={styles.disk}>
          <Text>Загальна: {(storage.total / 1e6).toFixed(1)} MB</Text>
          <Text>Використано: {(storage.used / 1e6).toFixed(1)} MB</Text>
          <Text>Доступно: {(storage.free / 1e6).toFixed(1)} MB</Text>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEntry(item)} onLongPress={() => showInfo(item)}>
            <Text style={styles.entry}>{item.endsWith('/') || item.indexOf('.') === -1 ? '📁' : '📄'} {item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottom}>
        <Button title="➕ Новий" onPress={() => setModalVisible(true)} />
      </View>

      <CreateModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={createNew} />
      <InfoModal visible={infoVisible} onClose={() => setInfoVisible(false)} entry={selectedItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: '#eef1f5' },
  pathTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  entry: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  disk: {
    backgroundColor: '#dbeaff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  bottom: { marginTop: 12, alignItems: 'center' },
});
