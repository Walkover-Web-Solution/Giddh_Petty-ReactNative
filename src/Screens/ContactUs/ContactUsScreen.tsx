import { View } from "react-native";
import CustomStatusBar from "../../components/Header/CustomStatusBar";
import { theme } from "../../theme/theme";
import { ChatWidget } from "@msg91comm/react-native-hello-sdk";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";

interface User {
    name: string;
    uniqueName: string;
  }
  
interface HelloConfig {
    widgetToken: string;
    name: string;
    mail: string;
}

const ContactUsScreen = () => {
    const [helloConfig, setHelloConfig] = useState<HelloConfig>({
        widgetToken: "",
        name: "",
        mail: ""
      });
    const user = useSelector((state: { auth: { user: { user: User } } }) => state?.auth?.user?.user);
    
    useEffect(() => {
    if (user) {
        setHelloConfig({
        widgetToken: "88461",
        name: user.name || '',
        mail: user.uniqueName || ''
        });
    }
    }, [user]);

    return (
        <View style={{flex:1}}>
            <CustomStatusBar backgroundColor={theme.colors.black} />
            <Header title="Chat with us" />
            {/* <ChatWidgetModal
                helloConfig={helloConfig}
                widgetColor={theme.colors.black}
                statusBarStyle="dark-content"
                useKeyboardAvoidingView={false}
                containerStyle={{ top: insets.top, bottom: insets.bottom }}
                preLoaded={true} // Preloads widget content (default: true)
            /> */}
            <ChatWidget
                helloConfig={helloConfig}
                widgetColor={theme.colors.black}
                isCloseButtonVisible={false}
                useKeyboardAvoidingView={false}
            />
        </View>
    )
}

export default ContactUsScreen;