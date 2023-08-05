import { Container, Row} from "react-bootstrap"
import { Footer } from "./NavigationBar"
import React from "react"
export default function About(){
    return(
        <React.Fragment>
        <Container fluid className="p-0">
            <Row>
                <div className="atas" style={{height:200}}></div>
            </Row>
            <Row style={{marginTop:50}}>
                <Row> 
                    <Container className="d-flex justify-content-center">
                        Alamat
                    </Container>
                    <Container className="d-flex justify-content-center">
                        Jl.Gelatik No 85 Blok F, Tangerang Selatan, Banten
                    </Container>
                </Row>
                <Row style={{marginTop:20}}>
                    <Container className="d-flex justify-content-center">Phone</Container>
                    <Container className="d-flex justify-content-center">
                    +62 81263035236
                    </Container>
                </Row>
                <Row style={{marginTop:20}}>
                    <Container className="d-flex justify-content-center">CONTACT PERSON</Container>
                    <Container className="d-flex justify-content-center">
                    <ul style={{listStyleType:"none"}}>
                        <li>WhatsApp : +62 81263035236</li>
                        <li>Instagram    : @Mecha.id</li>
                        <li>Facebook  : MechaId</li>
                    </ul>
                    </Container>
                </Row>
                <Row style={{marginTop:40, marginBottom:20}}>
                    <Container className="d-flex justify-content-center">OPEN HOURS</Container>
                    <Container className="d-flex justify-content-center">
                    <ul style={{listStyleType:"none"}}>
                        <li>Senin - Jum’at : 8.00 WIB - 17.00 WIB</li>
                        <li>Sabtu   : 8.00 WIB - 15.00 WIB</li>
                    </ul>
                    </Container>
                </Row>
            </Row>
        </Container>
        </React.Fragment>
    )
}