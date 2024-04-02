import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, theme } from '../theme/theme';
import { setSelectedBranch } from '../redux/company/BranchSlice';
import  Header  from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';

const Branch: React.FC = () => {
  const dispatch = useDispatch();
  const selectedBranch = useSelector((state: any) => state?.branch?.selectedBranch);
  const branches = useSelector((state: any) => state?.branch?.branches);
  const navigation = useNavigation();

  const renderBranchItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.branchItem}
      onPress={() => {
        dispatch(setSelectedBranch(item));
        navigation.push('Drawer');
      }}
    >
      <Text style={[styles.branchName, { color: selectedBranch?.alias === item?.alias ? theme.colors.secondary : theme.colors.text }]}>
        {item?.alias}
      </Text>
      {selectedBranch?.alias === item?.alias && <Text style={styles.tickIcon}>&#10004;</Text>}
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar backgroundColor={theme.colors.black} />
      <Header title={"Select a Branch"} />
      <View style={styles.container}>
        <FlatList
          data={branches}
          keyExtractor={(item) => item.alias}
          renderItem={renderBranchItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
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
    fontSize: 14,
    fontFamily: fonts.regular,
    textDecorationLine: 'none',
  },
  tickIcon: {
    fontSize: 17,
    color: theme.colors.secondary,
    paddingRight: 40,
    fontFamily: fonts.regular,
  },
});

export default Branch;
