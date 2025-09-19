import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomStatusBar = ( {backgroundColor, barStyle = 'light-content'}: {backgroundColor: any, barStyle?: any}) => {
    const insets = useSafeAreaInsets();
    return <View style={{height:insets.top, backgroundColor:backgroundColor,zIndex:1}}></View>
}

export default CustomStatusBar;