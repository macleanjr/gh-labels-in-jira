/* eslint-disable */

var ACCESS_TOKEN = "";
var HIDE_CLOSED_PRS = false;
var HIDE_LABELS_ON_CLOSED_PRS = true;
var IN_REVIEW_COLUMN;
var JIRA_HOSTNAME = window.location.hostname;

//get settings for the chrome extension
chrome.storage.sync.get({
    github_access_token: '',
    hide_labels_on_closed_prs: true,
    hide_closed_prs: false
}, function (items) {
    ACCESS_TOKEN = items.github_access_token;
    HIDE_CLOSED_PRS = items.hide_closed_prs;
    HIDE_LABELS_ON_CLOSED_PRS = items.hide_labels_on_closed_prs;
    addPRLabels();
});

function addPRLabels() {

    if ($(".gh-labels-in-jira").length == 0) {
        if (ACCESS_TOKEN != "") {
            //dynamically look for a column header that says "In Review" or "Github Review"
            //and use that to get all the cards in that column
            //TODO: Support multiple columns at the same time
            //TODO: Set column headers to include via extension settings
            $.each($("#ghx-column-headers .ghx-column h2"), function () {
                if ($(this).text() == "In Review" || $(this).text() == "Github Review") {
                    IN_REVIEW_COLUMN = $(this).parent().parent().parent().attr("data-id");
                }
            });

            var cards = document.querySelectorAll('[data-column-id="' + IN_REVIEW_COLUMN + '"] .ghx-issue');

            Array.prototype.forEach.call(cards, function (card) {
                //get the pull requests
                $.getJSON("https://" + JIRA_HOSTNAME + "/rest/dev-status/1.0/issue/detail?issueId=" + $(card).attr("data-issue-id") + "&applicationType=github&dataType=pullrequest", function (data) {
                    if (data.detail[0].pullRequests.length == 0) {
                        //no PR's found
                        $(card).find(".ghx-stat-fields .ghx-stat-1").append("<span class=\"ghx-field gh-labels-in-jira\" data-tooltip=\"0 pull requests\"><svg viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#ccc\" fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg></span>");
                    } else {
                        $(card).find(".ghx-stat-fields .ghx-stat-1").append("<span class=\"ghx-field gh-labels-in-jira\" data-tooltip=\"" + data.detail[0].pullRequests.length + " pull request(s)\"><svg viewBox=\"0 0 12 16\" version=\"1.1\" width=\"12\" height=\"16\" aria-hidden=\"true\"><path fill=\"#555\" fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg></span>");

                        //heading for pull requests
                        $(card).append("<div id=\"gh-labels-in-jira_prs\" style=\"border-bottom: 2px solid #dfe1e6; color: #6c798f; font-weight:500; font-size:12px;\">Pull Requests</div>");

                        $.each(data.detail[0].pullRequests, function () {
                            var prid = this.id;
                            var prstatus = this.status;
                            var owner = this.url.split("/")[3];
                            var repo = this.url.split("/")[4];

                            var buildURL = "https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + this.id.replace("#", "") + "?access_token=" + ACCESS_TOKEN;

                            $.getJSON(buildURL, function (data) {
                                if (prstatus != "DECLINED" || !HIDE_CLOSED_PRS) {
                                    var buildDiv = "";
                                    buildDiv += "<div style=\"margin-top:7px;\">";
                                    buildDiv += "<span style=\"cursor:pointer;font-size:12px;color: rgb(107, 119, 140);\" onclick=\"event.stopPropagation();window.open('" + data.html_url + "', '_blank');\">" + prid + "</span>: ";
                                    if (prstatus == "OPEN") {
                                        buildDiv += "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-complete\" style=\"color:#0052cc !important;border-color:#b3d4ff !important;\">OPEN</span>";
                                    } else if (prstatus == "MERGED") {
                                        buildDiv += "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-success\">MERGED</span>";
                                    } else if (prstatus == "DECLINED") {
                                        buildDiv += "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-error\">DECLINED</span>";
                                    } else {
                                        buildDiv += "<span class=\"aui-lozenge aui-lozenge-overflow aui-lozenge-subtle\">" + prstatus + "</span>";
                                    }
                                    buildDiv += "<span style=\"font-size:10px;font-style:italic;padding-left:5px;\">" + data.head.repo.name + "</span><br/>";

                                    //TODO: Add an option to show labels for declined PR's
                                    if (prstatus != "DECLINED" || (HIDE_LABELS_ON_CLOSED_PRS == false && HIDE_CLOSED_PRS == false)) {
                                        $.each(data.labels, function () {
                                            buildDiv += "<div style=\"margin-top:3px; height: 20px; padding: 0.15em 4px; font-size:12px; font-weight:600 line-height:15px; border-radius: 2px; background-color: #" + this.color + ";color: " + idealTextColor("#" + this.color) + ";\">" + this.name + "</div>";
                                        });
                                    }
                                    buildDiv += "</div>";

                                    $(card).append(buildDiv);
                                }
                            });
                        });
                    }
                });
            });

        } else {
            console.log("Access token not set");
        }
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
