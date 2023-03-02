import {rest} from "msw";

export const handlers = [
    rest.get("https://jsonmockserver.vercel.app/api/blogs" , (req,res,ctx) => {
        ctx.json([{"title":"How to Time Travel",
                "details":"There is an old shpeople  different every single day.",
                "photo":"https://cdn.mos.cms.futurecdn.net/E3JYf6eJHQawCL2AR5cBv4.jpg",
                "type":"International"}])
    })
]