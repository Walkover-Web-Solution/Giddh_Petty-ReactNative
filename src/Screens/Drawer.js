import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/Drawer/Drawer';
import ScheduleMeet from '../components/scheduleMeet/scheduleMeet';
import Home from './Home';
import React,{useState} from 'react';

const Drawer = createDrawerNavigator();

export function MyDrawer() {

const [visible, setVisible] = useState(false);

  return (
    <Drawer.Navigator  drawerContent={(props) => (
        <CustomDrawer
            {...props}
            setVisible={setVisible}
        />
      )}
    >  
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Drawer.Screen name="ScheduleMeet" options={{headerShown:false}}>
        {props => <ScheduleMeet {...props} isModalVisible={visible} setModalVisible={setVisible}  /> }
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}