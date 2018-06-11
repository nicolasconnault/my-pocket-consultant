import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Item,
  Input,
  View,
  Text,
  Left,
  Body,
  Right,
  Spinner
} from "native-base";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const glow2 = require("../../../assets/glow2.png");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }

  render() {
    const navigation = this.props.navigation;

    if (this.state.timePassed) {
      setTimeout(() => {}, 2000);
      return <Spinner />;
    } else {
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
                <Title>SignUp</Title>
              </Body>
              <Right />
            </Header>

            <Content padder>
              <View padder>
                <View style={styles.mb25}>
                  <Item underline>
                    <Icon active name="person" />
                    <Input
                      placeholder="Name"
                      placeholderTextColor="rgba(230,230,230,0.8)"
                      style={{ color: "#fff" }}
                    />
                  </Item>
                </View>

                <View style={styles.mb25}>
                  <Item underline>
                    <Icon name="mail-open" />
                    <Input
                      placeholder="Email"
                      placeholderTextColor="rgba(230,230,230,0.8)"
                      style={{ color: "#fff" }}
                    />
                  </Item>
                </View>

                <View style={styles.mb25}>
                  <Item underline>
                    <Icon name="unlock" />
                    <Input
                      placeholder="Password"
                      placeholderTextColor="rgba(230,230,230,0.8)"
                      style={{ color: "#fff" }}
                      secureTextEntry
                    />
                  </Item>
                </View>

                <View style={styles.mb25}>
                  <Item underline>
                    <Icon name="calendar" />
                    <Input
                      placeholder="Birthday"
                      placeholderTextColor="rgba(230,230,230,0.8)"
                      style={{ color: "#fff" }}
                    />
                  </Item>
                </View>

                <View style={styles.mb25}>
                  <Item underline>
                    <Icon active name="transgender" />
                    <Input
                      placeholder="Gender"
                      placeholderTextColor="rgba(230,230,230,0.8)"
                      style={{ color: "#fff" }}
                    />
                  </Item>
                </View>

                <Button
                  light
                  rounded
                  block
                  onPress={() =>
                    this.props.navigation.goBack() &&
                    this.setState({ timePassed: true })}
                  style={{ marginTop: 20 }}
                >
                  <Text style={{ color: commonColor.brandPrimary }}>
                    Save and Continue
                  </Text>
                </Button>
              </View>
            </Content>
          </ImageBackground>
        </Container>
      );
    }
  }
}

export default connect()(SignUp);
