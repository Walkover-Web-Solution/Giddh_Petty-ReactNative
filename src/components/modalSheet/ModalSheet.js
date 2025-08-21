import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TouchableWithoutFeedback,BackHandler } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView,useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyBottomSheetModal = ({snapArr=['50%','60%'], bottomSheetModalRef,children,modalStyle,horizontal=false,parentScrollEnable=true}) => {

  const {dismiss}=useBottomSheetModal()
  const insets = useSafeAreaInsets();
  // const {backgroundColor,detached} = modalStyle;
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
      backgroundStyle={{backgroundColor : modalStyle ? modalStyle?.backgroundColor : 'white' }}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      index={0}
      backdropComponent={({ style }) => (
          <TouchableWithoutFeedback onPress={()=>bottomSheetModalRef.current?.dismiss()}  ><View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }]}></View></TouchableWithoutFeedback>
      )}
      overlayOpacity={5}
      snapPoints={[...snapArr]}
      handleIndicatorStyle={{backgroundColor:modalStyle ? modalStyle?.backgroundColor : 'black'}}
      animated={true}
      keyboardBehavior={'extend'}
      keyboardBlurBehavior={'restore'}
    >
      <BottomSheetScrollView horizontal={horizontal} scrollEnabled={parentScrollEnable}>
        {children}
        <View style={{height: insets.bottom}}></View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default MyBottomSheetModal;
