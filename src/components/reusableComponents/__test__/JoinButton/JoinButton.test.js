import renderer from "react-test-renderer";

import { useUser } from "@/context/UserContext";

import JoinButton from "../../JoinButton";

jest.mock("src/context/UserContext.js");

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

describe("JoinButton", () => {
    it("renders correctly", () => {
        // Mock the useUser hook to provide a dummy implementation
        useUser.mockReturnValue({ user: { uid: "dummyUserId" } });

        const tree = renderer.create(<JoinButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
