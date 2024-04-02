import React, { useState, useRef, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, StatusBar,ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import DateTimePickerModal
import { useNavigation } from '@react-navigation/native';
import  Header  from '../components/Header/Header';
import MyBottomSheetModal from '../components/modalSheet/ModalSheet';
import RowWithButtons from '../components/Expense/ButtonView';
import PaymentModeSelector from '../components/Expense/ModalComponent';
import { fonts, fontSizes, theme } from '../theme/theme';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import ProductServicesList from '../components/Expense/SelectedProduct';
import EditExpense from '../components/Expense/EditExpenseModal';
import axios from 'axios';

const NewExpense = () => {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isYesterdayFirst, setIsYesterdayFirst] = useState(true);
  const [description, setDescription] = useState('');
  const [selectedItems,setSelectedItems]=useState({});
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRefExpense = useRef(null);
  const route = useRoute();
  const { name } = route.params;
  const user = useSelector(state => state?.auth?.user);
  const photo = useSelector(state => state?.auth?.photo);
  const paymentMode=useSelector(state=>state?.payment?.selectedMode)
  const selectedCompany=useSelector(state=>state?.company?.selectedCompany)
   const calculateTotalAmount = () => {
    let totalAmount = 0;
    Object.values(selectedItems).forEach(item => {
      if (item.isSelected) {
        totalAmount += item.amount;
      }
    });
    return totalAmount;
  };

  const totalAmount = calculateTotalAmount();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  console.log(selectedItems,'selectedItems')
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setIsYesterdayFirst(true);
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
    setIsYesterdayFirst(false);
  };

  const handleImageSelection = () => {
  const options = {
    mediaType: 'photo',
    selectionLimit: 5 - selectedImages.length,
  };
  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('Image selection cancelled');
    } else if (response.error) {
      console.error('ImagePicker Error: ', response.error);
    } else {
      const updatedImages = response.assets.map(asset => ({
        ...asset,
        uploading: true,
        responseData: null 
      }));
      setSelectedImages([...selectedImages, ...updatedImages]);
      response.assets.forEach((asset, index) => {
        const formData = new FormData();
        formData.append(`file`, { uri: asset.uri, type: asset.type, name: `image_${index}.jpg` });
        axios.post(`https://api.giddh.com/company/${selectedCompany?.uniqueName}/ledger/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'session-id': user?.session?.id,
          },
        })
        .then((response) => {
          setSelectedImages(prevImages => {
            return prevImages.map(img => {
              if (img.uri === asset.uri) {
                return { ...img, uploading: false, responseData: response.data.body };
              }
              return img;
            });
          });
        })
        .catch((error) => {
          console.error('Error sending FormData to POS API:', error);
          setSelectedImages(prevImages => prevImages.filter(img => img.uri !== asset.uri));
        });
      });
    }
  });
};


  const [selectedProduct,setSelectedProduct]=useState({});
  const getBack=(item)=>{
    setSelectedItems(item);
  }
  const removeImage = (indexToRemove) => {
    setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
  };
  const prepareRequestBody = () => {
    
  const transactions = Object.entries(selectedItems).map(([key, value]) => ({
    amount: value.amount,
    particular: key,
    name: value.name
  }));
  const attachedFiles = selectedImages.map(image => ({
    uniqueName: image.responseData?.uniqueName 
  }));
  const baseAccount = {
    name: paymentMode?.name,
    uniqueName: paymentMode?.uniqueName
  };

  const requestBody = {
    transactions,
    attachedFiles,
    entryType: name,
    entryDate: selectedDate.toDateString(), 
    chequeNumber: "",
    baseAccount
  };

  return requestBody;
};

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.black} />
        <Header title={'New '+name+' Claim'} />
        <View style={styles.cardContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.headerRow, { marginTop: 30, paddingHorizontal: 10 }]}>
            <View style={styles.userContainer}>
              <Image source={photo?{ uri: photo }:require('../../assets/images/user-picture.png')} style={styles.userImage} />
            </View>
            <Text style={styles.userText}>{user?.user?.name}</Text>
          </View>
          <View style={styles.dateRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={showDatePicker}>
              <AntDesign name="calendar" size={22} color={theme.colors.black} />
            </TouchableOpacity>
            <Text style={{ fontSize: fontSizes.medium, fontFamily: fonts.regular, paddingHorizontal: 5, }}>{selectedDate ? selectedDate.toDateString() : 'Select a date'}</Text>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', }}>
              <TouchableOpacity style={styles.dateButton} onPress={isYesterdayFirst ? handleYesterday : handleToday}>
                <Text style={styles.dateButtonText}>{isYesterdayFirst ? 'Yesterday?' : 'Today?'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.selectImageRow}>
              <TouchableOpacity onPress={handleImageSelection} style={styles.selectImageBox}>
                <Text style={styles.selectImageText}>Select Image</Text>
              </TouchableOpacity>
              <ScrollView horizontal={true} contentContainerStyle={styles.selectedImagesContainer} showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
                {selectedImages.map((image, index) => (
  image?.uploading ? (
    <View key={index} style={styles.imageContainer}>
      <ActivityIndicator size="small" color={theme.colors.secondary} />
    </View>
  ) : (
    <View key={index} style={styles.imageContainer}>
      <Image source={{ uri: image.uri }} style={styles.image} />
      <TouchableOpacity style={styles.closeButton} onPress={() => removeImage(index)}>
        <View style={{backgroundColor:theme.colors.gray2,flex:1,position: 'absolute',
    top: 3.5,
    right: -8.5,
    borderRadius: 10,
    width: 15,
    height: 15,}}>
        </View>
          <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  )
))}

              </ScrollView>
            </View>
          </View>
          <View style={styles.paymentRow}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 12, color: theme.colors.gray, marginTop: 15, }}>Payment Mode</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.present()}
              style={{ backgroundColor: theme.colors.LightGray, borderRadius: 5,paddingVertical:10,paddingHorizontal:10, marginTop: 5 }}
            ><Text style={{fontFamily:fonts.regular,fontSize:fontSizes.small}}>{paymentMode?paymentMode.name:'Select'}</Text></TouchableOpacity>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 12, color: theme.colors.gray }}>Comment/Description</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
              style={{ backgroundColor: theme.colors.LightGray, borderRadius: 5, padding: 10, marginTop: 5 }}
              multiline={true}
              numberOfLines={2}
              placeholder='Add Description'
            />
          </View>
          <ProductServicesList setSelectedProduct={setSelectedProduct} setSelectedItems={setSelectedItems} selectedItems={selectedItems} bottomSheetModalRefExpense={bottomSheetModalRefExpense}/>
    </ScrollView>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{paddingVertical:10,paddingHorizontal:20,fontFamily:fonts.medium}}>Total Amount </Text>
    <Text style={{paddingVertical:10,paddingHorizontal:20,fontFamily:fonts.medium}}>&#8377;{totalAmount}.00</Text>
    </View>
        </View>
        <RowWithButtons companyUniqueName={selectedCompany?.uniqueName} name={name} selectedItem={selectedItems} getBack={getBack} prepareRequestBody={prepareRequestBody}/>
        <MyBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} intialSnap={'60%'} children={<PaymentModeSelector bottomSheetModalRef={bottomSheetModalRef} />} />
        <MyBottomSheetModal bottomSheetModalRef={bottomSheetModalRefExpense} intialSnap={'35%'} children={<EditExpense selectedProduct={selectedProduct} bottomSheetModalRef={bottomSheetModalRefExpense} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  userContainer: {
    borderRadius: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginLeft: 5,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 37,
    height: 37,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  userText: {
    alignSelf: 'center',
    marginLeft: 15,
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
    marginBottom: 6,
  },
  cardContainer: {
    backgroundColor: 'white',
    height: '75%',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  selectImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  selectImageBox: {
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: theme.colors.white,
  },
  selectImageText: {
    fontSize: fontSizes.small,
    color: theme.colors.black,
    writingDirection: 'rtl',
    textAlign: 'center',
    fontFamily: fonts.regular
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 5,
    width: 70,
    height: 70,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: theme.colors.white,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: 3,
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 30,
    height: 30,
  },
  closeButtonText: {
    position: 'absolute',
    right: -4.5,
    top:2,
    color: theme.colors.black,
    fontFamily: fonts.bold,
    fontSize: fontSizes.extraSmall,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dateButtonText: {
    fontSize: fontSizes.medium,
    color: theme.colors.secondary,
    fontFamily: fonts.regular,
  },
  descriptionRow: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 80,
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: '75%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: theme.colors.secondary,
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    alignSelf: 'center',
    marginLeft: 30,
    fontFamily: fonts.regular,
    fontSize: fontSizes.extraLarge,
  },
});

export default NewExpense;
