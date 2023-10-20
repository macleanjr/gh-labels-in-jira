/* eslint-disable */

// set extension defaults here
var ACCESS_TOKEN = "";
var HIDE_CLOSED_PRS = false;
var HIDE_LABELS_ON_CLOSED_PRS = true;
var FF_CODE_REVIEWERS = false;
var SHOW_ALL_COLUMNS = false;
var FF_PRIDE = false;
var JIRA_HOSTNAME = window.location.hostname;
var PR_COLUMNS = ["in review", "github review"];
var JIRA_COLUMNS = [];
var KANBAN_COLUMNS = {};
var MEMOIZED_CARDS = {};
var NO_PR_ICON = "<svg viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#ccc\" fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>";
var PR_ICON = "<svg viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#555\" fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>";
var GREEN_CHECK_ICON = "<div style=\"float:right;margin-left:5px;margin-top:1px;\" class=\"code-review\"><svg class=\"octicon octicon-check text-green\" viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#28a745\" fill-rule=\"evenodd\" d=\"M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z\"></path></svg><span class=\"tooltiptext\">*TOOLTIP* approved these changes</span></div>";
var REVIEW_PENDING = "<div style=\"float:right;margin-left:5px;margin-top:2px;\" class=\"code-review\"><svg class=\"octicon octicon-primitive-dot bg-pending\" viewBox=\"0 0 8 16\" version=\"1.1\" width=\"8\" height=\"16\" aria-hidden=\"true\"><path fill=\"#dbab09\" fill-rule=\"evenodd\" d=\"M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z\"></path></svg><span class=\"tooltiptext\">Awaiting requested review from *TOOLTIP*</span></div>";
var CHANGES_REQUESTED = "<div style=\"float:right;margin-left:5px;margin-top:2px;\" class=\"code-review\"><svg class=\"octicon octicon-request-changes text-red\" viewBox=\"0 0 16 15\" version=\"1.1\" width=\"16\" height=\"15\" aria-hidden=\"true\"><path fill=\"#f00\" fill-rule=\"evenodd\" d=\"M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7.5L4 15.5V12H1a1 1 0 0 1-1-1V1zm1 0v10h4v2l2-2h8V1H1zm7.5 3h2v1h-2v2h-1V5h-2V4h2V2h1v2zm2 5h-5V8h5v1z\"></path></svg><span class=\"tooltiptext\">*TOOLTIP* requested changes</span></div>";
var COMMENTED = "<div style=\"float:right;margin-left:5px;margin-top:2px;\" class=\"code-review\"><svg class=\"octicon octicon-comment text-gray\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z\"></path></svg><span class=\"tooltiptext\">*TOOLTIP* left review comments</span></div>";
var LOADING_ICON = "<div class=\"loading-container\" style=\"margin-left:30%;\" ><img class=\"loading-icon\" src=\"" + chrome.runtime.getURL("assets/yvette_image.jpeg") + "\" /><br/><span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-complete\" style=\"color:#0052cc !important;\">Loading...</span></div>";


// get settings for the chrome extension
chrome.storage.sync.get({
    github_access_token: "",
    hide_labels_on_closed_prs: true,
    hide_closed_prs: false,
    pr_columns: "",
    ff_code_reviewers: false,
    show_all_columns: false,
    ff_pride: false,
    awesome_loading: false,

}, function (items) {
    ACCESS_TOKEN = items.github_access_token;
    HIDE_CLOSED_PRS = items.hide_closed_prs;
    HIDE_LABELS_ON_CLOSED_PRS = items.hide_labels_on_closed_prs;
    FF_CODE_REVIEWERS = items.ff_code_reviewers;
    SHOW_ALL_COLUMNS = items.show_all_columns;
    FF_PRIDE = items.ff_pride;
    awesome_loading = items.awesome_loading;

    if (items.pr_columns) {
        PR_COLUMNS = items.pr_columns
            .split(",")
            .map(function (element) {
                return element.trim().toLowerCase();
            });
    }
    if (ACCESS_TOKEN != "") {
        setTimeout(addPRLabels, 1500);
    } else {
        console.log("ACCESS TOKEN NOT SET");
    }
});

// Listen for a click on our tab to fire off our function
window.addEventListener("message", function (event) {
    if (event.source != window)
        return;
    switch (event.data.type) {
        case "refreshPRs":
            $("[data-issue-id='" + event.data.params.issueKey + "']").find(".gh-labels-in-jira-wrapper").remove();
            populateIssueCard($("[data-issue-id='" + event.data.params.issueKey + "']"));
            break;
    }
});

function populateIssueCard(card) {
    $.getJSON("https://" + JIRA_HOSTNAME + "/rest/dev-status/1.0/issue/detail?issueId=" + $(card).attr("data-rbd-draggable-id")?.split("::")?.[1] + "&applicationType=GitHub&dataType=pullrequest", function (data) {
        if (data.detail.length == 0 || data.detail[0].pullRequests.length == 0) {
            // no PR's found
            if ($(card).find(".gh-labels-in-jira").length == 0)
                $(card).find("[class*=_footerChildSection]").eq(1).append("<span class=\"ghx-field gh-labels-in-jira\" data-tooltip=\"0 pull requests\">" + NO_PR_ICON + "</span>");
        } else {
            if ($(card).find(".gh-labels-in-jira").length == 0)
                $(card).find("[class*=_footerChildSection]").eq(1).append("<span class=\"ghx-field gh-labels-in-jira\" style=\"cursor:pointer;\" data-tooltip=\"" + data.detail[0].pullRequests.length + " pull request(s)\" onclick=\"event.stopPropagation();window.postMessage({ type: 'refreshPRs', params: { issueKey: '" + $(card).attr("data-rbd-draggable-id")?.split("::")?.[1] + "'} }, '*');\">" + PR_ICON + "</span>");

            var prIcon = $(card).find(".ghx-field .gh-labels-in-jira");
            $(card).find("[class*=_content]").append("<div class=\"gh-labels-in-jira-wrapper\"></div>");
            var wrapper = $(card).find(".gh-labels-in-jira-wrapper");

            // heading for pull requests
            $(wrapper).append("<div class=\"pr-heading\">Pull Requests</div>");

            var cardId = $(card).attr("id");

            $.each(data.detail[0].pullRequests, function () {
                var prid = this.id;
                var owner = this.url.split("/")[3];
                var repo = this.url.split("/")[4];


                if (this.status != "DECLINED" || !HIDE_CLOSED_PRS) {
                    var pullRequestNode = document.createElement("div");
                    pullRequestNode.classList.add("pullRequestNode");
                    pullRequestNode.setAttribute("data-ticket-pull-id", cardId.replace("card-", "") + "-" + prid.replace("#", ""));

                    $(pullRequestNode).append("<span style=\"cursor:pointer;font-size:12px;color: rgb(107, 119, 140);\" onclick=\"event.stopPropagation();window.open('" + this.url + "', '_blank');\">" + prid + "</span>: ");

                    $(pullRequestNode).append(prStatus(this.status));

                    $(pullRequestNode).append("<span class=\"repo-name\">" + repo + "</span>");


                    if (this.status != "DECLINED" || (HIDE_LABELS_ON_CLOSED_PRS == false && HIDE_CLOSED_PRS == false)) {
                        var buildURL = "https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + this.id.replace("#", "");

                        $.ajax({
                            url: buildURL,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data.total_count != 0) {

                                  var pull_id = data.id;
                                  $.each(data.labels, function () {
                                      var label_id = cardId.replace("card-", "") + "-" + pull_id + "-" + this.id;

                                      var labelNode = document.createElement("div");
                                      labelNode.setAttribute("data-label-id", label_id);
                                      labelNode.setAttribute("style", "background-color: #" + this.color + ";color: " + idealTextColor("#" + this.color) + ";");

                                      if (FF_PRIDE && (new Date().getMonth() == 5) && this.name.toLowerCase() == "ready to merge") {
                                          labelNode.setAttribute("style", "background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);color:white;");
                                      }

                                      labelNode.classList.add("pull-request-label");
                                      labelNode.textContent = this.name;

                                      if (FF_CODE_REVIEWERS && (this.name == "In Code Review" || this.name == "Ready for Code Review")) {
                                          addCodeReviewers(owner, repo, prid.replace("#", ""), label_id, data.requested_reviewers, labelNode, data.user.login);
                                      }

                                      $(pullRequestNode).append(labelNode);

                                  })

                                  $(wrapper).append(pullRequestNode);

                                }
                              },
                              beforeSend: setGitHubAccessHeader
                            });

                          }

                        }
                    });
                }
            // store all the stuff we added so we don't have to go through all this over again
            MEMOIZED_CARDS[cardId] = [prIcon, wrapper];
        });

    }

function setGitHubAccessHeader(xhr) {
  xhr.setRequestHeader('Authorization', 'token ' + ACCESS_TOKEN);
}

function prStatus(status) {
    switch (status) {
        case "OPEN":
            return "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-complete\" style=\"color:#0052cc !important;border-color:#b3d4ff !important;\">OPEN</span>";
            break;
        case "MERGED":
            return "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-success\">MERGED</span>";
            break;
        case "DECLINED":
            return "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-error\">DECLINED</span>";
            break;
        default:
            return "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle\">" + status + "</span>";
    }
}

function addCodeReviewers(owner, repo, prid, label_id, requested_reviewers, labelNode, pr_owner) {

    //add requested reviewers to the field
    if (requested_reviewers.length > 0) {
        for (var i = 0; i < requested_reviewers.length; i++) {
            $(labelNode).append(REVIEW_PENDING.replace("*TOOLTIP*", requested_reviewers[i].login));
        }
    }

    var requestedChanges = new Array();
    var commenters = new Array();
    var approvers = new Array();

    var url = "https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + prid + "/reviews?per_page=100";

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.total_count != 0) {
              $.each(data, function () {
                  if (this.state == "APPROVED") {
                      //need to check to make sure the review hasn't been cleared
                      var addCheckmark = true;
                      for (var i = 0; i < requested_reviewers.length; i++) {
                          if (this.user.login == requested_reviewers[i].login)
                              addCheckmark = false;
                      }

                      if (addCheckmark) {
                          if (!approvers.includes(this.user.login)) {
                              approvers.push(this.user.login);
                          }
                          requestedChanges = removeArrayItem(requestedChanges, this.user.login);
                          commenters = removeArrayItem(commenters, this.user.login);
                      }
                  } else if (this.state == "CHANGES_REQUESTED") {
                      //need to check to make sure the review hasn't been cleared
                      var addCheckmark = true;
                      for (var i = 0; i < requested_reviewers.length; i++) {
                          if (this.user.login == requested_reviewers[i].login)
                              addCheckmark = false;
                      }

                      if (addCheckmark) {
                          if (!requestedChanges.includes(this.user.login)) {
                              requestedChanges.push(this.user.login);
                              commenters = removeArrayItem(commenters, this.user.login);
                          }
                      }

                  } else if (this.state == "COMMENTED") {
                      if (!commenters.includes(this.user.login)) {
                          commenters.push(this.user.login);
                      }
                  }
                }) //forEach
                if (approvers.length > 0) {
                    for (var i = 0; i < approvers.length; i++) {
                        $("div[data-label-id='" + label_id + "']").prepend(GREEN_CHECK_ICON.replace("*TOOLTIP*", approvers[i]));
                    }
                }

                //now that all is looped, loop through the requestedChanges array
                if (requestedChanges.length > 0) {
                    for (var i = 0; i < requestedChanges.length; i++) {
                        $("div[data-label-id='" + label_id + "']").prepend(CHANGES_REQUESTED.replace("*TOOLTIP*", requestedChanges[i]));
                        //requested changes trumps comments
                        commenters = removeArrayItem(commenters, requestedChanges[i]);
                    }
                }

                if (commenters.length > 0) {
                    for (var i = 0; i < commenters.length; i++) {

                        if (requested_reviewers.length > 0) {
                            var found = false;
                            for (var j = 0; j < requested_reviewers.length; j++) {
                                if (requested_reviewers[j].login.toString() == commenters[i].toString())
                                    found = true;
                            }
                            if (!found && commenters[i].toString() != pr_owner) {
                                $("div[data-label-id='" + label_id + "']").prepend(COMMENTED.replace("*TOOLTIP*", commenters[i]));
                            }
                        }
                    }
                }
              } // if
            }, // success
    beforeSend: setGitHubAccessHeader
  });
}

function loadAwesomely(node) {
    $(node).find("[class*=_content]").append(LOADING_ICON);
    setTimeout(() => {
        $(node).find(".loading-container").remove();
    }, 1500);
}

function fetchCards(mutations) {
    const newCards = [...mutations].filter(
        mutationRecord => mutationRecord?.addedNodes?.[0]?.childNodes?.[1]?.id?.includes("card-")
        ).map(mutation => mutation?.addedNodes?.[0]?.childNodes?.[1]);
    
    newCards.forEach(cardNode => {
        if (awesome_loading) {
            loadAwesomely(cardNode);
        }
        
        if (MEMOIZED_CARDS[cardNode]) {
            const [prIcon, wrapper] = MEMOIZED_CARDS[cardNode];

            $(cardNode).find("[class*=_footerChildSection]").eq(1).append(prIcon);
            $(cardNode).find("[class*=_content]").append(wrapper);
        } else {
            populateIssueCard(cardNode);
        }
    })
};

function observeJiraColumns() {
    JIRA_COLUMNS.forEach(column => {
        observer = new MutationObserver(fetchCards);

        observer.observe(column, {
            childList: true,
            subtree: true,
        });
    });
};

function populateKanbanColumns() {
    $('[data-component-selector="platform-board-kit.ui.column-title"]').each(function(index) {
        const columnText = $(this).children().first().text();

        if (columnText) {
            KANBAN_COLUMNS[index] = columnText;
        }
    })
s
}

function addPRLabels() {

    // Don't repopulate/observe columns if we already have
    if (!JIRA_COLUMNS.length) {

        const cards = [];
        $.each($('[data-component-selector="platform-board-kit.ui.column.draggable-column"]'), function () {
            // I noticed that the aria labels will be the same as the column text 
            // which is what we need here. Let me know if that's too janky
            var columnText = $(this).find('[data-component-selector="platform-board-kit.ui.column-title"]').first().attr('aria-label');

            // If we have no included column title, we're in a Kanban board, which is structured differently
            // Match the column name with the column using indices
            if (!columnText) {
                if (!Object.keys(KANBAN_COLUMNS).length) {
                    populateKanbanColumns()
                }

                columnText = KANBAN_COLUMNS[$(this).index()];
            }

            if (columnText && SHOW_ALL_COLUMNS || PR_COLUMNS.indexOf(columnText.toLowerCase()) !== -1) {
                // Get an array of columns we want to watch
                JIRA_COLUMNS.push(this);

                // get the cards for the selected column
                const column_cards = $(this).find('[data-component-selector="platform-board-kit.ui.card-container"]');

                if (column_cards.length) {
                    cards.push(...column_cards)
                }
            }
        });

        cards.forEach(card => {
            if (awesome_loading) {
                loadAwesomely(card);
            }

            populateIssueCard(card)
        });

        observeJiraColumns();

    }
    setTimeout(addPRLabels, 1500);
}



/* Helper Functions */

const removeArrayItem = (arr, itemToRemove) => {
    return arr.filter(item => item !== itemToRemove)
}

function idealTextColor(bgColor) {
    var nThreshold = 105;
    var components = getRGBComponents(bgColor);
    var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
}

function getRGBComponents(color) {
    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16)
    };
}
