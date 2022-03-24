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
            if (!context.PipelineItems.Any()) // if we don't have any activities
            {
                var activities = new List<PipelineItem>{
                    new PipelineItem
                    {
                    Title = "1. Quality Report",
                    Description = "xxxx",
                    Category = "upstream",

                    },
                    new PipelineItem
                    {
                    Title = "2. Quality and adapter trimming",
                    Description = "xxxx",
                    Category = "upstream",
                    }
////////////省略一部分/////////////////////////////////
                };
                context.PipelineItems.AddRange(activities);
                context.SaveChanges(); //只执行一次，不需要async
            }
        }
    }
}
