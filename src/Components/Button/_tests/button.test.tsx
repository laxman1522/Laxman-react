import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import user from "@testing-library/user-event"
import Button from "../button";


afterEach(cleanup);

it("renders without crashing", () => {
    const test = jest.fn();
    render(<Button className="test" buttonName="test" buttonClicked={test}></Button>)
    const button = screen.getByRole('button',{
        name: "test"
    });
    user.click(button);
    expect(button).toBeInTheDocument();
    expect(test).toHaveBeenCalledTimes(1);
 })
