import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Profile from '../components/Profile';
import { GITHUB_AUTH_TOKEN, GET_PROFILE_URL } from "../components/constants";
 
export default function HomeScreen({ navigation }) {

  const [value, setValue] = useState();
  const [profile, setProfile] = useState();
  const [loader, setLoader] = useState(false);
  const [initalLoad, setInitialLoad] = useState(true);

  const fetchProfile = async () => {
    setLoader(true)

    //Fetch Github Profile
    const response = await fetch(`${GET_PROFILE_URL}${value}`, {
      method: 'GET',
      headers: {
        Authorization: GITHUB_AUTH_TOKEN
      }
    }).then(res => res.json())
      .then(data => setProfile(data))

    setLoader(false);
    setInitialLoad(false);
  }

  return (
    <View style={styles.containerStyle}>

      <TextInput
        placeholder="Github Username"
        value={value}
        style={styles.serachbarStyle}
        onChangeText={(value) => { setValue(value) }}
      />

      <TouchableOpacity style={styles.buttonStyle} onPress={() => { fetchProfile() }}>
        <Text style={styles.btnTextStyle}>Search Profile</Text>
      </TouchableOpacity>

      {/* Will only run if API returns some value for given username */}
      {profile ?.name ?
        <Profile profile={profile} navigation={navigation} loader={loader} />
        :
        !initalLoad && <Text style={styles.textStyle}>No data Found</Text>
      }

      {loader && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center"
  },
  serachbarStyle: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: "60%",
    minHeight: "5%",
    borderRadius: 5,
    backgroundColor: "white",
    fontSize: 20,
    marginTop: "10%"
  },
  buttonStyle: {
    minWidth: "60%",
    minHeight: "5%",
    backgroundColor: "#0080FE",
    borderRadius: 5,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
    fontSize: 20,
  },
  btnTextStyle: {
    fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
    fontSize: 20,
    color: "white"
  }

});