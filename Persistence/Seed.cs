using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Activities.Any()) // if we don't have any activities
            {
                var activities = new List<PipelineItem>{
                    new PipelineItem
                    {
                    Title = "Past Activity 1",
                    Description = "Activity 2 months ago",
                    Category = "drinks",

                    },
                    new PipelineItem
                    {
                    Title = "Past Activity 2",
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    }
////////////省略一部分/////////////////////////////////
                };
                context.Activities.AddRange(activities);
                context.SaveChanges(); //只执行一次，不需要async
            }
        }
    }
}
