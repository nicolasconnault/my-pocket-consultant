[
    { 
        type: 'Drawer',
        title: 'Customer',
        screens: [
            { title: 'Notifications' },
            { title: 'My Consultants' },
            { title: 'My Companies' },
            { title: 'News' },
            { title: 'Settings' },
            { title: 'Log out' },
            { title: 'Help & Feedback' }
        ]
    },
    { 
        type: 'Drawer',
        title: 'Consultant',
        screens: [
            { title: 'To-do List' },
            { 
                title: 'My Subscriptions', 
                type: 'StackNavigation',
                screens: [
                    { title: 'New Subscription' },
                    { title: 'Website URL' },
                    { title: 'Request a new company' },
                    { title: 'Inactive Subscription' },
                    { title: 'Activate Subscription' },
                    { title: 'Terms & Conditions (modal)' },
                    { title: 'Payment Method (modal)' },
                    { title: 'Cancel Subscription (modal)' },
                    { title: 'Subscription Menu' },
                    { title: 'Subscription Details' },
                    { title: 'My Profile' },
                ]
            },
            { 
                title: 'My Customers',
                type: 'StackNavigation',
                screens: [
                    { title: 'Customer Card' },
                    { title: 'Filter Customers (modal)' },
                    { title: 'Customer Notes' },
                    { title: 'New Customer Note' },
                    { title: 'Set up call reminder (modal)' },
                ]
            },
            { 
                title: 'News',
                type: 'StackNavigation',
                subNavigation: {
                    type: 'TopMaterialTabNavigator',
                    screens: [ { title: 'News', params: [ companyId: companyId ]} ]
                },
                screens: [
                    { title: 'News Details' },
                    { title: 'Edit News' },
                    { title: 'Create Newr' }, 
                ]
            },
            { 
                title: 'Settings', 
                type: 'StackNavigation',
                screens: [{ title: 'Billing' }]
            },
            { title: 'Log out' },
            { title: 'Help & Feedback' },
            { title: 'Terms & Conditions' }
        ]
    },

