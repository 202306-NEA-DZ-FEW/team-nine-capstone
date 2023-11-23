import { arrayUnion } from "firebase/firestore";
import React, { useState } from "react";

import { updateEventDocument } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

const EventComments = ({ singleEventData, userDoc, eventId }) => {
    console.log("userDocinside comment", userDoc);
    const { user } = useUser();
    // console.log("user.uid", user.uid);
    const [comment, setComment] = useState("");
    const handleComment = async (e) => {
        e.preventDefault();
        const generateNewCommentId = () => {
            if (singleEventData.comments.length === 0) {
                // If there are no comments, start with commentId 1
                return 1;
            }

            // Extract the commentId values from the comments array
            const commentIds = singleEventData.comments.map(
                (comment) => comment.commentId
            );

            // Find the maximum commentId
            const maxCommentId = Math.max(...commentIds);

            // Return the next unique commentId (maxCommentId + 1)
            return maxCommentId + 1;
        };
        await updateEventDocument(eventId, {
            comments: arrayUnion({
                userUid: user.uid,
                comment: comment,
                userAvatar: userDoc.avatar,
                commentId: generateNewCommentId(),
            }),
        });

        setComment(""); // Clear the input field after submitting the comment
    };

    return (
        <div className='w-full'>
            <form className='w-full' onSubmit={handleComment}>
                <input
                    type='text'
                    value={comment}
                    id='comment'
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full rounded-full h-8 focus:outline-none text-gray-950 px-3 bg-gray-200'
                    placeholder='add comment'
                />
            </form>
        </div>
    );
};

export default EventComments;
