

import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMenu } from '../../MenuContext';
import styles from './style';

const COURSE_OPTIONS = ['Starter', 'Main', 'Dessert'];

export default function AddDishScreen() {
  const router = useRouter();
  const { addMenuItem } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'please enter a dish name';
    }
    if (!description.trim()) {
      newErrors.description = 'please enter a description';
    }
    if (!course) {
      newErrors.course = 'please select a course';
    }
    if (!price.trim()) {
      newErrors.price = 'please enter a price';
    } else {
      const cleanedPrice = price.replace(/[Rr\s]/g, '').replace(',', '.');
      if (isNaN(parseFloat(cleanedPrice)) || parseFloat(cleanedPrice) <= 0) {
        newErrors.price = 'please enter a valid price greater than 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDish = () => {
    if (!validate()) {
      return;
    }

    const cleanedPrice = price.replace(/[Rr\s]/g, '').replace(',', '.');
    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parseFloat(cleanedPrice).toFixed(2),
    };

    addMenuItem(newItem);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.addScreenContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.addScreenTitle}>Add New Dish</Text>

          <Text style={styles.fieldLabel}>Dish Name</Text>
          <TextInput
            style={[styles.input, errors.dishName && styles.inputError]}
            value={dishName}
            onChangeText={setDishName}
          />
          {errors.dishName ? (
            <Text style={styles.errorText}>! {errors.dishName}</Text>
          ) : null}

          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput, errors.description && styles.inputError]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          {errors.description ? (
            <Text style={styles.errorText}>! {errors.description}</Text>
          ) : null}

          <Text style={styles.fieldLabel}>Select Course ▾</Text>
          <View style={[styles.pickerWrapper, errors.course && styles.pickerWrapperError]}>
            <Picker selectedValue={course} onValueChange={(value) => setCourse(value)}>
              <Picker.Item label="" value="" />
              {COURSE_OPTIONS.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
          {errors.course ? <Text style={styles.errorText}>! {errors.course}</Text> : null}

          <Text style={styles.fieldLabel}>Price</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          {errors.price ? <Text style={styles.errorText}>! {errors.price}</Text> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleAddDish}>
            <Text style={styles.primaryButtonText}>+ Add Dish</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}