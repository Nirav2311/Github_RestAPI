import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import FollowingScreen from "../screens/FollowingScreen";
import FollowerScreen from "../screens/FollowerScreen";

export default function Navigation(){

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home"
                    component = {HomeScreen}
                    options = {{title: "Welcome"}}
                />
                <Stack.Screen 
                    name="Following"
                    component = {FollowingScreen}
                    options = {{title: "Following"}}
                />
                <Stack.Screen 
                    name="Follower"
                    component = {FollowerScreen}
                    options = {{title: "Follower"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}