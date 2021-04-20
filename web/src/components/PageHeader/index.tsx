import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, description, children: form}) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>
            <div className="header-content">
                <strong>{title}</strong>
                
                {description && <p>{description}</p>} {/*{description != null : <p>{description}</p>} )*/}
                
                {form}
            </div>
        </header>
    );
}

export default PageHeader;