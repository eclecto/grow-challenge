import { Octokit } from '@octokit/rest';
import IIssueData from './IIssueData';

/**
 * Asynchronously load the issues needed.
 */
export default async function loadIssues():Promise<IIssueData[]> {
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN || '',
  });
  const getTsIssues = octokit.issues.listForRepo({
    owner: 'microsoft',
    repo: 'typescript',
  });
  const getReactIssues = octokit.issues.listForRepo({
    owner: 'facebook',
    repo: 'react',
  });
  const getGraphQlIssues = octokit.issues.listForRepo({
    owner: 'graphql',
    repo: 'graphql-js',
  });

  const [
    { data: tsIssues },
    { data: reactIssues },
    { data: graphQlIssues }
  ] = await Promise.all([getTsIssues, getReactIssues, getGraphQlIssues]);



  const issues = tsIssues.concat(reactIssues, graphQlIssues).sort((issue, last) => {
    const issueTitle = issue.title.toLowerCase();
    const lastTitle = last.title.toLowerCase();
    return (issueTitle > lastTitle) ? 1 : -1;
  }).filter(issue => !issue.pull_request);

  console.log(issues);

  return issues.map(issue => {
    return {
      issueTitle: issue.title,
      issueUrl: issue.html_url,
      username: issue.user!.login,
      userAvatar: issue.user!.avatar_url,
      userProfile: issue.user!.html_url,
      repositoryName: issue.repository_url.substr(issue.repository_url.lastIndexOf('/') + 1),
      repositoryUrl: issue.repository_url.replace(/(api\.|\/repos)/g, ''),
    };
  });
}