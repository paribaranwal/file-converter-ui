import React, { useState, useEffect } from "react";
import { CONVERT_TO_PDF } from '../urls';
import {
    Row,
    Col,
    Container,
    Form,
    Button,
    Alert,
    Spinner,
    ProgressBar,
    Card
} from 'react-bootstrap';
export default () => {
    const [sourceTypes] = useState([{
        key: 'doc',
        label: 'Word'
    }, {
        key: 'excel',
        label: 'Excel'
    }]);
    const [fromType, setFromType] = useState(sourceTypes[0].key);
    const [file, setFile] = useState(null);
    const [isFormValid, setValidated] = useState(false);
    const [conversionMessage, setConversionMessage] = useState('');
    const [alertyType, setAlertType] = useState(null);
    const [inProgress, setInProgress] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || !isFormValid) {
            event.preventDefault();
            event.stopPropagation();
        }
        convert(event);
    };
    const convert = async (event) => {
        if (fromType && file) {
            setInProgress(true);
            const data = new FormData()
            data.append('file', file)
            data.append('user', 'testuser')
            await fetch(CONVERT_TO_PDF, {
                method: 'POST',
                body: data
            })
            .then(response => {
                if (response.ok) {
                    setFile(null);
                    const name = file.name.substring(0, file.name.lastIndexOf('.'));
                    const filename = `${name}.pdf`;
                    return response.blob().then(blob => ({ filename, blob }));
                }
                throw new Error(response.body);
            })
            .then(({ filename, blob }) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                setAlertType('success');
                setConversionMessage(`File Converted & Downloaded`);
                setInProgress(false);
            })
            .catch(e => {
                console.log(e);
                event.preventDefault();
                setAlertType('danger');
                setConversionMessage('Error in conversion');
                setInProgress(false);
            });
        }
    }
    useEffect(() => {
        setValidated(Boolean(fromType && file));
    }, [fromType, file]);
    return (
        <Container className="mt-4 p-5">
            <Row>
                <Col>
                    <Form noValidate validated={isFormValid} className="mb-3">
                        {conversionMessage && <Alert variant={alertyType} dismissible>
                            {conversionMessage}
                        </Alert>}
                        <Card variant="primary">
                            <Card.Header>PDF Converter</Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3" controlId="fromType">
                                    <Form.Label>PDF Converter</Form.Label>
                                    <Form.Control as={'select'} type="select" required onChange={(e) => setFromType(e.target.value)}
                                        defaultValue={fromType}>
                                        <option>Select From Type</option>
                                        {
                                        sourceTypes.map(c =>
                                                <option key={c.key} value={c.key}>{c.label}</option>
                                            )
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select from type.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="file">
                                    <Form.Label>File</Form.Label>
                                    {inProgress ? <ProgressBar animated now={50} />: <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])}/>}
                                </Form.Group>
                                { !inProgress ? <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                                    Convert
                                </Button> : <Spinner animation="grow" />}
                            </Card.Body>
                        </Card> 
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};