import React from 'react'
import { View } from 'react-native'
import ListView from '../components/ListView';

export default function FollowingScreen(props) {

    const { url } = props.route.params

    return (
        <View>
            <ListView url={url} />
        </View>
    )
}
