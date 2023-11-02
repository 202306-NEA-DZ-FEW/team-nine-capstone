import Link from "next/link";

import Layout from "@/layout/Layout";

const Error404Page = () => (
    <Layout>
        <div className='error-container'>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
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
    </Layout>
);

export default Error404Page;
