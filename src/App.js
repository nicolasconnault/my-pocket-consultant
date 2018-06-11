import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Root } from "native-base";

// import Login from "./screens/Login/";
// import SignUp from "./screens/SignUp/";
import MyConsultants from "./screens/MyConsultants/";
import MyCompanies from "./screens/MyCompanies/";
import SelectAConsultant from "./screens/SelectAConsultant/";
import SideBar from "./screens/Sidebar/";
import ProgressBar from "./screens/Progressbar/";
import Spinner from "./screens/Spinner/";
import Calendar from "./screens/Calendar/";
import Form from "./screens/Form/";
import ModalNSP from "./screens/Modal/";
import FooterTabNavigation from "./components/Footer/tabNavigation";

const Drawer = createDrawerNavigator(
  {
    FooterTabNavigation: { screen: FooterTabNavigation },
    MyConsultants: { screen: MyConsultants },
    MyCompanies: { screen: MyCompanies },
    SelectAConsultant: { screen: SelectAConsultant },
    ProgressBar: { screen: ProgressBar },
    Spinner: { screen: Spinner },
    Calendar: { screen: Calendar },
    Form: { screen: Form },
    ModalNSP: { screen: ModalNSP }
  },
  {
    initialRouteName: "MyConsultants",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const App = createStackNavigator(
  {
    // Login: Login,
    // SignUp: SignUp,
    MyConsultants: MyConsultants,
    MyCompanies: MyCompanies,
    SelectAConsultant: SelectAConsultant,
    Drawer: {screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;

