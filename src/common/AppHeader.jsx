import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';
// import Style from '../assets/style'
import { Link, withRouter } from 'react-router-dom'
import store from 'store'
import isAdmin from '../helper/isAdmin'
import isLoggedIn from '../helper/isLoggedIn'
import Axios from 'axios';


class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            user: {},
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com'
        };
        this.logOutLogic = this.logOutLogic.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logOutLogic() {
        store.remove('loggedIn');
        store.remove('admin')
        localStorage.removeItem('JWT_TOKEN')
        localStorage.removeItem('USER_ID')
        this.props.history.push('/login')
    }
    componentDidMount() {
        if (isLoggedIn()) {
            Axios.get(`${this.state.baseUrl}/v1/api/user/${localStorage.getItem('USER_ID')}`)
                .then(res => {
                    this.setState({
                        user: res.data.data
                    })


                }).catch(err => {
                    console.log(err)
                    alert(err)
                })

        }

    }
    render() {
        let signUpCheck
        let logInCheck
        let logInRender
        let Admin
        let createInvestment
        const user = this.state.user
        if (isLoggedIn()) {
            createInvestment= <NavLink  ><Link style={{textDecoration:'none'}} to='/investasi-form' className='text-white' >Buat Investasi</Link></NavLink>
            logInCheck = <NavLink  ><Link style={{textDecoration:'none'}} onClick={this.logOutLogic} className='text-white' >Logout</Link></NavLink>

            logInRender =
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className='text-white' nav caret>
                        <img src={user.profilePicture} style={{ width: '30px', borderRadius:'50%' }} alt="" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem style={{textDecoration:'none'}} className='text-primary'>
                            <Link to={'/user/'+user._id} >{user.namaLengkap}</Link>
                        </DropdownItem>
                        <DropdownItem style={{textDecoration:'none'}} className='text-primary'>
                            Investasi Saya
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem style={{textDecoration:'none'}} className='text-primary'>
                            Setting
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

            if (this.state.user.isAdmin) {
                Admin = <Button><Link style={{textDecoration:'none'}} className='text-white' to='/admin'>Admin</Link></Button>
            }

        } else {
            logInCheck = 
            
            <NavLink  >
                <Link style={{textDecoration:'none'}} className='text-white' to='/login' >Login</Link>
            </NavLink>
            signUpCheck = <NavLink>
            <Link style={{textDecoration:'none'}} className='text-white' to='/register' >SignUp</Link>

        </NavLink>    
          
        }
        return (
            <div>
                <Navbar style={{paddingLeft:'2em', paddingRight:'2em'}} color="dark" light expand="md">

                    <NavbarBrand className='text-white'  href="/"><img style={{ width: "100px" }} src="https://monggovest.herokuapp.com/static/img/Logo-White@2x.39103d4.png" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {createInvestment}
                            </NavItem>
                            <NavItem >
                                <NavLink ><Link style={{textDecoration:'none'}} className='text-white' to='/investasi' >Investasi</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                {Admin}
                            </NavItem>

                            {logInRender}

                            <NavItem>
                                {logInCheck}
                            </NavItem>
                            <NavItem>
                            {signUpCheck}
                            </NavItem>
                        </Nav>

                    </Collapse>


                </Navbar>

            </div>
        );
    }
}

export default withRouter(AppHeader)