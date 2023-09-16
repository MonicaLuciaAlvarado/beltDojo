import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Nuevo = () =>{
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [tesoros, setTesoros] = useState();
    const [imagen, setImagen] = useState("");
    const [peg, setPeg] = useState(true);
    const [eye, setEye] = useState(true);
    const [hook, setHook] = useState(true);
    const [phrases, setPhrases] = useState();

    const [min, setMin] = useState(true);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const guardarPirata = (e) =>{
        e.preventDefault();
        if (name.length<=2){
            console.log("Error, el nombre debe de tener mínimo 3 caracteres")
            axios.post("http://localhost:8000/api/piratas",{
                position,
                tesoros,
                imagen,
                peg,
                eye,
                hook,
                phrases
            })
            .then(res => setErrors(res.response.data.errors))
            .catch(err => setErrors(err.response.data.errors));
        }
        else{
            axios.post("http://localhost:8000/api/piratas",{
            name,
            position,
            tesoros,
            imagen,
            peg,
            eye,
            hook,
            phrases
        })
        .then(res => navigate("/"))
        .catch(err => setErrors(err.response.data.errors));
        }
    }

    const nombrarPirata= (e) =>{
        if(e.target.value.length<=2){
            setName(e.target.value);
            setMin(true);
        }
        else{
            setName(e.target.value);
            setMin(false);
        }
    }
    return(
        <div>
            <div className="nav">
                <h1 className='nav-item'>Add Pirate</h1>
                <Link to="/" className='btn btn-success nav-item'>Crew board</Link>
            </div>
            <form onSubmit={guardarPirata}>
                <div>
                    <label>Pirate Name:</label>
                    <input type="text" id="name" value={name} onChange={nombrarPirata} className='form-control' />
                    {errors.name ? <span className='text-danger'>{errors.name.message}</span>: null}
                    {min ? <span className='text-danger'>El nombre debe de tener mínimo 3 caracteres</span>: null}
                </div>
                <div>
                        <label>Image URL: </label>
                        <input type='text' name="imagen" value={imagen} className="form-control" onChange={e => setImagen(e.target.value)}/>
                        {errors.imagen ? <span className='text-danger'>{errors.imagen.message}</span>: null}
                </div>
                <div>
                    <label># of Treasure Chests: </label>
                    <input type="number" id="tesoros" value={tesoros} onChange={e => setTesoros(e.target.value)} className='form-control' />
                    {errors.tesoros ? <span className='text-danger'>{errors.tesoros.message}</span>: null}
                </div>
                <div>
                    <select name= "position" defaultValue={'DEFAULT'} onChange={e => setPosition(e.target.value)}>
                        <option value="DEFAULT" disabled>Seleccione uno</option>
                        <option value="Captain">Captain</option>
                        <option value="First Mate">First Mate</option>
                        <option value="Quarter Master">Quarter Master</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                    {errors.position ? <span className='text-danger'>{errors.position.message}</span>: null}
                </div>
                <div>
                    <label>Pirate Catch Phrases:</label>
                    <textarea name= 'phrases' value={phrases} onChange={e => setPhrases(e.target.value)}/>
                    {errors.phrases ? <span className='text-danger'>{errors.phrases.message}</span>: null}

                </div>
                <div>
                    <input type="checkbox" className='form-check-input' id='peg' name="peg" checked={peg} onChange={e => setPeg(e.target.checked)}/>
                    <label htmlFor='peg'>Peg Leg</label>
                </div>
                <div>
                    <input type="checkbox" className='form-check-input' id='eye' name="eye" checked={eye} onChange={e => setEye(e.target.checked)}/>
                    <label htmlFor='eye'>Eye Patch</label>
                </div>
                <div>
                    <input type="checkbox" className='form-check-input' id='hook' name="hook" checked={hook} onChange={e => setHook(e.target.checked)}/>
                    <label htmlFor='hook'>Hook Hand</label>
                </div>
                <input type="submit" className='btn btn-success mt-3' value="Add Pirate"/>
            </form>
        </div>
    )
}

export default Nuevo;