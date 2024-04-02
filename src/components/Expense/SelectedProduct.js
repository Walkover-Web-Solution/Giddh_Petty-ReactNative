import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';
import { fonts, theme } from '../../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ProductServicesList = ({ selectedItems, bottomSheetModalRefExpense, setSelectedProduct,setSelectedItems}) => {
  const handleDelete = (key) => {
        const updatedItems = { ...selectedItems };
        delete updatedItems[key];
        setSelectedProduct(updatedItems);
        setSelectedItems(updatedItems);
    };


  const renderRightActions = (progress, dragX, key) => {
    return (
      <TouchableOpacity onPress={() => handleDelete(key)} style={styles.rightAction}>
        {/* <Text style={styles.actionText}>Delete</Text> */}
        <AntDesign name="delete" size={20} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="box-open" size={20} color="black" style={styles.icon} />
        <Text style={styles.title}>Selected Product/Services</Text>
        <Text style={[styles.title, { color: theme.colors.secondary, textAlign: 'right', flex: 1 }]}>INR</Text>
      </View>
      {Object.entries(selectedItems).map(([key, value]) => (
        <Swipeable key={key} renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, key)}>
          <TouchableOpacity
            style={[styles.item, { backgroundColor: value.isSelected ? theme.colors.LightGray : 'white' }]}
            onPress={() => { setSelectedProduct({ [key]: value }); bottomSheetModalRefExpense?.current.present() }}
          >
            <Text style={styles.itemTitle}>{key}</Text>
            <Text style={styles.itemSubtitle}>1 &#215; &#8377;{value.amount}</Text>
          </TouchableOpacity>
        </Swipeable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
    marginTop: 3,
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.medium,
  },
  item: {
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.LightGray,
    marginBottom: 7,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    width: 75,
    marginBottom: 7,
  },
  actionText: {
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});

export default ProductServicesList;
