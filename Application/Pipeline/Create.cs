using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
namespace Application.Pipeline
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            //although we don't need to return anything from our Creat Command,
            //we still return a Mediator unit, which is just an empty object
            public async Task<Unit> Handle(Command request, CancellationToken
            cancellationToken)
            {
                var item = new PipelineItem
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                };
                // not use async vcersion(AddAsync) because we are not using a special value generator(见函数描述)
                _context.PipelineItems.Add(item);
                //SaveChangesAsync会返回一个Int，是changes的数量,>1说明成功了
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    //虽然只返回一个空对象给API Controller，但是Controller收到之后就知道成功了
                    return Unit.Value;
                }
                else
                {
                    throw new Exception("Problem save unsuccessful");
                }
            }
        }
    }
}
