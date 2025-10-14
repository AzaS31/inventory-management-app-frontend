// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import InventoriesList from "../components/InventoriesList";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//     const { user, loading } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!loading && !user) {
//             navigate("/login");
//         }
//     }, [loading, user, navigate]);

//     if (loading) {
//         return <p className="text-center mt-5">Loading...</p>;
//     }

//     if (!user) return null;

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4 text-center">Dashboard</h2>

//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <p className="mb-0">
//                     Welcome, <strong>{user.username}</strong>!
//                 </p>
//                 <span className="badge bg-secondary">
//                     Role: {user.role?.name || "CREATOR"}
//                 </span>
//             </div>

//             <InventoriesList />

//             {/* Добавим “Create new” позже */}
//             {/* <button className="btn btn-primary mt-3">Add new inventory</button> */}
//         </div>
//     );
// }
