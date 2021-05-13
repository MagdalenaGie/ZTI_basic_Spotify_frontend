import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("grid", () => {
    let loader;

    beforeEach(() => {
        loader = render(
            <Loader/>
        );
    })

    it("should render", () => {
        expect(loader.baseElement).toBeInTheDocument();
    })

    it("should be build by three divs", () => {
        let divs = loader.container.querySelectorAll("div")
        expect(divs).toHaveLength(3);
    })

    it("should contain two divs (they represent two spinning dots)", () => {
        let divs = loader.container.firstChild.querySelectorAll("div")
        expect(divs).toHaveLength(2);
    })
})