import React, { useEffect, useState } from "react";
import axios from "axios";

function AntenneTable({ role }) {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    station: "", type: "", fréquence: "", azimut: "", inclinaison: ""
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/antenne", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  const handleCreate = async () => {
    const res = await axios.post("/api/antenne", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData([...data, res.data]);
    setForm({ station: "", type: "", fréquence: "", azimut: "", inclinaison: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/antenne/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(data.filter(d => d._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold my-4">📶 Antennes</h2>

      {role === "admin" && (
        <div className="flex flex-wrap gap-2 mb-4">
          <input className="input" placeholder="Station ID" value={form.station} onChange={e => setForm({ ...form, station: e.target.value })} />
          <input className="input" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
          <input className="input" placeholder="Fréquence" value={form.fréquence} onChange={e => setForm({ ...form, fréquence: e.target.value })} />
          <input className="input" placeholder="Azimut" value={form.azimut} onChange={e => setForm({ ...form, azimut: e.target.value })} />
          <input className="input" placeholder="Inclinaison" value={form.inclinaison} onChange={e => setForm({ ...form, inclinaison: e.target.value })} />
          <button onClick={handleCreate} className="btn">Ajouter</button>
        </div>
      )}

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Station</th><th>Type</th><th>Fréquence</th><th>Azimut</th><th>Inclinaison</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d._id} className="text-center">
              <td>{d.station}</td>
              <td>{d.type}</td>
              <td>{d.fréquence}</td>
              <td>{d.azimut}</td>
              <td>{d.inclinaison}</td>
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

export default AntenneTable;
