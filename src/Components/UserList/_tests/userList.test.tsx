import React from "react";
import { cleanup, screen } from "@testing-library/react";
import UserList from "../userList";
import { renderWithProviders } from "../../../utils/test-utils";



test("it should render without crashing", async () => {
    renderWithProviders(<UserList/>)
})