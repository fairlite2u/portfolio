// Comments view

class CommentView {

    commentUI = 
    `<div class="addComment">
        <h2>Add a comment</h2>
        <input type="text" id="commentEntry" />
        <button id="commentSubmit">Comment</button>
    </div>
    <h2>Comments</h2>
    <ul class="comments"></ul>`;
    // I only had one function for the view...so I chose not to use an object or class.
    renderCommentList(element, comments) {
        // clear out any comments that might be listed
        element.innerHTML = '';
        // add the new list of comments
        comments.forEach(el => {
            let item = document.createElement('li');
            item.innerHTML = `
            ${el.name}: ${el.comment}
            `;

            element.appendChild(item);
        });
    }
}

export default CommentView;