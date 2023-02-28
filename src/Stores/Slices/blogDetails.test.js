import blogDetailsReducer, {updateblogDetails} from "./blogDetails";

describe("blogDetails Reducer", () => {
    it("should return the initial state when passed an empty action", () => {
        const initialState = {
            data: {},
            allowEdit: false
        };
        const action = {type: "blogDetails/updateblogDetails"};
        const result = updateblogDetails(initialState, action);
        expect(result).toEqual({"payload": initialState, "type": "blogDetails/updateblogDetails"})
    })
} )