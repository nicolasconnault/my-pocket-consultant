import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CompanyCard from './CompanyCard.js';

class CompanyList extends Component {

      render() {
        let companies = []
        
        if (this.props.companies.length > 0) {
            for (let company of this.props.companies) {
                if (this.props.listType == 'customerCompanies' || company.enabled == true) {
                    companies.push(company)
                } 
            }
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
    companies: state.companies,
  };
};

export default connect(mapStateToProps)(CompanyList);
