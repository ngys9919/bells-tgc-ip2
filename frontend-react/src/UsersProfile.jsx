import React from 'react';
import axios from 'axios';

import avatar from './assets/avatar.png'

class MyComponent1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        // axios.get('https://api.github.com/users')
        axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
            .then(response => {
                // success
                this.setState({ data: response.data });
                this.setState({ isLoaded: true });
            })
            .catch(error => {
                // error
                this.setState({ error: error });
            })
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/* <h1>Github Users</h1> */}
                    {/* <h1>AI-eShop Users</h1> */}
                    <br />
                    {this.state.data.map((item, index) => (
                        <div key={index} className='UserBlock'>
                            {/* <img className='imgCustom' src={item.avatar_url} alt='User Icon'></img> */}
                            <img className='imgCustom' src={avatar} alt='User Icon'></img>
                            <div className='UserDetails divCustom'>
                                {/* <p className='pCustom'>Username: {item.login}</p>
                                <p className='pCustom'>ID: {item.id}</p> */}
                                <p className='pCustom'>ID: {item.id}</p>
                                <p className='pCustom'>Name: {item.salutation} {item.name}</p>
                                <p className='pCustom'>Email: {item.email}</p>
                                <p className='pCustom'>Country: {item.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default MyComponent1;