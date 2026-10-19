import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMenu } from "../../MenuContext";
import MenuCard from "../components/MenuCard";
import styles from "./style";

const FILTERS = ["All", "Starter", "Main", "Dessert"];
const FILTER_LABELS = {
  All: "All",
  Starter: "Starters",
  Main: "Mains",
  Dessert: "Desserts",
};

export default function HomeScreen() {
  const router = useRouter();
  const { menuItems, deleteMenuItem, showSuccessBanner, bannerMessage } =
    useMenu();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [ownerName, setOwnerName] = useState("Christoffel");
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  const openNameModal = () => {
    setNameInput(ownerName);
    setNameError("");
    setNameModalVisible(true);
  };

  const saveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setNameError("please enter a name");
      return;
    }
    setOwnerName(trimmed.charAt(0).toUpperCase() + trimmed.slice(1));
    setNameModalVisible(false);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCourse =
      activeFilter === "All" || item.course === activeFilter;
    const matchesSearch = item.dishName
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const clearSearchAndFilter = () => {
    setSearchText("");
    setActiveFilter("All");
  };

  const confirmDelete = (item) => {
    if (Platform.OS === "web") {
      if (
        window.confirm(`Are you sure you want to delete "${item.dishName}"?`)
      ) {
        deleteMenuItem(item.id);
      }
      return;
    }
    Alert.alert(
      "Delete dish",
      `Are you sure you want to delete "${item.dishName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMenuItem(item.id),
        },
      ],
    );
  };

  const totalItems = menuItems.length;
  const averagePrice =
    totalItems === 0
      ? 0
      : menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) /
        totalItems;
  const countByCourse = (course) =>
    menuItems.filter((item) => item.course === course).length;

  const renderMenuItem = ({ item }) => (
    <MenuCard
      item={item}
      courseLabel={FILTER_LABELS[item.course] || item.course}
      onEdit={() =>
        router.push({ pathname: "/adddishscreen", params: { id: item.id } })
      }
      onDelete={() => confirmDelete(item)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.menuIconButton} onPress={openNameModal}>
          <View style={styles.menuIconLine} />
          <View style={styles.menuIconLine} />
          <View style={styles.menuIconLine} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{ownerName}'s Menu</Text>
        <Image
          source={require("../../assets/images/chef-hat.png")}
          style={styles.chefHatImage}
          resizeMode="contain"
        />
        <Text style={styles.completeMenuText}>Complete Menu</Text>

        <View style={styles.tabRow}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.tabPill,
                activeFilter === filter && styles.tabPillActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.tabPillText,
                  activeFilter === filter && styles.tabPillTextActive,
                ]}
              >
                {FILTER_LABELS[filter]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by dish name"
          placeholderTextColor="#B4A99B"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearSearchAndFilter}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerLine} />
      <Text style={styles.activeFilterLabel}>
        {FILTER_LABELS[activeFilter]}
      </Text>

      {showSuccessBanner ? (
        <View style={styles.successBanner}>
          <Text>✅</Text>
          <Text style={styles.successBannerText}>{bannerMessage}</Text>
        </View>
      ) : null}

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Menu Statistics</Text>
        <View style={styles.statsTopRow}>
          <View style={styles.statTile}>
            <Text style={styles.statNumber}>{totalItems}</Text>
            <Text style={styles.statLabel}>Total items</Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statNumber}>R{averagePrice.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Average price</Text>
          </View>
        </View>
        <View style={styles.statsPillRow}>
          <View style={styles.statPill}>
            <Text style={styles.statPillText}>
              Starters: {countByCourse("Starter")}
            </Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statPillText}>
              Mains: {countByCourse("Main")}
            </Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statPillText}>
              Desserts: {countByCourse("Dessert")}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        {filteredItems.length === 0 ? (
          <Text style={styles.emptyMessage}>
            No menu items found. Try clearing your search or filter, or add a
            new dish.
          </Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={renderMenuItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.addButtonWrapper}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => router.push("/adddishscreen")}
        >
          <Text style={styles.addButtonText}>+ Menu Item</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={nameModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Whose menu is this?</Text>
            <TextInput
              style={[styles.input, nameError ? styles.inputError : null]}
              placeholder="Enter your name"
              placeholderTextColor="#B4A99B"
              value={nameInput}
              onChangeText={setNameInput}
            />
            {nameError ? (
              <Text style={styles.errorText}>! {nameError}</Text>
            ) : null}
            <TouchableOpacity style={styles.primaryButton} onPress={saveName}>
              <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setNameModalVisible(false)}
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
