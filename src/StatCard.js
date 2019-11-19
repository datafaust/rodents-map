import React from 'react';
import { Card } from 'react-bootstrap';
import classes from './statcard.module.css';

const StatCard = (props) => {

    return (
        <Card className={classes.cards}>
            <Card.Body>
                <h1 className={classes.title}>{props.value}</h1>
            </Card.Body>
        </Card>
    )
};

export default StatCard;