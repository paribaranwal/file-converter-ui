import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Row, Col } from 'react-bootstrap';
export default () => {
    const converters = [{
        title: 'PDF Converter',
        subTitle: 'Converts any file into PDF',
        description: 'Tool to convert any file into PDF file',
        linkName: 'PDF Converter',
        route: '/pdf-converter',
        active: true
    }, {
        title: 'Image Converter',
        subTitle: 'Converts any file into Image',
        description: 'Tool to convert any file into Image file',
        linkName: 'Image Converter',
        route: '/image-converter',
        active: false
    }];
    return (
        <div className="mt-4 p-5 container">
            <Row xs={1} md={2} className="g-4">
                {(converters || []).map(converter =>
                    <Col key={converter.route}>
                        <Card variant="primary" key={converter.route}>
                            <Card.Header>{converter.title}</Card.Header>
                            <Card.Body>
                                <Card.Title>{converter.subTitle}</Card.Title>
                                <Card.Text>
                                    {converter.description}
                                </Card.Text>
                                <Button variant="unknown">
                                    <Card.Link href={converter.route}>{converter.linkName}
                                    </Card.Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
      );
};