// Create an array to keep track of each window
let windowArray = [];
const initalWindows = document.getElementsByClassName("moving-window");
for (let i = 0; i < initalWindows.length; i++) {
  windowArray[i] = initalWindows[i];
}

// Removes the first instance of an element from an array
function removeElement(array, element) {
  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

// A function create a fully customisable window 
function createNewWindow(width, height, top, left, title, iconSrc, isCloseEnabled, addressText, contentBody) {
  const body = document.getElementsByTagName("body")[0];

  // Create moving window
  const newWindow = document.createElement("div");
  newWindow.className = "moving-window";
  newWindow.style.top = top;
  newWindow.style.left = left;
  body.appendChild(newWindow);

  // Create header
  const newBar = document.createElement("div");
  newBar.className = "moving-window-header";
  newWindow.appendChild(newBar);

  // Create header title
  const newTitle = document.createElement("div");
  newTitle.className = "moving-window-header-title";
  newBar.appendChild(newTitle);

  // Create header icon & text
  const newIcon = document.createElement("img");
  newIcon.src = iconSrc;
  newTitle.appendChild(newIcon);
  const newTitleText = document.createTextNode(title);
  newTitle.appendChild(newTitleText);

  // Create header buttons
  const newButtons = document.createElement("div");
  newButtons.className = "moving-window-header-buttons";
  newBar.appendChild(newButtons);

  // Create close button
  const newClose = document.createElement("button");
  const newCloseIcon = document.createElement("img");
  if (isCloseEnabled) {
    newClose.className = "close-button";
    newCloseIcon.src = "media/ui/close-black.svg";
  } else {
    newClose.className = "close-button-disabled";
    newCloseIcon.src = "media/ui/close-grey.svg";
  }
  newButtons.appendChild(newClose);
  newClose.appendChild(newCloseIcon);

  // Create address bar
  const newAddress = document.createElement("div");
  newAddress.className = "moving-window-address";
  newWindow.appendChild(newAddress);

  // Create address text + icon
  const newAddressText = document.createElement("span");
  const newAddressIcon = document.createElement("img");
  const addressNode = document.createTextNode(addressText);
  newAddressIcon.src = "media/win95-icons/Folders/Opened Folder.ico";
  newAddressText.className = "address-text";
  newAddress.appendChild(newAddressText);
  newAddressText.appendChild(newAddressIcon);
  newAddressText.appendChild(addressNode);

  // Create window body
  const newWindowBody = document.createElement("div");
  newWindowBody.className = "moving-window-body";
  newWindowBody.style.width = `${width}px`;
  newWindowBody.style.height = `${height}px`;
  newWindow.appendChild(newWindowBody);

  // Populate window content
  newWindowBody.innerHTML = contentBody;

  // Add window to the array
  windowArray.push(newWindow);
  
}

// Make the DIV element draggable:
for (let i = 0; i < windowArray.length; i++) {
    dragElement(windowArray[i]);
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

windowArray.forEach(box => {
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
      const address = window.children[1];

      bar.style.width = `${windowBody.offsetWidth}px`;
      window.style.width = `${windowBody.offsetWidth}px`;
      address.style.width = `${windowBody.offsetWidth - 3}px`;
  }

  // Get all windows
  const windows = document.querySelectorAll('.moving-window-body');

  // Create a ResizeObserver for each controller
  const resizeObservers = Array.from(windowArray).map(window => {
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
      windowArray = removeElement(windowArray, currentWindow);
      currentWindow.remove();
    });
  });
});

