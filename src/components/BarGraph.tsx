import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function BarGraph(): React.JSX.Element {
  const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 106, 110];
  const range = { min: '0kg', max: '10kg' };
  const maxHeight = 110;

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
