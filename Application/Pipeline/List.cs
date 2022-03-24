using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pipeline
{
    public class List
    {
        public class Query : IRequest<List<PipelineItem>> { }

        public class Handler : IRequestHandler<Query, List<PipelineItem>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<PipelineItem>> Handle(Query request, CancellationToken cancellationToken)
            {
                var items = await _context.PipelineItems.ToListAsync();

                return items;
            }
        }
    }
}