import renderer from "react-test-renderer";

import Pagination from "../Pagination";

describe("Pagination Snapshot", () => {
    it("should matches DOM Snapshot", () => {
        const tree = renderer.create(<Pagination />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
