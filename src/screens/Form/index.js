import React, {Component} from "react";
import {ImageBackground, Platform} from "react-native";
import {connect} from "react-redux";
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
  Label,
  Item,
  Input,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const glow2 = require("../../../assets/glow2.png");

class Form extends Component {
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
              <Title>Form</Title>
            </Body>
            <Right />
          </Header>

          <Content padder enableResetScrollToCoords={false}>
            <Card transparent style={styles.card}>
              <CardItem header>
                <Text style={{color: commonColor.inverseTextColor}}>
                  Input with icon
                </Text>
              </CardItem>
              <CardItem>
                <Item>
                  <Icon
                    active
                    name="person"
                    style={{color: commonColor.inverseTextColor}}
                  />
                  <Input
                    placeholder="Email"
                    placeholderTextColor="#878787"
                    style={{color: commonColor.inverseTextColor}}
                  />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{color: commonColor.inverseTextColor}}>Input</Text>
              </CardItem>
              <CardItem>
                <Item>
                  <Input
                    placeholder="Name"
                    placeholderTextColor="#878787"
                    style={{
                      color: commonColor.inverseTextColor,
                      marginLeft: Platform.OS === "ios" ? undefined : -3
                    }}
                  />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{color: commonColor.inverseTextColor}}>
                  Input with floating label
                </Text>
              </CardItem>
              <CardItem>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                    style={{
                      color: commonColor.inverseTextColor,
                      marginLeft: Platform.OS === "ios" ? undefined : -3
                    }}
                  />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{color: commonColor.inverseTextColor}}>
                  Input with inline label
                </Text>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>ALIAS</Label>
                  <Input
                    placeholder="John Doe"
                    style={{
                      color: commonColor.inverseTextColor,
                      top: Platform.OS === "ios" ? undefined : 1
                    }}
                  />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{color: commonColor.inverseTextColor}}>
                  Input with stacked label
                </Text>
              </CardItem>
              <CardItem>
                <Item stackedLabel style={{width: "100%"}}>
                  <Label>Address Line 1</Label>
                  <Input
                    placeholder="Address"
                    style={{
                      color: commonColor.inverseTextColor,
                      marginLeft: Platform.OS === "ios" ? undefined : -3
                    }}
                  />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{color: commonColor.inverseTextColor}}>
                  Input with Fixed label
                </Text>
              </CardItem>
              <CardItem>
                <Item fixedLabel>
                  <Label>Username</Label>
                  <Input style={{color: commonColor.inverseTextColor}} />
                </Item>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect()(Form);
