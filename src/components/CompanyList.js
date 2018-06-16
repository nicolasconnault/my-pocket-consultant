import React, { Component } from 'react';
import { View, Text, List, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CompanyCard from './CompanyCard.js';

class CompanyList extends Component {

      render() {
        let companies = this.props.companiesWithConsultants
        if (this.props.listType == 'customerCompanies') {
            companies = this.props.customerCompanies
        }
        return (
          <View>
             <FlatList
                data={companies}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CompanyCard company={item} listType={this.props.listType} />
                )}
              />
            </View>
        );
    }
} 

const mapStateToProps = state => {
  return { 
    customerCompanies: state.customerCompanies,
    companiesWithConsultants: state.companiesWithConsultants,
  };
};

export default connect(mapStateToProps)(CompanyList);
