import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function FormularioTarefa({ tarefaEditando, onSalvar, onCancelar }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [concluida, setConcluida] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (tarefaEditando) {
            setTitulo(tarefaEditando.titulo);
            setDescricao(tarefaEditando.descricao || '');
            setConcluida(tarefaEditando.concluida);
        } else {
            limparFormulario();
        }
    }, [tarefaEditando]);

    const limparFormulario = () => {
        setTitulo('');
        setDescricao('');
        setConcluida(false);
        setErro('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!titulo.trim()) {
            setErro('O título é obrigatório');
            return;
        }

        const tarefa = {
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            concluida: concluida
        };

        onSalvar(tarefa);
        limparFormulario();
    };

    const handleCancelar = () => {
        limparFormulario();
        onCancelar();
    };

    return (
        <div>
            {erro && (
                <Alert variant="danger" onClose={() => setErro('')} dismissible>
                    {erro}
                </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitulo">
                        <Form.Label>
                            Título <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o título da tarefa"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            maxLength={255}
                            required
                        />
                        <Form.Text className="text-muted">
                            Digite um título claro e objetivo para a tarefa
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Adicione mais detalhes sobre a tarefa (opcional)"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            maxLength={1000}
                        />
                        <Form.Text className="text-muted">
                            Opcional - Adicione informações adicionais sobre a tarefa
                        </Form.Text>
                    </Form.Group>

                    {tarefaEditando && (
                        <Form.Group className="mb-3" controlId="formConcluida">
                            <Form.Check
                                type="checkbox"
                                label="Marcar como concluída"
                                checked={concluida}
                                onChange={(e) => setConcluida(e.target.checked)}
                            />
                        </Form.Group>
                    )}

                    <div className="d-flex gap-2">
                        <Button 
                            type="submit" 
                            className="flex-grow-1"
                            style={{
                                backgroundColor: '#478EFF',
                                border: 'none',
                                fontWeight: 'bold',
                                padding: '0.75rem',
                                color: 'white'
                            }}
                        >
                            {tarefaEditando ? 'Salvar Alterações' : 'Criar Tarefa'}
                        </Button>
                        <Button 
                            onClick={handleCancelar}
                            style={{
                                backgroundColor: '#6C7279',
                                border: 'none',
                                fontWeight: 'bold',
                                padding: '0.75rem',
                                color: 'white'
                            }}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>

                {tarefaEditando && tarefaEditando.dataCriacao && (
                    <div className="mt-3 p-3 rounded" style={{ 
                        backgroundColor: '#CCE0FF',
                        border: '2px solid #478EFF'
                    }}>
                        <small style={{ color: '#41454A', fontWeight: '500' }}>
                            <strong>Criada em:</strong> {new Date(tarefaEditando.dataCriacao).toLocaleString('pt-BR')}
                        </small>
                    </div>
                )}
        </div>
    );
}

export default FormularioTarefa;

