import { useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import FastImage from 'react-native-fast-image';
import { activeOpacity } from "../../theme/theme";
import LoaderKit from 'react-native-loader-kit'

const ImageViewer = ({bottomSheetModalRef, fileNames, setIsVisible})=>{
	  const [loading, setLoading] = useState(true);
    return (
      <View style={styles.container}>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={fileNames}
            horizontal
            renderItem={({item, index}) => (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  activeOpacity={activeOpacity.max}
                  key={item?.uniqueName}
                  style={{flex: 1 }}
                  onPress={() => setIsVisible({isVisible: true, index: index})}
                  >
                    {loading && <View style={styles.loaderView}>
                      <LoaderKit 
                        style={styles.loadKit}
                        name={'CubeTransition'}
                        color={'black'}
                      />
                    </View>}
                    <FastImage
                    style={styles.fastImage}
                    source={{uri:item?.uri,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    onLoadEnd={()=>setLoading(false)}
                    /> 
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  };
    
const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin:10
    },
    loadKit : { 
      width: 50, 
      height: 50
    },
    loaderView: {
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:[{ translateX: -25 }, { translateY: -25 }]
    },
    imageContainer: { 
      height:200, 
      width:210,
	    marginVertical:20, 
      marginHorizontal:2
    },
    fastImage: { 
      width: 200, 
      height: 200 ,
      borderRadius:13,
    }
})

export default ImageViewer;