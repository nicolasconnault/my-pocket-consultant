import React from 'react';
import { View, ScrollView } from 'react-native';
import { Drawer, Avatar } from 'react-native-material-ui';

export default class Menu extends React.Component {
    render() {
        return (
        <View>
          <Drawer>
            <Drawer.Header >
                <Drawer.Header.Account
                    avatar={<Avatar text="A" />}
                    accounts={[
                        { avatar: <Avatar text="B" /> },
                        { avatar: <Avatar text="C" /> },
                    ]}
                    footer={{
                        dense: true,
                        centerElement: {
                            primaryText: 'Reservio',
                            secondaryText: 'business@email.com',
                        },
                        rightElement: 'arrow-drop-down',
                    }}
                />
            </Drawer.Header>
            <Drawer.Section
                divider
                items={[
                    { icon: 'bookmark-border', value: 'Notifications' },
                    { icon: 'today', value: 'Calendar', active: true },
                    { icon: 'people', value: 'Clients' },
                ]}
            />
            <Drawer.Section
                title="Personal"
                items={[
                    { icon: 'info', value: 'Info' },
                    { icon: 'settings', value: 'Settings' },
                ]}
            />
          </Drawer>
        </View>
        );
    }
}
