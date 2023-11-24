import renderer from "react-test-renderer";

import BottomSheet from "../BottomSheets";

describe("BottomSheet Snapshot", () => {
    it("should matches DOM Snapshot", () => {
        const tree = renderer.create(<BottomSheet />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
