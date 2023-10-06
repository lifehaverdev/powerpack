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

function isMobileDevice() {
  // Get the current screen width
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Define the mobile breakpoint (e.g., 769px)
  const mobileBreakpoint = 769;

  // Check if the screen width is less than the mobile breakpoint
  return screenWidth < mobileBreakpoint;
}
  
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
        frame("","","","",
          create("button","sound","","start(true)","SOUND")
          +
          create("button","quiet","","start(false)","NO SOUND")
        )
        get('bar').style.display = "none";
    }, 2000);
    
}

function bannerSlide(id) {
    const element = document.getElementById(id);
    // Use a setTimeout to apply the transformation after a brief delay
    setTimeout(() => {
      element.style.top = '50%'; /* Move to the vertical center of the screen */
      element.style.transform = 'translate(-50%, -50%)'; /* Apply transformation */
    }, 100);
}

function countSlide(id) {
  const element = document.getElementById(id);
  // Use a setTimeout to apply the transformation after a brief delay
  setTimeout(() => {
    element.style.top = '50%'; /* Move to the vertical center of the screen */
    element.style.transform = 'translate(-50%, -50%)'; /* Apply transformation */
  }, 100);
}

function countDown() {
  document.body.innerHTML += 
  create("h1","count","fight","","3");
  countSlide("count");
  
  setTimeout(() => {
    get('count').remove()
    document.body.innerHTML += 
    create("h1","count","fight","","2");
    countSlide("count");
    
  },1000)
  setTimeout(() => {
    get('count').remove()
    document.body.innerHTML += 
    create("h1","count","fight","","1");
    countSlide("count");
    
  },2000)
  setTimeout(() => {
    get('count').remove()
    document.body.innerHTML += 
    create("h1","count","fight","","FIGHT");
    countSlide("count");
  },3000)
  setTimeout(() => {
    get('count').remove()
  },4000)

}



function battle1() {
  var p1 = get('player1');
  var p2 = get('player2');
  hit(p2);
  setTimeout(()=>{
    hit(p1)
  },1500);
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
    if(win == 1){
      knockOff(p2,1);
    } else if(win == -1){
      knockOff(p1,0);
    } else {
      knockOff(p1,0);
      knockOff(p2,1);
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

function panUp(zoomFactor) {
  const image = document.getElementById('dogpile');
  const container = document.getElementById('intro');
  
  const imageHeight = image.offsetHeight;
  const containerHeight = container.offsetHeight;

  if (imageHeight > containerHeight) {
    // Calculate the maximum scroll distance
    const maxScroll = imageHeight - containerHeight;
    const maxZoomedWidth = image.width * zoomFactor;
    const maxZoomedHeight = image.height * zoomFactor;
    
    // Apply CSS animations for smooth scrolling
    image.style.transition = 'transform 7s'; // Adjust the duration as needed
    image.style.transform = `translateY(${maxScroll}px)`;

    image.style.transition = 'transform 7s, width 7s, height 7s'; // Adjust durations as needed
    image.style.transform = `translateY(${maxScroll}px) scale(${zoomFactor})`;
    //image.style.width = `${maxZoomedWidth}px`;
    //image.style.height = `${maxZoomedHeight}px`;
  }
}
