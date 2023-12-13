// @ts-nocheck
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from 'react-native-screens/native-stack';
import { GestureDetectorProvider } from 'react-native-screens/gesture-handler';
import { ParamListBase } from '@react-navigation/native';
import {
  ScreenTransition,
  AnimatedScreenTransition,
} from 'react-native-reanimated';

const MainScreen = ({ navigation }: NativeStackScreenProps<ParamListBase>) => (
  <View style={[styles.container, styles.screenA]}>
    <Button title="Go ScreenB" onPress={() => navigation.navigate('ScreenB')} />
    <Button onPress={() => navigation.pop()} title="🔙 Back to Examples" />
  </View>
);

const ScreenB = ({ navigation }: NativeStackScreenProps<ParamListBase>) => (
  <View style={[styles.container, styles.screenB]}>
    <Button title="Go ScreenC" onPress={() => navigation.navigate('ScreenC')} />
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
);

const ScreenC = ({ navigation }: NativeStackScreenProps<ParamListBase>) => (
  <View style={[styles.container, styles.screenC]}>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
);

const Stack = createNativeStackNavigator();

const customTransition: AnimatedScreenTransition = {
  topScreenFrame: (event, screenSize) => {
    'worklet';
    const progress = event.translationX / screenSize.width;
    return {
      transform: [
        { translateX: event.translationX },
        { rotate: 20 * progress + 'deg' },
      ],
    };
  },
  belowTopScreenFrame: (event, screenSize) => {
    'worklet';
    const progress = event.translationX / screenSize.width;
    return {
      transform: [{ scale: 0.7 + 0.3 * progress }],
    };
  },
};

const ScreenAnimationExample = (): JSX.Element => (
  <GestureDetectorProvider>
    <Stack.Navigator
      screenOptions={{
        headerHideBackButton: true,
        stackAnimation: 'none',
        goBackGesture: 'swipeRight',
      }}>
      <Stack.Screen name="ScreenA" component={MainScreen} />
      <Stack.Screen
        name="ScreenB"
        component={ScreenB}
        options={{
          transitionAnimation: customTransition,
        }}
      />
      <Stack.Screen
        name="ScreenC"
        component={ScreenC}
        options={{
          transitionAnimation: ScreenTransition.SwipeRightFade,
        }}
      />
    </Stack.Navigator>
  </GestureDetectorProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  screenA: {
    backgroundColor: 'moccasin',
  },
  screenB: {
    backgroundColor: 'thistle',
  },
  screenC: {
    backgroundColor: 'blue',
  },
});

export default ScreenAnimationExample;
