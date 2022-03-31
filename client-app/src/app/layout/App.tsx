import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PipelineDashboard from '../../features/pipeline/dashboard/PipelineDashboard';
import ItemDetails from '../../features/pipeline/details/ItemDetails';
import ActivityForm from '../../features/pipeline/form/ActivityForm';


const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={PipelineDashboard} />
              <Route path='/activities/:id' component={ItemDetails} />
              <Route
                key={location.key}
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
