import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { selectConsultant } from '../../../actions'
import { ConsultantConfirmModal, ConsultantList, Container } from '../../../components'
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
      modalShown: false,
      selectedConsultantName: '',
      selectedConsultantId: '',
      currentConsultantId: null,
    }

    this.allConsultants = []
    this.modalHandler = this.modalHandler.bind(this)
    this.dispatchSelectConsultant = this.dispatchSelectConsultant.bind(this)
  }

  componentWillMount() {
    const { consultants } = this.props
    this.allConsultants = consultants
    this.setState({ filteredConsultants: consultants })
  }

  filterList = (search) => {
    const filteredList = []
    const regexp = new RegExp(search)
    this.allConsultants.forEach((consultant) => {
      if (consultant.firstName.match(regexp) || consultant.lastName.match(regexp)) {
        filteredList.push(consultant)
      }
    })
    this.setState({ filteredConsultants: filteredList })
  }

  // This prepares the modal for the selectConsultant action and displays the modal
  modalHandler(selectedConsultantId, selectedConsultantName, currentConsultantId) {
    this.setState({
      selectedConsultantId,
      selectedConsultantName,
      currentConsultantId,
      modalShown: true,
    })
  }

  dispatchSelectConsultant(selectedConsultantId, currentConsultantId, action) {
    const {
      navigation,
      companies,
      dispatch,
    } = this.props

    if (action === 'confirm') {
      dispatch(selectConsultant(companies, navigation.getParam('companyId'), selectedConsultantId, currentConsultantId))
    }
    navigation.navigate('CompanySettings', { companyId: navigation.getParam('companyId') })
  }

  render() {
    const { navigation, companies } = this.props
    const {
      filteredConsultants,
      selectedConsultantId,
      selectedConsultantName,
      currentConsultantId,
      modalShown,
    } = this.state

    let title = 'Select a Consultant'
    if (navigation.getParam('mode') === 'replace') {
      title = 'Select a new Consultant'
    }

    const modal = (modalShown === false) ? null : (
      <ConsultantConfirmModal
        name={selectedConsultantName}
        selectedConsultantId={selectedConsultantId}
        currentConsultantId={currentConsultantId}
        dispatchFunction={this.dispatchSelectConsultant}
      />
    )

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
            modalHandler={this.modalHandler}
          />
        </View>
        {modal}
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
