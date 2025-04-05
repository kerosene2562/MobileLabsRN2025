import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, ProgressViewIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAchievements } from '../context/AchievementsContext';

export default function ProgressScreen() {
  const { progress } = useAchievements();

  const achievementList = [
    {
      id: '1',
      title: 'Tap 10 times',
      description: 'Tap on the clicker object 10 times',
      progress: Math.min(progress.tap / 10, 1),
    },
    {
      id: '2',
      title: 'Double-tap 5 times',
      description: 'Double-tap on the clicker 5 times',
      progress: Math.min(progress.doubleTap / 5, 1),
    },
    {
      id: '3',
      title: 'Long press 3 seconds',
      description: 'Hold the clicker for 3 seconds',
      progress: progress.longPress ? 1 : 0,
    },
    {
      id: '4',
      title: 'Drag the object',
      description: 'Drag the clicker around the screen',
      progress: progress.drag ? 1 : 0,
    },
    {
      id: '5',
      title: 'Swipe right',
      description: 'Perform a quick swipe right gesture',
      progress: progress.swipeRight ? 1 : 0,
    },
    {
      id: '6',
      title: 'Swipe left',
      description: 'Perform a quick swipe left gesture',
      progress: progress.swipeLeft ? 1 : 0,
    },
    {
      id: '7',
      title: 'Pinch to resize',
      description: 'Use pinch gesture to resize the clicker',
      progress: progress.pinch ? 1 : 0,
    },
    {
      id: '8',
      title: 'Reach 100 points',
      description: 'Reach 100 points in total',
      progress: Math.min(progress.points / 200, 1),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.progress === 1 && styles.cardCompleted]}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.progress < 1 ? (
          Platform.OS === 'android' ? (
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
            </View>
          ) : (
            <ProgressViewIOS progress={item.progress} progressTintColor="#3a86ff" />
          )
        ) : null}
      </View>
      <View style={styles.status}>
        {item.progress === 1 ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <View style={styles.circle} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={achievementList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardCompleted: {
    backgroundColor: '#e8f5e9',
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },
  status: {
    marginLeft: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3a86ff',
  },
});
