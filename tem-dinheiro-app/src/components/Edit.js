import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";

export const Edit = (props) => {
    const history = useHistory();
    const recordId = props.match.params.id;
    const oldRecords = JSON.parse(localStorage.getItem('records')) || [];
    const [ currentRecord, setCurrentRecord ] = useState({
        id: '',
        title: '',
        date: '',
        type: '',
        quantity: '',
    });

    useEffect(() => {
        const recordAux = oldRecords.find(r => r.id === recordId)
        if(recordAux) setCurrentRecord(recordAux);
        else history.push('/');
    }, [])

    const onChange = (e) => {
        setCurrentRecord({ ...currentRecord, [e.target.name]: e.target.value });
    }

    const updateRecord = (e) => {
        const newRecords = oldRecords.filter((r) => r.id !== recordId)
        newRecords.push(currentRecord);
        localStorage.setItem('records', JSON.stringify(newRecords));
        history.push('/');
    };

    return (
        <Container style={{ marginTop: "1rem" }}>
            <h2>Edição de Registro</h2>
            <Form onSubmit={updateRecord}>
                <FormGroup>
                    <Label>Título: </Label>
                    <Input type="text" value={currentRecord.title} onChange={onChange} name="title" placeholder="Digite um título" required></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Data: </Label>
                    <Input type="date" value={currentRecord.date} onChange={onChange} name="date" placeholder="Escolha uma data" required></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Tipo: </Label>
                    <Input type="select" value={currentRecord.type} onChange={onChange} name="type" placeholder="Escolha um tipo" required>
                        <option value="1">Gasto</option>
                        <option value="2">Ganho</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label>Valor: </Label>
                    <Input type="number" value={currentRecord.quantity} onChange={onChange} name="quantity" placeholder="0.00" required></Input>
                </FormGroup>
                <Button className="btn btn-success" type="submit">Editar</Button>
                <Link to="/" className="btn btn-default ml-2">Voltar</Link>
            </Form>
        </Container >
    );
}

export default Edit;
