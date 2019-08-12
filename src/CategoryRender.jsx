import React, { Component } from 'react'
import Item from "Item.jsx"

export default class CategoryRender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items = []
        }
    }
    componentDidMount = async () => {
        let response = await fetch("/all-items")
        let responseBody = await response.text()
        let body = JSON.parse(responseBody)
        let items = body.filter(item => {
            return item.categories.contains(this.props.category)
        })
        this.setState({items})
    }

    renderItemsAsDivs = () => {
        return (<div>{this.state.items.map(item => {
            return <Item contents={item}/> 
        })}</div>    
        )
    }

    render = () => {
        return (<div>
            {this.renderItemsAsDivs()}
        </div>)
    }
}