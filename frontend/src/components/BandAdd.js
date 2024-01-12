import React, { useState } from "react";

export const BandAdd = ({
    addBand,
}) => {

    const [value, setValue] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(value);

        if (value.trim().length > 0) {
            addBand(value);
            setValue('');
        }
    };

    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={onSubmit}>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    autoComplete="off"
                    value={value}
                    onChange={(ev) => setValue(ev.target.value)}
                />
            </form>
        </>
    );
};