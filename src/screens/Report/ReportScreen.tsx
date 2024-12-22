import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
    '제로 웨이스트 매장 방문 1회',
    '텀블러 사용 1회',
    '만보기 목표 달성 4회',
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
            <Image source={require('../../img/Report/reportbox.png')} style={styles.backgroundImage} />
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

          {/* 지난 주 인증 히스토리 */}
          <View style={styles.historyContainer}>
            <Image source={require('../../img/Report/reportbox.png')} style={styles.backgroundImage} />
            <View style={styles.historyContent}>
              {/* 왼쪽 상단 오버랩 로고와 제목 */}
              <View style={styles.logoAndTitle}>
                <View style={styles.overlayedLogos}>
                  <Image source={require('../../img/Report/historylogo1.png')} style={styles.historyLogo} />
                  <Image source={require('../../img/Report/historylogo2.png')} style={styles.overlappingLogo} />
                </View>
                <Text style={styles.historyTitle}>지난 주 인증 히스토리</Text>
              </View>
              {/* 오른쪽 하단 인증 횟수 */}
              <View style={styles.historyCountContainer}>
                <Text style={styles.historyCount}>{historyCount}</Text>
                <Text style={styles.historyText}>회</Text>
              </View>
            </View>

            {/* 히스토리 토글 버튼 */}
            <TouchableOpacity onPress={toggleHistory} style={styles.toggleButton}>
              <Image
                source={isHistoryOpen
                  ? require('../../img/Report/arrowup.png')  // 위 화살표
                  : require('../../img/Report/arrowdown.png')}  // 아래 화살표
                style={styles.arrowImage}
              />
            </TouchableOpacity>

            {/* 히스토리 내역 표시 */}
            {isHistoryOpen && (
              <View style={styles.historyDetailsContainer}>
                {historyDetails.map((detail, index) => (
                  <Text key={index} style={styles.historyDetail}>
                    {detail}
                  </Text>
                ))}
              </View>
            )}
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
    //paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  switchContainer: {
    marginTop: 16, // 위에서 16px 떨어짐
    marginRight: 15, // 오른쪽에서 15px 떨어짐
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
    //justifyContent: 'flex-start',
    //alignItems: 'center',
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
    marginTop: 10,
    marginLeft: 21,
  },
  contentText: {
    fontSize: 18,
    color: '#333333',
  },
  averageStepsContainer: {
    width: '100%',
    marginTop: 23,
    paddingHorizontal: 16,
  },
  averageStepsContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    //marginLeft: 50,
    marginTop: 24,
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepsCountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 230,
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
    marginTop: 23,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    width: '100%',
    minHeight: 127,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContent: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  logoImage: {
    width: 45,
    height: 45,
    marginLeft: 50,
  },
  stepsTitle: {
    fontSize: 15,
    color: '#121212',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  stepsCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  historyContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  historyCountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 320,
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
    marginLeft: 50,
  },
  overlappingLogo: {
    position: 'absolute',
    width: 25,
    height: 25,
    marginLeft: 60,
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 15,
    color: '#121212',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  historyCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  toggleButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  arrowImage: {
    width: 30,
    height: 30,
  },
  historyDetailsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  historyDetail: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
});

export default ReportScreen;