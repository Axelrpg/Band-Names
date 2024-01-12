import React, { useEffect, useState } from "react";

export const BandList = ({
    data, vote, deleteBand, changeBandName
}) => {
    const [bands, setBands] = useState(data);

    useEffect(() => {
        setBands(data);
    }, [data]);

    const changeName = (event, id) => {
        const newName = event.target.value;

        setBands((bands) =>
            bands.map((band) => {
                if (band.id === id) {
                    band.name = newName;
                }
                return band;
            })
        );
    };

    const onLostFocus = (id, name) => {
        changeBandName(id, name);
    };

    const createRows = () => {
        return bands.map((band) => (
            <tr key={band.id}>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={() => vote(band.id)}
                    >+1</button>
                </td>
                <td>
                    <input
                        className="form-control"
                        value={band.name}
                        onChange={(event) => changeName(event, band.id)}
                        onBlur={() => onLostFocus(band.id, band.name)}
                    />
                </td>
                <td>
                    <h3>{band.votes}</h3>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteBand(band.id)}
                    >Borrar</button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <h3>Bandas Actuales</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Band</th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>{createRows()}</tbody>
            </table>
        </>
    );
};
