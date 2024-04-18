import React, { useState, useRef, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, StatusBar,ActivityIndicator, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import DateTimePickerModal
import { useNavigation } from '@react-navigation/native';
import  Header  from '../components/Header/Header';
import MyBottomSheetModal from '../components/modalSheet/ModalSheet';
import RowWithButtons from '../components/Expense/ButtonView';
import PaymentModeSelector from '../components/Expense/ModalComponent';
import { activeOpacity, fonts, fontSize, fontSizes, theme } from '../theme/theme';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import ProductServicesList from '../components/Expense/SelectedProduct';
import EditExpense from '../components/Expense/EditExpenseModal';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';

const NewExpense = () => {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [desc,setDesc] = useState('');
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
  // console.log(selectedItems,'selectedItems')
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
console.log("images",selectedImages);


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
  const description = desc

  const requestBody = {
    description,
    transactions,
    attachedFiles,
    entryType: name === 'Income' ? 'Sales' : name,
    entryDate: selectedDate.toLocaleDateString("es-CL"), 
    chequeNumber: "",
    baseAccount
  };

  return requestBody;
};

  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <StatusBar backgroundColor={theme.colors.black} />
      <Header title={'New '+name+' Claim'} />
      {/* <ScrollView style={{borderWidth:2,borderColor:'blue'}}> */}
      <View style={styles.cardContainer}>
    {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
        <View style={styles.headerRow}>
          <View style={styles.userContainer}>
            <Image source={photo?{ uri: photo }:require('../../assets/images/user-picture.png')} style={styles.userImage} />
          </View>
          <Text style={styles.userText}>{user?.user?.name}</Text>
        </View>
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.iconContainer} activeOpacity={activeOpacity.regular} onPress={showDatePicker}>
            <AntDesign name="calendar" size={22} color={theme.colors.black} />
            <Text style={styles.text}>{selectedDate ? selectedDate.toDateString() : 'Select a date'}</Text>
          </TouchableOpacity>
          {/* <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', }}> */}
            <TouchableOpacity style={styles.dateButton} activeOpacity={activeOpacity.regular} onPress={isYesterdayFirst ? handleYesterday : handleToday}>
              <Text style={styles.dateButtonText}>{isYesterdayFirst ? 'Yesterday?' : 'Today?'}</Text>
            </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={styles.imgContainer}>
          <View style={styles.selectImageRow}>
            <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={handleImageSelection} style={styles.selectImageBox}>
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
    <TouchableOpacity style={styles.closeButton} activeOpacity={activeOpacity.regular} onPress={() => removeImage(index)}>
      <View style={styles.closeBtnIcon}>
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
          <Text style={styles.payText}>Payment Mode</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            activeOpacity={activeOpacity.regular} onPress={() => bottomSheetModalRef.current?.present()}
            style={styles.inputContainerStyle}
          ><Text style={styles.inputText}>{paymentMode?paymentMode.name:'Select'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.payText}>Comment/Description</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            multiline={true}
            numberOfLines={2}
            onChangeText={(text)=>setDesc(text)}
            placeholder='Add Description'
          />
        </View>
        <View style={styles.header}>
        {/* <FontAwesome5 name="box-open" size={20} color="black" style={styles.icon} /> */}
        <Text style={styles.text}>Selected Product/Services</Text>
        <Text style={[styles.text, { textAlign: 'right', flex: 1 }]}>INR</Text>
        </View>
        <ScrollView style={styles.productView} nestedScrollEnabled={true}>
          <ProductServicesList setSelectedProduct={setSelectedProduct} setSelectedItems={setSelectedItems} selectedItems={selectedItems} bottomSheetModalRefExpense={bottomSheetModalRefExpense}/>
        </ScrollView>
        <View style={styles.amountView}>
          <Text style={styles.amtText}>Total Amount </Text>
          <Text style={styles.amtText}>&#8377;{totalAmount}.00</Text>
        </View>
      </View>
      <View style={styles.btnView}>
        <RowWithButtons companyUniqueName={selectedCompany?.uniqueName} name={name} selectedItem={selectedItems} getBack={getBack} prepareRequestBody={prepareRequestBody}/>
      </View>
      <MyBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} intialSnap={'60%'} children={<PaymentModeSelector bottomSheetModalRef={bottomSheetModalRef} />} />
      <MyBottomSheetModal bottomSheetModalRef={bottomSheetModalRefExpense} intialSnap={'25%'} snapArr={['35%']} children={<EditExpense selectedProduct={selectedProduct} bottomSheetModalRef={bottomSheetModalRefExpense} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        />
          </ScrollView>
        </SafeAreaView>
          // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    // height:770,
    backgroundColor: theme.colors.black,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom:10,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: fontSize.large.size,
    fontFamily: fonts.medium,
    lineHeight: fontSize.large.lineHeight
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
    fontSize: fontSize.regular.size,
    lineHeight: fontSize.regular.lineHeight,
    marginBottom: 6,
  },
  cardContainer: {
    backgroundColor: 'white',
    height:'75%',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    flexDirection:'column'
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
    fontSize: fontSize.small.size,
    lineHeight: fontSize.small.lineHeight,
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
    fontSize: fontSize.xSmall.size,
    lineHeight:fontSize.xSmall.lineHeight
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
    // borderWidth:2,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  iconContainer: {
    // marginRight: 10,
    flexDirection:'row',
    alignItems:'center'
  },
  dateButton: {
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // borderRadius: 5,
    // borderWidth:3
    // marginHorizontal: 5,
  },
  dateButtonText: {
    fontSize: fontSize.regular.size,
    lineHeight: fontSize.regular.lineHeight,
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
    fontSize: fontSize.large.size,
    lineHeight: fontSize.large.lineHeight,
    fontFamily: fonts.bold,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30, 
    paddingHorizontal: 10
  },
  headerText: {
    alignSelf: 'center',
    marginLeft: 30,
    fontFamily: fonts.regular,
    fontSize: fontSize.xLarge.size,
    lineHeight: fontSize.xLarge.lineHeight
  },
  text: { 
    fontSize: fontSize.regular.size, 
    lineHeight:fontSize.regular.lineHeight, 
    fontFamily: fonts.regular, 
    paddingHorizontal: 5
  },
  imgContainer : { alignItems: 'center' },
  closeBtnIcon : {
    backgroundColor:theme.colors.gray2,
    flex:1,
    position: 'absolute',
    top: 3.5,
    right: -8.5,
    borderRadius: 10,
    width: 15,
    height: 15
  },
  payText : { 
    fontFamily: fonts.bold,
    fontSize: fontSize.small.size,
    lineHeight:fontSize.small.lineHeight, 
    color: theme.colors.gray, 
    marginTop: 10
  },
  inputContainer : { 
    paddingHorizontal: 20 
  },
  inputContainerStyle: {
    backgroundColor: theme.colors.LightGray, 
    borderRadius: 5,
    paddingHorizontal:10,
    justifyContent:'center',
    height:45, 
    marginTop: 5 
  },
  inputText :{
    fontFamily : fonts.regular,
    fontSize: fontSize.regular.size,
    lineHeight: fontSize.regular.lineHeight
  },
  inputField :{ 
    backgroundColor: theme.colors.LightGray, 
    borderRadius: 5, 
    paddingHorizontal: 10,
    // paddingVertical:5, 
    justifyContent:'center',
    height:45, 
    marginTop: 5,
    fontFamily : fonts.regular,
    fontSize: fontSize.regular.size,
    lineHeight: fontSize.regular.lineHeight
  },
  productView : {
    height:160,
    marginVertical:5,
    paddingHorizontal:10
  },
  amountView: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  amtText : {
    paddingVertical:10,
    paddingHorizontal:20,
    fontFamily:fonts.medium,
    fontSize:fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight
  },
  btnView : {
    paddingBottom:10,
    backgroundColor:theme.colors.black,
    width:'100%',
    height:'15%'
  }
});

export default NewExpense;
