var url = $("#userImage").attr("data-url");
var profileImg = $("#profile-img");
if(profileImg && url) {
    profileImg.attr("src", url);
}
