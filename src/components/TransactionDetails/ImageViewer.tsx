import { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Modal, TouchableOpacity, FlatList } from "react-native";
import FastImage from 'react-native-fast-image';
import { activeOpacity } from "../../theme/theme";

const ImageViewer = (bottomSheetModalRef:any)=>{
    const [imageuri, setImageuri] = useState('');
    const [
      modalVisibleStatus, setModalVisibleStatus
    ] = useState(false);
    
    const [dataSource, setDataSource] = useState([
        {"fileName": "1000000018.png", "fileSize": 3361, "height": 192, "originalPath": "/sdcard/.transforms/synthetic/picker/0/com.android.providers.media.photopicker/media/1000000018.png", "responseData": null, "type": "image/png", "uploading": true, "uri": "file:///data/user/0/com.giddh.petty.cash/cache/rn_image_picker_lib_temp_86c4d541-bf53-4858-b5f8-7a14f310e7b0.png", "width": 192},
        {"fileName": "1000000020.jpg", "fileSize": 4115, "height": 240, "originalPath": "/sdcard/.transforms/synthetic/picker/0/com.android.providers.media.photopicker/media/1000000020.jpg", "responseData": null, "type": "image/jpeg", "uploading": true, "uri": "file:///data/user/0/com.giddh.petty.cash/cache/rn_image_picker_lib_temp_2a77ea8c-9c7d-4c54-b2f0-96815cd21c8a.jpg", "width": 192},
        {"fileName": "1000000022.jpg", "fileSize": 10465, "height": 89, "originalPath": "/sdcard/.transforms/synthetic/picker/0/com.android.providers.media.photopicker/media/1000000022.jpg", "responseData": null, "type": "image/jpeg", "uploading": true, "uri": "file:///data/user/0/com.giddh.petty.cash/cache/rn_image_picker_lib_temp_b6060c90-80b1-43ba-87ae-4df4f225e40f.jpg", "width": 192}]);
  
    // useEffect(() => {
    //   let items = Array.apply(null, Array(120)).map((v, i) => {
    //     return {
    //       id: i,
    //       src: 'https://unsplash.it/400/400?image=' + (i + 1)
    //     };
    //   });
    //   setDataSource(items);
    // }, []);
  
    // const showModalFunction = (visible, imageURL) => {
    //   setImageuri(imageURL);
    //   setModalVisibleStatus(visible);
    // };
  
    return (
      <SafeAreaView style={styles.container}>
            {/* <Text style={styles.titleStyle}>
              Grid Image Gallery in React Native
            </Text> */}
            <FlatList
              data={dataSource}
              renderItem={({item}) => (
                <View style={styles.imageContainerStyle}>
                  <TouchableOpacity
                    activeOpacity={activeOpacity.regular}
                    key={item.fileName}
                    style={{flex: 1}}
                    // onPress={() => {
                    //   showModalFunction(true, item.src);
                    // }}
                    >
                        <FastImage
                        source={{uri:item?.uri}} 
                        />
                  </TouchableOpacity>
                </View>
              )}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
      </SafeAreaView>
    );
  };
    
    
    
//     {
//     return (
//         <View style={styles.container}>
//             <Text>Images</Text>
//         </View>
//     );
// }

const styles  = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    }
})

export default ImageViewer;