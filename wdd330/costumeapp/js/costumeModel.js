  // Store Class: Handles Storage
  export default class Store {
      static getCostumes() {
          let costumes;
          if (localStorage.getItem('costumes') === null) {
              costumes = [];
          } else {
              costumes = JSON.parse(localStorage.getItem('costumes'));
          }
          return costumes;
      }

      static addCostume(costume) {
          const costumes = this.getCostumes();
          costumes.push(costume);
          localStorage.setItem('costumes', JSON.stringify(costumes));
      }

      static editCostume(costume, index) {
          const costumes = this.getCostumes();
          costumes.splice(index, 1, costume);
          localStorage.setItem('costumes', JSON.stringify(costumes));
      }

      static removeCostume(index) {
          const costumes = this.getCostumes();
          costumes.splice(index, 1);
          localStorage.setItem('costumes', JSON.stringify(costumes));
      }

      static storePicture() {
          localStorage.setItem("recent-image", reader.result);
          const recentImageDataURL = localStorage.getItem("recent-image");
          if (recentImageDataURL) {
              document.querySelector("#imgPreview").setAttribute("src", recentImageDataURL);
          } else {
              document.querySelector("#imgPreview").setAttribute("src", "./images/No_Image_Available.jpg")
          }
      }
  }