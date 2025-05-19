import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

// Sample user intake data - in real app would be stored
const initialIntake = [
  { id: '1', herb: 'Ihlamur (Linden)', time: '08:30', completed: true, date: '2023-09-28' },
  { id: '2', herb: 'Adaçayı (Sage)', time: '13:00', completed: false, date: '2023-09-28' },
  { id: '3', herb: 'Zencefil (Ginger)', time: '19:30', completed: false, date: '2023-09-28' },
];

// Sample recommendations based on user profile
const recommendations = [
  { id: '1', herb: 'Ihlamur (Linden)', reason: 'Good for your cold symptoms', timesPerDay: 2 },
  { id: '2', herb: 'Adaçayı (Sage)', reason: 'Helps with sore throat', timesPerDay: 1 },
  { id: '3', herb: 'Zencefil (Ginger)', reason: 'Supports your immune system', timesPerDay: 1 },
];

export default function TrackerScreen() {
  const colorScheme = useColorScheme();
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [intakeData, setIntakeData] = useState(initialIntake);

  // Toggle completion status for a herb intake
  const toggleCompletion = (id) => {
    setIntakeData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (intakeData.filter(item => item.completed).length / intakeData.length) * 100
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title">Wellness Tracker</ThemedText>
          <ThemedText type="subtitle">Track your daily wellness routine</ThemedText>
        </View>
        
        {/* Progress Card */}
        <ThemedView style={styles.progressCard}>
          <View style={styles.progressRow}>
            <ThemedText type="defaultSemiBold">Today's Progress</ThemedText>
            <ThemedText style={styles.progressPercent}>{completionPercentage}%</ThemedText>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${completionPercentage}%` }]} />
          </View>
          
          <ThemedText style={styles.progressText}>
            {intakeData.filter(item => item.completed).length} of {intakeData.length} herbs taken today
          </ThemedText>
        </ThemedView>
        
        {/* Today's Schedule */}
        <View style={styles.sectionContainer}>
          <ThemedText type="subtitle">Today's Schedule</ThemedText>
          
          {intakeData.map(item => (
            <ThemedView key={item.id} style={styles.scheduleCard}>
              <TouchableOpacity 
                style={[styles.checkbox, item.completed && styles.checkboxChecked]} 
                onPress={() => toggleCompletion(item.id)}
              >
                {item.completed && <IconSymbol name="checkmark" size={16} color="white" />}
              </TouchableOpacity>
              
              <View style={styles.scheduleInfo}>
                <ThemedText type="defaultSemiBold">{item.herb}</ThemedText>
                <ThemedText>Scheduled: {item.time}</ThemedText>
              </View>
              
              <View style={[styles.statusIndicator, item.completed ? styles.statusCompleted : styles.statusPending]}>
                <ThemedText style={item.completed ? styles.statusTextCompleted : styles.statusTextPending}>
                  {item.completed ? 'Taken' : 'Pending'}
                </ThemedText>
              </View>
            </ThemedView>
          ))}
        </View>
        
        {/* Personalized Recommendations */}
        <View style={styles.sectionContainer}>
          <ThemedText type="subtitle">Personalized Recommendations</ThemedText>
          
          {recommendations.map(rec => (
            <ThemedView key={rec.id} style={styles.recommendationCard}>
              <View style={styles.recommendationIcon}>
                <IconSymbol name="leaf.fill" size={24} color="#8BC34A" />
              </View>
              
              <View style={styles.recommendationInfo}>
                <ThemedText type="defaultSemiBold">{rec.herb}</ThemedText>
                <ThemedText>{rec.reason}</ThemedText>
                <ThemedText style={styles.recommendationDosage}>
                  Recommended: {rec.timesPerDay} {rec.timesPerDay > 1 ? 'times' : 'time'} daily
                </ThemedText>
              </View>
            </ThemedView>
          ))}
        </View>
        
        {/* Reminders Settings */}
        <ThemedView style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View>
              <ThemedText type="defaultSemiBold">Daily Reminders</ThemedText>
              <ThemedText>Get notified for your herb intake</ThemedText>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: '#767577', true: '#8BC34A' }}
              thumbColor={remindersEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingButton}>
            <ThemedText style={styles.settingButtonText}>Customize Schedule</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8BC34A" />
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8BC34A',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8BC34A',
    borderRadius: 5,
  },
  progressText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8BC34A',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8BC34A',
  },
  scheduleInfo: {
    flex: 1,
  },
  statusIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
  },
  statusCompleted: {
    backgroundColor: 'rgba(139, 195, 74, 0.2)',
  },
  statusTextPending: {
    color: '#FFC107',
    fontSize: 12,
  },
  statusTextCompleted: {
    color: '#8BC34A',
    fontSize: 12,
  },
  recommendationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  recommendationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139, 195, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recommendationInfo: {
    flex: 1,
    gap: 4,
  },
  recommendationDosage: {
    marginTop: 4,
    opacity: 0.7,
    fontSize: 13,
  },
  settingsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 200, 200, 0.3)',
  },
  settingButtonText: {
    color: '#8BC34A',
  },
}); 