import React from 'react'
import { NavLink } from 'react-router-dom';

const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <h3>{description}</h3>
        <p>{amount}c - {createdAt}</p>
        <NavLink to={`edit/${id}`}>
            Edit Item
        </NavLink>
    </div>
)

export default ExpenseListItem;