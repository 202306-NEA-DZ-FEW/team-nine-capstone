import renderer from "react-test-renderer";

import DateFilter from "../DateFilter";

describe("DateFilter Snapshot", () => {
    it("should matches DOM Snapshot", () => {
        const tree = renderer.create(<DateFilter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
