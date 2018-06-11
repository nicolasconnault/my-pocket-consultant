import React, {Component} from "react";
import {ImageBackground} from "react-native";
import {connect} from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Right,
  Left,
  Body,
  Icon
} from "native-base";
import {Calendar as MonthCalendar} from "react-native-calendars";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const glow2 = require("../../../assets/glow2.png");

type Props = {
  navigation: () => void,
  day: string
}

class Calendar extends Component {
  state: {
    date: Object,
    selected: string
  }
  props: Props
  constructor(props: Props) {
    super(props);
    this.state = {
      date: new Date(),
      selected: ""
    };
  }

  onDateChange(date: Object) {
    this.setState({date});
  }
  onDayPress(day: any) {
    this.setState({
      selected: day.dateString
    });
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={glow2} style={styles.containerImage}>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Calendar</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <MonthCalendar
              firstDay={1}
              onDayPress={e => this.onDayPress(e)}
              markedDates={{[this.state.selected]: {selected: true}}}
              monthFormat={"MMM yyyy"}
              hideExtraDays
              theme={{
                calendarBackground: "transparent",
                textSectionTitleColor: "#A9AAAB",
                selectedDayBackgroundColor: commonColor.brandPrimary,
                selectedDayTextColor: "#fff",
                todayTextColor: commonColor.brandPrimary,
                dayTextColor: "#fff",
                arrowColor: "#00c497",
                monthTextColor: "#fff",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14
              }}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect()(Calendar);
