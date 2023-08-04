import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    Platform, 
    ActivityIndicator 
} from 'react-native';
import {GITHUB_AUTH_TOKEN, GET_PROFILE_URL} from './constants';

const ListView = (props) => {
    const { url } = props;
    const [data, setData] = useState();
    const [expanded, setExpanded] = useState();
    const [profile, setProfile] = useState();
    const [loader, setLoader] = useState(false);
    const [listLoader, setlistLoader] = useState(false);

    useEffect(() => {
        fetchProfiles();
    }, [])

    // Fetch list of Followers/Following users 
    const fetchProfiles = async () => {
        setlistLoader(true)

        await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: GITHUB_AUTH_TOKEN
            }
        }).then(res => res.json())
          .then(data => setData(data))

        setlistLoader(false)
    }

    //Fetch Github profile of user
    const onPressList = async (user, index) => {
        if (expanded == index) {
            setExpanded(-1)
        } else {
            setExpanded(index)
            setLoader(true)
            await fetch(`${GET_PROFILE_URL}${user}`, {
                method: 'GET',
                headers: {
                    Authorization: GITHUB_AUTH_TOKEN
                }
            }).then(res => res.json())
              .then(data => setProfile(data))

            setLoader(false)
        }

    }

    // UI for Followers/Following userlist
    const List = (props) => {
        const { item, index } = props;
        return (
            <View>
                <TouchableOpacity style={{
                    flexDirection: "column",
                    justifyContent: "center",

                }}
                    onPress={() => { onPressList(item.login, index) }}
                >
                    <View style={styles.listView}>
                        <Image
                            source={{ uri: item.avatar_url }}
                            style={styles.avatarStyle}
                            alt="No Image"
                        />
                        <Text style={styles.textStyle}>{item.login} </Text>
                    </View>
                    <View style={styles.borderStyle} />
                </TouchableOpacity>
                {expanded == index && profile?.name ?
                    <View style={styles.descStyle}>
                        {
                        loader ? <ActivityIndicator size="small" color="#0000ff" /> :
                            <>
                                <Text style={styles.descTextStyle}> UserName:  {profile.login}</Text>
                                <Text style={styles.descTextStyle}> Name:  {profile.name}</Text>
                                <Text style={styles.descTextStyle}> Description:  {profile.bio || "N/A"}</Text>
                                <Text style={styles.descTextStyle}> Follower Count:  {profile.followers}</Text>
                                <Text style={styles.descTextStyle}> Following Count:  {profile.following}</Text>
                            </>
                        }
                    </View>
                    : null 
                }
            </View>
        )
    }

    return (
        <View style={styles.containerStyle}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <List item={item} index={index} />}
                keyExtractor={item => item.id}
                refreshing={listLoader}
                onRefresh={fetchProfiles}
            />
            {listLoader && <ActivityIndicator size="small" color="#0000ff" />}
        </View>
    )
}

export default ListView

const styles = StyleSheet.create({
    listView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
    },
    borderStyle: {
        height: 1,
        width: "100%"
    },
    avatarStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginVertical: 5,
        marginHorizontal: 10
    },
    textStyle: {
        fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
        fontSize: 20,
    },
    descStyle: {
        marginBottom: 10,
    },
    descTextStyle: {
        fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
        fontSize: 18,

    },

})
