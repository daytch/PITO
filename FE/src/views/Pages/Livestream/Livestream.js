import React, { Component } from 'react';
import { Button, TabContent, NavLink, NavItem, Nav, TabPane, Table, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import axios from "./../../../services/axios.config";
import InfiniteScroll from "react-infinite-scroller";
import moment from 'moment';

class Livestream extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/?limit=200",
      pokemon: [],
      itemsCountPerPage: 20,
      activePage: 1,
      activeTab: new Array(4).fill('1')
    };

  }

  loadPokemon = () => {
    axios
      .get(this.state.url)
      .then(res => {
        this.setState(prevState => {
          // const pokemons = prevState.pokemon;
          return {
            pokemon: [...prevState.pokemon, ...res.data.results],
            url: res.data.next
          };
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  toggle(tabPane, tab) {
    ;
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <h1>Tab 1</h1>
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card> 
                <CardBody className="pb-0">
                  <Row>
                    <Col md="4">
                      <img alt="thumbnail1" src="https://4mlbb.files.wordpress.com/2019/01/images.jpeg" height="100px" width="100px"></img></Col>
                    <Col md="8">
                      <h4>Ongoing Livestream 1</h4>
                      <div>Vide Category - {moment(new Date()).format('LLL')}</div>
                      <Button size="sm" className="btn-dribbble btn-brand text mr-1 mb-1"><span>Dribbble</span></Button>
                      <Button size="sm" className="btn-google-plus btn-brand text mr-1 mb-1"><span>Google+</span></Button>
                      <Button size="sm" className="btn-instagram btn-brand text mr-1 mb-1"><span>Instagram</span></Button>
                      <Button size="xl" className="info">Go to Stream</Button>  {" "} <Button size="sm">Share</Button>
                    </Col>
                  </Row>
                </CardBody>
                <br />
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4">
              <Card> 
                <CardBody className="pb-0">
                  <Row>
                    <Col md="4">
                      <img alt="thumbnail2" src="https://4mlbb.files.wordpress.com/2019/01/images.jpeg" height="110px" width="110px"></img></Col>
                    <Col md="8">
                      <h4>Ongoing Livestream 2</h4>
                      <div>Vide Category - {moment(new Date()).format('LLL')}</div>
                      <Button size="sm" className="btn-facebook btn-brand text mr-1 mb-1"><span>Facebook</span></Button>
                      <Button size="sm" className="btn-instagram btn-brand text mr-1 mb-1"><span>Instagram</span></Button>
                      <Button size="sm" className="btn-flickr btn-brand text mr-1 mb-1"><span>Tiktok</span></Button>
                      <Button size="md" className="info">Go to Stream</Button>  {" "} <Button size="sm">Share</Button>
                    </Col>
                  </Row>
                </CardBody>
                <br />
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4">
              <Card> 
                <CardBody className="pb-0">
                  <Row>
                    <Col md="4">
                      <img alt="thumbnail3" src="https://4mlbb.files.wordpress.com/2019/01/images.jpeg" height="100px" width="100px"></img></Col>
                    <Col md="8">
                      <h4>Ongoing Livestream 3</h4>
                      <div>Vide Category - {moment(new Date()).format('LLL')}</div>
                      <Button size="sm" className="btn-dribbble btn-brand text mr-1 mb-1"><span>Dribbble</span></Button>
                      <Button size="sm" className="btn-google-plus btn-brand text mr-1 mb-1"><span>Google+</span></Button>
                      <Button size="sm" className="btn-instagram btn-brand text mr-1 mb-1"><span>Instagram</span></Button>
                      <Button size="xl" className="info">Go to Stream</Button>  {" "} <Button size="sm">Share</Button>
                    </Col>
                  </Row>
                </CardBody>
                <br />
              </Card>
            </Col>
          </Row>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
              </tr>
            </thead>

            {this.state.pokemon ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadPokemon}
                hasMore={true}
                element={'tbody'}
              >
                {this.state.pokemon.map((pokemon, i) => (
                  <tr key={pokemon.name + i}>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.url}</td>
                  </tr>
                ))}
              </InfiniteScroll>
            ) : (
                <h1>Loading Data</h1>
              )}

          </Table>
        </TabPane>
        <TabPane tabId="2">
          <h1>Tab 2</h1>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
              </tr>
            </thead>

            {this.state.pokemon ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadPokemon}
                hasMore={true}
                element={'tbody'}
              >
                {this.state.pokemon.map((pokemon, i) => (
                  <tr key={pokemon.name + i}>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.url}</td>
                  </tr>
                ))}
              </InfiniteScroll>
            ) : (
                <h1>Loading Data</h1>
              )}

          </Table>
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Livestream List
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '1'}
                      onClick={() => { this.toggle(0, '1'); }}
                    >
                      Ongoing Livestream
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '2'}
                      onClick={() => { this.toggle(0, '2'); }}
                    >
                      Upcoming Livestream
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '3'}
                      onClick={() => { this.toggle(0, '3'); }}
                    >
                      Past Livestream
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]}>
                  {this.tabPane()}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Livestream;
