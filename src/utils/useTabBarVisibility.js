import React, { createContext, useContext, useState } from 'react';

// TabBar 상태 관리용 Context 생성
const TabBarVisibilityContext = createContext();

// TabBarProvider 컴포넌트 정의
export const TabBarProvider = ({ children }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);  // TabBar 상태 관리

  return (
    <TabBarVisibilityContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

// useTabBarVisibility 훅 정의
export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);
