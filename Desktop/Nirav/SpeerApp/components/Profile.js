import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    Platform, 
    ActivityIndicator 
} from 'react-native';
import { GET_FOLLOWING_URL } from './constants';

const Profile = (props) => {
    const { profile, navigation, loader } = props;
    const {login, name, bio, followers_url, followers, following} = profile

    return (

        <View style={styles.cardStyle}>
            {loader && <ActivityIndicator size="small" color="#0000ff" />}
            <Image
                source={{ uri: profile.avatar_url }}
                style={styles.imageStyle}
                alt="No Image"
                resizeMode="contain"
            />
            <Text style={styles.textStyle}> UserName:  {login}</Text>
            <Text style={styles.textStyle}> Name:  {name}</Text>
            <Text style={styles.textStyle}> Description:  {bio || "N/A"}</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("Follower", { url: followers_url }) }}>
                <Text style={styles.linkTextStyle}> Follower Count:  {followers}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("Following", { url: GET_FOLLOWING_URL.replace("##_LOGIN_##",login) }) }}>
                <Text style={styles.linkTextStyle}> Following Count:  {following}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: "white",
        Height: "50%",
        Width: "80%",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        shadowOffset: {
            width: 2.5,
            height: 2.5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,

    },
    imageStyle: {
        height: 200,
        width: 250,
        marginVertical: 10,
    },
    textStyle: {
        fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
        fontSize: 20,
        textAlign: "left",
        marginVertical: 3,
    },
    linkTextStyle:{
        fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
        fontSize: 20,
        textAlign: "left",
        marginVertical: 3,
        color: "#0080FE"
    }
})

export default Profile