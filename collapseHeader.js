var coll = document.getElementsByClassName("collapsibleHeader");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "flex"|| content.style.maxHeight) {
            content.style.display = "none";
            content.style.maxHeight = null;
        } else {
            content.style.display = "flex";
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
