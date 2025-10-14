// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import Notification from "../components/Notification";
// import { AuthContext } from "../context/AuthContext";

// export default function AdminPage() {
//     const { user, loading: authLoading } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);
//     const [notification, setNotification] = useState({ message: "", type: "info" });

//     useEffect(() => {
//         if (authLoading) return;

//         if (!user) {
//             navigate("/login");
//             return;
//         }

//         if (user.role?.name !== "ADMIN") {
//             navigate("/");
//             return;
//         }

//         fetchUsers();
//     }, [user, authLoading, navigate]);

//     async function fetchUsers() {
//         setLoading(true);
//         try {
//             const res = await api.get("/users");
//             console.log("Fetched users:", res.data);
//             setUsers(res.data);
//             setSelectedUsers([]);
//             setSelectAll(false);
//         } catch (err) {
//             if (err.response?.status === 401) {
//                 navigate("/login");
//             } else {
//                 showNotification("Failed to load users.", "error");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     function showNotification(message, type = "info") {
//         setNotification({ message, type });
//         setTimeout(() => setNotification({ message: "", type: "info" }), 5000);
//     }

//     const toggleSelectUser = (userId) => {
//         setSelectedUsers(prev =>
//             prev.includes(userId)
//                 ? prev.filter(id => id !== userId)
//                 : [...prev, userId]
//         );
//     };

//     const toggleSelectAll = () => {
//         if (selectAll) {
//             setSelectedUsers([]);
//         } else {
//             setSelectedUsers(users.map(u => u.id));
//         }
//         setSelectAll(!selectAll);
//     };

//     const handleBulkAction = async (method, endpoint, payload) => {
//         if (selectedUsers.length === 0) {
//             showNotification("Please select users first.", "warning");
//             return;
//         }

//         try {
//             await api.request({ method, url: endpoint, data: payload });
//             showNotification("Action completed successfully.", "success");
//             await fetchUsers();
//         } catch (err) {
//             showNotification(`Action failed: ${err.response?.data?.message || err.message}`, "error");
//         }
//     };

//     const handleBulkRoleChange = (newRoleId) => {
//         handleBulkAction("put", "/users/role", { userIds: selectedUsers, roleId: newRoleId });
//     };

//     const handleBulkDelete = async () => {
//         try {
//             for (const id of selectedUsers) {
//                 await api.delete(`/users/${id}`);
//             }
//             showNotification("Selected users deleted.", "success");
//             await fetchUsers();
//         } catch (err) {
//             showNotification(`Delete failed: ${err.response?.data?.message || err.message}`, "error");
//         }
//     };

//     if (loading) return <p className="text-center mt-5">Loading...</p>;

//     if (user?.role?.name !== "ADMIN") return <p className="text-center mt-5">Access Denied.</p>;

//     return (
//         <div className="container mt-5">
//             <Notification
//                 message={notification.message}
//                 type={notification.type}
//                 onClose={() => setNotification({ message: "", type: "info" })}
//             />

//             <h3 className="mb-4 text-center">Users</h3>

//             <div className="d-flex gap-2 mb-3 align-items-center">
//                 <span className="text-muted small me-2">Selected: {selectedUsers.length}</span>
//                 <select
//                     className="form-select w-auto"
//                     onChange={e => handleBulkRoleChange(Number(e.target.value))}
//                     defaultValue=""
//                     disabled={selectedUsers.length === 0}
//                 >
//                     <option value="" disabled>Change role</option>
//                     <option value={1}>CREATOR</option>
//                     <option value={2}>ADMIN</option>
//                 </select>
//                 <button
//                     className="btn btn-outline-danger btn-sm"
//                     onClick={handleBulkDelete}
//                     disabled={selectedUsers.length === 0}
//                 >
//                     Delete selected
//                 </button>
//             </div>

//             <table className="table table-bordered align-middle text-center">
//                 <thead className="table-light">
//                     <tr>
//                         <th>
//                             <input
//                                 type="checkbox"
//                                 checked={selectAll}
//                                 onChange={toggleSelectAll}
//                             />
//                         </th>
//                         <th>#</th>
//                         <th>Username</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((u, i) => (
//                         <tr key={u.id}>
//                             <td>
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedUsers.includes(u.id)}
//                                     onChange={() => toggleSelectUser(u.id)}
//                                 />
//                             </td>
//                             <td>{i + 1}</td>
//                             <td>{u.username}</td>
//                             <td>{u.email}</td>
//                             <td>
//                                 {u.roleId === 1
//                                     ? "CREATOR"
//                                     : u.roleId === 2
//                                         ? "ADMIN"
//                                         : "N/A"}
//                             </td>
//                             <td>{u.isActive ? "Active" : "Inactive"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }