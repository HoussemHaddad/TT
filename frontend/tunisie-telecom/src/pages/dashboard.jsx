import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import StationTable from '../components/StationTable';
import TransmissionTable from "../components/TransmissionTable";
import AntenneTable from "../components/AntenneTable";
import DerangementTable from "../components/DerangementTable";

function Dashboard() {
  const [tab, setTab] = useState('stations');
  const [role, setRole] = useState('user');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setRole(decoded.role);
    }
  }, []);

  return (
    <div>
      <h1>📊 Tableau de Bord</h1>
      <nav>
        <button onClick={() => setTab('stations')}>Stations</button>
        <button onClick={() => setTab('transmissions')}>Transmissions</button>
        <button onClick={() => setTab('antennes')}>Antennes</button>
        <button onClick={() => setTab('derangements')}>Dérangements</button>
      </nav>
      <hr />
      {tab === 'stations' && <StationTable role={role} />}
      {tab === 'transmissions' && <TransmissionTable role={role} />}
      {tab === 'antennes' && <AntenneTable role={role} />}
      {tab === 'derangements' && <DerangementTable role={role} />}
      {/* À faire : autres composants ici */}
    </div>
  );
}

export default Dashboard;
