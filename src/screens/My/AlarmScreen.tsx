import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AlarmScreen({ navigation }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      console.log('Access Token:', accessToken);

      const response = await fetch(`${apiUrl}/notifications?timestamp=${new Date().getTime()}`, {
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
          return fetchNotifications();
        } else {
          throw new Error('Failed to refresh token');
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log("받은 알림 데이터:", result.data);
        const formattedData = result.data.map(notification => ({
          ...notification,
          time: formatTimestamp(notification.timestamp),
        }));

        setNotifications(formattedData);
      } else {
        console.error(result.message);
        setNotifications([]);
      }
    } catch (error) {
      console.error("알림 가져오기 중 오류 발생:", error);
      setNotifications([]);
    }
  };

  const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
  };

  const markAsRead = async (userAlertId) => {
    try {
      const accessToken = await AsyncStorage.getItem('token');

      const response = await fetch(`${apiUrl}/notifications/${userAlertId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          access: `${accessToken}`,
        },
      });

      if (response.ok) {
        console.log(`알림 읽음 처리 성공: ${userAlertId}`);
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === userAlertId ? { ...notification, read: true } : notification
          )
        );
      } else {
        const errorMessage = await response.text();
        console.error(`알림 읽음 처리 실패: ${errorMessage}`);
        console.log(`알림 아이디: ${userAlertId}`);
      }
    } catch (error) {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    }
  };

  const handleNotificationPress = (item) => {
    if (item.read) return;

    markAsRead(item.id);

    if (item.message.includes('알림')) {
      navigation.navigate('MyScreen');
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item)}>
      <View style={[styles.notificationItem, item.read && styles.readNotification]}>
        <Image
          source={require('../../img/My/speakericon.png')}
          style={styles.speakerIcon}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationMessage} numberOfLines={1}>
            {item.message}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../img/My/arrowleft.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>알림</Text>
      {notifications.length > 0 && (
        <Image
          source={require('../../img/My/alarmicon.png')}
          style={styles.alarmIcon}
        />
      )}
    </View>
  );

  const renderEmptyContent = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../img/My/graymole.png')}
        style={styles.moleImage}
      />
      <Text style={styles.emptyText}>아직 알림 사항이 없어요!</Text>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      renderItem={renderNotification}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyContent}
      contentContainerStyle={styles.notificationList}
    />
  );
}

const styles = StyleSheet.create({
  notificationList: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 56,
  },
  closeIcon: {
    width: 8,
    height: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939',
    position: 'absolute',
    left: '48%',
  },
  alarmIcon: {
    width: 20.67,
    height: 23.25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moleImage: {
    width: 75.87,
    height: 65.87,
    marginBottom: 16.13,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C9C9C9',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  readNotification: {
    backgroundColor: '#F0F0F0',
  },
  speakerIcon: {
    width: 36,
    height: 36,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 22,
    marginRight: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 13,
    fontWeight: 'medium',
    color: '#545454',
    marginRight: 40,
    marginBottom: 3,
  },
  notificationTime: {
    fontSize: 13,
    fontWeight: 'medium',
    color: '#C9C9C9',
  },
});

export default AlarmScreen;
