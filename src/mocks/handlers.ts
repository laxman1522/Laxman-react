import {rest} from "msw";

// export const handlers = [
//     rest.get("https://jsonmockserver.vercel.app/api/blogs" , (req,res,ctx) => {
//         return ctx.json([{"title":"How to Time Travel",
//                 "details":"There is an old shpeople  different every single day.",
//                 "photo":"https://cdn.mos.cms.futurecdn.net/E3JYf6eJHQawCL2AR5cBv4.jpg",
//                 "type":"International"}])
//     })
// ]


export const handlers = [
        rest.get('https://jsonmockserver.vercel.app/api/blogs', (req, res, ctx) => {
          return res(ctx.json([{"title":"How to Time Travel",
                          "details":"There is an old shpeople  different every single day.",
                          "photo":"https://cdn.mos.cms.futurecdn.net/E3JYf6eJHQawCL2AR5cBv4.jpg",
                          "type":"International"}]), ctx.delay(150))
        }),
        rest.get('https://jsonmockserver.vercel.app/api/users', (req, res, ctx) => {
            return res(ctx.json([{"id":1,"name":"Mark Antony","username":"markantony","email":"mark.antony@company.biz",
            "photo":"images/users/1.jpeg","address":{"street":"John Street","suite":"Apt. 516","city":"Bangalore","zip":"500001",
            "geo":{"lng":"77.5946E","lat":"12.9716N"}},"phone":"9876543210","website":"meetmarkantony.com",
            "company":{"name":"ABC Company","location":"Bangalore"}}]), ctx.delay(150))
          }),
      ]