import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { FormField } from '@/components/form-field';
import { signUpSchema, type SignUpFormData } from '@/schemas/sign-up-schema';

const defaultValues: SignUpFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpScreen() {
  const { control, handleSubmit, setFocus } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  // Only runs when every field passes the Zod schema.
  // The values here are already trimmed by the schema.
  const onSubmit = ({ firstName, lastName, email }: SignUpFormData) => {
    // Passwords are not logged because they are sensitive data.
    console.log('Sign-up submitted:', { firstName, lastName, email });

    router.replace({ pathname: '/confirmation', params: { firstName } });
  };

  // handleSubmit validates with the Zod schema and calls onSubmit only if the form is valid.
  const submit = () => handleSubmit(onSubmit)();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.title} accessibilityRole="header">
        Create your account
      </Text>
      <Text style={styles.subtitle}>All fields are required.</Text>

      <FormField
        control={control}
        name="firstName"
        label="First name"
        placeholder="Leandro"
        autoCapitalize="words"
        autoComplete="given-name"
        returnKeyType="next"
        onSubmitEditing={() => setFocus('lastName')}
      />
      <FormField
        control={control}
        name="lastName"
        label="Last name"
        placeholder="Loyao"
        autoCapitalize="words"
        autoComplete="family-name"
        returnKeyType="next"
        onSubmitEditing={() => setFocus('email')}
      />
      <FormField
        control={control}
        name="email"
        label="Email"
        placeholder="leandroemail@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        returnKeyType="next"
        onSubmitEditing={() => setFocus('password')}
      />
      <FormField
        control={control}
        name="password"
        label="Password"
        placeholder="At least 8 characters"
        deps="confirmPassword" 
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => setFocus('confirmPassword')}
      />
      <FormField
        control={control}
        name="confirmPassword"
        label="Confirm password"
        placeholder="Please Re-enter your password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={submit}
      />

      <Pressable
        accessibilityRole="button"
        onPress={submit}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});