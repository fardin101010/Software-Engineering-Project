import React, { useState, useEffect } from "react";

const Request = ({ booking, handleAccept, handleReject }) => {
    const { Name, email, date, JobTitle, details, Price, Status } = booking;

    const [showProgress, setShowProgress] = useState(false);

    const handleAcceptClick = () => {
        setShowProgress(true);

        // Simulate a 5-second delay using setTimeout
        setTimeout(() => {
            handleAccept(booking._id);
            setShowProgress(false);
        }, 5000);
    };

    const handleRejectClick = () => {
        setShowProgress(true);

        // Simulate a 5-second delay using setTimeout
        setTimeout(() => {
            handleReject(booking._id);
            setShowProgress(false);
        }, 5000);
    };

    useEffect(() => {
        if (showProgress) {
            // Set a timeout to reset the progress bar and toggle buttons after 5 seconds
            const timeout = setTimeout(() => {
                setShowProgress(false);
            }, 5000);

            // Clean up the timeout to avoid memory leaks
            return () => clearTimeout(timeout);
        }
    }, [showProgress]);


    const statusClasses = {
        Accepted: 'text-green-500 font-bold',
        Cancel: 'text-red-500 font-bold',
        Cancelled: 'text-red-700 font-bold',
        Pending: 'text-base-200',
    };

    const statusClass = statusClasses[Status] || 'text-black';


    return (
        <tr className="bg-base-200">
            <td>{JobTitle}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>{Price}</td>
            <td className={statusClass}>
                {showProgress ? (
                    <div className="progress bg-red-500">
                        <div
                            className="progress-bar bg-red-500"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                ) : (
                    Status
                )}
            </td>
            <td className="flex gap-2 items-center">
                {Status === "Accepted" ? (
                    <button
                        onClick={handleRejectClick}
                        className="border border-sky-400 px-2 rounded-lg hover-bg-lime-400 py-1"
                    >
                        Reject
                    </button>
                ) : Status === "Cancelled" ? (
                    <button
                        onClick={handleAcceptClick}
                        className="border border-sky-400 px-2 rounded-lg hover-bg-lime-400 py-1"
                    >
                        Accept
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleAcceptClick}
                            className="border border-sky-400 px-2 rounded-lg hover-bg-lime-400 py-1"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleRejectClick}
                            className="border border-sky-400 px-2 rounded-lg hover-bg-lime-400 py-1"
                        >
                            Reject
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default Request;
