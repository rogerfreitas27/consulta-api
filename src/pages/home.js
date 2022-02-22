import React ,{useState,useRef,useEffect} from 'react';
import { Container,Card,Row,Col,Button,Navbar,InputGroup } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import logo from './../imagens/logo.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Home() {
    const form = useRef();
    const [numero, setNumero] = useState("");
    const [status, setStatus] = useState("");
    const [situacao, setSituacao] = useState("");
    const [placa, setPlaca] = useState("");
    const [valor, setValor] = useState("");
    const [mensagem, setMensagem] = useState("");

    const onChangeNumero = (e) => {
        setMensagem("");
        setStatus("");
		setSituacao("");
		setPlaca("");
		setValor("");
       
        const numero = e.target.value;
        setNumero(numero);
      };


    function buscarApolice(e){
        setMensagem("Buscando registro...");
        e.preventDefault();
        
      
       buscarPorNumero(numero).then(
        res => {
		
            setMensagem("");
            setStatus(res.status);
			setSituacao(res.situacao);
			setPlaca(res.placa);
			setValor(res.valor);
			// setLoading(false);
			// setSuMessage(res);
			
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log( error.response.data);
         // setLoading(false);
         if( error.response.data==null ||  error.response.data==undefined){
            setMensagem(error.response);
         }else
         setMensagem( error.response.data);
        }
       );	 
        
    }




    function buscarPorNumero(numero) {
        return axios
        .get('https://api-seguro.herokuapp.com/api/apolice/consulta/'+numero)
        .then((response) => {
          
    
          return response.data;
        });
        
        
    }


    return (
<>
<Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      View de consultar seguro
      </Navbar.Brand>
    </Container>
  </Navbar>

        <Container>
            
        <br/>
         <br/>
         <div className="d-flex justify-content-center">
         <div className="col-md-10">

         <Form onSubmit={buscarApolice} ref={form} >
         <Card>
         
         <div className="text-center">      <Card.Header>
             <InputGroup   size="lg">
    <input  type="text"  onChange={onChangeNumero}  value={numero} className="form-control"   placeholder="Buscar seguro por numero"  />
   <Button  type="Submit"  >
  <FontAwesomeIcon icon={faSearch} />
   </Button>   
  </InputGroup></Card.Header> </div>
  

  <Card.Body>
  <div className="text-center">   <Card.Title> <h1>Seguro</h1></Card.Title> </div>
    
    <Row> 
    <Col>
    <div className="form-group mb-3">
            <label htmlFor="nome">Status</label>
            <Input
              type="text"
              className="form-control"
              name="status"
              value={status}/>
          </div>
          </Col> 
		  
          <Col>
          <div className="form-group mb-3">
            <label htmlFor="modelo">Situação</label>
            <Input
              type="text"
              className="form-control"
              name="situacao"
              value={situacao}/>
          </div>
          </Col>
    </Row> 



    <Row> 
    <Col>
   <div className="form-group mb-3">
           <label htmlFor="nome">Placa</label>
           <Input
             type="text"
             className="form-control"
             name="placa"
             value={placa}/>
         </div>
         </Col> 
         
         <Col>
         <div className="form-group mb-3">
           <label htmlFor="modelo">Valor</label>
           <Input
             type="text"
             className="form-control"
             name="valor"
             value={valor}/>
         </div>
         </Col>
   </Row> 




    
    
  </Card.Body>
  <div className="text-center"> <Card.Footer className="text-muted">
     {
     mensagem
     }</Card.Footer> </div>
</Card>
</Form>

             </div>
             </div>
             </Container>
             </>
    );
  }
  
  export default Home;