import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavouritesProvider } from '../hooks/useFavourites';
import { OffersProvider } from '../hooks/useOffers';
import { ConversationsProvider } from '../hooks/useConversations';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavouritesProvider>
          <OffersProvider>
            <ConversationsProvider>
              <StatusBar style="dark" />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="listing/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
                <Stack.Screen name="chat/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
                <Stack.Screen
                  name="modal/create-listing"
                  options={{ presentation: 'modal', headerShown: false }}
                />
                <Stack.Screen
                  name="modal/make-offer"
                  options={{ presentation: 'modal', headerShown: false }}
                />
                <Stack.Screen name="profile/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
                <Stack.Screen name="favourites" options={{ headerShown: false, animation: 'slide_from_right' }} />
              </Stack>
            </ConversationsProvider>
          </OffersProvider>
        </FavouritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
