import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const animatedRef = useAnimatedRef();
  const width = useSharedValue(100);
  const [text, setText] = React.useState(width.value);

  const handlePress = () => {
    width.value = withTiming(width.value + 50, {}, () => {
      // highlight-next-line
      const measurement = measure(animatedRef);
      if (measurement === null) {
        return;
      }

      runOnJS(setText)(Math.floor(measurement.width));
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View ref={animatedRef} style={{ ...styles.box, width }} />
      <Text style={styles.label}>width: {text}</Text>
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
  label: {
    fontSize: 24,
    marginVertical: 16,
    color: '#b58df1',
  },
});
