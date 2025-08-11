// Comments model

class CommentModel {
    constructor(type) {
      this.type = type;
      // get the initial list of comments out of local storage if it exists
      this.comments = readFromLS(this.type) || [];
    }
    // I decided I could combine my getAllComments, and filterCommentsByName methods into one by passing in an optional query argument
    getComments(q = null) {
      if (q === null) {
        // no query, get all comments of the type
        return this.comments;
      } else {
        // comments for a specific post...filter by name
        return this.comments.filter(el => el.name === q);
      }
    }
  
    addComment(postName, comment) {
      const newComment = {
        name: postName,
        comment: comment,
        date: new Date()
      };
      this.comments.push(newComment);
      writeToLS(this.type, this.comments);
    }
  }
  
  function writeToLS(key, data) {
    // we can use JSON.stringify to convert our object to a string that can be stored in localStorage.
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  
  function readFromLS(key) {
    // the string we retrieve from localStorage needs to be converted back to an object with JSON.parse
    return JSON.parse(window.localStorage.getItem(key));
  }

  export default CommentModel;