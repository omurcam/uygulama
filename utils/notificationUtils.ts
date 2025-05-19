import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

// Configure notifications
export const configureNotifications = async () => {
  // Set notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Request permission (iOS)
  if (Platform.OS === 'ios') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow notifications to receive reminders for your herb intake.'
      );
      return false;
    }
  }

  return true;
};

// Schedule a notification
export const scheduleHerbReminder = async (
  title: string,
  body: string,
  hour: number,
  minute: number,
  repeats = true
): Promise<string | null> => {
  try {
    const trigger = {
      hour,
      minute,
      repeats,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { type: 'herb-reminder' },
      },
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Cancel a specific notification
export const cancelNotification = async (notificationId: string): Promise<void> => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};

// Get all scheduled notifications
export const getAllScheduledNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};

// Example specific notification for an herb
export const scheduleIhlamurReminder = async (
  time: { hour: number; minute: number }
): Promise<string | null> => {
  return await scheduleHerbReminder(
    'Ihlamur (Linden) Tea Time',
    'Time to prepare your daily Ihlamur tea to boost your immune system.',
    time.hour,
    time.minute
  );
};

// Example specific notification for an herb
export const scheduleAdacayiReminder = async (
  time: { hour: number; minute: number }
): Promise<string | null> => {
  return await scheduleHerbReminder(
    'Adaçayı (Sage) Reminder',
    'Time for your Adaçayı tea to support your throat health.',
    time.hour,
    time.minute
  );
}; 