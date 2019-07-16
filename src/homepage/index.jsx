import React, {Component} from 'react'
import AppHeader from '../common/AppHeader'
import CarouselHomepage from './CarouselHomepage'
import MainHomepage from './MainHomepage';


class Homepage extends Component{
    render(){
        return(
            <div>
                <AppHeader />
                <CarouselHomepage/>
                <MainHomepage />
            </div>
        )
    }
} 

export default Homepage