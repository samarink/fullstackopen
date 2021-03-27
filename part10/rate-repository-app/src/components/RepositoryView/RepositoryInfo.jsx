import React from 'react';
import RepositoryItem from '../RepositoryItem';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem fullView {...repository} />;
};

export default RepositoryInfo;
