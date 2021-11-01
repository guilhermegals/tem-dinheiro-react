import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button, Container } from "reactstrap";

// Componente para listagem das informações
export const Records = () => {

    // Obtenção dos registros salvos no banco de dados
    const recordsAux = JSON.parse(localStorage.getItem('records')) || [];
    const [records, setRecords] = useState(recordsAux);

    // Filtragem de todos os gastos
    const expenses = records.filter(function (record) {
        return record.type == '1';
    });
    // Somatario de todos os gastos
    const totalExpenses = expenses.reduce(function (a, b) {
        return a + parseFloat(b['quantity']);
    }, 0);

    // Filtragem de todos os ganhos
    const incomes = records.filter(function (record) {
        return record.type != '1';
    });
    // Somatario de todos os ganhos
    const totalIncomes = incomes.reduce(function (a, b) {
        return a + parseFloat(b['quantity']);
    }, 0);

    // Calculo do saldo
    const total = totalIncomes - totalExpenses;

    // Função para remover um registro
    const removeRecord = (record) => {
        setRecords(records.filter((r) => r !== record));
    }

    // Função para obter qual a cor do tipo do registro
    const getColor = (record) => {
        if (record.type === '1') return "lightcoral";
        else return "lightgreen";
    }

    useEffect(() => localStorage.setItem('records', JSON.stringify(records)));

    return (
        <Container>
            <div className="mb-4">
                <div className="d-flex justify-content-center">
                    <h4>Saldo: R$ {total}</h4>
                </div>
                <div className="d-flex justify-content-center" style={{ color: "lightcoral" }}>
                    <h4>Total de gastos: R$ {totalExpenses}</h4>
                </div>
                <div className="d-flex justify-content-center" style={{ color: "lightgreen" }}>
                    <h4>Total de ganhos: R$ {totalIncomes}</h4>
                </div>
            </div>
            <Link to={`/add`} color="primary" className="btn btn-primary mr-1 w-100">ADICIONAR REGISTRO</Link>

            <hr />

            <ListGroup className="mt-4">
                {records.length > 0 ? (
                    <>
                        {records
                            .sort((a, b) => {
                                return new Date(b.date) - new Date(a.date);
                            }).map(record => (
                                <ListGroupItem className="d-flex justify-content-between align-items-center" style={{ backgroundColor: getColor(record) }} key={record.id}>
                                    <div className="d-flex d-flex justify-content-around">
                                        <strong className="m-2">{record.title}</strong>
                                        <span className="m-2">{record.date}</span>
                                        <span className="m-2">R${record.quantity}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/edit/${record.id}`} color="warning" className="btn btn-warning m-2">Editar</Link>
                                        <Button onClick={() => removeRecord(record)} className="m-2" color="danger">Deletar</Button>
                                    </div>
                                </ListGroupItem>
                            ))}
                    </>
                ) : (
                    <h4 className="text-center">Você não possui registros</h4>
                )}
            </ListGroup>
        </Container>
    );
};
