import React, { useEffect, useState } from "react";
import axios from "axios";

function TransmissionTable({ role }) {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    station: "", type: "", débit: "", statut: "", operateur: ""
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/transmission", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  const handleCreate = async () => {
    const res = await axios.post("/api/transmission", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData([...data, res.data]);
    setForm({ station: "", type: "", débit: "", statut: "", operateur: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/transmission/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(data.filter(d => d._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold my-4">🔄 Transmissions</h2>

      {role === "admin" && (
        <div className="flex flex-wrap gap-2 mb-4">
          <input className="input" placeholder="Station ID" value={form.station} onChange={e => setForm({ ...form, station: e.target.value })} />
          <input className="input" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
          <input className="input" placeholder="Débit" value={form.débit} onChange={e => setForm({ ...form, débit: e.target.value })} />
          <input className="input" placeholder="Statut" value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <input className="input" placeholder="Opérateur" value={form.operateur} onChange={e => setForm({ ...form, operateur: e.target.value })} />
          <button onClick={handleCreate} className="btn">Ajouter</button>
        </div>
      )}

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Station</th><th>Type</th><th>Débit</th><th>Statut</th><th>Opérateur</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d._id} className="text-center">
              <td>{d.station}</td>
              <td>{d.type}</td>
              <td>{d.débit}</td>
              <td>{d.statut}</td>
              <td>{d.operateur}</td>
              {role === "admin" && (
                <td><button onClick={() => handleDelete(d._id)} className="btn-red">🗑️</button></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransmissionTable;
