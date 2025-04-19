import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import { loadTasks, saveTasks } from '../services/storage';
import Constants from 'expo-constants';

const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
const EXTERNAL_ID = 'ipzk241roa';

export default function Index() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(APP_ID);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", async (event) => {
      event.preventDefault();
      event.notification.display();
    });

    OneSignal.login(EXTERNAL_ID);
    OneSignal.User.pushSubscription.optIn();
    AsyncStorage.setItem("externalId", EXTERNAL_ID);

    loadTasks().then((storedTasks) => {
      if (storedTasks) setTasks(storedTasks);
    });
  }, []);

  const addTask = (task) => {
    const updated = [...tasks, task].sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log('Новий список завдань:', updated);
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = async (id, notificationId) => {
    const filtered = tasks.filter((t) => t.id !== id);
    setTasks(filtered);
    saveTasks(filtered);

    if (notificationId) {
      try {
        const { cancelNotification } = await import('./components/cancelNotify');
        await cancelNotification(notificationId);
      } catch (e) {
        console.warn('Помилка при скасуванні сповіщення:', e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📌 Завдання з нагадуванням</Text>
      <Button title="➕ Додати завдання" onPress={() => setModalVisible(true)} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
