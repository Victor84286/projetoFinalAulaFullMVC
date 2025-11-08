import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function ItemTarefa({ tarefa, onToggleConcluida, onEditar, onDeletar }) {
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="mb-3 shadow-sm" style={{ 
            borderLeft: tarefa.concluida ? '5px solid #41454A' : '5px solid #478EFF',
            transition: 'all 0.3s ease',
            backgroundColor: '#CCE0FF'
        }}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title 
                        style={{ 
                            textDecoration: tarefa.concluida ? 'line-through' : 'none',
                            color: tarefa.concluida ? '#6c757d' : '#41454A',
                            flex: 1,
                            fontWeight: 'bold'
                        }}
                    >
                        {tarefa.titulo}
                    </Card.Title>
                    <Badge 
                        style={{ 
                            backgroundColor: tarefa.concluida ? '#41454A' : '#478EFF',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '0.5rem 0.75rem'
                        }}
                    >
                        {tarefa.concluida ? 'Concluída' : 'Pendente'}
                    </Badge>
                </div>
                
                <Card.Text className="text-muted">
                    {tarefa.descricao || 'Sem descrição'}
                </Card.Text>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '2px solid #478EFF' }}>
                    <small style={{ color: '#41454A', fontWeight: '500' }}>
                        {formatarData(tarefa.dataCriacao)}
                    </small>
                    
                    <div>
                        <Button 
                            size="sm" 
                            className="me-2"
                            onClick={() => onToggleConcluida(tarefa.id)}
                            style={{
                                backgroundColor: tarefa.concluida ? '#6C7279' : '#478EFF',
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            {tarefa.concluida ? 'Reabrir' : 'Concluir'}
                        </Button>
                        <Button 
                            size="sm" 
                            className="me-2"
                            onClick={() => onEditar(tarefa)}
                            style={{
                                backgroundColor: '#478EFF',
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Editar
                        </Button>
                        <Button 
                            size="sm"
                            onClick={() => {
                                if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
                                    onDeletar(tarefa.id);
                                }
                            }}
                            style={{
                                backgroundColor: '#41454A',
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Deletar
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ItemTarefa;

