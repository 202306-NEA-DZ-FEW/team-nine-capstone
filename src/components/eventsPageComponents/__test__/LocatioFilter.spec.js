import renderer from "react-test-renderer";

import LocatioFilter from "../LocatioFilter";

describe("LocatioFilter Snapshot", () => {
    it("should matches DOM Snapshot", () => {
        const tree = renderer.create(<LocatioFilter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
