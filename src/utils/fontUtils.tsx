import { PixelRatio } from 'react-native';

export const getFontSize = (size) => {
  const fontScale = PixelRatio.getFontScale();  // 화면의 폰트 크기 비율을 구함
  return size / fontScale;  // 화면 크기에 맞춰 폰트 크기 반환
};