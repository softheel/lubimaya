import React from "react";
import './BtnLarge.css';
// bootstrap
import Button from 'react-bootstrap/Button';


export default function BtnLarge({ children, className, onClick }) {
    return (
        <Button className={`btn ${className}`} onClick={onClick}>
            {children}
        </Button> 
    );
}