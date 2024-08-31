

// Make the DIV element draggable:
let windows = document.getElementsByClassName("moving-window");

for (let i = 0; i < windows.length; i++) {
    dragElement(windows[i]);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  console.log(elmnt);
  console.log(elmnt.firstElementChild);
  if (elmnt.firstElementChild) {
    // if present, the header is where you move the DIV from:
    elmnt.firstElementChild.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Make a window go to top when clicked and change bar colour
const r = getComputedStyle(document.querySelector(":root"));

document.querySelectorAll(".moving-window").forEach(box => {
    box.addEventListener("mousedown", () => {
        document.querySelectorAll(".moving-window").forEach(b => { 
          b.style.zIndex = '1';
          b.firstElementChild.style.backgroundColor = r.getPropertyValue("--bar-inactive");
        });
        box.style.zIndex = '10';
        box.firstElementChild.style.backgroundColor = r.getPropertyValue("--bar-active");
    });
});


document.addEventListener("DOMContentLoaded", () => {
  // Function to update the width of window bars based on the window's body
  function updateWindowBarWidth(windowBody) {
      const window = windowBody.parentElement;
      const bar = window.firstElementChild;

      bar.style.width = `${windowBody.offsetWidth}px`;
  }

  // Get all windows
  const windows = document.querySelectorAll('.moving-window-body');

  // Create a ResizeObserver for each controller
  const resizeObservers = Array.from(windows).map(window => {
      const resizeObserver = new ResizeObserver(() => {
        updateWindowBarWidth(window);
      });

      // Observe the current controller
      resizeObserver.observe(window);

      // Initial update
      updateWindowBarWidth(window);

      return resizeObserver;
  });

  // Updates the close buttons when clicked on
  const closeButtons = document.querySelectorAll(".close-button");
  const r = getComputedStyle(document.querySelector(":root"));

  closeButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
      button.style.backgroundColor = r.getPropertyValue("--darker-liner");
      button.style.borderStyle = r.getPropertyValue("--window-liner");
      button.style.borderStyle = 'inset';
    });
    button.addEventListener('mouseup', () => {
      button.style.backgroundColor = r.getPropertyValue("--window-liner");
      button.style.borderStyle = r.getPropertyValue("--lighter-liner");
      button.style.borderStyle = 'outset';
      // Delete the window
      const container = button.parentElement;
      const header = container.parentElement;
      const currentWindow = header.parentElement;
      currentWindow.remove();
    });
  });
});

