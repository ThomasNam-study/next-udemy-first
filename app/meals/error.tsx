'use client';

const ErrorPage = ({
                       error,
                       reset,
                   }: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {

    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>
                {/*Something went wrong!*/}
                <span>{error.message}</span>
            </p>
        </main>
    );
};

export default ErrorPage;