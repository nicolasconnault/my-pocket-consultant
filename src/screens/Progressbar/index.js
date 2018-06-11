import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Left,
  Body,
  Right
} from "native-base";
import styles from "./styles";
import ProgressBar from "../../components/progressbar/ProgressBar";

const commonColor = require("../../theme/variables/commonColor");
const glow2 = require("../../../assets/glow2.png");

class ProgressBarNSP extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={glow2} style={styles.containerImage}>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon active name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>ProgressBar</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <Card transparent>
              <CardItem header>
                <Text style={{ color: commonColor.inverseTextColor }}>
                  Default ProgressBar
                </Text>
              </CardItem>
              <CardItem style={{ paddingVertical: 30 }}>
                <ProgressBar
                  progress={25}
                  color={commonColor.defaultProgressColor}
                />
              </CardItem>
              <CardItem header>
                <Text style={{ color: commonColor.inverseTextColor }}>
                  Inverse ProgressBar
                </Text>
              </CardItem>
              <CardItem style={{ paddingVertical: 30 }}>
                <ProgressBar progress={76} />
              </CardItem>
              <CardItem header>
                <Text style={{ color: commonColor.inverseTextColor }}>
                  Custom ProgressBar
                </Text>
              </CardItem>
              <CardItem style={{ paddingVertical: 30 }}>
                <ProgressBar color={commonColor.brandDanger} progress={39} />
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect()(ProgressBarNSP);
