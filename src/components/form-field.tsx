import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type FormFieldProps<T extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur'
> & {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  deps?: FieldPath<T> | FieldPath<T>[];
};

/**
 * A labelled text input connected to react-hook-form.
 * Shows the field's validation message directly underneath it.
*/
export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  deps,
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={deps ? { deps } : undefined}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            accessibilityLabel={label}
            placeholderTextColor="#9AA0A6"
            style={[styles.input, error && styles.inputError]}
            {...inputProps}
          />
          {error?.message ? (
            <Text style={styles.errorText} accessibilityRole="alert">
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 6,
    fontSize: 14,
    color: '#DC2626',
  },
});