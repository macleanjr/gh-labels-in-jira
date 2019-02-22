/* eslint-disable */

// set extension defaults here
var ACCESS_TOKEN = "";
var HIDE_CLOSED_PRS = false;
var HIDE_LABELS_ON_CLOSED_PRS = true;
var FF_CODE_REVIEWERS = false;
var JIRA_HOSTNAME = window.location.hostname;
var PR_COLUMNS = ["In Review", "Github Review"];
var JIRA_COLUMNS = [];
var NO_PR_ICON = "<svg viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#ccc\" fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>";
var PR_ICON = "<svg viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#555\" fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>";
var GREEN_CHECK_ICON = "<div style=\"float:right;margin-left:5px;\" class=\"code-review\"><svg class=\"octicon octicon-check text-green\" viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#28a745\" fill-rule=\"evenodd\" d=\"M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z\"></path></svg><span class=\"tooltiptext\">*TOOLTIP*</span></div>";
var REVIEW_PENDING = "<div style=\"float:right;margin-left:5px;\" class=\"code-review\"><svg class=\"octicon octicon-primitive-dot bg-pending\" viewBox=\"0 0 8 16\" version=\"1.1\" width=\"8\" height=\"16\" aria-hidden=\"true\"><path fill=\"#dbab09\" fill-rule=\"evenodd\" d=\"M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z\"></path></svg><span class=\"tooltiptext\">*TOOLTIP*</span></div>";



// get settings for the chrome extension
chrome.storage.sync.get({
    github_access_token: "",
    hide_labels_on_closed_prs: true,
    hide_closed_prs: false,
    pr_columns: "",
    ff_code_reviewers: false
}, function (items) {
    ACCESS_TOKEN = items.github_access_token;
    HIDE_CLOSED_PRS = items.hide_closed_prs;
    HIDE_LABELS_ON_CLOSED_PRS = items.hide_labels_on_closed_prs;
    FF_CODE_REVIEWERS = items.ff_code_reviewers;

    if (items.pr_columns) {
        PR_COLUMNS = items.pr_columns
            .split(",")
            .map(function (element) {
                return element.trim();
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
    $.getJSON("https://" + JIRA_HOSTNAME + "/rest/dev-status/1.0/issue/detail?issueId=" + $(card).attr("data-issue-id") + "&applicationType=github&dataType=pullrequest", function (data) {
        if (data.detail[0].pullRequests.length == 0) {
            // no PR's found
            if ($(card).find(".gh-labels-in-jira").length == 0)
                $(card).find(".ghx-stat-fields .ghx-stat-1").append("<span class=\"ghx-field gh-labels-in-jira\" data-tooltip=\"0 pull requests\">" + NO_PR_ICON + "</span>");
        } else {
            if ($(card).find(".gh-labels-in-jira").length == 0)
                $(card).find(".ghx-stat-fields .ghx-stat-1").append("<span class=\"ghx-field gh-labels-in-jira\" style=\"cursor:pointer;\" data-tooltip=\"" + data.detail[0].pullRequests.length + " pull request(s)\" onclick=\"event.stopPropagation();window.postMessage({ type: 'refreshPRs', params: { issueKey: '" + $(card).attr("data-issue-id") + "'} }, '*');\">" + PR_ICON + "</span>");

            $(card).append("<div class=\"gh-labels-in-jira-wrapper\"></div>");
            var wrapper = $(card).find(".gh-labels-in-jira-wrapper");

            // heading for pull requests
            $(wrapper).append("<div id=\"gh-labels-in-jira_prs\" style=\"border-bottom: 2px solid #dfe1e6; color: #6c798f; font-weight:500; font-size:12px;\">Pull Requests</div>");

            $.each(data.detail[0].pullRequests, function () {
                var prid = this.id;
                var prstatus = this.status;
                var owner = this.url.split("/")[3];
                var repo = this.url.split("/")[4];
                var pr_link = "https://github.com/" + owner + "/" + repo + "/pull/" + prid.replace("#", "");


                if (prstatus != "DECLINED" || !HIDE_CLOSED_PRS) {
                    var pullRequestNode = document.createElement("div");
                    pullRequestNode.classList.add("pullRequestNode");

                    //$(pullRequestNode).append();

                    $(pullRequestNode).append("<span style=\"cursor:pointer;font-size:12px;color: rgb(107, 119, 140);\" onclick=\"event.stopPropagation();window.open('" + pr_link + "', '_blank');\">" + prid + "</span>: ");
                    if (prstatus == "OPEN") {
                        $(pullRequestNode).append("<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-complete\" style=\"color:#0052cc !important;border-color:#b3d4ff !important;\">OPEN</span>");
                    } else if (prstatus == "MERGED") {
                        $(pullRequestNode).append("<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-success\">MERGED</span>");
                    } else if (prstatus == "DECLINED") {
                        $(pullRequestNode).append("<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-error\">DECLINED</span>");
                    } else {
                        $(pullRequestNode).append("<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle\">" + prstatus + "</span>");
                    }

                    $(pullRequestNode).append("<span style=\"font-size:10px;font-style:italic;padding-left:5px;\">" + repo + "</span><br/>");

                    if (prstatus != "DECLINED" || (HIDE_LABELS_ON_CLOSED_PRS == false && HIDE_CLOSED_PRS == false)) {
                        var buildURL = "https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + this.id.replace("#", "") + "?access_token=" + ACCESS_TOKEN;
                        $.getJSON(buildURL, function (data) {
                            var pull_id = data.id;
                            $.each(data.labels, function () {
                                var label_id = $(card).data("issue-key") + "-" + pull_id + "-" + this.id;
                                $(pullRequestNode).append("<div class=\"pull-request-label\" data-label-id=\"" + label_id + "\" style=\" background-color: #" + this.color + ";color: " + idealTextColor("#" + this.color) + ";\">" + this.name + "</div>");
                                if (FF_CODE_REVIEWERS && (this.name == "In Code Review" || this.name == "Ready for Code Review")) {
                                    addCodeReviewers(owner, repo, prid.replace("#", ""), label_id, data.requested_reviewers);
                                }
                            });

                            $(wrapper).append(pullRequestNode);

                        });
                    }
                }
            });
        }
    });
}

function addCodeReviewers(owner, repo, prid, label_id, requested_reviewers) {
    //add requested reviewers to the field
    //TODO: This won't work because the element isn't on the page yet
    /*
    if (requested_reviewers.length > 0) {
        for (var i = 0; i < requested_reviewers.length; i++) {
            //$("div[data-label-id='" + label_id + "']").append("test");
        }
    }
    */


    var url = "https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + prid + "/reviews?access_token=" + ACCESS_TOKEN;
    $.getJSON(url, function (data) {
        $.each(data, function () {
            if (this.state == "APPROVED") {
                //need to check to make sure the review hasn't been cleared
                var addCheckmark = true;
                for (var i = 0; i < requested_reviewers.length; i++) {
                    if (this.user.login == requested_reviewers[i].login)
                        addCheckmark = false;
                }

                if (addCheckmark)
                    $("div[data-label-id='" + label_id + "']").append(GREEN_CHECK_ICON.replace("*TOOLTIP*", this.user.login));
            }
        });
    });
}

function addPRLabels() {
    if ($(".gh-labels-in-jira").length == 0) {

        // We don't care to rebuild this list multiple times if we have
        // already determined it once
        if (JIRA_COLUMNS !== []) {
            $.each($("#ghx-column-headers .ghx-column h2"), function () {
                var column_text = $(this).text();

                if (PR_COLUMNS.indexOf(column_text) !== -1) {
                    JIRA_COLUMNS.push($(this).parent().parent().parent().attr("data-id"));
                }
            });
        }

        // select the right columns if there are multiple, and search for all cards in those
        // columns afterwards
        var columnSelectors = JIRA_COLUMNS.map(function (element) {
            return '[data-column-id="' + element + '"] .ghx-issue';
        }).join(', ');
        var cards = document.querySelectorAll(columnSelectors);

        Array.prototype.forEach.call(cards, function (card) {
            populateIssueCard(card);
        });

    }
    setTimeout(addPRLabels, 1500);
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
