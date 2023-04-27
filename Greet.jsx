import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Form, FormGroup, Button, Modal } from 'react-bootstrap';
import { Label, Input } from "reactstrap";

const Greet = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Profile, setProfile] = useState({
    id: Date.now(),
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Gender: "",
    Hobbies: []

  })
  // const [AllProfile, setAllProfile] = useState(JSON.parse(localStorage.getItem("AllProfile")) || [])
  const [AllProfile, setAllProfile] = useState(JSON.parse(localStorage.getItem("AllProfile")) || [])
  const [editId, seteditId] = useState(null)

  const onInputChange = (event) => {
    setProfile({
      ...Profile,
      [event.target.name]: event.target.value,
    })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (editId !== null) {
      AllProfile.splice(AllProfile.findIndex((elm) => elm.id === editId), 1, Profile)
      seteditId(null)
      setShow()
    } else {
      setAllProfile([
        ...AllProfile, Profile
      ])
      resetProfile()
      setShow()
    }

  }

  const CheckBoxChanged = (event) => {
    if (event.target.checked) {
      setProfile({
        ...Profile, Hobbies: [...Profile.Hobbies, event.target.value]

      })
    } else {
      setProfile({
        ...Profile, Hobbies: Profile.Hobbies.filter((elm) => elm !== event.target.value)
      });
    }

  }

  useEffect(() => {
    localStorage.setItem("AllProfile", JSON.stringify(AllProfile))
  }, [AllProfile])

  // Delete 
  const onDelete = (id) => {
    // window.confirm(" Are you Sure Want To Delete?")
    setAllProfile(AllProfile.filter(element => element.id !== id))
  }
  //Edit
  const OnEditButton = (id) => {
    // debugger
    seteditId(id)
    setProfile({ ...Profile, id: id })
    setProfile(AllProfile.filter(element => element.id === id)[0])
    setShow(true) 

  }
  //reset
  const resetProfile = () => {
    setProfile({
      id: Date.now(),
      FirstName: "",
      LastName: "",
      UserName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      Gender: "",
      Hobbies: []

    })
  }
  // console.log(AllProfile) 
  return (
    <>
      <Container fluid>
        <Container>
          <Row>
            <Col>
              <h2>FUNCTION CRUD</h2>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={handleShow}>
                Click Here
              </Button>
            </Col>
          </Row>
          <Table striped >
            <thead >
              <tr className='table-info'>
                <th>ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Username</th>
                <th>E-Mail</th>
                <th>Gender</th>
                <th>Hobbies</th>
                <th>Password</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody className='table-warning'>
              {
                AllProfile?.map((item, index) => {
                  return (
                    <tr key={index.id}>
                      <td>{item.id}</td>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.UserName}</td>
                      <td>{item.Email}</td>
                      <td>{item.Gender}</td>
                      <td>{item.Hobbies.join(",")}</td>
                      <td>{item.Password}</td>
                      <td> <Button id='edit'
                        color='primary outline' onClick={()=> OnEditButton(item.id)} >
                        Edit</Button> {"  "}
                        <Button id='delete'
                          onClick={() => onDelete(item.id)}
                          color='danger'>Delete
                        </Button></td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>


        </Container>
      </Container>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Form inline onSubmit={onHandleSubmit} >
          <Modal.Body>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
              <Label for="exampleFirstName" className="mr-sm-2">FirstName</Label>
              <Input type="text" name="FirstName" id="exampleFirstName" placeholder="James" onChange={onInputChange} value={Profile.FirstName} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
              <Label for="exampleLastName" className="mr-sm-2">LastName</Label>
              <Input type="text" name="LastName" id="exampleLastName" placeholder="Bond" onChange={onInputChange} value={Profile.LastName} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">E-Mail</Label>
              <Input type="email" name="Email" id="exampleEmail" placeholder="abc@gmail.com" onChange={onInputChange} value={Profile.Email} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleUserName" className="mr-sm-2">UserName</Label>
              <Input type="text" name="UserName" id="exampleUserName" placeholder="james123" onChange={onInputChange} value={Profile.UserName} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="Password" id="examplePassword" placeholder="Enter Password" onChange={onInputChange} value={Profile.Password} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleConfirmPassword">ConfirmPassword</Label>
              <Input type="password" name="ConfirmPassword" id="exampleConfirmPassword" placeholder="ConfirmPassword" onChange={onInputChange} value={Profile.ConfirmPassword} />
            </FormGroup>
            <div>
              <label htmlFor="">Gender:</label>
            </div>
            <FormGroup check inline>
              <Label  >
                <Input type="radio" name='Gender'
                  value="Male" onChange={onInputChange}
                  checked={Profile.Gender.includes("Male")} />{' '}
                Male
              </Label>
            </FormGroup>
            <FormGroup  >
              <Label check>
                <Input type="radio" name='Gender'
                  value="Female" onChange={onInputChange}
                  checked={Profile.Gender.includes("Female")} />{' '}
                Female
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check>
                <Input type="radio" name='Gender'
                  value="Other" onChange={onInputChange}
                  checked={Profile.Gender.includes("Other")} />{' '}
                Other
              </Label>
            </FormGroup>


            <div>
              <span>Hobbies:</span>
            </div>
            <FormGroup check inline>

              <Label check>
                <Input type="checkbox"
                  name='Hobbies'
                  onChange={CheckBoxChanged}
                  value="Cricket"
                  checked={Profile.Hobbies.includes("Cricket")} />
                Cricket
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox"
                  name='Hobbies'
                  onChange={CheckBoxChanged}
                  value="E-Sports"
                  checked={Profile.Hobbies.includes("E-Sports")} />
                E-Sports
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox"
                  name='Hobbies' onChange={CheckBoxChanged}
                  value="Coding"
                  checked={Profile.Hobbies.includes("Coding")} />
                Coding
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox"
                  name='Hobbies'
                  onChange={CheckBoxChanged}
                  value="Writing"
                  checked={Profile.Hobbies.includes("Writing")} />
                Writing
              </Label>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" Input type='submit'>Save</Button>{' '}
          </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
}

export default Greet