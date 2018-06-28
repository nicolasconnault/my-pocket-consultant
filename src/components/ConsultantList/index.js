import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import ConsultantCard from '../ConsultantCard'
import { UserListPropType, IdPropType, ListTypePropType } from '../../proptypes'

class ConsultantList extends Component {
  render() {
    const myConsultants = []
    const {
      consultants, listType, companyId, currentConsultantId,
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
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ConsultantCard
              consultant={item}
              listType={listType}
              companyId={companyId}
              currentConsultantId={currentConsultantId}
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
}
ConsultantList.defaultProps = {
  currentConsultantId: null,
  companyId: null,
  listType: 'selectConsultant',
  consultants: [],
}

export default ConsultantList
