import React, { SelectHTMLAttributes } from 'react';

import './styles.css'

interface SelectOptions {
    value: string,
    label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string,
    name: string,
    options: Array<SelectOptions>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value='' id={name} {...rest} >
                <option value='' disabled hidden>Selecione uma opção</option>

                {options.map(({value, label}) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;