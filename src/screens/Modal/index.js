import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Right,
  Left,
  Body,
  Button,
  Icon
} from "native-base";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const glow2 = require("../../../assets/glow2.png");

class ModalNSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true
    };
  }
  openModal1() {
    this.modal1.open();
  }
  closeModal1() {
    this.modal1.close();
  }
  openModal2() {
    this.modal2.open();
  }
  closeModal2() {
    this.modal2.close();
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={glow2} style={styles.containerImage}>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => navigation.navigate("DrawerOpen")}
              >
                <Icon active name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Modal</Title>
            </Body>
            <Right />
          </Header>

          <Content>
            <View style={styles.box}>
              <View style={styles.space}>
                <Button block rounded onPress={() => this.openModal1()}>
                  <Text style={{ color: commonColor.textColor }}>
                    Basic Modal
                  </Text>
                </Button>
              </View>
              <View style={styles.space}>
                <Button block rounded onPress={() => this.openModal2()}>
                  <Text style={{ color: commonColor.textColor }}>
                    Custom Modal
                  </Text>
                </Button>
              </View>
            </View>

            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={c => {
                this.modal1 = c;
              }}
              swipeToClose={this.state.swipeToClose}
            >
              <View style={styles.space}>
                <Text
                  style={{
                    color: commonColor.inverseTextColor,
                    marginBottom: 10
                  }}
                >
                  Basic modal
                </Text>
                <Button rounded onPress={() => this.closeModal1()}>
                  <Text style={{ color: commonColor.textColor }}>
                    Close Modal
                  </Text>
                </Button>
              </View>
            </Modal>

            <Modal
              style={[styles.modal, styles.modal2]}
              backdrop={false}
              ref={c => {
                this.modal2 = c;
              }}
              swipeToClose={false}
            >
              <Button
                transparent
                style={{ position: "absolute", top: 0, right: 0 }}
                onPress={() => this.closeModal2()}
              >
                <Icon
                  name="close"
                  style={{ color: commonColor.inverseTextColor }}
                />
              </Button>
              <View style={styles.space}>
                <Text style={{ color: commonColor.inverseTextColor }}>
                  This is a full screen modal.
                </Text>
              </View>
            </Modal>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect()(ModalNSP);
