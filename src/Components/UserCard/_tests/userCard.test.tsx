import React from "react";
import { cleanup, screen } from "@testing-library/react";
import UserCard from "../userCard";
import { renderWithProviders } from "../../../utils/test-utils";

afterEach(cleanup);


test("it should render without crashing", async () => {
    renderWithProviders(<UserCard key={1} id={1} name={"Laxman"} company={"Sirius"} photo={""}/>)
    const name = screen.getByText("Laxman");
    const img = screen.getByRole("img")
    const alt = screen.getByAltText("Laxman");
    const company = screen.getByText("Sirius");
    expect(name).toBeInTheDocument()
    expect(img).toBeInTheDocument();
    expect(alt).toBeInTheDocument();
    expect(company).toBeInTheDocument()
})