import Link from "next/link";

const Error500Page = () => (
    <div className='error-container'>
        <h1>500 - Internal Server Error</h1>
        <p>Oops! Something went wrong on our end.</p>
        <p>We&apos;re working to fix the issue. Please try again later.</p>
        <Link href='/'>Go back to the home page</Link>

        <style jsx>{`
            .error-container {
                text-align: center;
                padding: 2rem;
            }
            h1 {
                font-size: 2.5rem;
            }
            a {
                color: #0070f3;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        `}</style>
    </div>
);

export default Error500Page;
