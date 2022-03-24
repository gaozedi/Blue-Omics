using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Activities
{
    public class Details
    {
        //we want to have List<Activity> be returned
        public class Query : IRequest<PipelineItem>
        {
            // we want to specify the id of activity that we want to get back,so we have this property
        public Guid Id { get; set; }
        }
        //generic para: our query, what we want to be returned from that query.
        public class Handler : IRequestHandler<Query, PipelineItem>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<PipelineItem> Handle(Query request, CancellationToken
            cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return activity;
            }
        }
    }
}
