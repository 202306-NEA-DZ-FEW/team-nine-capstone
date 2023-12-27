import { arrayUnion } from "firebase/firestore";
import { t } from "i18next";
import React, { useState } from "react";

import { updateEventDocument } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

const EventsComments = ({ singleEventData, userDoc, eventId }) => {
    const { user } = useUser();
    const [comment, setComment] = useState("");
    const handleComment = async (e) => {
        e.preventDefault();
        const generateNewCommentId = () => {
            if (singleEventData.comments.length === 0) {
                return 1;
            }

            const commentIds = singleEventData.comments.map(
                (comment) => comment.commentId
            );

            const maxCommentId = Math.max(...commentIds);

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

        setComment("");
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
                    placeholder={t("EventsComments.add comment")}
                />
            </form>
        </div>
    );
};

export default EventsComments;
