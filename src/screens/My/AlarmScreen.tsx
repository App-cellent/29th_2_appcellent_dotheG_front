import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

function AlarmScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '1분 전',
    },
    {
      id: '2',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '3',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '4',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '5',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '6',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '7',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '8',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '9',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '10',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '11',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
    {
      id: '12',
      message: 'Do the G는 데일리 퀘스트와 스페셜 퀘스트를 제공합니다.',
      time: '9분 전',
    },
  ]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
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
