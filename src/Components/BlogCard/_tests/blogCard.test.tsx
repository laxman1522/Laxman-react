/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import BlogCard from "../blogCard";
import {fetchBlogs} from "../../../Stores/thunks/fetchBlogs";

jest.mock("../../../Stores/thunks/fetchBlogs", () => {
    return {
      async fetchBlogs() {
        return {data:[]};
      }
    }
  })
  
  jest.mock("../../../Stores/thunks/fetchUsers", () => {
    return {
      async fetchUsers() {
        return {data:[]};
      }
    }
  })

afterEach(cleanup);

// it("renders without crashing", () => {
//     render(<BlogCard key={1} id={1} photo={""} title={""} details={""} type={""}></BlogCard>);
// })


describe("thunks", () => {
  describe("fetchBlogs dispatch ", () => {
    it("should fetch users", async () => {
      const dispatch = jest.fn();
      const state   = {
        blogs: {}
      };
      const thunk = fetchBlogs();
      // await thunk(dispatch, () => state, undefined)
      // render(<BlogCard key={1} id={1} photo={""} title={""} details={""} type={""}></BlogCard>);   
      console.log(fetchBlogs())
    })
  })
})