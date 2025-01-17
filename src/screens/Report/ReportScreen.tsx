import React, { useState } from 'react';
import MainHeader from '../../components/MainHeader';
import BarGraph from '../../components/BarGraph';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

function ReportScreen(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState('주간');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMonthlyHistoryOpen, setIsMonthlyHistoryOpen] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const usernameFontSize=25;

  const year = 2024;
  const month = 10;
  const week = '첫째주';
  const username = '앱설런트';
  const averageSteps = 5032;
  const historyCount = 6;
  const monthlyHistoryCount = 8;
  const savedTree = 11;
  const topPercentage= 21;

  const historyDetails = [
    { content: '제로 웨이스트 매장 방문', count: 1 },
    { content: '텀블러 사용', count: 1 },
    { content: '만보기 목표 달성', count: 4 },
  ];
  const monthlyHistoryDetails = [
    { content: '제로 웨이스트 매장 방문', count: 2 },
    { content: '텀블러 사용', count: 2 },
    { content: '만보기 목표 달성', count: 4 },
  ];

  const handleTabSwitch = (tab: string) => {
    setSelectedTab(tab);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const toggleMonthlyHistory = () => {
    setIsMonthlyHistoryOpen(!isMonthlyHistoryOpen);
  };

  const toggleInfoView = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleTextLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };

  return (
    <ScrollView style={styles.container}>
      <MainHeader />
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

      {selectedTab === '주간' && (
        <View style={styles.content}>
          <Text style={styles.dateText}>{year.toString()}년 {month.toString()}월 {week}</Text>
          <View style={styles.usernameContainer}>
            <View style={styles.userTextContainer}>
              <Svg
                height={usernameFontSize * 1.2}
                width={textWidth}
              >
                <Defs>
                  <LinearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#69E6A2" />
                    <Stop offset="100%" stopColor="#9BC9FE" />
                  </LinearGradient>
                </Defs>
                <SvgText
                  fill="url(#textGradient)"
                  fontSize={usernameFontSize}
                  fontWeight="bold"
                  x="0"
                  y={usernameFontSize}
                >
                  {username}
                </SvgText>
              </Svg>

              <Text
                style={[styles.hiddenText, { fontSize: usernameFontSize }]}
                onLayout={handleTextLayout}
              >
                {username}
              </Text>
              <Text style={styles.usernameText}>님의 지난 주</Text>
            </View>
            <Text style={styles.usernameText}>성과보고서를 확인해보세요!</Text>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.shadowBox}>
              <View style={styles.boxContent}>
                <View style={styles.logoAndTitle}>
                  <Image source={require('../../img/Report/averagesteplogo.png')} style={styles.logoImage} />
                  <Text style={styles.boxTitle}>지난 주 하루 평균 걸음수</Text>
                </View>
                <View style={styles.countContainer}>
                  <Text style={styles.countNum}>{averageSteps.toLocaleString()}</Text>
                  <Text style={styles.countText}>걸음</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.toggleBoxContainer, isHistoryOpen && styles.historyOpen]}>
            <View style={styles.shadowBox}>
              <View style={styles.historyContent}>
                <View style={styles.logoAndTitle}>
                  <Image source={require('../../img/Report/historylogo.png')} style={styles.logoImage} />
                  <Text style={styles.historyTitle}>지난 주 인증 히스토리 (횟수)</Text>
                </View>
                <View style={styles.historyCountContainer}>
                  <Text style={styles.historyCount}>{historyCount.toLocaleString()}</Text>
                  <Text style={styles.historyText}>회</Text>
                </View>
              </View>

              <TouchableOpacity onPress={toggleHistory} style={styles.toggleButtonContainer}>
                <View style={styles.toggleButton}>
                  <Image
                    source={isHistoryOpen
                      ? require('../../img/Report/arrowup.png')
                      : require('../../img/Report/arrowdown.png')}
                    style={styles.arrowImage}
                  />
                  <Text style={styles.toggleText}>
                    {isHistoryOpen ? '' : '인증 히스토리 보기'}
                  </Text>
                </View>
              </TouchableOpacity>

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

      {selectedTab === '월간' && (
        <View style={styles.content}>
          <Text style={styles.dateText}>{year.toString()}년 {month.toString()}월</Text>
          <View style={styles.usernameContainer}>
            <View style={styles.userTextContainer}>
              <Svg
                height={usernameFontSize * 1.2}
                width={textWidth}
              >
                <Defs>
                  <LinearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#69E6A2" />
                    <Stop offset="100%" stopColor="#9BC9FE" />
                  </LinearGradient>
                </Defs>
                <SvgText
                  fill="url(#textGradient)"
                  fontSize={usernameFontSize}
                  fontWeight="bold"
                  x="0"
                  y={usernameFontSize}
                >
                  {username}
                </SvgText>
              </Svg>

              <Text
                style={[styles.hiddenText, { fontSize: usernameFontSize }]}
                onLayout={handleTextLayout}
              >
                {username}
              </Text>
              <Text style={styles.usernameText}>님의 지난 달</Text>
            </View>
            <Text style={styles.usernameText}>성과보고서를 확인해보세요!</Text>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.shadowBox}>
              <View style={styles.boxContent}>
                <View style={styles.logoAndTitle}>
                  <Image source={require('../../img/Report/savetreelogo.png')} style={styles.logoImage} />
                  <Text style={styles.boxTitle}>지난 달 내가 지킨 나무</Text>
                </View>
                <TouchableOpacity onPress={toggleInfoView} style={styles.infoIconContainer}>
                  <Image source={require('../../img/Report/savetreeinfo.png')} style={styles.infoIcon} />
                </TouchableOpacity>
                <View style={styles.countContainer}>
                  <Text style={styles.countNum}>{savedTree.toLocaleString()}</Text>
                  <Text style={styles.countText}>그루</Text>
                </View>
              </View>
              {isInfoVisible && (
                <View style={styles.infoBox}>
                  <TouchableOpacity
                    onPress={() => setIsInfoVisible(false)}
                    style={styles.closeInfoContainer}
                  >
                    <Image
                      source={require('../../img/Report/savetreeinfoexit.png')}
                      style={styles.closeInfo}
                    />
                  </TouchableOpacity>
                  <Text style={styles.infoText}>내가 줄인 이산화탄소의 양을</Text>
                  <Text style={styles.infoText}>나무 그루로 확인해볼 수 있어요!</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.shadowBox}>
              <View style={styles.boxContent}>
                <View style={styles.logoAndTitle}>
                  <Image source={require('../../img/Report/savecarbonlogo.png')} style={styles.logoImage} />
                  <Text style={styles.boxTitle}>지난 달 내가 줄인 탄소 배출량 순위</Text>
                </View>
                <View style={styles.rankBox}>
                  <Image source={require('../../img/Report/carbonbackground.png')} style={styles.backgroundImage} />
                  <View style={styles.graphContainer}>
                    <BarGraph />
                  </View>
                  <View style={styles.rankAndEarth}>
                    <ImageBackground source={require('../../img/Report/carbonrankbox.png')} style={styles.rankImage}>
                      <Text style={styles.appText}>앱설런트</Text>
                      <Text style={styles.rankText}>상위 {topPercentage.toString()}%</Text>
                    </ImageBackground>
                    <Image source={require('../../img/Report/carbonearth.png')} style={styles.earthImage} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.toggleBoxContainer, isMonthlyHistoryOpen && styles.historyOpen]}>
            <View style={styles.shadowBox}>
              <View style={styles.historyContent}>
                <View style={styles.logoAndTitle}>
                  <Image source={require('../../img/Report/historylogo.png')} style={styles.logoImage} />
                  <Text style={styles.historyTitle}>지난 달 인증 히스토리 (횟수)</Text>
                </View>
                <View style={styles.historyCountContainer}>
                  <Text style={styles.historyCount}>{monthlyHistoryCount.toLocaleString()}</Text>
                  <Text style={styles.historyText}>회</Text>
                </View>
              </View>

              <TouchableOpacity onPress={toggleMonthlyHistory} style={styles.toggleButtonContainer}>
                <View style={styles.toggleButton}>
                  <Image
                    source={isMonthlyHistoryOpen
                      ? require('../../img/Report/arrowup.png')
                      : require('../../img/Report/arrowdown.png')}
                    style={styles.arrowImage}
                  />
                  <Text style={styles.toggleText}>
                    {isMonthlyHistoryOpen ? '' : '인증 히스토리 보기'}
                  </Text>
                </View>
              </TouchableOpacity>

              {isMonthlyHistoryOpen && (
                <View style={styles.historyDetailsContainer}>
                  {monthlyHistoryDetails.map((detail, index) => (
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
    </ScrollView>
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
  optionText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  selectedOption: {
    backgroundColor: '#69E6A2',
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
  usernameContainer: {
    marginLeft: 21,
    paddingVertical: 10,
  },
  userTextContainer: {
    flexDirection: 'row',
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#121212',
  },
  hiddenText: {
    position: 'absolute',
    opacity: 0,
  },
  boxContainer: {
    width: '100%',
    minHeight: 127,
    marginTop: 19,
    paddingHorizontal: 16,
  },
  shadowBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  boxContent: {
    justifyContent: 'space-between',
    minHeight: 127,
  },
  logoAndTitle: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  logoImage: {
    width: 45,
    height: 45,
    marginLeft: 20,
    marginTop: 16,
  },
  boxTitle: {
    fontSize: 15,
    color: '#121212',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 16,
  },
  countContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    right: 24,
    alignItems: 'flex-end',
  },
  countNum: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  countText: {
    fontSize: 15,
    color: '#C9C9C9',
    marginLeft: 4,
    marginBottom: 8,
  },
  toggleBoxContainer: {
    width: '100%',
    minHeight: 127,
    marginTop: 23,
    marginBottom: 23,
    paddingHorizontal: 16,
  },
  historyOpen: {
    height: 'auto',
  },
  historyContent: {
    justifyContent: 'space-between',
    minHeight: 127,
  },
  historyTitle: {
    fontSize: 15,
    color: '#121212',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 16,
  },
  historyCountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 24,
    alignItems: 'flex-end',
  },
  historyCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  historyText: {
    fontSize: 15,
    color: '#C9C9C9',
    marginLeft: 4,
    marginBottom: 8,
  },
  toggleButtonContainer: {
    position: 'relative',
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  toggleButton: {
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    width: 14,
    height: 9,
  },
  toggleText: {
    fontSize: 13,
    color: '#929292',
    marginLeft: 7,
  },
  historyDetailsContainer: {
    paddingHorizontal: 23,
    marginBottom: 28,
  },
  historyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  historyDetailContent: {
    fontSize: 13,
    color: '#929292',
  },
  historyDetailCount: {
    fontSize: 13,
    color: '#929292',
  },
  rankBox: {
    position: 'relative',
    borderRadius: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',
    resizeMode: 'cover',
    zIndex: 1,
  },
  graphContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 30,
    paddingHorizontal:20,
    zIndex: 2,
  },
  rankAndEarth: {
    position: 'absolute',
    top: 65,
    marginLeft:218,
    width: '100%',
    zIndex: 3,
  },
  rankImage: {
    width: 90,
    height: 70,
  },
  earthImage: {
    marginTop: 22,
    marginLeft:3,
    width: 80,
    height: 55,
  },
  appText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#69E6A2',
    marginTop:10,
    paddingHorizontal:12,
  },
  rankText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#545454',
    marginBottom:10,
  },
  infoIconContainer: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  infoIcon: {
    width: 15,
    height: 15,
  },
  infoBox: {
    position: 'absolute',
    right: 15,
    top: 32,
    width: 'auto',
    height: 45,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    justifyContent: 'center',
    zIndex: 3,
  },
  infoText: {
    fontSize: 8,
    fontWeight:'medium',
    color: '#C9C9C9',
  },
  closeInfoContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 4,
  },
  closeInfo: {
    width: 8,
    height: 8,
  }
});

export default ReportScreen;
