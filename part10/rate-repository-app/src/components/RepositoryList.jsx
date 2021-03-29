import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';
import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories();
  const [variables, setVariables] = useState();

  const onValueChange = (itemValue) => {
    setVariables(itemValue);
    const variables = JSON.parse(itemValue);
    refetch(variables);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
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
      }
    />
  );
};

export default RepositoryList;
