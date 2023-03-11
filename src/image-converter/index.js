import React from 'react';
import {
    Container,
    Alert
} from 'react-bootstrap';
export default () => {
    return (
        <Container className="mt-4 p-5">
            <Alert variant={'warning'}>
                {'Coming soon'}
            </Alert>
        </Container>
    );
};
