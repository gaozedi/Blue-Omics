import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IPipelineItem } from '../models/pipelineitem';
import agent from '../api/agent';
import { IUserJob } from '../models/userjob';

configure({enforceActions: 'always'});

class PipelineStore {
 @observable pipelineitems: IPipelineItem[] = []
  @observable activity: IPipelineItem | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable file: FileList | null = null

  // @computed get activitiesByDate() {
  //   return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
  // }

  // groupActivitiesByDate(activities: IPipelineItem[]) {
  //   const sortedActivities = activities.sort(
  //     (a, b) => Date.parse(a.date) - Date.parse(b.date)
  //   )
  //   return Object.entries(sortedActivities.reduce((activities, activity) => {
  //     const date = activity.date.split('T')[0];
  //     activities[date] = activities[date] ? [...activities[date], activity] : [activity];
  //     return activities;
  //   }, {} as {[key: string]: IPipelineItem[]}));
  // }

  @action loadItems = async () => {
    this.loadingInitial = true;
    try {
      const items = await agent.Activities.list();
      runInAction('loading activities', () => {
        this.pipelineitems = items;
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadItem = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity',() => {
          this.activity = activity;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.pipelineitems.filter(a => a.id === id)[0]
  }

  // @action createActivity = async (activity: IActivity) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Activities.create(activity);
  //     runInAction('create activity', () => {
  //       this.activityRegistry.set(activity.id, activity);
  //       this.submitting = false;
  //     })
  //   } catch (error) {
  //     runInAction('create activity error', () => {
  //       this.submitting = false;
  //     })
  //     console.log(error);
  //   }
  // };

  
  @action checkServerStatus = async () => {
    this.submitting = true;
    try {
      await agent.Activities.servercheck()
      runInAction('check server', () => {
        this.submitting = false;
      })
    } catch (error) {
      runInAction('check activity error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  // @action editActivity = async (activity: IActivity) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Activities.update(activity);
  //     runInAction('editing activity', () => {
  //       this.activityRegistry.set(activity.id, activity);
  //       this.activity = activity;
  //       this.submitting = false;
  //     })
  //   } catch (error) {
  //     runInAction('edit activity error', () => {
  //       this.submitting = false;
  //     })
  //     console.log(error);
  //   }
  // };

  // @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  //   this.submitting = true;
  //   this.target = event.currentTarget.name;
  //   try {
  //     await agent.Activities.delete(id);
  //     runInAction('deleting activity', () => {
  //       this.activityRegistry.delete(id);
  //       this.submitting = false;
  //       this.target = '';
  //     })
  //   } catch (error) {
  //     runInAction('delete activity error', () => {
  //       this.submitting = false;
  //       this.target = '';
  //     })
  //     console.log(error);
  //   }
  // }


@action onFileChange = (file: FileList) => { 
    // Update the state 
    this.file = file
    console.log(this.file.length);
  }; 

// On file upload (click the upload button) 
@action onFileUpload = () => { 
  // Create an object of formData 
  const formData = new FormData(); 
 
  // Update the formData object 
  formData.append( 
    'asda',
    this.file![0],
  ); 
}; 

}

export default createContext(new PipelineStore());
