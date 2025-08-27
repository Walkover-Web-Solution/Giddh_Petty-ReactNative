import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable
import { activeOpacity, fontSize, fonts, theme } from '../../theme/theme';
import AntDesign from '@react-native-vector-icons/ant-design';
import { useSelector } from 'react-redux';
const ProductServicesList = ({ selectedItems, bottomSheetModalRefExpense, setSelectedProduct,setSelectedItems}) => {
  const handleDelete = (key) => {
        const updatedItems = { ...selectedItems };
        delete updatedItems[key];
        setSelectedProduct(updatedItems);
        setSelectedItems(updatedItems);
    };
  const selectedCompany = useSelector(state => state?.company?.selectedCompany);

  const renderRightActions = (progress, dragX, key) => {
    return (
      <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={() => handleDelete(key)} style={styles.rightAction}>
        {/* <Text style={styles.actionText}>Delete</Text> */}
        <AntDesign name="delete" size={20} color="black" />
      </TouchableOpacity>
    );
  };
  return (
    // <ScrollView style={styles.container} nestedScrollEnabled={true}>
    <View>
      {Object.entries(selectedItems).map(([key, value]) => (
        <Swipeable key={key} renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, key)}>
          <TouchableOpacity
            style={[styles.item, { backgroundColor: value.isSelected ? theme.colors.LightGray : 'white' }]}
            activeOpacity={activeOpacity.regular}
            onPress={() => { setSelectedProduct({ [key]: value }); bottomSheetModalRefExpense?.current.present() }}
          >
            <Text style={styles.itemTitle}>{selectedItems?.[key]?.name}</Text>
            <Text style={styles.itemSubtitle}>1 x {selectedCompany?.subscription?.planDetails?.currency?.symbol ?? '\u20B9'}{value.amount}</Text>
          </TouchableOpacity>
        </Swipeable>
      ))}
      </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height:150
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
    // marginTop: 3,
  },
  item: {
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderRadius:5,
    borderBottomColor: theme.colors.LightGray,
    margin: 5,
  },
  itemTitle: {
    fontSize: fontSize.large.size,
    fontFamily:fonts.regular
  },
  itemSubtitle: {
    fontSize: fontSize.regular.size,
    color: 'gray',
    fontFamily:fonts.regular,
    lineHeight: fontSize.regular.lineHeight
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    width: 75,
    marginBottom: 7,
  }
});

export default ProductServicesList;
