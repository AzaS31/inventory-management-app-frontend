// import { useEffect, useState } from "react";
// import { getMyInventories, deleteInventory } from "../api/inventoryService";
// import Notification from "../components/Notification";

// export default function InventoriesList() {
//     const [inventories, setInventories] = useState([]);
//     const [notification, setNotification] = useState({ message: "", type: "info" });

//     useEffect(() => {
//         loadInventories();
//     }, []);

//     async function loadInventories() {
//         try {
//             const res = await getMyInventories();
//             setInventories(res.data);
//         } catch {
//             showNotification("Failed to load inventories", "error");
//         }
//     }

//     async function handleDelete(id) {
//         try {
//             await deleteInventory(id);
//             showNotification("Inventory deleted", "success");
//             loadInventories();
//         } catch {
//             showNotification("Failed to delete", "error");
//         }
//     }

//     function showNotification(message, type = "info") {
//         setNotification({ message, type });
//     }

//     return (
//         <div className="container mt-5">
//             <Notification
//                 message={notification.message}
//                 type={notification.type}
//                 onClose={() => setNotification({ message: "", type: "info" })}
//             />

//             <h3>My Inventories</h3>
//             <table className="table table-bordered mt-3">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Title</th>
//                         <th>Version</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {inventories.map((inv, i) => (
//                         <tr key={inv.id}>
//                             <td>{i + 1}</td>
//                             <td>{inv.title}</td>
//                             <td>{inv.version}</td>
//                             <td>
//                                 <button
//                                     className="btn btn-sm btn-outline-danger"
//                                     onClick={() => handleDelete(inv.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
