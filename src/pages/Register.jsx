import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Notification from "../components/Notification";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const res = await api.post("/api/users/register", {
                username,
                email,
                password,
            });

            console.log("Register response:", res.data);

            setNotification({
                message: "Registration successful!",
                type: "success",
            });

            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (err) {
            console.error("Register error:", err);
            setNotification({
                message:
                    err.response?.data?.message || "Registration failed",
                type: "error",
            });
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button className="btn btn-success w-100">Register</button>
            </form>

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "" })}
            />
        </div>
    );
}
