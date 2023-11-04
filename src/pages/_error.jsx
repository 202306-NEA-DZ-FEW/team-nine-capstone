import Error404Page from "./404";
import Error500Page from "./500";

const ErrorPage = ({ statusCode }) => {
    if (statusCode === 500) {
        return <Error500Page />;
    } else if (statusCode === 404) {
        return <Error404Page />;
    }

    return (
        <div>
            <h1>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : "An error occurred on client"}
            </h1>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
