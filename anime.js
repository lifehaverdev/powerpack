//drag drop
var position = { x: 0, y: 0 }

interact('.draggable').draggable({
  listeners: {
    start (event) {
      //console.log(event.type, event.target)
      event.target.classList.add('dragging');
      if(document.getElementById('banner')){
        get('banner').remove();
      }
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
    end (event) {
        event.target.classList.remove('dragging'); // Remove the class when the disc is dropped
    },
  }
})

interact('.op').dropzone({
    accept: '.draggable', // Only accept elements with the 'draggable' class
    ondropactivate(event) {
      const dropzone = event.target;
      dropzone.classList.add('drop-active');
    },
    ondropdeactivate(event) {
      const dropzone = event.target;
      dropzone.classList.remove('drop-active');
    },
    ondrop(event) {
        const draggableElement = event.relatedTarget;
        const dropzone = event.target;
        console.log(dropzone)
        if (draggableElement.classList.contains('draggable')) {
          dropzone.classList.add('choice'); // Add a class to the tile when the disc is dropped
          //loadCard(dropzone.id);
        }
        if (dropzone.classList.contains('char')) {
            loadCard(dropzone.id);
            console.log('char picked')
        }
        if (dropzone.classList.contains('dest')) {
            arena = parseInt(dropzone.id);
            
            banner()
            console.log('stage picked');
        }
    },
    ondragenter(event) {
      const draggableElement = event.relatedTarget;
      const dropzone = event.target;
      if (draggableElement.classList.contains('draggable')) {
        //loadCard(dropzone.id);
        dropzone.classList.add('choice'); // Add a class to the tile when the disc enters
      }
    },
    ondragleave(event) {
      const draggableElement = event.relatedTarget;
      const dropzone = event.target;
      if (draggableElement.classList.contains('draggable')) {
        dropzone.classList.remove('choice'); // Remove the class from the tile when the disc leaves
      }
    },
});
  
//animation
function welcome() {
    var image = get("logo");
    var opacity = 0;
    var intervalID = setInterval(function() {
        if (opacity < 1) {
        opacity += 0.01;
        image.style.opacity = opacity;
        } else {
        clearInterval(intervalID);
        setTimeout(function() {
            var intervalID2 = setInterval(function() {
            if (opacity > 0) {
                opacity -= 0.01;
                image.style.opacity = opacity;
            } else {
                clearInterval(intervalID2);
            }
            }, 4);
        }, 1000);
        }
    }, 2);
    setTimeout(function() {
        start();
    }, 2000);
    
}

function slideIn(id) {
    const element = document.getElementById(id);
    // Use a setTimeout to apply the transformation after a brief delay
    setTimeout(() => {
      element.style.top = '50%'; /* Move to the vertical center of the screen */
      element.style.transform = 'translate(-50%, -50%)'; /* Apply transformation */
    }, 100);
}