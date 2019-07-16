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
    DropdownItem
} from 'reactstrap';
// import Style from '../assets/style'
import { Link, withRouter } from 'react-router-dom'
import store from 'store'
import isLoggedIn from '../helper/isLoggedIn'
import Axios from 'axios';


class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            user: {}
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
        localStorage.removeItem('JWT_TOKEN')
        localStorage.removeItem('USER_ID')
        this.props.history.push('/login')
    }
    componentDidMount() {
        if (isLoggedIn()) {
            Axios.get(`https://nino-monggovest.herokuapp.com/v1/api/user/${localStorage.getItem('USER_ID')}`)
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
        console.log('ini user', this.state.user)
        let logInCheck
        let logInRender
        const user = this.state.user
        if (isLoggedIn()) {
            logInCheck = <NavLink  ><Link onClick={this.logOutLogic} className='text-white' >Logout</Link></NavLink>
            logInRender =
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className='text-white' nav caret>
                        <img src={user.profilePicture} style={{width:'30px'}} alt=""/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem className='text-primary'>
                            {user.namaLengkap}
                        </DropdownItem>
                        <DropdownItem className='text-primary'>
                            Investasi Saya
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className='text-primary'>
                            Setting
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
        } else {
            logInCheck = <NavLink  ><Link className='text-white' to='/login' >Login</Link></NavLink>
        }
        return (
            <div>
                <Navbar color="dark" light expand="md">

                    <NavbarBrand className='text-white' href="/"><img style={{ width: "100px" }} src="https://monggovest.herokuapp.com/static/img/Logo-White@2x.39103d4.png" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://nino-monggovest.heroku-app.com/investment"><Link className='text-white' to='/investasi' >Investasi</Link></NavLink>
                            </NavItem>
                            {logInRender}

                            <NavItem>
                                {logInCheck}
                            </NavItem>
                        </Nav>

                    </Collapse>


                </Navbar>

            </div>
        );
    }
}

export default withRouter(AppHeader)