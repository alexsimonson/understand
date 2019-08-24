import React, { Component } from 'react';

import {
    Container,
    Navbar,
    NavbarBrand,
    Row,
    Col,
    Jumbotron,
    InputGroup,
    InputGroupAddon,
    Button,
    FormGroup,
    Input
} from 'reactstrap';

import Instagram from './instagram';

class Test extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hashtag: null,
            hashtagList: [],
            newHashtagName: '',
            code: ''
        };
    }

    getHashtagList = () => {
        //think of this as an ajax call for asynchronously fetching data
        fetch('/api/hashtags')
            .then(res => res.json())
            .then(res => {
                var hashtagList = res.map(r => r.hashtag_name);
                this.setState({ hashtagList });
            });
    };

    handleAddHashtag = () => {
        console.log(this.state.newHashtagName);
        fetch('/api/hashtags', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hashtag: this.state.newHashtagName })
        })
            .then(res => res.json())
            .then(res => {
                this.getHashtagList();
                this.setState({ newHashtagName: '' });
            });
    };

    getHashtag = (hashtag) => {
        fetch(`/api/instagram/${hashtag}`)
            .then(res => res.json())
            .then(hashtag => {
                console.log({ hashtag });
                this.setState({ hashtag });
            });
    }

    getUserWithCode = (userCode) => {
        fetch('/api/instagram', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: userCode })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
    };

    handleChangeHashtag = (e) => {
        this.getHashtag(e.target.value);
    }

    handleInputChange = (e) => {
        this.setState({ newHashtagName: e.target.value });
    };

    componentDidMount() {
        //used to initialize state (and fetch data)
        this.getHashtagList();
    }

    render() {
        return (
            <Container fluid className='centered'>
                <Navbar dark color='dark'>
                    <NavbarBrand href='/'>Alex Simonson</NavbarBrand>
                    <a href='https://api.instagram.com/oauth/authorize/?client_id=7df4ca60652b46839f848e3f36e04d98&redirect_uri=http://localhost:3000&response_type=code'>Authenticate</a>
                    <a onClick={this.getUserWithCode}>Get user</a>
                </Navbar>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className='display-3'>Instagram Hashtags</h1>
                            <p className='lead'>Check out some images</p>
                            <InputGroup>
                                <Input
                                    placeholder='Enter a hashtag...'
                                    value={this.state.newHashtagName}
                                    onChange={this.handleInputChange}
                                />
                                <InputGroupAddon addonType='append'></InputGroupAddon>
                                <Button color='primary' onClick={this.handleAddHashtag}>Add Hashtag</Button>
                            </InputGroup>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className='display-5'>Current Hashtag</h1>
                        <FormGroup>
                            <Input type='select' onChange={this.handleChangeHashtag}>
                                {this.state.hashtagList.length === 0 && <option>No hashtags added yet.</option>}
                                {this.state.hashtagList.length > 0 && <option>Select a hashtag.</option>}
                                {this.state.hashtagList.map((hashtag, i) => <option key={i}>{hashtag}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Instagram data={this.state.hashtag} />
            </Container>
        );
    }
}

export default Test;
