import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories();
  const [variables, setVariables] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onValueChange = (itemValue) => {
    setVariables(itemValue);

    const variables = JSON.parse(itemValue);
    refetch(variables);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);

    refetch({ searchKeyword });
  };

  const renderHeader = () => (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Picker selectedValue={variables} onValueChange={onValueChange}>
        <Picker.Item
          label="Latest repositories"
          value='{ "orderBy": "CREATED_AT" }'
        />
        <Picker.Item
          label="Highest rated repositories"
          value='{ "orderBy": "RATING_AVERAGE" }'
        />
        <Picker.Item
          label="Lowest rated repositories"
          value='{ "orderBy": "RATING_AVERAGE", "orderDirection": "ASC" }'
        />
      </Picker>
    </>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader()}
    />
  );
};

export default RepositoryList;
