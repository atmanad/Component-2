import { ADD_TWEET, LOAD_TWEETS } from "../actionTypes";

const initialState = {
    tweetList: []
};

export default function tweet(state = initialState, action) {
    switch (action.type) {
        case ADD_TWEET: {
            const { id, content } = action.payload;
            return state
        }
        case LOAD_TWEETS: {
            const { tweets } = action.payload;
            return {
                ...state,
                tweetList:[...state.tweetList, tweets]
            };
        }
        default:
            return state;
    }
}
