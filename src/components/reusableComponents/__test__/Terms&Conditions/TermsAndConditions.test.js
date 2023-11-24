import renderer from "react-test-renderer";

import TermsAndConditions from "../../TermsAndConditions";

it("renders correctly", () => {
    const tree = renderer.create(<TermsAndConditions />).toJSON();
    expect(tree).toMatchSnapshot();
});
