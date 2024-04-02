import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TouchableWithoutFeedback,BackHandler } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView,useBottomSheetModal } from '@gorhom/bottom-sheet';

const MyBottomSheetModal = ({snapArr=['50%','60%'], bottomSheetModalRef,children}) => {

  const {dismiss}=useBottomSheetModal()
  
  useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        const res=dismiss()
        if(res)
        return true;
        else return false;
    });
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={{backgroundColor:'white'}}
      enablePanDownToClose={true}
      index={0}
      backdropComponent={({ style }) => (
          <TouchableWithoutFeedback onPress={()=>bottomSheetModalRef.current?.dismiss()}  ><View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }]}></View></TouchableWithoutFeedback>
      )}
      overlayOpacity={5}
      snapPoints={[...snapArr]}
      handleIndicatorStyle={{backgroundColor:'black'}}
      animated={true}
      keyboardBehavior={'extend'}
      keyboardBlurBehavior={'restore'}
    >
      <BottomSheetScrollView>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default MyBottomSheetModal;
