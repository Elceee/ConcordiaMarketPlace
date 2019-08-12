import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class ItemDetails extends Component {
    constructor(props) {
        super(props) 
            this.state = {
                item = ""
            }
    }

    componentDidMount = async () => {
        let id = this.props._id
        let data = new FormData()
        data.append("itemId", id)
        let response = await fetch("/get-dash-by-id", {method: "POST", body: data})
        let responseBody = await response.text()
        let body = JSON.parse(responseBody)
        if (body.success) {
            this.setState({item: body.item})
        }
    }
}