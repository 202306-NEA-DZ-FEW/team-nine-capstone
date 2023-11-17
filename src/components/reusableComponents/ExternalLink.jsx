import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

function ExternalLink({ href, children }) {
    return (
        <span title='Opens in a new window'>
            <Link
                href={href}
                passHref
                target='_blank'
                rel='noopener noreferrer'
                className='home-btn w-full sm:w-40 md:w-48 h-12 sm:h-16 '
                style={{
                    backgroundColor: "rgb(21, 128, 61, 0.5)",
                    gap: "8px",
                }}
            >
                {children} <FaExternalLinkAlt />
            </Link>
        </span>
    );
}

export default ExternalLink;
