var issueContainerEl = document.querySelector('#issues-container');
var limitWarningEl = document.querySelector('#limit-warning');



getRepoIssues = repo => {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    if (response.ok) {
        response.json().then(function(data) {
          displayIssues(data);
      
          // check if api has paginated issues
          if (response.headers.get("Link")) {
            console.log("repo has more than 30 issues");
          }
        });
      }

    console.log(repo);
};

displayIssues = issues => {
    if (issues.length === 0) {
        issuesContainerEl.textContent = 'this repo has no open issues!';
        return;
    }
    for (var i = 0; i < issues.length; i++)
    //create a link to element to take users to the issue on GitHub
    var issuesEl = document.createElement('a');
    issuesEl.classList = 'list-item flex-row justify-space-between align-center';
    issuesEl.setAttribute('href', issues[i].html_url);
    issuesEl.setAttribute('target', '_blank');

    //create a span to hold issues title
    var titleEl = document.createElement('span');
    titleEl.textContent = issues[i].title;

    //append to container
    issuesEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement('span');

    // check if issues is an acutal issue or pull request
    if(issues[i].pull_request) {
        typeEl.textContent = '(Pull Requests)';
    } else {
        typeEl.textContent = '(Issue)'
    }

    // append to container
    issuesEl.appendChild(typeEl)

    issuesContainerEl.appendChild(issuesEl)

}

displayWarning = repo => {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement('a');
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute('href', "https://github.com/" + repo + '/issues');
    linkEl.setAttribute('target', '_blank');

    //append to warning container
    limitWarningEl.appendChild(linkEl)
}


getRepoIssues('facebook/react')