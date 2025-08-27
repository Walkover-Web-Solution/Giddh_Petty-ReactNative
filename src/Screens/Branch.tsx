import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { activeOpacity, fontSize, fonts, theme } from '../theme/theme';
import { setSelectedBranch } from '../redux/company/BranchSlice';
import  Header  from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../components/Header/CustomStatusBar';

const Branch: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const selectedBranch = useSelector((state: any) => state?.branch?.selectedBranch);
  const branches = useSelector((state: any) => state?.branch?.branches);
  const navigation = useNavigation();

  const renderBranchItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.branchItem}
      activeOpacity={activeOpacity.regular}
      onPress={() => {
        dispatch(setSelectedBranch(item));
        navigation.replace('Drawer');
      }}
    >
      <Text style={[styles.branchName, { color: selectedBranch?.alias === item?.alias ? theme.colors.secondary : theme.colors.text }]}>
        {item?.alias}
      </Text>
      {selectedBranch?.alias === item?.alias && <Text style={styles.tickIcon}>&#10004;</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <CustomStatusBar backgroundColor={theme.colors.black}/>
      <Header title={"Select a Branch"} />
      <View style={styles.listView}>
        <FlatList
          data={branches}
          keyExtractor={(item) => item.alias}
          renderItem={renderBranchItem}
        />
      </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:theme.colors.black
  },
  subContainer: {
    flex:1,
    backgroundColor:theme.colors.LightGray
  },
  listView:{
    flex:1
  },
  branchItem: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingLeft: 40,
  },
  branchName: {
    fontSize: fontSize.regular.size,
    fontFamily: fonts.regular,
    textDecorationLine: 'none'
  },
  tickIcon: {
    fontSize: fontSize.large.size,
    color: theme.colors.secondary,
    paddingRight: 40,
    fontFamily: fonts.regular
  },
});

export default Branch;
