import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container, Col, Row, Form, FormControl, Button, Card, Img, Body, Title, Text, Footer, Badge} from 'react-bootstrap'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const Items = () => {
  const [allItems, setAllItems] = useState(undefined);
  const [search, setSearch] = useState(undefined);

  const handleSearch = (e) => {
    setSearch(e.target.value)
    // console.log(e.target.value)
  }
  return(

    <div>
      <Form inline>
        <FormControl type="text"  placeholder="Search" onChange={handleSearch} className="mb-3 text-center w-30"/>
      </Form>
      <Container>
        <Row>
          {/* <Col lg={3} md={4} sm={12}><Item /></Col>  */}
          <Col lg={9} md={8} sm={12} className="">
          <Row xs={1} md={2} className="g-4">
            {allItems && search === undefined ? allItems.map(item => {
              return<Col className="flex"> <Card className="p-3 mx-auto" >
                <Card.Img variant="top" src={item.image} />
                <Card.Body >
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.postInfo}
                  </Card.Text>
                  
                  <Button value={item.creator} id={item.title} variant="danger" className="mb-2">Delete Post</Button>
                <Card.Footer>
                  Created by <b>{item.creator}</b>, <b><ReactTimeAgo date={item.createdAt} locale="en-US"/></b>
                </Card.Footer>
                </Card.Body>
              </Card></Col>
              
              }): allItems && search !== undefined ? allItems.filter(item => item.title.search(new RegExp(search, "i")) >= 0).map(item => {
              return<Col className="flex"> <Card className="p-3 mx-auto" >
                <Card.Img variant="top" src={item.image} />
                <Card.Body >
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.postInfo}
                  </Card.Text>
                
                  <Button value={item.creator} id={item.title} variant="danger" className="mb-2">Delete Post</Button>
                <Card.Footer>
                  Created by <b>{item.creator}</b>, <b><ReactTimeAgo date={item.createdAt} locale="en-US"/></b>
                </Card.Footer>
                </Card.Body>
              </Card></Col>
  
              }) :<p style={{fontSize:"15px"}}>Loading posts...</p>}
          </Row>
          </Col>
        </Row>
        
      </Container>
    </div>
  )
};

export default Items