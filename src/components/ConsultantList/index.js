import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import ConsultantCard from '../ConsultantCard'
import {
  UserListPropType,
  IdPropType,
  ListTypePropType,
  CallbackPropType,
} from '../../proptypes'

class ConsultantList extends Component {
  render() {
    const myConsultants = []
    const {
      consultants, listType, companyId, currentConsultantId, modalHandler,
    } = this.props

    if (consultants.length > 0 && listType === 'selectConsultant') {
      consultants.forEach((consultant) => {
        consultant.companies.forEach((company) => {
          if (company.id === companyId) {
            myConsultants.push(consultant)
          }
        })
      })
    }

    return (
      <View>
        <FlatList
          data={consultants}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <ConsultantCard
              consultant={item}
              listType={listType}
              companyId={companyId}
              currentConsultantId={currentConsultantId}
              modalHandler={modalHandler}
            />
          )}
        />
      </View>
    )
  }
}

ConsultantList.propTypes = {
  currentConsultantId: IdPropType,
  companyId: IdPropType,
  listType: ListTypePropType,
  consultants: UserListPropType,
  modalHandler: CallbackPropType,
}
ConsultantList.defaultProps = {
  currentConsultantId: null,
  companyId: null,
  listType: 'selectConsultant',
  consultants: [],
  modalHandler: null,
}

export default ConsultantList
