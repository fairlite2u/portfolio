//addEventListener.

class CommentModel {
    constructor(type) {
        this.type = type;
        this.comments = []
    }
    addComment(hikeName, comment) {
        newComment = {
            name: hikeName,
            date: new Date(),
            content: comment
        };
        this.comments.push(newComment);
    }
    getComments(q = null) {
        if (q === null) {
          // no query, get all comments of the type
          return this.comments;
        } else {
          // comments for a specific post...filter by name
          return this.comments.filter(el => el.name === q);
        }
      }


}

function writeToLocalStorage(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

function readFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));

}

const commentUI = `<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentEntry">
<button id="commentSubmit">Comment</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;

function renderCommentList(element, comments) {
    element.innerHTML = "";
    comments.forEach(elementlist => {
        let item = document.createElement("li");
        item.innerHTML = `${elementlist.name}: ${elementlist.comment}`;
        element.appendChild(item);
    });
}

class Comments {
    constructor(type, commentElementId) {
        this.type = type;
        this.commentElementId = commentElementId;
        this.model = new CommentModel(this.type);
    }

    addSubmitListener(postName) {
        // use element.ontouchend to avoid more than one listener getting attached at a time to the button.
        document.getElementById('commentSubmit').ontouchend = () => {
            // debugger;
            this.model.addComment(
                postName,
                document.getElementById('commentEntry').value
            );
            document.getElementById('commentEntry').value = '';
            this.showCommentList(postName);
        };
    }
    showCommentList(q = null) {
        try {
            const parent = document.getElementById(this.commentElementId);
            if (!parent) throw new Error('comment parent not found');
            // check to see if the commentUI code has been added yet
            if (parent.innerHTML === '') {
                parent.innerHTML = commentUI;
            }
            if (q !== null) {
                // looking at one post, show comments and new comment button
                document.querySelector('.addComment').style.display = 'block';
                this.addSubmitListener(q);
            } else {
                // no post name provided, hide comment entry
                document.querySelector('.addComment').style.display = 'none';
            }
            // get the comments from the model
            let comments = this.model.getComments(q);
            if (comments === null) {
                // avoid an error if there are no comments yet.
                comments = [];
            }
            renderCommentList(parent.lastChild, comments);
        } catch (error) {
            console.log(error);
        }
    }


}

export default Comments;