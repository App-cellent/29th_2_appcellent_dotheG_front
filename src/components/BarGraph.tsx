import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BarGraph(): React.JSX.Element {
  const [data, setData] = useState<number[]>([]);
  const [maxHeight, setMaxHeight] = useState(1);
  const range = { min: '0kg', max: '50kg 이상' };

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
      const fetchData = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('token');
          console.log('Access Token:', accessToken);

          const response = await fetch(`${apiUrl}/reports/carbon/graph?timestamp=${new Date().getTime()}`, {
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
              return fetchData();
            } else {
              throw new Error('Failed to refresh token');
            }
          }

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            const userCounts = result.data.map((item: { userCount: number }) => item.userCount);
            setData(userCounts);

            // 데이터 중 최대값 계산 후 설정
            const maxCount = Math.max(...userCounts);
            setMaxHeight(maxCount);
          } else {
            console.error(result.message);
            setData([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setData([]);
        }
      };

      fetchData();
    }, []);

  return (
    <View>
      <View style={styles.barContainer}>
        {data.map((value, index) => {
          const barHeight = (value / maxHeight) * 110;

          return (
            <View key={index} style={styles.barWrapper}>
              <LinearGradient
                colors={['#69E6A2', '#9BC9FE']}
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeText}>{range.min}</Text>
        <Text style={styles.rangeText}>{range.max}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 120,
    paddingHorizontal: 25,
  },
  barWrapper: {
    alignItems: 'center',
    width: 22,
    marginHorizontal: 2.4,
  },
  bar: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  rangeText: {
    fontSize: 10,
    color: '#545454',
  },
});

export default BarGraph;
