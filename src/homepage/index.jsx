import React, {Component} from 'react'
import AppHeader from '../common/AppHeader'
import CarouselHomepage from './CarouselHomepage'
import MainHomepage from './MainHomepage';
import AppFooter from '../common/AppFooter'


class Homepage extends Component{
    render(){
        return(
            <div>
                <AppHeader />
                <CarouselHomepage/>
                <MainHomepage />
                <br/>
                <AppFooter />
            </div>
        )
    }
} 

export default Homepage