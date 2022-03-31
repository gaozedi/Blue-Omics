import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/pipelineStore';
import PipelineListItem from './PipelineListItem';

const PipelineList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const items = activityStore.pipelineitems
  return (
    <Fragment>
      {items.map(item => (
        <Fragment >
          <Label size='large' color='blue'>
            {item.category}
          </Label>
          <Item.Group divided>

            <PipelineListItem key={item.id} activity={item} />

          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(PipelineList);
