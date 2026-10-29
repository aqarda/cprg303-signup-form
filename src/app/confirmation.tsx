import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ConfirmationScreen() {
  // Only the first name is passed in the route params. Passwords never go in a URL.
  const { firstName } = useLocalSearchParams<{ firstName?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        {firstName ? `Account created for ${firstName}!` : 'Account created!'}
      </Text>
      <Text style={styles.message}>Your sign-up form was submitted successfully.</Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Back to Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },
});