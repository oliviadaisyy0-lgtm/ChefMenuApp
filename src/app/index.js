

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useMenu } from '../../MenuContext';
import styles from './style';

const FILTERS = ['All', 'Starter', 'Main', 'Dessert'];
const FILTER_LABELS = {
  All: 'All',
  Starter: 'Starters',
  Main: 'Mains',
  Dessert: 'Desserts',
};

export default function HomeScreen() {
  const router = useRouter();
  const { menuItems, showSuccessBanner } = useMenu();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems =
    activeFilter === 'All'
      ? menuItems
      : menuItems.filter((item) => item.course === activeFilter);

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuCardHeaderRow}>
        <Text style={styles.menuItemName}>{item.dishName}</Text>
        <Text style={styles.menuItemPrice}>R{item.price}</Text>
      </View>

      <Text style={styles.menuItemDescription}>{item.description}</Text>

      <View style={styles.courseBadge}>
        <Text style={styles.courseBadgeText}>{FILTER_LABELS[item.course] || item.course}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Christoffel's Menu</Text>
        <Image
          source={require('../../assets/images/chef-hat.png')}
          style={styles.chefHatImage}
          resizeMode="contain"
        />
        <Text style={styles.completeMenuText}>Complete Menu</Text>

        <View style={styles.tabRow}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.tabPill, activeFilter === filter && styles.tabPillActive]}
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

      <View style={styles.dividerLine} />
      <Text style={styles.activeFilterLabel}>{FILTER_LABELS[activeFilter]}</Text>

      {showSuccessBanner ? (
        <View style={styles.successBanner}>
          <Text>✅</Text>
          <Text style={styles.successBannerText}>Menu item added successfully</Text>
        </View>
      ) : null}

      <View style={styles.bodyContainer}>
        {filteredItems.length === 0 ? (
          <Text style={styles.emptyMessage}>
            No menu items in this category yet. Tap "Menu Item" below to add one.
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
          onPress={() => {
            console.log('Add Menu Item pressed');
            router.push('/adddishscreen');
          }}
        >
          <Text style={styles.addButtonText}>+ Menu Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}