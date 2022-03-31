import React, { FormEvent, useContext, useEffect,useRef } from 'react';
import { Button, Form, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/pipelineStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import pipelineStore from '../../../app/stores/pipelineStore';

interface DetailParams {
  id: string;
}

const ItemDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const store = useContext(pipelineStore);
  const { checkServerStatus, onFileChange } = store;
  const inputEl = useRef<HTMLInputElement>();
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    // setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    checkServerStatus()
  };

const handlefile=(e:FileList)=>{
  inputEl.current!.focus();

}
  return (
    <Grid>
      <Grid.Column width={10}>
        {/* <ActivityDetailedHeader activity={activity} /> */}
        {/* <ActivityDetailedInfo activity={activity} /> */}
        {/* <ActivityDetailedChat /> */}

        <Segment clearing>
          {/* <Form onSubmit={handleSubmit}> */}
          <Form >
            <Form.Input
              onChange={handleInputChange}
              name='title'
              placeholder='Job Name'
            // value={activity.title}
            />
            <Segment placeholder>
              <Header icon>
                <Icon name='file' />
                No documents are listed for this job.
            
              </Header>
              <Button primary>Add Document</Button>
            </Segment>
            <input type="file"  onChange={ (e) => handleInputChange(e) } />
            <Form.Input
              label='Schedule a running Slot. Jobs run immediately whenver server is free:'
              onChange={handleInputChange}
              name='date'
              type='datetime-local'
              placeholder='Schedule Running Slot'
            />

            <Button
              onClick={handleSubmit}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              // onClick={() => history.push('/activities')}
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <ActivityDetailedSidebar /> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ItemDetails);
