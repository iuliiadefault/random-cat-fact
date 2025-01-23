import { ActivityIndicator, Dimensions, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/hook/commonTypes';

import { Colors } from '@/constants/Colors';
import { queryClient } from '@/scripts/QueryClient';
import { useCatFacts } from '@/services/CatFact';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;

export default function Fact() {
  const colorScheme = useColorScheme();

  const offset = useSharedValue<number>(0);
  const pressed = useSharedValue<boolean>(false);

  const { data, isFetching } = useCatFacts();

  const initiateRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['catFact'] });
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onFinalize(event => {
      if (Math.abs(event.translationX) > CARD_WIDTH / 2) {
        offset.value = withSequence(
          withTiming(SCREEN_WIDTH * Math.sign(event.translationX)),
          withTiming(0, { duration: 0 }),
        );
        pressed.value = false;
        runOnJS(initiateRefetch)();
        return;
      }
      offset.value = withSpring(0);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(
    () =>
      ({
        transform: [
          { translateX: offset.value },
          { scale: interpolate(Math.abs(offset.value), [0, SCREEN_WIDTH / 2 + 100], [1, 0]) },
        ],
        opacity: interpolate(Math.abs(offset.value), [0, SCREEN_WIDTH / 2 + 100], [1, 0]),
        // https://github.com/software-mansion/react-native-reanimated/issues/4548
      }) as DefaultStyle,
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[styles.factContainer, animatedStyles, { backgroundColor: Colors[colorScheme ?? 'light'].skin }]}
          >
            {isFetching ? <ActivityIndicator size="large" /> : <Text>{data?.fact}</Text>}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  factContainer: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
  },
});
