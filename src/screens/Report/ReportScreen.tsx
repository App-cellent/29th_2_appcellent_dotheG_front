import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

function ReportScreen(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState('주간');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // 히스토리 토글 상태

  // 주간 화면용 변수
  const year = 2024;
  const month = 10;
  const week = '첫째주';
  const username = '앱설런트';
  const averageSteps = 5032;
  const historyCount = 6;

  // 히스토리 내역 예시
  const historyDetails = [
    { content: '제로 웨이스트 매장 방문', count: 1 },
    { content: '텀블러 사용', count: 1 },
    { content: '만보기 목표 달성', count: 4 },
  ];

  const handleTabSwitch = (tab: string) => {
    setSelectedTab(tab); // 상태 변경
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen); // 히스토리 토글 상태 변경
  };

  return (
    <View style={styles.container}>
      {/* 타원형 버튼 영역 */}
      <View style={styles.switchContainer}>
        <View style={styles.switchBackground}>
          <TouchableOpacity
            style={[styles.switchOption, selectedTab === '주간' && styles.selectedOption]}
            onPress={() => handleTabSwitch('주간')}
          >
            <Text style={[styles.optionText, selectedTab === '주간' && styles.selectedText]}>주간</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchOption, selectedTab === '월간' && styles.selectedOption]}
            onPress={() => handleTabSwitch('월간')}
          >
            <Text style={[styles.optionText, selectedTab === '월간' && styles.selectedText]}>월간</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 주간 화면 내용 */}
      {selectedTab === '주간' && (
        <View style={styles.content}>
          <Text style={styles.dateText}>{year}년 {month}월 {week}</Text>
          <Text style={styles.usernameText}>{username}님의 지난 주{'\n'}성과보고서를 확인해보세요!</Text>

          {/* 지난 주 하루 평균 걸음 수 */}
          <View style={styles.averageStepsContainer}>
            <View style={styles.shadowBox}>
              <View style={styles.averageStepsContent}>
                {/* 왼쪽 상단 로고와 제목 */}
                <View style={styles.logoAndTitle}>
                  <Image source={require('../../img/Report/averagesteplogo.png')} style={styles.logoImage} />
                  <Text style={styles.stepsTitle}>지난 주 하루 평균 걸음수</Text>
                </View>
                {/* 오른쪽 하단 걸음수 */}
                <View style={styles.stepsCountContainer}>
                  <Text style={styles.stepsCount}>{averageSteps.toLocaleString()}</Text>
                  <Text style={styles.stepsText}>걸음</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 지난 주 인증 히스토리 */}
          <View style={[styles.historyContainer, isHistoryOpen && styles.historyOpen]}>
            <View style={styles.shadowBox}>
              <View style={styles.historyContent}>
                <View style={styles.logoAndTitle}>
                  <View style={styles.overlayedLogos}>
                    <Image source={require('../../img/Report/historylogo1.png')} style={styles.historyLogo} />
                    <Image source={require('../../img/Report/historylogo2.png')} style={styles.overlappingLogo} />
                  </View>
                  <Text style={styles.historyTitle}>지난 주 인증 히스토리</Text>
                </View>
                <View style={styles.historyCountContainer}>
                  <Text style={styles.historyCount}>{historyCount}</Text>
                  <Text style={styles.historyText}>회</Text>
                </View>
              </View>

              {/* 토글 버튼과 텍스트 */}
              <View style={styles.toggleButtonContainer}>
                <TouchableOpacity onPress={toggleHistory} style={styles.toggleButton}>
                  <Image
                    source={isHistoryOpen
                      ? require('../../img/Report/arrowup.png') // 위 화살표
                      : require('../../img/Report/arrowdown.png')} // 아래 화살표
                    style={styles.arrowImage}
                  />
                </TouchableOpacity>
                {!isHistoryOpen && (
                  <Text style={styles.toggleText}>인증 히스토리 보기</Text>
                )}
              </View>

              {/* 히스토리 내역 */}
              {isHistoryOpen && (
                <View style={styles.historyDetailsContainer}>
                  {historyDetails.map((detail, index) => (
                    <View key={index} style={styles.historyDetail}>
                      <Text style={styles.historyDetailContent}>{detail.content}</Text>
                      <Text style={styles.historyDetailCount}>{detail.count}회</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* 월간 화면 내용 */}
      {selectedTab === '월간' && (
        <View style={styles.content}>
          <Text style={styles.contentText}>월간 성과 화면</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  switchContainer: {
    marginTop: 16,
    marginRight: 15,
    alignItems: 'flex-end',
  },
  switchBackground: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#69E6A2',
    width: '32%',
    height: 40,
  },
  switchOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: '#69E6A2',
  },
  optionText: {
    fontSize: 13,
    color: '#333333',
  },
  selectedText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    marginTop: 7,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#545454',
    marginLeft: 21,
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#121212',
    marginLeft: 21,
    paddingVertical: 10,
  },
  contentText: {
    fontSize: 18,
    color: '#333333',
  },
  averageStepsContainer: {
    width: '100%',
    minHeight: 127,
    marginTop: 19,
    paddingHorizontal: 16,
    //position: 'relative'
  },
  shadowBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    padding: 10,
  },
  averageStepsContent: {
    justifyContent: 'space-between',
    minHeight: 127,
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepsCountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 14,
    right: 20,
    alignItems: 'flex-end',
  },
  stepsText: {
    fontSize: 15,
    color: '#C9C9C9',
    marginLeft: 4,
    marginBottom: 8,
  },
  historyContainer: {
    width: '100%',
    minHeight: 127,
    marginTop: 23,
    paddingHorizontal: 16,
  },
  historyOpen: {
    height: 'auto',
  },
  logoImage: {
    width: 45,
    height: 45,
    marginLeft: 16,
    marginTop: 16,
  },
  stepsTitle: {
    fontSize: 15,
    color: '#121212',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 16,
  },
  stepsCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  historyContent: {
    justifyContent: 'space-between',
    minHeight: 127,
  },
  historyCountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 20,
    alignItems: 'flex-end',
  },
  historyText: {
    fontSize: 15,
    color: '#C9C9C9',
    marginLeft: 4,
    marginBottom: 8,
  },
  overlayedLogos: {
    position: 'relative',
  },
  historyLogo: {
    width: 45,
    height: 45,
    marginLeft: 16,
    marginTop: 16,
  },
  overlappingLogo: {
    position: 'absolute',
    width: 24,
    height: 24,
    marginLeft: 26.5,
    marginTop: 26.5,
  },
  historyTitle: {
    fontSize: 15,
    color: '#121212',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 16,
  },
  historyCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  toggleButtonContainer: {
    position: 'relative',
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    marginLeft: 25,
  },
  arrowImage: {
    width: 10,
    height: 6.18,
  },
  toggleText: {
    fontSize: 13,
    color: '#929292',
    marginLeft: 7,
  },
  historyDetailsContainer: {
    paddingHorizontal: 23,
  },
  historyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  historyDetailContent: {
    fontSize: 13,
    color: '#929292',
  },
  historyDetailCount: {
    fontSize: 13,
    color: '#929292',
  },
});

export default ReportScreen;
