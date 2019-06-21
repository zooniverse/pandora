import React from 'react';
import OrganisationList from '../containers/OrganisationListContainer';
import ProjectList from '../containers/ProjectListContainer';

export default function Home(props) {
  return (
    <React.Fragment>
      <OrganisationList />
      <ProjectList />
    </React.Fragment>
  )
}