import { useNavigate } from "react-router"


export function ToyPreview({ toy }) {
    const navigate = useNavigate()
    return (

        <article className="toys-preview-box">
            <h4 className="toy-name">{toy.name}</h4>
            <span className="price-count">${toy.price.toLocaleString()}</span>
            
            <img src={toy.thumbnail} onClick={() => navigate(`/toy/${toy._id}`)} />
            {/* <NavLink to={`/car/${car._id}`}>Details</NavLink> |
        <NavLink to={`/car/edit/${car._id}`}>Edit</NavLink> */}

        </article>
    )
}