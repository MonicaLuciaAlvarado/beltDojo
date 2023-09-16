import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Todos = () => {
    const [piratas, setPiratas] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/piratas")
        .then(res => setPiratas(res.data))
        .catch(err => console.log(err))
    }, [])

    const borrarPirata = id => {
        axios.delete("http://localhost:8000/api/piratas/"+id)
        .then(res =>{
            let nuevaLista = piratas.filter(pir => pir._id !== id)
            setPiratas(nuevaLista);
        })
        .catch(err=>console.log(err))
    }
    return(
        <div>
            <div className="nav">
            <h1 className='nav-item'>Pirate Crew</h1>
            <Link to="/pirate/new" className='btn btn-success nav-item'>Add Pirate</Link>
            </div>
                {
                    piratas.map((pirata, index) => (
                        <div className='card col-3' key={index}>
                            <img src={pirata.imagen} alt='pirata' className='img-fluid imagen'/>
                            <h2>{pirata.name}</h2>
                            <Link className='btn btn-warning' to={`/editar/${pirata._id}`}>View Pirate</Link>
                            <button className='btn btn-info' onClick={() => borrarPirata(pirata._id)}>Walk the Plank</button>
                        </div>
                    ))
                }
        </div>
    )
}

export default Todos;