import React from "react";
import { Icon, FooterTab, Button, Footer as FTab } from "native-base";
import { createBottomTabNavigator } from "react-navigation";
import Spinner from "../../screens/Spinner/";
import ProgressBar from "../../screens/Progressbar/";
import CalendarNSP from "../../screens/Calendar/";
import Form from "../../screens/Form/";
import MyConsultants from "../../screens/MyConsultants/";
import styles from "./styles";

const FooterTabNavigation = createBottomTabNavigator(
  {
    MyConsultants: {
      screen: ({ screenProps, navigation }) => <MyConsultants navigation={navigation} />
    },
    Spinner: {
      screen: ({ screenProps, navigation }) =>
        <Spinner navigation={navigation} />
    },
    ProgressBar: {
      screen: ({ screenProps, navigation }) =>
        <ProgressBar navigation={navigation} />
    },
    Calendar: {
      screen: ({ screenProps, navigation }) =>
        <CalendarNSP navigation={navigation} />
    },
    Form: {
      screen: ({ screenProps, navigation }) => <Form navigation={navigation} />
    }
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => {
      return (
        <FTab>
          <FooterTab style={styles.footer}>
            <Button onPress={() => props.navigation.navigate("Calendar")}>
              <Icon name="calendar" style={{ color: "#fff" }} />
            </Button>
            <Button onPress={() => props.navigation.navigate("Form")}>
              <Icon name="paper" style={{ color: "#fff" }} />
            </Button>
            <Button onPress={() => props.navigation.navigate("MyConsultants")}>
              <Icon name="add-circle" style={{ color: "#fff" }} />
            </Button>
            <Button onPress={() => props.navigation.navigate("ProgressBar")}>
              <Icon active name="options" style={{ color: "#fff" }} />
            </Button>
            <Button onPress={() => props.navigation.navigate("Spinner")}>
              <Icon name="ios-refresh-circle" style={{ color: "#fff" }} />
            </Button>
          </FooterTab>
        </FTab>
      );
    }
  }
);

export default FooterTabNavigation;
