import React, {Component} from 'react'
import CardInvestasi from './MainInvestasi'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'


class Investasi extends Component{
    render(){
        return(
            <div style={{height:'100%'}}>
                <AppHeader />
                <CardInvestasi />
                <br/>
                <AppFooter />
            </div>
        )
    }
} 

export default Investasi