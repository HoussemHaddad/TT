import React, { useEffect, useState } from "react";
import axios from "axios";

function DerangementTable({ role }) {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    station: "", type: "", sévérité: "", description: "", date: "", statut: ""
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/derangement", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  const handleCreate = async () => {
    const res = await axios.post("/api/derangement", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData([...data, res.data]);
    setForm({ station: "", type: "", sévérité: "", description: "", date: "", statut: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/derangement/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(data.filter(d => d._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold my-4">⚠️ Dérangements</h2>

      {role === "admin" && (
        <div className="flex flex-wrap gap-2 mb-4">
          <input className="input" placeholder="Station ID" value={form.station} onChange={e => setForm({ ...form, station: e.target.value })} />
          <input className="input" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
          <input className="input" placeholder="Sévérité" value={form.sévérité} onChange={e => setForm({ ...form, sévérité: e.target.value })} />
          <input className="input" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <input className="input" placeholder="Statut" value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <button onClick={handleCreate} className="btn">Ajouter</button>
        </div>
      )}

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Station</th><th>Type</th><th>Sévérité</th><th>Description</th><th>Date</th><th>Statut</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d._id} className="text-center">
              <td>{d.station}</td>
              <td>{d.type}</td>
              <td>{d.sévérité}</td>
              <td>{d.description}</td>
              <td>{new Date(d.date).toLocaleDateString()}</td>
              <td>{d.statut}</td>
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

export default DerangementTable;
