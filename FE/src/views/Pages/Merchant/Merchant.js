import React, { Component } from 'react';
import { FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button } from 'reactstrap';
import axios from "./../../../services/axios.config";
import moment from 'moment';
import Swal from 'sweetalert2';

class Merchant extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      merchants: [],
      view: false,
      add: false,
      edit: false,

      id: React.createRef(),
      name: React.createRef(),
      email: React.createRef(),
      livestreams: React.createRef(),
      like: React.createRef(),
      share: React.createRef(),
      rating: React.createRef(),
      lastsession: React.createRef()
    };
    this.disableMerchant = this.handleDisableMerchant.bind(this);
    this.viewMerchant = this.handleViewMerchant.bind(this);
    this.addLivestream = this.handleAddLivestream.bind(this);
    this.editMerchant = this.handleEditMerchant.bind(this);
  }

  handleDisableMerchant() {

    if (typeof this.state.id.current !== 'undefined') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          axios.delete('merchant', {
            data: { id: this.state.id.current.innerText }
          }).then(res => {
            if (res.isSuccess) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else {
              Swal.fire(
                'Error!',
                res.message,
                'error'
              )
            }
          }).catch(err => {
            Swal.fire(
              'Error!',
              err,
              'error'
            )
            console.log(err);
          })
        }
      })
    }
    console.log("handleDisableMerchant");
  }

  handleViewMerchant(e) {
    debugger;
    if (this._isMounted || typeof this._isMounted === 'undefined') {
      this.setState({
        view: !this.state.view
      });
    }
    if (typeof this.state.name.current !== 'undefined') {
      this.setState({
        name: this.state.name.current.innerText,
        email: this.state.email.current.innerText,
        livestreams: this.state.livestreams.current.innerText,
        like: this.state.like.current.innerText,
        share: this.state.share.current.innerText,
        rating: this.state.rating.current.innerText,
        lastsession: this.state.lastsession.current.props.value
      });
    }
    console.log("handleViewMerchant");
  }

  handleAddLivestream() {
    if (this._isMounted || typeof this._isMounted === 'undefined') {
      this.setState({
        add: !this.state.add,
      });
    }
    console.log("handleAddLivestream");
  }

  handleEditMerchant() {
    if (this._isMounted || typeof this._isMounted === 'undefined') {
      this.setState({
        edit: !this.state.edit,
      });
    }
    if (typeof this.state.name.current !== 'undefined') {
      this.setState({
        name: this.state.name.current.innerText,
        email: this.state.email.current.innerText,
        livestreams: this.state.livestreams.current.innerText,
        like: this.state.like.current.innerText,
        share: this.state.share.current.innerText,
        rating: this.state.rating.current.innerText,
        lastsession: this.state.lastsession.current.props.value
      });
    }
    console.log("handleEditMerchant");
  }

  componentDidMount() {
    this._isMounted = true;

    axios.get('merchant').then(res => {
      if (this._isMounted) {
        this.setState({
          merchants: res.data
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    let headerElement = ['id', 'Name', 'Email', 'Live Streams', 'Like', 'Share', 'Rating', 'Last Session', 'Action'];
    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Merchant List
              </CardHeader>
              <CardBody>

                <Table id='employee' className='table table-sm table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      {headerElement.map((key, index) => {
                        return <th key={index}><center>{key}</center></th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.merchants && this.state.merchants.map(({ id, username, email, livestreams, like, share, rating, lastsession }) => {
                      return <tr key={id}>
                        <td><center ref={this.state.id}>{id}</center></td>
                        <td ref={this.state.name}>{username}</td>
                        <td ref={this.state.email}>{email}</td>
                        <td ref={this.state.livestreams}>{livestreams}</td>
                        <td ref={this.state.like}>{like}</td>
                        <td ref={this.state.share}>{share}</td>
                        <td ref={this.state.rating}>{rating}</td>
                        <td><Input type="hidden" ref={this.state.lastsession} value={moment(lastsession).format('LLL')}></Input>{moment(lastsession).fromNow()}</td>
                        <td className='opration'>
                          <center>
                            <div className="btn-group" role="group" aria-label="Basic example">

                              <Button size="sm" color="success" className="btn-pill" onClick={this.viewMerchant}>View</Button>
                              <Modal isOpen={this.state.view} toggle={this.viewMerchant}
                                className='modal-success'>
                                <ModalHeader toggle={this.viewMerchant}>View Data</ModalHeader>
                                <ModalBody>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="name">Name</Label>
                                        <Input type="text" id="name" placeholder="Name" value={this.state.name} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" value={this.state.email} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="livestreams">Live Streams</Label>
                                        <Input type="text" id="livestreams" placeholder="Live Streams" value={this.state.livestreams} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="like">Like</Label>
                                        <Input type="text" id="like" placeholder="Like" value={this.state.like} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="share">Share</Label>
                                        <Input type="text" id="share" placeholder="Share" value={this.state.share} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Input type="text" id="rating" placeholder="Rating" value={this.state.rating} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="lastsession">Last Session</Label>
                                        <Input type="text" id="lastsession" placeholder="Last Session" value={this.state.lastsession} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>

                                </ModalBody>
                                <ModalFooter>
                                  <Button color="success" onClick={this.viewMerchant}>Do Something</Button>{' '}
                                  <Button color="secondary" onClick={this.viewMerchant}>Cancel</Button>
                                </ModalFooter>
                              </Modal>

                              <Button size="sm" color="warning" className="btn-pill" onClick={this.editMerchant}>Edit</Button>
                              <Modal isOpen={this.state.edit} toggle={this.editMerchant}
                                className='modal-warning'>
                                <ModalHeader toggle={this.editMerchant}>Edit Data</ModalHeader>
                                <ModalBody>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="name">Name</Label>
                                        <Input type="text" id="name" placeholder="Name" value={this.state.name} required />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" value={this.state.email} required />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="livestreams">Live Streams</Label>
                                        <Input type="text" id="livestreams" placeholder="Live Streams" value={this.state.livestreams} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="like">Like</Label>
                                        <Input type="text" id="like" placeholder="Like" value={this.state.like} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="share">Share</Label>
                                        <Input type="text" id="share" placeholder="Share" value={this.state.share} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Input type="text" id="rating" placeholder="Rating" value={this.state.rating} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs="12">
                                      <FormGroup>
                                        <Label htmlFor="lastsession">Last Session</Label>
                                        <Input type="text" id="lastsession" placeholder="Last Session" value={this.state.lastsession} disabled />
                                      </FormGroup>
                                    </Col>
                                  </Row>

                                </ModalBody>
                                <ModalFooter>
                                  <Button color="success" onClick={this.editMerchant}>Save</Button>{' '}
                                  <Button color="secondary" onClick={this.editMerchant}>Cancel</Button>
                                </ModalFooter>
                              </Modal>

                              <Button size="sm" color="primary" className="btn-pill" onClick={this.addLivestream}>Add</Button>
                              <Modal isOpen={this.state.add} toggle={this.addLivestream}
                                className='modal-primary'>
                                <ModalHeader toggle={this.addLivestream}>Modal title</ModalHeader>
                                <ModalBody>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                  culpa qui officia deserunt mollit anim id est laborum.
                               </ModalBody>
                                <ModalFooter>
                                  <Button color="success" onClick={this.addLivestream}>Do Something</Button>{' '}
                                  <Button color="secondary" onClick={this.addLivestream}>Cancel</Button>
                                </ModalFooter>
                              </Modal>

                              <Button size="sm" color="danger" className="btn-pill" onClick={this.disableMerchant}>Disable</Button>

                            </div>
                          </center>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </Table>

                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Merchant;
