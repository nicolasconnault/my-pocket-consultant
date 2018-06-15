import React, { Component } from 'react';
import { View, Text, List, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CompanyCard from './CompanyCard.js';

export default class CompanyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data: [],
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
        };
    }
    componentDidMount() {
        this.makeRemoteRequest();
      }

      makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `http://192.168.0.11/customer/companies_with_consultants.json`;
        this.setState({ loading: true });
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: page === 1 ? res.results : [...this.state.data, ...res.results],
              error: res.error || null,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

      render() {
        return (
          <View>
             <FlatList
                data={this.state.data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CompanyCard company={item} />
                )}
              />
            </View>
        );
    }
} 
