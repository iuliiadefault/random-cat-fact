import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { queryClient } from '@/scripts/QueryClient';

// https://github.com/expo/router/discussions/272

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: '',
              headerShown: true,
              contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].mainBg },
              headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].mainBg },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Fact"
            options={{
              title: 'Facts',
              // contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].buttonBgPrimary },
              presentation: 'modal',
            }}
          />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
