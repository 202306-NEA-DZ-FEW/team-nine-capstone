import renderer from "react-test-renderer";

import UserProfileEventCard from "../../UserProfileEventCard";

// Mock the Firebase services
jest.mock("@/lib/firebase/controller.js", () => ({
    getAuth: jest.fn(),
    auth: { currentUser: jest.fn() },
}));

//Mock the Firestore collection and its methods
jest.mock("@/lib/firebase/controller.js", () => ({
    collection: jest.fn(),
}));

// Mock the Firestore instance
jest.mock("@/lib/firebase/controller.js", () => ({
    db: {
        collection: jest.fn(),
    },
}));

it("renders correctly", () => {
    const tree = renderer.create(<UserProfileEventCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
