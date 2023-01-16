import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ToyPreview } from './toy-preview';

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const user = useSelector((storeState) => storeState.userModule.user)

    return <ul className="toy-list grid">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                {

                   user?.isAdmin && <div className='admin-actions'>
                        <button className='remove-x remove-toy' onClick={() => { onRemoveToy(toy._id) }}><span className="material-symbols-outlined">
                            delete
                        </span></button>

                        <button className='icon-button' onClick={() => { onEditToy(toy) }}><span className="material-symbols-outlined">
                            edit
                        </span></button>
                    </div>

                }

                <ToyPreview toy={toy} />


                <button className="button add-to-cart" onClick={() => { }}>
                    Add to Cart
                </button>
            </li>)}
    </ul>
}


ToyList.propTypes = {
    onRemoveToy: PropTypes.func,
    toys: PropTypes.array
}

