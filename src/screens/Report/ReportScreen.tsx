import React, { useState, useEffect } from 'react';
import MainHeader from '../../components/MainHeader';
import BarGraph from '../../components/BarGraph';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

function ReportScreen(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState('주간');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMonthlyHistoryOpen, setIsMonthlyHistoryOpen] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const usernameFontSize=25;

  const apiUrl = process.env.REACT_APP_API_URL;

  const [isWeeklyAvailable, setIsWeeklyAvailable] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState({
    userName: "",
    yearMonthWeek: "",
    weeklyAvgSteps: 0,
    totalCertifications: 0,
    activityCounts: {
      "": 0
    },
  });

  const [isMonthlyAvailable, setIsMonthlyAvailable] = useState(false);
  const [monthlyReport, setMonthlyReport] = useState({
    userName: "",
    reportMonth: "",
    treesSaved: 0,
    monthlyTotalCertifications: 0,
    activityCounts: {
      "": 0
    },
    userPercentage: 0,
    userRange: "0 ~ 5kg",
  });

  const fetchWeeklyReportData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('token');
        console.log('Access Token:', accessToken);

        const response = await fetch(`${apiUrl}/reports/weekly?timestamp=${new Date().getTime()}`, {
          method: 'GET',
          headers: {
            "Cache-Control": 'no-store',
            "Content-Type": "application/json",
            access: `${accessToken}`,
          },
        });

        if (response.status === 401) {
          console.warn('Token expired, refreshing token...');
          const newToken = await refreshToken();
          if (newToken) {
            await AsyncStorage.setItem('token', newToken);
            return fetchWeeklyReportData();
          } else {
            throw new Error('Failed to refresh token');
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setWeeklyReport(result.data);
          setIsWeeklyAvailable(true);
          console.log('Weekly report fetched successfully:', result.data);
        } else {
          console.log(result.message);
          setIsWeeklyAvailable(false);
          setWeeklyReport({
            userName: "",
            yearMonthWeek: "",
            weeklyAvgSteps: 0,
            totalCertifications: 0,
            activityCounts: {
              "": 0
            },
          });
        }
      } catch (error) {
        console.log('Error fetching weekly report data:', error);
        setIsWeeklyAvailable(false);
        setWeeklyReport({
          userName: "",
          yearMonthWeek: "",
          weeklyAvgSteps: 0,
          totalCertifications: 0,
          activityCounts: {
            "": 0
          },
        });
      }
    };

    useEffect(() => {
      fetchWeeklyReportData();
    }, []);

  const fetchMonthlyReportData = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('token');
          console.log('Access Token:', accessToken);

          const response = await fetch(`${apiUrl}/reports/monthly?timestamp=${new Date().getTime()}`, {
            method: 'GET',
            headers: {
              "Cache-Control": 'no-store',
              "Content-Type": "application/json",
              access: `${accessToken}`,
            },
          });

          if (response.status === 401) {
            console.warn('Token expired, refreshing token...');
            const newToken = await refreshToken();
            if (newToken) {
              await AsyncStorage.setItem('token', newToken);
              return fetchMonthlyReportData();
            } else {
              throw new Error('Failed to refresh token');
            }
          }

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            setMonthlyReport(result.data);
            setIsMonthlyAvailable(true);
            console.log('Monthly report fetched successfully:', result.data);
          } else {
            console.log(result.message);
            setIsMonthlyAvailable(false);
            setMonthlyReport({
                userName: "",
                reportMonth: "",
                treesSaved: 0,
                monthlyTotalCertifications: 0,
                activityCounts: {
                    "": 0
                },
                userPercentage: 0,
                userRange: "0 ~ 5kg",
            });
          }
        } catch (error) {
          console.log('Error fetching monthly report data:', error);
          setIsMonthlyAvailable(false);
          setMonthlyReport({
              userName: "",
              reportMonth: "",
              treesSaved: 0,
              monthlyTotalCertifications: 0,
              activityCounts: {
                  "": 0
              },
              userPercentage: 0,
              userRange: "0 ~ 5kg",
          });
        }
      };

      useEffect(() => {
        fetchMonthlyReportData();
      }, []);

  const [barPosition, setBarPosition] = useState(0);
  const { width: windowWidth } = useWindowDimensions();
  const horizontalPadding = 25; // 좌우 패딩 (예: 25px)
  const graphWidth = windowWidth - (horizontalPadding * 2);
  const totalBars = 11; // 막대 개수
  const barWidth = 22; // 막대 너비
  const barSpacing = 2.4; // 막대 간격
  const containerPadding = (graphWidth - (totalBars * barWidth + (totalBars - 1) * barSpacing)) / 2;

    useEffect(() => {
      // userRange로 막대 인덱스 계산
      const barIndex = calculateBarIndex(monthlyReport.userRange);
      if (barIndex !== -1) {
        const position = calculatePosition(barIndex, barWidth, barSpacing, containerPadding);
        setBarPosition(position); // 계산된 위치 설정
      }
    }, [monthlyReport.userRange]);

    const calculateBarIndex = (range) => {
      const ranges = [
        "0 ~ 5kg", "5 ~ 10kg", "10 ~ 15kg", "15 ~ 20kg", "20 ~ 25kg",
        "25 ~ 30kg", "30 ~ 35kg", "35 ~ 40kg", "40 ~ 45kg", "45 ~ 50kg", "50kg 이상"
      ];
      return ranges.indexOf(range);
    };

    const calculatePosition = (barIndex, barWidth, barSpacing, containerPadding) => {
      return (containerPadding + barIndex * (barWidth + barSpacing))-27.5;
    };

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
    <View style={styles.fullScreenContainer}>
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

      {selectedTab === '주간' && isWeeklyAvailable ? (
        <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.dateText}>{weeklyReport.yearMonthWeek}</Text>
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
                  {weeklyReport.userName}
                </SvgText>
              </Svg>

              <Text
                style={[styles.hiddenText, { fontSize: usernameFontSize }]}
                onLayout={handleTextLayout}
              >
                {weeklyReport.userName}
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
                  <Text style={styles.countNum}>{weeklyReport.weeklyAvgSteps.toLocaleString()}</Text>
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
                  <Text style={styles.historyCount}>{weeklyReport.totalCertifications.toLocaleString()}</Text>
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
                  {Object.entries(weeklyReport.activityCounts).map(([key, value], index) => (
                    <View key={index} style={styles.historyDetail}>
                      <Text style={styles.historyDetailContent}>{key}</Text>
                      <Text style={styles.historyDetailCount}>{value}회</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
        </ScrollView>
      ) : selectedTab === '주간' && !isWeeklyAvailable ? (
              <View style={styles.emptyContent}>
                <View style={styles.emptyContainer}>
                  <Image source={require("../../img/Report/noreport.png")} style={styles.noReport} />
                  <Text style={styles.emptyText}>주간 성과 보고서는 아직 준비중이에요!</Text>
                </View>
              </View>
      ) : null}

      {selectedTab === '월간' && isMonthlyAvailable ? (
        <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.dateText}>{monthlyReport.reportMonth}</Text>
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
                  {monthlyReport.userName}
                </SvgText>
              </Svg>

              <Text
                style={[styles.hiddenText, { fontSize: usernameFontSize }]}
                onLayout={handleTextLayout}
              >
                {monthlyReport.userName}
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
                  <Text style={styles.countNum}>{monthlyReport.treesSaved.toLocaleString()}</Text>
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
                  <View style={[styles.rankAndEarth,{ marginLeft: barPosition },]}>
                    <ImageBackground source={require('../../img/Report/carbonrankbox.png')} style={styles.rankImage}>
                      <Text style={styles.appText}>{monthlyReport.userName}</Text>
                      <Text style={styles.rankText}>상위 {monthlyReport.userPercentage}%</Text>
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
                  <Text style={styles.historyCount}>{monthlyReport.monthlyTotalCertifications.toLocaleString()}</Text>
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
                  {Object.entries(monthlyReport.activityCounts).map(([key, value], index) => (
                    <View key={index} style={styles.historyDetail}>
                      <Text style={styles.historyDetailContent}>{key}</Text>
                      <Text style={styles.historyDetailCount}>{value}회</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
        </ScrollView>
        ) : selectedTab === '월간' && !isMonthlyAvailable ? (
                <View style={styles.emptyContent}>
                  <View style={styles.emptyContainer}>
                    <Image source={require("../../img/Report/noreport.png")} style={styles.noReport} />
                    <Text style={styles.emptyText}>월간 성과 보고서는 아직 준비중이에요!</Text>
                  </View>
                </View>
        ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
      flex: 1,
      backgroundColor: '#ffffff', // 전체 배경색 적용
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  switchContainer: {
    position: 'absolute',
    top: 72,
    right: 15,
    width: '32%',
    zIndex:2,
  },
  switchBackground: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#69E6A2',
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
    marginTop: 57,
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
  },
  emptyContent: {
      flex: 1,
      backgroundColor: "#EEEEEE", // 배경색 변경
      justifyContent: "center",
      alignItems: "center",
    },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noReport: {
    width: 75.87,
    height: 65.87,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: "medium",
    color: "#545454",
  },
});

export default ReportScreen;
