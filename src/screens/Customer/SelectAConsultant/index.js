import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import Container from '../../../components/Container'
import ConsultantList from '../../../components/ConsultantList'

import { UserListPropType, CompanyListPropType } from '../../../proptypes'

class SelectAConsultant extends React.Component {
  static navigationOptions = {
    title: 'Select a Consultant',
    headerLeft: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      filteredConsultants: [],
    }
    this.allConsultants = []
  }

  componentWillMount() {
    const { consultants } = this.props
    this.allConsultants = consultants
    this.setState({ filteredConsultants: consultants })
  }

  filterList = (search) => {
    console.log(search)
    const filteredList = []
    const regexp = new RegExp(search)
    this.allConsultants.forEach((consultant) => {
      if (consultant.firstName.match(regexp) || consultant.lastName.match(regexp)) {
        filteredList.push(consultant)
      }
    })
    this.setState({ filteredConsultants: filteredList })
  }

  render() {
    const { navigation, companies } = this.props
    const { filteredConsultants } = this.state
    let title = 'Select a Consultant'
    if (navigation.getParam('mode') === 'replace') {
      title = 'Select a new Consultant'
    }

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={title}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: this.filterList,
          }}
        />
        <View style={{ flex: 1 }}>
          <ConsultantList
            consultants={filteredConsultants}
            companies={companies}
            navigation={navigation}
            listType="selectAConsultant"
            companyId={navigation.getParam('companyId')}
            currentConsultantId={navigation.getParam('currentConsultantId')}
          />
        </View>
        
      </Container>
    )
  }
}

SelectAConsultant.propTypes = {
  consultants: UserListPropType,
  companies: CompanyListPropType,
}
SelectAConsultant.defaultProps = {
  consultants: null,
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
  consultants: state.consultants,
})

export default connect(mapStateToProps)(SelectAConsultant)
