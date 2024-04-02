import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { fonts, fontSizes, theme } from '../theme/theme';
import ArrBack from '../../assets/images/back-arrow-navigation-svgrepo-com.svg';
import { useNavigation } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { environment } from '../environments/environment.prod';

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const route=useRoute();
  const {selectedItem,getBack,name}=route.params;
  const [selectedItems, setSelectedItems] = useState(selectedItem);
  const selectedCompany = useSelector((state) => state?.company?.selectedCompany?.uniqueName);
  const addExpense = useSelector((state) => state?.addExpense?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'ADD_EXPENSE',uniqueName:selectedCompany,groups:environment[name]});
  }, []);
  const handleSearchExpand = () => {
    setSearchExpanded(!isSearchExpanded);
  };

  const renderItem = ({ item }) => {
  const handleSelectButton = () => {
    setSelectedItems(prevState => ({
      ...prevState,
      [item?.uniqueName]: {
        isSelected: !prevState[item?.uniqueName]?.isSelected,
        amount: !prevState[item?.uniqueName]?.isSelected ? 0 : undefined,
        name: item?.name
      }
    }));
  };

  const handleDeleteButton = () => {
    const { [item?.uniqueName]: deletedItem, ...rest } = selectedItems;
    setSelectedItems(rest);
  };

  const { isSelected, amount } = selectedItems[item?.uniqueName] || {}; 

  if(item.type === 'ACCOUNT'){
    return (
      <View style={styles.listItem}>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: fonts.medium }}>{item?.name}</Text>
          {isSelected && <Text style={styles.subtitle}>Rate: {amount}</Text>}
        </View>
        <TouchableOpacity
          style={[styles.selectButton, { backgroundColor: isSelected ? 'red' : theme.colors.black,flexDirection:'row' }]}
          onPress={isSelected ? handleDeleteButton : handleSelectButton}>
          {isSelected ? <Entypo name="cross" paddingTop={3} size={18} color={'white'}/> : null}
          <Text style={[styles.selectButtonText, { color: theme.colors.white }]}>
            {isSelected ? 'Remove' : 'Select'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return null;
};


  return (
    <View style={styles.container}>
      {isSearchExpanded ? (
        <View style={styles.header}>
          <View style={styles.expandedSearch}>
            <AntDesign name="search1" size={20} color={theme.colors.black} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Product"
              placeholderTextColor={theme.colors.black}
            />
            <TouchableOpacity onPress={handleSearchExpand}>
              <AntDesign name="close" size={20} color={theme.colors.black} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();getBack(selectedItems)}}>
            <ArrBack height={25} width={30} paddingTop={3} />
          </TouchableOpacity>
          <Text style={[styles.title,{flex:1}]}>Add Expense</Text>
          <TouchableOpacity onPress={handleSearchExpand}>
            <AntDesign name="search1" size={24} color={theme.colors.white} paddingTop={3} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={addExpense}
        renderItem={renderItem}
        keyExtractor={(item) => item?.uniqueName}
        style={styles.list}
      />
      <TouchableOpacity onPress={()=>{
        navigation.goBack();
        getBack(selectedItems);
      }} style={{paddingVertical:12,width:'80%',backgroundColor:theme.colors.black,justifyContent:'center',alignItems:'center',alignSelf:'center',marginVertical:10,borderRadius:100}}>
        <Text style={{color:theme.colors.white,fontFamily:fonts.regular}}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 70,
    backgroundColor: theme.colors.black,
  },
  title: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    color: theme.colors.white,
    lineHeight:19,
    paddingLeft:20
  },
  expandedSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.LightGray,
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: theme.colors.black,
  },
  listItem: {
    flexDirection:'row',
    width: '100%',
    backgroundColor: theme.colors.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    justifyContent: 'space-between',
  },
  selectButton: {
    paddingVertical:7,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.black,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: theme.colors.black,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: theme.colors.black,
  },
});

export default AddExpenseScreen;
