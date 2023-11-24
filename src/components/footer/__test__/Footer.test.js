import renderer from "react-test-renderer";

import { useUser } from "@/context/UserContext";

import Footer from "../Footer";

// Mock Firebase
jest.mock("@firebase/app", () => ({
    __esModule: true,
    initializeApp: jest.fn(),
    getApps: jest.fn(() => [{}]),
    app: jest.fn(),
}));

jest.mock("@/lib/firebase/controller.js", () => ({
    __esModule: true,
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock("src/context/UserContext.js");

describe("Footer", () => {
    it("renders correctly", () => {
        // Mock the useUser hook to provide a dummy implementation
        useUser.mockReturnValue({ user: { uid: "dummyUserId" } });

        const tree = renderer.create(<Footer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
