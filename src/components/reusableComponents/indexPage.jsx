import Head from "next/head";

function IndexPage({ title }) {
    return (
        <div>
            <Head>
                <title> {title} </title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
        </div>
    );
}

export default IndexPage;
