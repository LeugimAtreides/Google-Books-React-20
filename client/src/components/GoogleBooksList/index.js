import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// Exporting both GoogleBookList and GoogleBookListItem from this file

// GoogleBookList renders a bootstrap list item
export function GoogleBookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// GoogleBookListItem renders a bootstrap list item containing data from the recipe api call
export function GoogleBookListItem({
  thumbnail = "https://placehold.it/300x300",
  title,
  authors,
  description,
  href,
  children,
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <h4>{authors}</h4>
            <p>Synopsis: {description}</p>
            <a rel="noreferrer noopener" target="_blank" href={href}>
              See the Book on Google Books!
            </a>
          </Col>
          {children}
        </Row>
      </Container>
    </li>
  );
}
