

import { Stack } from 'expo-router';
import { MenuProvider } from '../../MenuContext';

export default function Layout() {
  return (
    <MenuProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MenuProvider>
  );
}