import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, ButtonGroup, Spinner, Modal } from 'react-bootstrap';
import tarefaService from '../services/tarefaService';
import ItemTarefa from './ItemTarefa';
import FormularioTarefa from './FormularioTarefa';

function ListaDeTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [filtro, setFiltro] = useState('todas');
    const [mensagem, setMensagem] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        carregarTarefas();
    }, [filtro]);

    const carregarTarefas = async () => {
        try {
            setCarregando(true);
            const filtroParam = filtro === 'todas' ? null : filtro;
            const data = await tarefaService.getAllTarefas(filtroParam);
            setTarefas(data);
        } catch (error) {
            mostrarMensagem('Erro ao carregar tarefas', 'danger');
        } finally {
            setCarregando(false);
        }
    };

    const handleCriarTarefa = async (tarefa) => {
        try {
            await tarefaService.createTarefa(tarefa);
            mostrarMensagem('Tarefa criada com sucesso!', 'success');
            carregarTarefas();
        } catch (error) {
            mostrarMensagem('Erro ao criar tarefa', 'danger');
        }
    };

    const handleAtualizarTarefa = async (tarefa) => {
        try {
            await tarefaService.updateTarefa(tarefaEditando.id, tarefa);
            mostrarMensagem('Tarefa atualizada com sucesso!', 'success');
            setTarefaEditando(null);
            carregarTarefas();
        } catch (error) {
            mostrarMensagem('Erro ao atualizar tarefa', 'danger');
        }
    };

    const handleToggleConcluida = async (id) => {
        try {
            await tarefaService.toggleConcluida(id);
            mostrarMensagem('Status atualizado com sucesso!', 'success');
            carregarTarefas();
        } catch (error) {
            mostrarMensagem('Erro ao atualizar status', 'danger');
        }
    };

    const handleDeletar = async (id) => {
        try {
            await tarefaService.deleteTarefa(id);
            mostrarMensagem('Tarefa deletada com sucesso!', 'success');
            carregarTarefas();
        } catch (error) {
            mostrarMensagem('Erro ao deletar tarefa', 'danger');
        }
    };

    const handleEditar = (tarefa) => {
        setTarefaEditando(tarefa);
        setMostrarModal(true);
    };

    const handleCancelarEdicao = () => {
        setTarefaEditando(null);
        setMostrarModal(false);
    };

    const handleAbrirModal = () => {
        setTarefaEditando(null);
        setMostrarModal(true);
    };

    const handleSalvar = (tarefa) => {
        if (tarefaEditando) {
            handleAtualizarTarefa(tarefa);
        } else {
            handleCriarTarefa(tarefa);
        }
        setMostrarModal(false);
    };

    const mostrarMensagem = (texto, tipo) => {
        setMensagem({ texto, tipo });
        setTimeout(() => setMensagem(null), 3000);
    };

    const tarefasPendentes = tarefas.filter(t => !t.concluida).length;
    const tarefasConcluidas = tarefas.filter(t => t.concluida).length;

    return (
        <Container className="py-4">
            <div className="text-center mb-4">
                <h1 className="display-4 mb-2" style={{ color: '#41454A', fontWeight: 'bold' }}>
                    Sistema de Tarefas
                </h1>
                <p style={{ color: '#6C7279', fontSize: '1.1rem', fontWeight: '500' }}>
                    Gerencie suas tarefas de forma simples e eficiente
                </p>
            </div>

            {mensagem && (
                <Alert 
                    variant={mensagem.tipo} 
                    dismissible 
                    onClose={() => setMensagem(null)}
                    className="animate__animated animate__fadeIn"
                >
                    {mensagem.texto}
                </Alert>
            )}

            {/* Modal do Formulário */}
            <Modal show={mostrarModal} onHide={handleCancelarEdicao} size="lg" centered>
                <Modal.Header 
                    closeButton 
                    style={{ 
                        background: 'linear-gradient(135deg, #478EFF 0%, #41454A 100%)',
                        color: 'white',
                        borderBottom: '3px solid #CCE0FF'
                    }}
                >
                    <Modal.Title style={{ fontWeight: 'bold', color: 'white' }}>
                        {tarefaEditando ? 'Editar Tarefa' : 'Nova Tarefa'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '2rem' }}>
                    <FormularioTarefa
                        tarefaEditando={tarefaEditando}
                        onSalvar={handleSalvar}
                        onCancelar={handleCancelarEdicao}
                    />
                </Modal.Body>
            </Modal>

            <Row>
                <Col lg={4} className="mb-4">
                    <div className="p-4 rounded shadow" style={{ 
                        backgroundColor: '#CCE0FF',
                        border: '3px solid #478EFF'
                    }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0" style={{ color: '#41454A', fontWeight: 'bold' }}>Estatísticas</h6>
                            <Button 
                                size="sm"
                                onClick={handleAbrirModal}
                                style={{
                                    backgroundColor: '#478EFF',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}
                            >
                                Nova Tarefa
                            </Button>
                        </div>
                        <div className="d-flex justify-content-around mt-3">
                            <div className="text-center">
                                <div className="display-6" style={{ color: '#41454A', fontWeight: 'bold' }}>{tarefas.length}</div>
                                <small style={{ color: '#41454A', fontWeight: '500' }}>Total</small>
                            </div>
                            <div className="text-center">
                                <div className="display-6" style={{ color: '#478EFF', fontWeight: 'bold' }}>{tarefasPendentes}</div>
                                <small style={{ color: '#41454A', fontWeight: '500' }}>Pendentes</small>
                            </div>
                            <div className="text-center">
                                <div className="display-6" style={{ color: '#41454A', fontWeight: 'bold' }}>{tarefasConcluidas}</div>
                                <small style={{ color: '#41454A', fontWeight: '500' }}>Concluídas</small>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col lg={8}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 style={{ color: '#41454A', fontWeight: 'bold' }}>Lista de Tarefas</h4>
                        <ButtonGroup>
                            <Button
                                onClick={() => setFiltro('todas')}
                                size="sm"
                                style={{
                                    backgroundColor: filtro === 'todas' ? '#478EFF' : '#CCE0FF',
                                    color: filtro === 'todas' ? 'white' : '#41454A',
                                    border: '2px solid #478EFF',
                                    fontWeight: 'bold'
                                }}
                            >
                                Todas
                            </Button>
                            <Button
                                onClick={() => setFiltro('pendentes')}
                                size="sm"
                                style={{
                                    backgroundColor: filtro === 'pendentes' ? '#478EFF' : '#CCE0FF',
                                    color: filtro === 'pendentes' ? 'white' : '#41454A',
                                    border: '2px solid #478EFF',
                                    fontWeight: 'bold'
                                }}
                            >
                                Pendentes
                            </Button>
                            <Button
                                onClick={() => setFiltro('concluidas')}
                                size="sm"
                                style={{
                                    backgroundColor: filtro === 'concluidas' ? '#41454A' : '#CCE0FF',
                                    color: filtro === 'concluidas' ? 'white' : '#41454A',
                                    border: '2px solid #41454A',
                                    fontWeight: 'bold'
                                }}
                            >
                                Concluídas
                            </Button>
                        </ButtonGroup>
                    </div>

                    {carregando ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" style={{ color: '#478EFF' }} />
                            <p className="mt-3" style={{ color: '#41454A', fontWeight: '500' }}>Carregando tarefas...</p>
                        </div>
                    ) : tarefas.length === 0 ? (
                        <div className="text-center py-5 rounded" style={{ backgroundColor: '#CCE0FF', border: '2px solid #478EFF' }}>
                            <h5 style={{ color: '#41454A' }} className="mt-3">Nenhuma tarefa encontrada</h5>
                            <p style={{ color: '#6C7279' }}>
                                {filtro === 'todas' 
                                    ? 'Comece criando sua primeira tarefa!' 
                                    : `Nenhuma tarefa ${filtro}`}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-3 text-end">
                                <small className="text-muted">
                                    Total: <strong>{tarefas.length}</strong> tarefa(s)
                                </small>
                            </div>
                            {tarefas.map(tarefa => (
                                <ItemTarefa
                                    key={tarefa.id}
                                    tarefa={tarefa}
                                    onToggleConcluida={handleToggleConcluida}
                                    onEditar={handleEditar}
                                    onDeletar={handleDeletar}
                                />
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ListaDeTarefas;

