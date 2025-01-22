import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';

import { Colors } from '@/Constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Index',
          headerShown: false,
          contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].mainBg },
        }}
      />
      <Stack.Screen name="Home" options={{ title: 'Home', headerShown: false }} />
    </Stack>
  );
}
