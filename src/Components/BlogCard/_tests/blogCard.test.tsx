/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BlogCard from "../blogCard";



afterEach(cleanup);

it("renders without crashing", () => {
    render(<BlogCard key={1} id={1} photo={""} title={""} details={""} type={""}></BlogCard>);
})

// it("renders button correctly", () => {
//     const {getByRole} = render(<CandidateRegisterCustomInput type="text" errorMessage='' label="Full name"
//     className="mt-8" name={""} value={""} width={""} onchange={undefined} onblur={undefined} touched={undefined}></CandidateRegisterCustomInput>);
//     const input = getByRole('textbox');
//     expect(input).toHaveValue('')
// })

// it("matches the snapshot", () => {
//         const tree = renderer.create(<CandidateRegisterCustomInput type="text" errorMessage='' label="Full name"
//         className="mt-8" name={""} value={""} width={""} onchange={undefined} onblur={undefined} touched={undefined}></CandidateRegisterCustomInput>);
//         expect(tree).toMatchSnapshot();
// })