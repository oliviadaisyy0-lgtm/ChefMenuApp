import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMenu } from "../../MenuContext";
import styles from "./style";

const COURSE_OPTIONS = ["Starter", "Main", "Dessert"];

const cleanPrice = (value) => value.replace(/[Rr\s]/g, "").replace(",", ".");

export default function AddDishScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { menuItems, addMenuItem, updateMenuItem } = useMenu();

  const isEditMode = !!params.id;
  const existingItem = isEditMode
    ? menuItems.find((item) => item.id === params.id)
    : null;

  const [dishName, setDishName] = useState(
    existingItem ? existingItem.dishName : "",
  );
  const [description, setDescription] = useState(
    existingItem ? existingItem.description : "",
  );
  const [course, setCourse] = useState(existingItem ? existingItem.course : "");
  const [price, setPrice] = useState(existingItem ? existingItem.price : "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = "please enter a dish name";
    }
    if (!description.trim()) {
      newErrors.description = "please enter a description";
    }
    if (!course) {
      newErrors.course = "please select a course";
    }
    if (!price.trim()) {
      newErrors.price = "please enter a price";
    } else {
      const cleaned = cleanPrice(price);
      if (isNaN(parseFloat(cleaned)) || parseFloat(cleaned) <= 0) {
        newErrors.price = "please enter a valid price greater than 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const dishData = {
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parseFloat(cleanPrice(price)).toFixed(2),
    };

    if (isEditMode) {
      updateMenuItem(params.id, dishData);
    } else {
      addMenuItem({ id: Date.now().toString(), ...dishData });
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.addScreenContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.addScreenTitle}>
            {isEditMode ? "Edit Dish" : "Add New Dish"}
          </Text>

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
            style={[
              styles.input,
              styles.multilineInput,
              errors.description && styles.inputError,
            ]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          {errors.description ? (
            <Text style={styles.errorText}>! {errors.description}</Text>
          ) : null}

          <Text style={styles.fieldLabel}>Select Course ▾</Text>
          <View
            style={[
              styles.pickerWrapper,
              errors.course && styles.pickerWrapperError,
            ]}
          >
            <Picker
              selectedValue={course}
              onValueChange={(value) => setCourse(value)}
            >
              <Picker.Item label="" value="" />
              {COURSE_OPTIONS.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
          {errors.course ? (
            <Text style={styles.errorText}>! {errors.course}</Text>
          ) : null}

          <Text style={styles.fieldLabel}>Price</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          {errors.price ? (
            <Text style={styles.errorText}>! {errors.price}</Text>
          ) : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>
              {isEditMode ? "Save Changes" : "+ Add Dish"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
