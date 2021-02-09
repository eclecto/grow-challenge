import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Issue from './Issue';
import IIssueData from '../lib/IIssueData';
import loadIssues from '../lib/loadIssues';

const Layout = () => {
  const [issues, setIssues] = useState<IIssueData[]>();

  useEffect(() => {
    async function issueLoader() {
      const issues = await loadIssues();
      setIssues(issues);
    }
    if(!issues) issueLoader();
  })
  return (
    <Container id="layout">
      <Row>
        <Col>
          <h1>Github Issues</h1>
        </Col>
      </Row>
      <Row className="py-3 d-none d-lg-flex" style={{ fontWeight: "bold" }}>
        <Col lg="6">
          Issue
        </Col>
        <Col lg="3">
          Author
        </Col>
        <Col lg="2">
          Repository
        </Col>
        <Col lg="1">
        </Col>
      </Row>
      
      {issues?.length ?
        issues.map((issue, index) => {
          const props = {
            key: index,
            index,
            issue,
            deleteIssue: () => {
              const newIssues = [...issues];
              newIssues.splice(index, 1);
              setIssues(newIssues);
            }
          };
          return <Issue {...props} />
        })
        : <Row><Col>Loading issues...</Col></Row>
      }
    </Container>
  );
};

export default Layout;