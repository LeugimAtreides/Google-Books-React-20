import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Col, Row, Container } from "../components/Grid";
import {
  GoogleBookList,
  GoogleBookListItem
} from "../components/GoogleBooksList";
import { Input } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    bookSearch: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  
  getBooks = () => {
    API.getGoogleBooks(this.state.bookSearch)
    .then(res => {
      console.log(res.data);
       this.setState({ books: res.data }, () => {
      console.log(this.state.books)
      console.log(this.state.books.title)
      })
    })
    // .then(function(res) {
    //   console.log(res.data)
    //   this.setState({ books: res.data })
    //   console.log(this.state.books);
    // })
    .catch(()=> {
      this.setState({ books: [] })
    });
  }
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get books update the books state
    event.preventDefault();
    this.getBooks();
    // console.log(this.state.books)
  };

handleBookSave = id => {
  const book = this.state.books.find(book => book.id === id);

  API.saveBook({
    googleId: book.id,
    title: book.volumeInfo.title,
    link: book.volumeInfo.infoLink,
    authors: book.volumeInfo.authors,
    description: book.volumeInfo.description,
    image: book.volumeInfo.imageLinks.thumbnail
  })
}

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search For Any Book To Read!</h1>
            </Jumbotron>
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      name="bookSearch"
                      value={this.state.bookSearch}
                      onChange={this.handleInputChange}
                      placeholder="Search For a Book"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
                    <Button
                      onClick={this.handleFormSubmit}
                      type="success"
                      className="input-md"
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="lg-12">
            {console.log(this.state.books.length, this.state)}
            {this.state.books.length ? (
              <GoogleBookList>
                {this.state.books.map(book => (
                    <GoogleBookListItem
                      key={book.id}
                      title={book.volumeInfo.title}
                      href={book.volumeInfo.infoLink}
                      author={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      thumbnail={book.volumeInfo.imageLinks.thumbnail}
                    >
                      <Col size="xs-3 sm-2">
                        <Button
                          onClick={() => this.handleBookSave(book.id)}
                          type="success"
                          className="input-lg"
                        >
                          Save
                        </Button>
                      </Col>
                    </GoogleBookListItem>
                  ))}
              </GoogleBookList>
            ) : (
              <h1 className="text-center">No Books to Display</h1>
            )}
          </Col>
        </Row>
        <Row className="text-center">
          <Col size="lg-12" className="text-center">
            <Link className="text-center" to="/mybooks">
              Check Out Your Saved Books
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
