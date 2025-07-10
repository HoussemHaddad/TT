import React, {useEffect, useState} from 'react';
import axios from 'axios';

function StationTable({ role}) {
  const [stations, setStations] = useState([]);
  const [nom, setNom] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [typetech, setTypetech] = useState('');
  const [statut, setstatut] = useState('');
  const [type, setType] = useState('');
  const [fournisseur, setfounisseur] = useState('');
  const [puissance, setPuissance] = useState(''); 
  const [hauteursupport, sethauteursupport] = useState('');
  const [action, setaction] = useState('');

  const token = localStorage.getItem('token');
  
   useEffect(() => {
    axios.get('/api/station', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStations(res.data));
  }, [token]) ;

  
};

 const handleDelete = async (id) => {
    await axios.delete(`/api/station/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStations(stations.filter(s => s._id !== id));
  };

  const handleCreate = async () => {
    const body = { nom, localisation, type, puissance, statut: 'active' };
    const res = await axios.post('/api/station', body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStations([...stations, res.data]);
    setNom(''); setLocalisation(''); setType(''); setPuissance('');
  };

  return (
    <div>
      <h2>📡 Stations de Base</h2>
      {role === 'admin' && (
        <div>
          <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
          <input placeholder="Localisation" value={localisation} onChange={e => setLocalisation(e.target.value)} />
          <input placeholder="Typetech" value={nom} onChange={e => setTypetech(e.target.value)} />
          <input placeholder="Statut" value={type} onChange={e => setStatut(e.target.value)} />
          <input placeholder="Type" value={type} onChange={e => setType(e.target.value)} />
          <input placeholder="Fournisseur" value={type} onChange={e => setfounisseur(e.target.value)} />
          <input placeholder="Puissance" value={puissance} onChange={e => setPuissance(e.target.value)} />
          <input placeholder="Hauteursupport" value={type} onChange={e => setHauteursupport(e.target.value)} />
          <input placeholder="Action" value={type} onChange={e => setAction(e.target.value)} />

          <button onClick={handleCreate}>Ajouter</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Localisation</th>
            <th>Typetech</th>
            <th>Statut</th>
            <th>Type</th>
            <th>Fournisseur</th>
            <th>Puissance</th>
            <th>Hauteursupport</th>

            {role === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {stations.map(s => (
            <tr key={s._id}>
              <td>{s.nom}</td>
              <td>{s.localisation}</td>
              <td>{s.typetech}</td>
              <td>{s.statut}</td>
              <td>{s.type}</td>
              <td>{s.fournisseur}</td>
              <td>{s.puissance}</td>
              <td>{s.hauteursupport}</td>
              <td>{s.action}</td>
              {role === 'admin' && (
                <td>
                  <button onClick={() => handleDelete(s._id)}>🗑️</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


export default StationTable;