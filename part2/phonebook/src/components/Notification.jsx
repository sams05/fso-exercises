const Notification = ({ message, error = false }) => {
    const errorStyle = error ? { color: 'red', borderColor: 'red' } : null;
    if (!message) {
        return null;
    }
    return (
        <div className="notification" style={errorStyle}>
            {message}
        </div>
    );
};

export default Notification;
