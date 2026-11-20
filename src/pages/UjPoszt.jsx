import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export const UjPoszt = () => {

    const navigate = useNavigate();
    return(
        <div>
            <h2>Új poszt</h2>
            <form
                onSubmit={async (event) =>
                {
                    event.persist();
                    event.preventDefault();
                    try {
                        await axios.post('https://harmadik.sulla.hu/Post',
                            {
                                id: event.target.id.value,
                                title: event.target.title.value,
                                body: event.target.body.value
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            },
                        );
                        navigate('/');
                    } catch (error) {
                        console.error("Hiba az adatok mentése közben:", error);
                    }
                }
                }>
                <div className="form-group row pb-3">
                    <label htmlFor="name" className="form-label">Id</label>
                    <input type="text" className="form-control" id="Id" name="Id" />
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="title" name="title" />
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <input type="text" className="form-control" id="body" name="body" />
                </div>
                <button type="submit" className="btn btn-success">Mentés</button> &nbsp;&nbsp;&nbsp;
                <button type="reset" className="btn btn-danger">Reset</button>
            </form>
        </div>
    );
}