import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export const ModPoszt = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.userId;
    const [adat, setAdat] = useState({
        userId: '',
        id: '',
        title: '',
        body: ''
    });
    useEffect(() => {
        (async() =>{
            try {
                const tartalom = await axios.get(`https://harmadik.sulla.hu/Post/${id}`);
                setAdat(tartalom.data);
            }
            catch(error) {
                console.error("Hiba a kommentek betöltése közben:", error);
            }
        })()}, [id]);
    const handleSubmit =(event) =>{
        event.persist();
        event.preventDefault();
        axios.put(`https://harmadik.sulla.hu/Post/${id}`, adat)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Hiba az adatok mentése közben: ",error)
            })
    };
    const hadleInputChange = (event) => {
        const { name, value } = event.target;
        setAdat((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    return(
        <div>
            <h2>Új poszt</h2>
            <form
                onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label htmlFor="name" className="form-label">PostId</label>
                    <input type="text" className="form-control" id="postid" name="userId" defaultValue={adat.userId} onChange={hadleInputChange}/>
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="id" defaultValue={adat.id} onChange={hadleInputChange}/>
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="title" name="title" defaultValue={adat.email} onChange={hadleInputChange} />
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <input type="text" className="form-control" id="body" name="body" defaultValue={adat.body} onChange={hadleInputChange}/>
                </div>
                <button type="submit" className="btn btn-success">Mentés</button> &nbsp;&nbsp;&nbsp;
                <span className="btn btn-warning"><Link to="/" style={{color: 'red', textDecoration: 'none'}}>Vissza</Link></span>
            </form>
        </div>
    );
}