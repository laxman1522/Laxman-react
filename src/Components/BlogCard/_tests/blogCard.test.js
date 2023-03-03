// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable testing-library/prefer-screen-queries */
// import React from "react";
// import { render, cleanup } from "@testing-library/react";
// import BlogCard from "../blogCard";
// // import {fetchBlogs} from "../../../Stores/thunks/fetchBlogs";
// import { Provider } from "react-redux";
// import mockAxios from "axios";
// import {rest} from "msw";
// import { setupServer } from "msw/lib/node";
// import { configureStore, mockCreateAsyncThunk } from "@reduxjs/toolkit";
// import {fetchBlogs, store} from "../../../Stores";


// // const server = setupServer (
// //     rest.get("https://jsonmockserver.vercel.app/api/blogs" , (req,res,ctx) => {
// //         ctx.json([{"title":"How to Time Travel",
// //                 "details":"There is an old shpeople  different every single day.",
// //                 "photo":"https://cdn.mos.cms.futurecdn.net/E3JYf6eJHQawCL2AR5cBv4.jpg",
// //                 "type":"International"}])
// //     })
// // )


// // beforeAll(() => server.listen())
// // afterEach(() => server.resetHandlers())
// // afterAll(() => server.close())


// // beforeEach(() => {
// //     axios.get.mockResolvedValue({
// //     data: [],
// //     status: 200,
// //     statusText: "",});
// // })

// // jest.mock("../../../Stores/thunks/fetchBlogs", async () => {
// //     return {
// //         async fetchBlogs() {
// //           mockCreateAsyncThunk('blogs/fetch', async () => {
// //             const response = await mockAxios.get('https://jsonmockserver.vercel.app/api/blogs');
// //             return response.data;
// //             });
// //           }
// //       }
// //   })
  
// //   jest.mock("../../../Stores/thunks/fetchUsers", () => {
// //     return {
// //       async fetchUsers() {
// //         return {data:[]};
// //       }
// //     }
// //   })


// afterEach(cleanup);

// it("renders without crashing", () => {
//     const initialState = {
//         isLoading: false,
//         blogData: [],
//         error:null,
//         searchTerm:"",
//         types: [],
//         blogAdded: false,
//     }
//       const mockStore = configureStore();
//       const store = mockStore(initialState);
//       // store.dispatch(fetchBlogs());
//     render(<Provider store={store}><BlogCard key={1} id={1} photo={""} title={""} details={""} type={""}></BlogCard></Provider>);
// })