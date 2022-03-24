import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import PipelineList from './PipelineList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const PipelineDashboard: React.FC = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading the pipeline' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PipelineList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PipelineDashboard);
