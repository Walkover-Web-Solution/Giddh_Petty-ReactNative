import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomStatusBar = ( {backgroundColor, barStyle = 'light-content'}: {backgroundColor: any, barStyle?: any}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{height:insets.top, backgroundColor:backgroundColor,zIndex:1}}>
            {/* <StatusBar barStyle={barStyle as 'light-content' | 'dark-content'} backgroundColor={backgroundColor}/> */}
        </View>
    )
}

export default CustomStatusBar;