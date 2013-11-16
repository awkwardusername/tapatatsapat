/**
 * Created by REDFOX Wizpad on 11/14/13.
 */

(function() {
    var pageId = $("#pageId").val();

    pageIdNav = pageId.charAt(0).toUpperCase();
    pageIdNav += pageId.substr(1);
    $("#navlink" + pageIdNav).attr("class", "active");
    //console.log('Post-process here.');
})();