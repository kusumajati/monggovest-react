import React from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import {Link} from 'react-router-dom'

class AppFooter extends React.Component{
    render(){

        return(
            <div style={{backgroundColor:'#343a40', paddingTop:'2em'}}>
                <Row>
                    <Col sm='3'>
                        <img style={{width:'70%', opacity:'.6', margin:'0 15%'}} src="http://monggovest.herokuapp.com/static/img/Logo-White@2x.39103d4.png" alt=""/>
                    </Col>
                    <Col sm='2'>
                        <ul style={{listStyle:'none'}}>
                            <li ><Link style={{textDecoration:'none', color:'white', opacity:'0.6'}} to='#'>Investasi</Link></li>
                            <li ><Link style={{textDecoration:'none', color:'white', opacity:'0.6'}} to='#'>Cara Kerja</Link></li>
                            <li ><Link style={{textDecoration:'none', color:'white', opacity:'0.6'}} to='#'>Tentang Kami</Link></li>
                        </ul>
                    </Col>
                    <Col sm='2'>
                    <ul style={{listStyle:'none'}}>
                            <li><Link style={{textDecoration:'none', color:'white', opacity:'0.6'}} to='#'>Bantuan</Link></li>
                            <li><Link  style={{textDecoration:'none', color:'white', opacity:'0.6'}} to='#'>Hubungi Kami</Link></li>
                        </ul>
                    </Col>
                    <Col sm='5'>
                        <h4 style={{textAlign:'center', color:'white', opacity:'0.6'}}>Download Aplikasi Smartphone</h4>
                        <div>
                            <img style={{margin:'0.2em 2% 1em 36%', width:'12%'}} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjBweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0OSAoNTEwMDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPjRGOUYwMEVCLTYyOTYtNDVCMy04Q0NDLTRENENDMDc4NTM2NzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iSGktRmkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQYWdlLUZvb3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwODAuMDAwMDAwLCAtODAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJGb290ZXIiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikljb25zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDgwLjAwMDAwMCwgODAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYwLDMwIEM2MCw0Ni41NjYgNDYuNTY2LDYwIDMwLDYwIEMxMy40MzQsNjAgMCw0Ni41NjYgMCwzMCBDMCwxMy40MzQgMTMuNDM0LDAgMzAsMCBDNDYuNTY2LDAgNjAsMTMuNDM0IDYwLDMwIFogTTQxLjUyNTQsMjkuODAwOCBMMzEuMzY1OSwxMi4zMTUzIEMzMC45NjI0LDExLjYxMzMgMzAuMDYzOSwxMS4zNzc4IDI5LjM2NzksMTEuNzgyOCBMMjguMTc4NCwxMi40NzQzIEMyNy40NzQ5LDEyLjg4MzggMjcuMjQwOSwxMy43ODA4IDI3LjY0NTksMTQuNDc4MyBMMzcuODA2OSwzMS45NjA4IEw0MS41MjU0LDI5LjgwMDggWiBNMzguMjIwNzUsMzIuNjgzNjUgTDQwLjM3NjI1LDM2LjM4NzE1IEw0NC4wOTc3NSwzNC4yMjU2NSBMNDEuOTM5MjUsMzAuNTIyMTUgTDM4LjIyMDc1LDMyLjY4MzY1IFogTTE0Ljc1OTcsMzYuMjI4NDUgTDE4LjU5MjIsMzguNDY0OTUgTDI3LjU3NDIsMjMuMDk3NDUgTDIzLjc0MTcsMjAuODU3OTUgTDE0Ljc1OTcsMzYuMjI4NDUgWiBNMTIuNDI3OCw0NC4wNjI1IEMxMi4zOTMzLDQ0LjE5MTUgMTIuNDQ1OCw0NC4zMjA1IDEyLjU2MjgsNDQuMzg5NSBDMTIuNjczOCw0NC40NTQgMTIuODE5Myw0NC40Mzc1IDEyLjkwNzgsNDQuMzQzIEwxOC4xMTEzLDM5LjI5MjUgTDE0LjI3ODgsMzcuMDQ4NSBMMTIuNDI3OCw0NC4wNjI1IFogTTI0LjA1MjgsMjAuMzIwMzUgTDI3Ljg4NTMsMjIuNTY0MzUgTDI5LjE3MzgsMjAuMzU0ODUgQzI5LjU4MzMsMTkuNjU3MzUgMjkuMzQ5MywxOC43NjAzNSAyOC42NTE4LDE4LjM1MDg1IEwyNy4zNTEzLDE3LjU4ODg1IEMyNi42NTM4LDE3LjE3OTM1IDI1Ljc1MjMsMTcuNDEzMzUgMjUuMzQ3MywxOC4xMTY4NSBMMjQuMDUyOCwyMC4zMjAzNSBaIE00My41MzUxLDM1LjM2NzE1IEM0Mi45MzIxLDM1LjcxMDY1IDQyLjAyNzYsMzYuMjQ2MTUgNDEuNDk2NiwzNi41NjI2NSBDNDAuNTAwNiwzNy4xNTM2NSA0MS4yNjcxLDM4Ljg5OTY1IDQxLjQ5NjYsMzkuMjc0NjUgQzQyLjc4NTEsNDEuNDM3NjUgNDQuMTE1Niw0MS4xMzMxNSA0NS4xMTc2LDQyLjY2MzE1IEM0NS42NjgxLDQzLjUwMTY1IDQ1LjUxNTEsNDMuODcwNjUgNDUuNjg2MSw0NC4xNDk2NSBDNDUuNzU1MSw0NC4yNTAxNSA0NS45NzI2LDQ0LjM1MDY1IDQ2LjA1NTEsNDQuMjMzNjUgQzQ3LjYwMTYsNDIuMDk0NjUgNDcuMTQ4NiwzOC40MTUxNSA0Ni4wMjM2LDM2Ljc3MjY1IEM0NS41MDMxLDM2LjAwNjE1IDQ0LjU1NTEsMzQuNzg2NjUgNDMuNTM1MSwzNS4zNjcxNSBaIE00OC45NTUwNSwzMi4xMTUzIEw0OC45NTM1NSwzMi4xMTUzIEw0OC45NTM1NSwyNy44MzI4IEw0MS4yNzgwNSwyNy44MzI4IEw0My42MTA1NSwzMi4xMTUzIEw0OC45NTUwNSwzMi4xMTUzIFogTTM2LjkyNTgsMzIuMTE1MyBMMzQuNTQ2OCwyNy44MzI4IEwyNS4zNjUzLDI3LjgzMjggTDIyLjk4NjMsMzIuMTE1MyBMMzYuOTI1OCwzMi4xMTUzIFogTTE2LjQxNzIsMzIuMTE1MyBMMTguOTU1MiwyNy44MzI4IEwxMC45OTE3LDI3LjgzMjggTDEwLjk5MTcsMzIuMTE1MyBMMTYuNDE3MiwzMi4xMTUzIFoiIGlkPSJBcHAtU3RvcmUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt=""/>
                            <img style={{margin:'0.2em 36% 1em 2%', width:'12%'}} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjBweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0OSAoNTEwMDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPjFBNkI5QzRCLUE1NEYtNEI3RS1BQjdGLUZBNDIwMkRDREUyMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iSGktRmkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQYWdlLUZvb3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExNzAuMDAwMDAwLCAtODAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJGb290ZXIiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikljb25zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDgwLjAwMDAwMCwgODAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyMC4wMDA2LDAuMDAwMyBDMTAzLjQzMTYsMC4wMDAzIDkwLjAwMDYsMTMuNDMxMyA5MC4wMDA2LDMwLjAwMDMgQzkwLjAwMDYsNDYuNTY5MyAxMDMuNDMxNiw2MC4wMDAzIDEyMC4wMDA2LDYwLjAwMDMgQzEzNi41NjgxLDYwLjAwMDMgMTUwLjAwMDYsNDYuNTY5MyAxNTAuMDAwNiwzMC4wMDAzIEMxNTAuMDAwNiwxMy40MzEzIDEzNi41NjgxLDAuMDAwMyAxMjAuMDAwNiwwLjAwMDMgWiBNMTM3LjY2MDEsMzEuMzAwOCBMMTMxLjg0NzYsMzQuNjI5MyBMMTI3LjA4OTYsMjkuOTE3OCBMMTMxLjg0NzYsMjUuMTgzOCBDMTMzLjUxMTEsMjYuMTQ5OCAxMzcuMTg5MSwyOC4yOTE4IDEzNy42ODQxLDI4LjU1ODggQzEzOC4yNTI2LDI4Ljg2MzMgMTM4LjU4ODYsMjkuMzYxMyAxMzguNTk3NiwyOS44OTUzIEMxMzguNjAzNiwzMC4yMTYzIDEzOC40ODY2LDMwLjgyMzggMTM3LjY2MDEsMzEuMzAwOCBaIE0xMjQuMTEzNiwzOS4xMDUzIEMxMjQuMTEzNiwzOS4xMDUzIDExMS4xMzcxLDQ2LjYwODMgMTEwLjQ5NjYsNDYuOTgwMyBDMTEwLjIyMDYsNDcuMTQyMyAxMDkuOTI1MSw0Ny4yMDA4IDEwOS42NTIxLDQ3LjIxNDMgTDEyNi4wMzUxLDMwLjk3MjMgTDEzMC41MTExLDM1LjQyNTggTDEyNC4xMTM2LDM5LjEwNTMgWiBNMTA4LjE5ODYsNDUuNzM4MyBMMTA4LjE5ODYsMTQuNDAxOCBDMTA4LjE5ODYsMTQuMDU2OCAxMDguMjg3MSwxMy43NDkzIDEwOC40MzQxLDEzLjQ4ODMgTDEyNC45NTY2LDI5LjkxNzggTDEwOC4zMzk2LDQ2LjQxNzggQzEwOC4yNTI2LDQ2LjIxNTMgMTA4LjE5ODYsNDUuOTkwMyAxMDguMTk4Niw0NS43MzgzIFogTTExMC44MDExLDEzLjA0MjggTDEzMC40ODg2LDI0LjQwOTggTDEyNi4wMzUxLDI4Ljg2MzMgTDEwOS43OTMxLDEyLjczODMgQzExMC4xMjE2LDEyLjc0NzMgMTEwLjQ3MjYsMTIuODUyMyAxMTAuODAxMSwxMy4wNDI4IFoiIGlkPSJQbGF5LVN0b3JlIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt=""/>
                        </div>
                    </Col>
                </Row>
                <div style={{backgroundColor:"#212529", padding:'.7em 0 .7em 0'}}>
                    <h5 style={{color:'white', textAlign:'center', margin:'0'}}>Monggovest © 2019</h5>
                </div>
            </div>
            
        )
    }
    
}

export default AppFooter