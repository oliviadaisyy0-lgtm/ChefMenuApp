import { Text, TouchableOpacity, View } from "react-native";
import styles from "../app/style";

export default function MenuCard({ item, courseLabel, onEdit, onDelete }) {
  return (
    <View style={styles.menuCard}>
      <View style={styles.menuCardHeaderRow}>
        <Text style={styles.menuItemName}>{item.dishName}</Text>
        <Text style={styles.menuItemPrice}>R{item.price}</Text>
      </View>

      <Text style={styles.menuItemDescription}>{item.description}</Text>

      <View style={styles.courseBadge}>
        <Text style={styles.courseBadgeText}>{courseLabel}</Text>
      </View>

      <View style={styles.cardActionRow}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
