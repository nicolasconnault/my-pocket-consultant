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

export default () =>
  <Root>
    <FooterTabNavigation />
  </Root>;
