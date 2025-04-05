import React, { createContext, useState, useContext } from 'react';

const AchievementsContext = createContext();

export const AchievementsProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    tap: 0,
    doubleTap: 0,
    longPress: false,
    drag: false,
    swipeRight: false,
    swipeLeft: false,
    pinch: false,
    points: 0,
  });

  const updateProgress = (type, value = 1) => {
    setProgress(prev => {
      const updated = { ...prev };
      if (typeof prev[type] === 'number') {
        updated[type] += value;
      } else {
        updated[type] = true;
      }

      if (type === 'points') {
        updated.points += value;
      }

      return updated;
    });
  };

  return (
    <AchievementsContext.Provider value={{ progress, updateProgress }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementsContext);
