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

// function logScreenResolution() {
//   const resolution = `${window.innerWidth}x${window.innerHeight}`;
//   console.log(`Screen Resolution: ${resolution}`);

//   // Attempt to access the arena and player1 elements
//   const arena = document.getElementById('arena');
//   const player1 = document.getElementById('player1');

//   if (arena) {
//     try {
//       const arenaWidth = getComputedStyle(arena).width;
//       const arenaHeight = getComputedStyle(arena).height;

//       console.log('Arena Styles:');
//       console.log('Width:', arenaWidth);
//       console.log('Height:', arenaHeight);
//     } catch (err) {
//       console.error('Error accessing arena styles:', err);
//     }
//   } else {
//     console.log('No arena element found.');
//   }

//   if (player1) {
//     try {
//       const top = getComputedStyle(player1).top;
//       const left = getComputedStyle(player1).left;
//       const height = getComputedStyle(player1).height;

//       console.log('Player 1 Styles:');
//       console.log('Top:', top,'Left:', left,'Height:', height);
//     } catch (err) {
//       console.error('Error accessing player1 styles:', err);
//     }
//   } else {
//     console.log('No player1 element found.');
//   }
// }


// Add an event listener for the 'resize' event


//window.addEventListener('resize', logScreenResolution);

// Call the function initially to log the current screen resolution
//logScreenResolution();

// function changePacks(top,lr,height) {
//   var p1 = get('player1').style;
//   var p2 = get('player2').style;
//   if(top != 0){
//     p1.top = `${top}vh`;
//     p2.top = p1.top;
//   }
//   if(lr != 0){
//     p1.left = `${lr}vw`;
//     p2.right = p1.left;
//   }
//   if(height != 0){
//     p1.height = `${height}vh`
//     p2.height = p1.height;
//   }
// }


function battle1() {
  var p1 = get('player1');
  var p2 = get('player2');
  curInt = setInterval(()=>{
    hit(p2);
    setTimeout(() => {hit(p1)},1500);
  },3000)

}

// function battle2() {
//   curInt = setInterval(()=>{
//     smash();
//   }, 1000)
// }

function smash() {
  var p1 = get('player1');
  var p2 = get('player2');
    // Apply a CSS class to initiate the animation
    p1.classList.add('smashR');
    p2.classList.add('smashL');
    if(win){
      knockOff(p2,1);
    } else {
      knockOff(p1,0);
    }
}

function hit(el) {
  let count = 0;
  const flickerInterval = setInterval(() => {
    if (count < 3) {
      el.style.transition = 'opacity 0.2s'; // Adjust the duration as needed
      el.style.opacity = '0'; // Set opacity to 0 (fully transparent)

      // Preserve the existing transform property
      const existingTransform = getComputedStyle(el).transform;
      el.style.transform = existingTransform + ' scaleX(-1)';

      setTimeout(() => {
        el.style.opacity = '1'; // Set opacity back to 1 (fully opaque)

        // Reset the transform property to its original state
        el.style.transform = existingTransform;
      }, 200); // This delay should match the transition duration

      count++;
    } else {
      clearInterval(flickerInterval); // Stop the flickering after 3 times
    }
  }, 500); // Adjust the interval as needed (e.g., 500ms for a flicker every half-second)
}

function knockOff(el,right) {
  // Apply a CSS class to initiate the animation
  if(right == 0){
    el.classList.add('knock-off-left');
  } else {
    el.classList.add('knock-off-right')
  }
  
  
  // Remove the element from the DOM after the animation ends
  el.addEventListener('animationend', () => {
    el.remove();
  });
}

