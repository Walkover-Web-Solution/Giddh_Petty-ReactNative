import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import LoaderKit from 'react-native-loader-kit'
const ScheduleMeet = ({isModalVisible,setModalVisible,navigation}) => {
  return (
    <Modal
        isVisible={isModalVisible}
        coverScreen={false}
        backdropColor={'#000'}
        backdropOpacity={0.7}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        animationOutTiming={200}
        onBackdropPress={() => {
        setModalVisible(false);
        navigation.navigate('Home')
        }}
        >
        <WebView
        containerStyle={{backgroundColor: '#fff',
        width: '100%',
        marginVertical: 50,
        alignSelf: 'center',
        flex: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5}}
        source={{ uri: 'https://calendly.com/sales-accounting-software/talk-to-sale' }}
        originWhitelist={['*']}
        scrollEnabled={false}
        startInLoadingState={true}
        renderLoading={() => 
        <View style={styles.container}>
          <LoaderKit
          style={styles.loadKit}
          name={'BallPulse'}
          color={'black'}
          />
        </View>}
        // renderError={() => {
        // return (
        // <View style={style.renderErrorView}>
        // <Text style={style.renderErrorText}>Something Went Wrong.</Text>
        // <Text style={style.renderErrorText}>Please Try Again.</Text>
        // </View>
        // )
        // }}
        />
    </Modal>
  )
}

export default ScheduleMeet

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:[{ translateX: -25 }, { translateY: -25 }]
  },
  loadKit : { 
    width: 50, 
    height: 50
  }
})