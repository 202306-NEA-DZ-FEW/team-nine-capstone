import renderer from "react-test-renderer";

import InterestsFilter from "../InterestsFilter";

describe("InterestsFilter Snapshot", () => {
    it("should matches DOM Snapshot", () => {
        const tree = renderer.create(<InterestsFilter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
