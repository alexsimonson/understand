import React from 'react';
import { Row, Col, Table } from 'reactstrap';

const Instagram = (props) => {
    const { data } = props;

    if (!data) {
        return <div></div>
    }
    return (
        <Row className='instagram'>
            <Col sm='12' md={{ size: 4, offset: 4 }}>

            </Col>
        </Row>
    );
};

export default Instagram;