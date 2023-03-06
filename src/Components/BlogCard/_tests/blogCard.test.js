/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import BlogCard from "../blogCard";
import {rest} from "msw";
import { setupServer } from "msw/lib/node";
import { renderWithProviders } from "../../../utils/test-utils";

afterEach(cleanup);

test("it should render without crashing", async () => {
    renderWithProviders(<BlogCard key={1} id={1} photo={""} title={"How to Time Travel"} details={""} type={""}></BlogCard>)
    const title = screen.getByText("How to Time Travel");
    expect(title).toBeInTheDocument();
})
  