import { useEffect } from "react";

export default function Notification({ message, type = "info", onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message) return null;

    const alertClass = {
        success: "alert alert-success",
        error: "alert alert-danger",
        info: "alert alert-info",
    }[type] || "alert alert-secondary";

    return (
        <div
            className={`${alertClass} position-fixed top-0 end-0 m-3 shadow`}
            role="alert"
            style={{ zIndex: 2000, minWidth: "250px" }}
        >
            {message}
        </div>
    );
}
