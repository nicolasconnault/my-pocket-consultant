import React, { Component } from 'react';
import { View, Text, List, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CompanyCard from './CompanyCard.js';

class CompanyList extends Component {

      render() {
        return (
          <View>
             <FlatList
                data={this.props.companies}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CompanyCard company={item} />
                )}
              />
            </View>
        );
    }
} 

const mapStateToProps = state => {
  return { companies: state.companies };
};

export default connect(mapStateToProps)(CompanyList);
