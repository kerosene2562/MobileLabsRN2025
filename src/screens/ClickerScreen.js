import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { useAchievements } from '../context/AchievementsContext';

export default function ClickerScreen() {
  const [score, setScore] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const position = {
    x: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(0)).current,
  };
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = Animated.multiply(baseScale, pinchScale);
  const lastScale = useRef(1);

  const { updateProgress } = useAchievements();

  const handleTap = () => {
    setScore(prev => prev + 1);
    updateProgress('tap');
    updateProgress('points', 1);
  };

  const handleDoubleTap = () => {
    setScore(prev => prev + 2);
    updateProgress('doubleTap');
    updateProgress('points', 2);
  };

  const handleLongPress = () => {
    setScore(prev => prev + 5);
    updateProgress('longPress');
    updateProgress('points', 5);
  };

  const handleFling = (direction) => ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const bonus = Math.floor(Math.random() * 10) + 1;
      setScore(prev => prev + bonus);

      if (direction === 'right') {
        updateProgress('swipeRight');
      } else if (direction === 'left') {
        updateProgress('swipeLeft');
      }

      updateProgress('points', bonus);
    }
  };

  const handlePan = Animated.event(
    [{ nativeEvent: { translationX: position.x, translationY: position.y } }],
    {
      useNativeDriver: false,
      listener: () => updateProgress('drag'),
    }
  );

  const handlePinch = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: false }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const newScale = scale.__getValue();
      lastScale.current = newScale;
      baseScale.setValue(newScale);
      pinchScale.setValue(1);
      updateProgress('pinch');
    }
  };

  const singleTapRef = useRef();
  const doubleTapRef = useRef();

  return (
    <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={handleFling('right')}>
      <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={handleFling('left')}>

        <PinchGestureHandler
          onGestureEvent={isEditMode ? handlePinch : undefined}
          onHandlerStateChange={isEditMode ? handlePinchStateChange : undefined}
        >
          <View style={styles.container}>
            <Text style={styles.score}>Очки: {score}</Text>
            <Button
              title={isEditMode ? 'Вийти з режиму редагування' : 'Режим редагування'}
              onPress={() => setIsEditMode(prev => !prev)}
            />
            <TapGestureHandler
              ref={doubleTapRef}
              onHandlerStateChange={e => e.nativeEvent.state === State.ACTIVE && handleDoubleTap()}
              numberOfTaps={2}
            >
              <TapGestureHandler
                ref={singleTapRef}
                waitFor={doubleTapRef}
                onHandlerStateChange={e => e.nativeEvent.state === State.ACTIVE && handleTap()}
                numberOfTaps={1}
              >
                <LongPressGestureHandler
                  onHandlerStateChange={e => e.nativeEvent.state === State.ACTIVE && handleLongPress()}
                  minDurationMs={500}
                >
                  <PanGestureHandler onGestureEvent={isEditMode ? handlePan : undefined}>
                    <Animated.View
                      style={[
                        styles.clickable,
                        {
                          transform: [
                            { translateX: position.x },
                            { translateY: position.y },
                            { scale: scale },
                          ],
                        },
                      ]}
                    >
                      <Text style={styles.text}>Натисни мене</Text>
                    </Animated.View>
                  </PanGestureHandler>
                </LongPressGestureHandler>
              </TapGestureHandler>
            </TapGestureHandler>
          </View>
        </PinchGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 28,
    marginBottom: 20,
  },
  clickable: {
    width: 150,
    height: 150,
    backgroundColor: '#48a',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
