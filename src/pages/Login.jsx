import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Notification from "../components/Notification";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await api.post("/api/users/login", { email, password });
            console.log("Login response:", res.data);

            setNotification({ message: "Login successful!", type: "success" });
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (err) {
            console.error("Login error:", err);
            setNotification({
                message: err.response?.data?.message || "Login failed",
                type: "error",
            });
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-primary w-100">Login</button>
            </form>

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "" })}
            />
        </div>
    );
}
