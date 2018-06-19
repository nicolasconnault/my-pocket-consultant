import React from 'react'
import { View, Platform } from 'react-native'
import { COLOR } from 'react-native-material-ui'
import { IonIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

class MyIcon extends React.Component {
    render() {
        let iconComponent = null
        let iconTable = {
            cart: { ios: 'ios-cart', android: 'shopping-cart' },
            chat: { ios: 'ios-chatbubbles', android: 'chat' },
            document: { ios: 'ios-document', android: ['IonIcons', 'md-document'] },
            download: { ios: 'ios-download', android: 'download' },
            edit: { ios: 'ios-create', android: 'md-create' },
            email: { ios: 'ios-mail', android: 'mail' },
            facebook: { ios: 'logo-facebook', android: [MaterialCommunityIcons, 'facebook'] },
            filter: { ios: [MaterialIcons, 'filter-list'], android: 'filter-list' },
            globe: { ios: 'ios-globe-outline', android: [IonIcons, 'md-globe'] },
            heart: { ios: 'ios-heart', android: [IonIcons, 'md-heart'] },
            hide: { ios: 'ios-eye-off', android: [IonIcons, 'md-eye-off'] },
            history: { ios: [MaterialIcons, 'history'], android: 'history' },
            home: { ios: 'ios-home', android: 'home' },
            infoCircle: { ios: 'ios-information-circle-outline', android: 'info-outline' },
            list: { ios: 'ios-list', android: 'list' },
            lock: { ios: 'ios-lock', android: 'lock' },
            logOut: { ios: 'ios-log-out', android: [IonIcons, 'md-log-out'] },
            menu: { ios: 'ios-menu', android: 'menu' },
            newMessage: { ios: 'ios-chatboxes', android: [MaterialCommunityIcons, 'message-alert'] },
            news: { ios: [MaterialCommunityIcons, 'newspaper'], android: [MaterialCommunityIcons, 'newspaper'] },
            note: { ios: 'ios-clipboard-outline', android: [IonIcons, 'md-clipboard'] },
            notifications: { ios: 'ios-notifications', android: 'notifications' },
            parcel: { ios: [MaterialCommunityIcons, 'package-variant'], android: [MaterialCommunityIcons, 'package-variant'] },
            payment: { ios: 'ios-card', android: 'credit-card' },
            people: { ios: 'ios-people', android: 'people' },
            person: { ios: 'ios-person', android: 'person' },
            phoneCall: { ios: 'ios-call', android: 'call' },
            play: { ios: 'ios-play', android: 'play-circle-filled' },
            refresh: { ios: 'ios-refresh', android: 'refresh' },
            school: { ios: 'ios-school', android: 'school' },
            security: { ios: 'ios-play', android: 'play-circle-filled' },
            settings: { ios: 'ios-settings', android: 'settings' },
            show: { ios: 'ios-eye', android: [IonIcons, 'md-eye'] },
            sort: { ios: [MaterialIcons, 'sort'], android: 'sort' },
            subscriptions: { ios: [MaterialIcons, 'business'], android: 'business' },
            sync: { ios: 'ios-sync', android: 'sync' },
            thumbDown: { ios: 'ios-thumbs-down', android: 'thumb-down' },
            thumbUp: { ios: 'ios-thumbs-up', android: 'thumb-up' },
            trash: { ios: 'ios-trash', android: [IonIcons, 'md-trash'] },
            twitter: { ios: 'logo-twitter', android: [MaterialCommunityIcons, 'twitter'] },
            warning: { ios: 'ios-warning', android: 'warning' },
        }

        let iconEntry = iconTable[this.props.iconKey]

        if (iconEntry != undefined) {
            let iconKey = iconEntry[Platform.OS]
            let MyComponent = (Platform.OS === 'ios') ? IonIcons : MaterialIcons

            if (Array.isArray(iconKey) && iconKey.length == 2) {
                MyComponent = iconKey[0]
                iconKey = iconKey[1]
            }

            return ( <View><MyComponent name={iconKey} size={20} color={COLOR.pink500} /></View> )
        } else {
            return ( <View></View> )
        }
    }
}

export default MyIcon
