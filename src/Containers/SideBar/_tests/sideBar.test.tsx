import React from "react";
import { screen } from "@testing-library/react";
import SideBar from "../sideBar";
import { renderWithProviders } from "../../../utils/test-utils";
import { ThemeContext } from "../../../App";
import user from "@testing-library/user-event"
  

test("it should render without crashing", async () => {
    const theme = "light"
    const toggleTheme = () =>{}
    renderWithProviders(<ThemeContext.Provider value={{theme, toggleTheme}}><SideBar/></ThemeContext.Provider>)
    const regionalCheckBox = screen.getByLabelText("Regional Blogs");
    expect(regionalCheckBox).toBeChecked();
    const nationalCheckBox = screen.getByLabelText("National Blogs");
    expect(nationalCheckBox).toBeChecked();
    const internationalCheckBox = screen.getByLabelText("International Blogs");
    expect(internationalCheckBox).toBeChecked();
    user.dblClick(regionalCheckBox);
    expect(regionalCheckBox).toBeChecked();
    user.click(regionalCheckBox);
    expect(regionalCheckBox).not.toBeChecked();

})