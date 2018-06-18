import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import ConsultantCard from './ConsultantCard.js';

class ConsultantList extends Component {

      render() {
        let consultants = []
        
        if (this.props.consultants.length > 0) {
            for (let consultant of this.props.consultants) {
                if (this.props.listType == 'selectAConsultant') {
                    console.log(consultant)
                    for (let company of consultant.companies) {
                        if (company.id == this.props.companyId) {
                            consultants.push(consultant)
                        }
                    }
                } 
            }
        }

        return (
          <View>
             <FlatList
                data={consultants}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ConsultantCard consultant={item} listType={this.props.listType} companyId={this.props.companyId} currentConsultantId={this.props.currentConsultantId} />
                )}
              />
            </View>
        );
    }
} 

const mapStateToProps = state => {
  return { 
    consultants: state.consultants,
  };
};

export default connect(mapStateToProps)(ConsultantList);
