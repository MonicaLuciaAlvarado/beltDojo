import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const Editar = () =>{
    const {id} = useParams();

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [tesoros, setTesoros] = useState();
    const [imagen, setImagen] = useState("");
    const [peg, setPeg] = useState(true);
    const [eye, setEye] = useState(true);
    const [hook, setHook] = useState(true);
    const [phrases, setPhrases] = useState();

    const [errors, setErrors] = useState({});

    const [click, setClick] =useState(0);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/piratas/"+id)
        .then( res=>{
            setName(res.data.name);
            setPosition(res.data.position);
            setTesoros(res.data.tesoros);
            setImagen(res.data.imagen);
            setPeg(res.data.peg);
            setEye(res.data.eye);
            setHook(res.data.hook);
            setPhrases(res.data.phrases);
        })
        .catch(err=> setErrors(err.response.data.errors));
    }, [id, click])

    useEffect(() =>{
        axios.put("http://localhost:8000/api/piratas/"+id,{
                peg
            })
            .then(res => setClick(click+1))
            .catch(err=> console.log(err));
    }, [peg])

    useEffect(() =>{
        axios.put("http://localhost:8000/api/piratas/"+id,{
                eye
            })
            .then(res => setClick(click+1))
            .catch(err=> console.log(err));
    }, [eye])

    useEffect(() =>{
        axios.put("http://localhost:8000/api/piratas/"+id,{
                hook
            })
            .then(res => setClick(click+1))
            .catch(err=> console.log(err));
    }, [hook])

    const actualizarPeg = () => {
        if (peg==true){
            setPeg(false);
        }
        else{
            setPeg(true);
            }
        }

        const actualizarEye = () => {
            if (eye==true){
                setEye(false);
            }
            else{
                setEye(true);
                }
            }

            const actualizarHook = () => {
                if (hook==true){
                    setHook(false);
                }
                else{
                    setHook(true);
                    }
                }

    return(
        <div>
            <div className="nav">
                <h1 className='nav-item'>{name}</h1>
            </div>
            <div className="nav">
                <Link to="/" className='btn btn-success nav-item'>Crew board</Link>
            </div>
            <div className='card col-3'>
                <img src={imagen} alt='pirata' className='img-fluid imagen'/>
                <h2>{phrases}</h2>
                <div className="card col-2">
                    <h3>About: </h3>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th> </th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Position: </td>
                                <td>{position}</td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td>Treasures: </td>
                                <td>{tesoros}</td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td>Peg leg: </td>
                                <td>{peg ? <span className='text'>Yes</span>: <span>No</span>}</td>
                                <td>{peg ? <button className='btn btn-danger' onClick={() => actualizarPeg()}>No</button>: <button className='btn btn-info' onClick={() => actualizarPeg()}>Yes</button>}
                                </td>
                            </tr>
                            <tr>
                                <td>Eye Patch: </td>
                                <td>{eye ? <span className='text'>Yes</span>: <span>No</span>}</td>
                                <td>{eye ? <button className='btn btn-danger' onClick={() => actualizarEye()}>No</button>: <button className='btn btn-info' onClick={() => actualizarEye()}>Yes</button>}
                                </td>
                            </tr>
                            <tr>
                                <td>Hook Hand: </td>
                                <td>{hook ? <span className='text'>Yes</span>: <span>No</span>}</td>
                                <td>{hook ? <button className='btn btn-danger' onClick={() => actualizarHook()}>No</button>: <button className='btn btn-info' onClick={() => actualizarHook()}>Yes</button>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Editar;