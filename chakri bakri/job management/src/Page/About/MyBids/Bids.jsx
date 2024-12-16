const Bids = ({ booking }) => {
    const { Name, email, date, JobTitle, details, Price, Status } = booking;

    const statusClasses = {
        Accepted: 'text-green-500 font-bold',
        Cancel: 'text-red-500 font-bold',
        Pending: 'text-base-200',
    };

    const statusClass = statusClasses[Status] || 'text-black';

    return (
        <tr>
            <td className="w-40">{Name}</td>
            <td>{JobTitle}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>{Price}</td>
            <td className={statusClass}>{Status === 'Accepted' ? 'Accepted' : Status === 'Cancel' ? 'Cancel' : 'Pending'}</td>
        </tr>
    );
};

export default Bids;
