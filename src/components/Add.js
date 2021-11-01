import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";

// Componente para adição de um novo registro
export const Add = () => {

    // Definição das propriedades Hooks
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('1');
    const [quantity, setQuantity] = useState('');

    const history = useHistory();

    // Função para adicionar o registro
    const addRecord = (e) => {
        e.preventDefault();

        // Obtenção da coleção atual
        var records = JSON.parse(localStorage.getItem('records')) || [];

        // Adição do novo elemento no array
        records.push({
            id: Math.random().toString().replace('0.', ''),
            title: title,
            date: date,
            type: type,
            quantity: quantity
        });
        
        // Atualização do array no banco de dados
        localStorage.setItem('records', JSON.stringify(records));

        // Voltar para Home
        history.push("/");
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDate = (e) => {
        setDate(e.target.value);
    }

    const onChangeType = (e) => {
        setType(e.target.value);
    }

    const onChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <Container className="mt-4">
            <h2>Adição de Registro</h2>
            <Form onSubmit={addRecord}>
                <FormGroup>
                    <Label>Título: </Label>
                    <Input type="text" value={title} onChange={onChangeTitle} name="title" placeholder="Digite um título" required></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Data: </Label>
                    <Input type="date" value={date} onChange={onChangeDate} name="date" placeholder="Escolha uma data" required></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Tipo: </Label>
                    <Input type="select" value={type} onChange={onChangeType} name="type" placeholder="Escolha um tipo" required>
                        <option value="1">Gasto</option>
                        <option value="2">Ganho</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label>Valor: </Label>
                    <Input type="number" value={quantity} onChange={onChangeQuantity} name="quantity" placeholder="0.00" required></Input>
                </FormGroup>
                <Button className="btn btn-success" type="submit">SALVAR</Button>
                <Link to="/" className="btn btn-default ml-2">VOLTAR</Link>
            </Form>
        </Container >
    );
}

export default Add;
