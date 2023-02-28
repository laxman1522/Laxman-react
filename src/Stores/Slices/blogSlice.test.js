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