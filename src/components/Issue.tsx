import { Row, Col, Button, Media } from "react-bootstrap";
import IIssueData from '../lib/IIssueData';

interface IIssueProps {
  issue:IIssueData,
  index:number,
  deleteIssue():void,
}

const Issue = ({ issue, deleteIssue }:IIssueProps) => (
  <Row className="py-lg-3 align-items-center">
    <Col className="py-2 py-lg-0" lg="6">
      <a href={issue.issueUrl}>{issue.issueTitle}</a>
    </Col>
    <Col className="py-2 py-lg-0" lg="3">
      <a href={issue.userProfile}>
        <Media className="align-items-center">
          <img className="avatar" alt={issue.username} src={issue.userAvatar} />
          <Media.Body className="ml-3">{issue.username}</Media.Body>
        </Media>
      </a>
    </Col>
    <Col className="py-2 py-lg-0" lg="2">
      <a href={issue.repositoryUrl}>{issue.repositoryName}</a>
    </Col>
    <Col className="py-2 py-lg-0" lg="1">
      <Button onClick={deleteIssue}>Delete</Button>
    </Col>
  </Row>
);

export default Issue;