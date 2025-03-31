import React from 'react';
import { Link } from 'react-router-dom';
import canales from './CanalesData';

const CanalesRender = () => {
  return (
    <div>
        
      {canales.map((canal) => (
        <Link key={canal.id} to={`/canales/${canal.id}`}> {/* Cambié la ruta */}
          <div>
            <span className='nombreCanal'>{canal.nombre}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CanalesRender;
