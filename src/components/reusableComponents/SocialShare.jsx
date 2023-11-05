import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "next-share";
import React from "react";

function SocialShare({ path, title, quote }) {
    return (
        <div className='social-share-panel'>
            <div className='share-buttons'>
                <EmailShareButton
                    url={`https://togatherwebuild.vercel.app${path}`}
                    subject={`${title}`}
                    body={`${quote}`}
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>

                <FacebookShareButton
                    url={`https://togatherwebuild.vercel.app${path}`}
                    quote={`${quote}`}
                    hashtag={`#${title}`}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TelegramShareButton
                    url={`https://togatherwebuild.vercel.app${path}`}
                    title={`${title}`}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>

                <PinterestShareButton
                    url={`https://togatherwebuild.vercel.app${path}`}
                    media={`${quote}`}
                >
                    <PinterestIcon size={32} round />
                </PinterestShareButton>

                <TwitterShareButton
                    url={`https://togatherwebuild.vercel.app${path}`}
                    title={`${title}`}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <LinkedinShareButton
                    url={`https://togatherwebuild.vercel.app${path}`}
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
        </div>
    );
}
export default SocialShare;
